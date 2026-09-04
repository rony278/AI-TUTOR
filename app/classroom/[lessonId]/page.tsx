"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Clock,
  Languages,
  MessageSquare,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import {
  LessonState,
  SupportedLanguage,
  TeacherAdaptationEvent,
  EvaluationResult,
} from "@/types/teaching";
import { DatabaseStore } from "@/lib/db/in-memory-db";
import { TeacherAvatar } from "@/components/classroom/teacher-avatar";
import { VisualStage } from "@/components/classroom/visual-stage";
import { InteractiveQuestion } from "@/components/classroom/interactive-question";
import { AdaptationBanner } from "@/components/classroom/adaptation-banner";
import { InterruptionModal } from "@/components/classroom/interruption-modal";
import { JudgeInspector } from "@/components/classroom/judge-inspector";
import { FinalAssessmentModal } from "@/components/classroom/final-assessment-modal";
import { ArtifactsModal } from "@/components/classroom/notes-flashcards-modal";
import { DoubtPanel } from "@/components/classroom/doubt-panel";
import { LiveAutoNotes, AutoNoteEntry } from "@/components/classroom/live-auto-notes";
import { formatSecondsToTime } from "@/lib/utils";

export default function ClassroomPage() {
  const params = useParams();
  const lessonId = (params?.lessonId as string) || "lesson_physics_101";

  const db = DatabaseStore.getInstance();
  const [lessonState, setLessonState] = useState<LessonState>(() =>
    db.getOrCreateLessonState(lessonId)
  );

  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [currentEvaluation, setCurrentEvaluation] = useState<EvaluationResult | undefined>(undefined);
  const [activeAdaptation, setActiveAdaptation] = useState<TeacherAdaptationEvent | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(1);

  // Modals
  const [isInterruptionOpen, setIsInterruptionOpen] = useState(false);
  const [isDoubtOpen, setIsDoubtOpen] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [artifactModalType, setArtifactModalType] = useState<"notes" | "flashcards" | "homework" | null>(null);

  // Live Auto Notes Generator State
  const [autoNotes, setAutoNotes] = useState<AutoNoteEntry[]>([
    {
      id: "note-init-1",
      timestamp: "00:01",
      type: "CONCEPT",
      title: "Core Foundation: Force & Acceleration",
      detail: "Acceleration of an object is directly proportional to net external force applied and inversely proportional to its mass.",
      formulaSnippet: "F = m · a  (Vector: \\vec{F}_{net} = m \\cdot \\vec{a})",
      sourceTag: "Physics Chapter 4, Sec 4.2",
    },
  ]);

  const currentStep = lessonState.lessonPlan.steps[currentStepIdx] || lessonState.lessonPlan.steps[0];

  // Derive script according to current language
  const getSpokenScript = () => {
    if (lessonState.currentLanguage === "Hindi" && currentStep.spokenScriptHindi) {
      return currentStep.spokenScriptHindi;
    }
    if (lessonState.currentLanguage === "Hinglish" && currentStep.spokenScriptHinglish) {
      return currentStep.spokenScriptHinglish;
    }
    if (lessonState.currentLanguage === "Tamil" && currentStep.spokenScriptTamil) {
      return currentStep.spokenScriptTamil;
    }
    return currentStep.spokenScript;
  };

  // Web Speech API synthesis
  const speakText = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    if (lessonState.currentLanguage === "Hindi" || lessonState.currentLanguage === "Hinglish") {
      utterance.lang = "hi-IN";
    } else {
      utterance.lang = "en-US";
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleToggleSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      speakText(getSpokenScript());
    }
  };

  // Play audio whenever step changes
  useEffect(() => {
    speakText(getSpokenScript());
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentStepIdx, lessonState.currentLanguage]);

  // Handle Question Submission
  const handleAnswerSubmit = async (answer: string, selectedOptionId?: string) => {
    setIsEvaluating(true);

    try {
      const res = await fetch("/api/teacher/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId,
          questionId: currentStep.question?.id,
          studentAnswer: answer,
          selectedOptionId,
          timeSpentSeconds: 12,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setCurrentEvaluation(data.evaluation);
        setLessonState(data.lessonState);
        if (data.latestAdaptation) {
          setActiveAdaptation(data.latestAdaptation);
        }

        // Auto-Notes: If misconception diagnosed, record resolution
        if (data.evaluation?.detectedMisconception) {
          const trap = data.evaluation.detectedMisconception;
          setAutoNotes((prev) => [
            ...prev,
            {
              id: `note-misc-${Date.now()}`,
              timestamp: new Date().toLocaleTimeString([], { minute: "2-digit", second: "2-digit" }),
              type: "MISCONCEPTION_RESOLVED",
              title: `Misconception Resolved: ${trap.cognitiveTrapName}`,
              detail: `Flawed reasoning: ${trap.whyWrong}. Teacher Remedy: ${trap.remedialStrategy}`,
              sourceTag: "Diagnostic Checkpoint Evaluation",
            },
          ]);
        }

        // Voice speech feedback
        speakText(`${data.evaluation.feedback} ${data.evaluation.encouragement}`);
      }
    } catch {
      // Fallback
    } finally {
      setIsEvaluating(false);
    }
  };

  // Step advancement
  const handleNextStep = () => {
    setCurrentEvaluation(undefined);
    if (currentStepIdx < lessonState.lessonPlan.steps.length - 1) {
      const nextIdx = currentStepIdx + 1;
      setCurrentStepIdx(nextIdx);
      const nextStep = lessonState.lessonPlan.steps[nextIdx];
      setLessonState((prev) => ({
        ...prev,
        currentStepIndex: nextIdx,
        currentConceptId: nextStep.conceptId,
        brainState: nextStep.question ? "CHECK" : "TEACH",
      }));

      // Auto-Notes: Record newly introduced concept / formula
      if (nextStep) {
        setAutoNotes((prev) => [
          ...prev,
          {
            id: `note-step-${nextIdx}-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString([], { minute: "2-digit", second: "2-digit" }),
            type: nextStep.visual?.type === "EQUATION" ? "FORMULA" : "CONCEPT",
            title: nextStep.title,
            detail: nextStep.sourceCitation?.snippet || nextStep.spokenScript.slice(0, 160) + "...",
            formulaSnippet: (nextStep.visual?.data as any)?.formula,
            sourceTag: nextStep.sourceCitation
              ? `${nextStep.sourceCitation.docTitle}, p.${nextStep.sourceCitation.page}`
              : undefined,
          },
        ]);
      }
    } else {
      // Complete lesson -> Assessment modal
      setLessonState((prev) => ({ ...prev, brainState: "MASTER" }));
      setIsAssessmentOpen(true);
    }
  };

  // Callback to append answered doubt directly to live notes
  const handleAddDoubtToAutoNotes = (doubt: string, answer: string, source: string) => {
    setAutoNotes((prev) => [
      ...prev,
      {
        id: `note-doubt-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { minute: "2-digit", second: "2-digit" }),
        type: "DOUBT_ANSWERED",
        title: `Doubt: "${doubt}"`,
        detail: answer,
        sourceTag: source,
      },
    ]);
  };

  // Language switch
  const handleLanguageChange = async (lang: SupportedLanguage) => {
    try {
      const res = await fetch("/api/teacher/language", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, language: lang }),
      });
      const data = await res.json();
      if (data.success) {
        setLessonState(data.lessonState);
      }
    } catch {}
  };

  // Real-time Interruption
  const handleInterrupt = async (query: string): Promise<string> => {
    try {
      const res = await fetch("/api/teacher/interrupt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, query }),
      });
      const data = await res.json();
      if (data.success) {
        setLessonState(data.lessonState);
        speakText(data.teacherReply);
        return data.teacherReply;
      }
    } catch {}
    return "Great question. All variables in physics balance each other mathematically. Let's resume our lesson checkpoint.";
  };

  const handleResumeFromInterruption = async () => {
    try {
      const res = await fetch("/api/teacher/interrupt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, resume: true }),
      });
      const data = await res.json();
      if (data.success) {
        setLessonState(data.lessonState);
        speakText(getSpokenScript());
      }
    } catch {}
  };

  // Calculate overall concept mastery
  const activeConcept = lessonState.knowledgeGraph.nodes.find(
    (n) => n.id === lessonState.currentConceptId
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-grid-pattern pb-12">
      {/* 1. TOP CLASSROOM STATUS BAR — Clean, Uncluttered & Focused */}
      <div className="border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-xl sticky top-16 z-30 shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 text-xs">
          {/* Left: Step Indicator & Title */}
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-sky-100 px-3 py-1 font-semibold text-sky-800 border border-sky-200">
              Step {currentStepIdx + 1} of {lessonState.lessonPlan.steps.length}
            </span>
            <div className="truncate">
              <h2 className="font-bold text-slate-900 text-sm truncate max-w-[240px] sm:max-w-md">
                {currentStep.title}
              </h2>
              {currentStep.sourceCitation && (
                <p className="text-[10px] text-slate-500 truncate hidden sm:block">
                  Source: {currentStep.sourceCitation.docTitle} (p. {currentStep.sourceCitation.page})
                </p>
              )}
            </div>
          </div>

          {/* Right: Essential Student Actions */}
          <div className="flex items-center gap-2.5">
            {/* Language switch */}
            <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200">
              <Languages className="h-3.5 w-3.5 text-slate-500" />
              <select
                value={lessonState.currentLanguage}
                onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
                className="bg-transparent text-xs text-slate-800 font-semibold focus:outline-none cursor-pointer"
              >
                {(
                  ["English", "Hindi", "Hinglish", "Tamil", "Telugu", "Bengali", "Marathi"] as SupportedLanguage[]
                ).map((l) => (
                  <option key={l} value={l} className="bg-white text-slate-900">
                    {l}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Remaining */}
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 font-mono font-medium">
              <Clock className="h-3.5 w-3.5 text-amber-600" />
              <span>{formatSecondsToTime(lessonState.timeRemainingSeconds)}</span>
            </div>

            {/* Real-time Doubt Assistant — Primary Friendly Action */}
            <button
              onClick={() => setIsDoubtOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-sky-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-sky-700 transition-all shadow-xs"
            >
              <HelpCircle className="h-3.5 w-3.5" />
              <span>Ask Doubt</span>
            </button>

            {/* Real-time interruption trigger */}
            <button
              onClick={() => setIsInterruptionOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-2xs"
            >
              <MessageSquare className="h-3.5 w-3.5 text-amber-600" />
              <span className="hidden sm:inline">Interrupt</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN CLASSROOM WORKSPACE */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8 space-y-6">
        {/* Real-Time Adaptation Banner */}
        {activeAdaptation && <AdaptationBanner adaptation={activeAdaptation} />}

        {/* Dual Split: AI Teacher (Left) vs Visual Intelligence Stage (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: AI TEACHER AVATAR */}
          <div className="lg:col-span-5 space-y-4">
            <TeacherAvatar
              spokenText={getSpokenScript()}
              isSpeaking={isSpeaking}
              brainState={lessonState.brainState}
              currentLanguage={lessonState.currentLanguage}
              onToggleSpeech={handleToggleSpeech}
              onReplay={() => speakText(getSpokenScript())}
              speechRate={speechRate}
              onRateChange={setSpeechRate}
            />

            {/* Clean Student Helper Card (Replaces noisy telemetry) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-200 shrink-0">
                  <HelpCircle className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Have a doubt?</h4>
                  <p className="text-[11px] text-slate-500">
                    Voice or type any question. We check what was taught first!
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDoubtOpen(true)}
                className="shrink-0 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-sky-800 hover:bg-sky-50 border border-slate-200 transition-all"
              >
                Ask Now
              </button>
            </div>
          </div>

          {/* RIGHT: VISUAL INTELLIGENCE STAGE & INTERACTIVE QUESTIONS */}
          <div className="lg:col-span-7 space-y-4">
            {/* Visual Stage */}
            <VisualStage visual={currentStep.visual} />

            {/* Diagnostic Question or Step Content */}
            {currentStep.question ? (
              <InteractiveQuestion
                question={currentStep.question}
                onSubmitAnswer={handleAnswerSubmit}
                evaluation={currentEvaluation}
                isEvaluating={isEvaluating}
                onNextStep={handleNextStep}
              />
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Explanation Stage</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Observe the interactive visual and listen to the concept explanation.
                  </p>
                </div>
                <button
                  onClick={handleNextStep}
                  className="flex items-center gap-1.5 rounded-xl bg-sky-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-sky-700 shadow-sm transition-all shrink-0 ml-4"
                >
                  <span>Continue</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 3. SLEEK LESSON TIMELINE */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Lesson Progress</span>
            <span className="font-semibold text-slate-700 text-xs">
              Step {currentStepIdx + 1} of {lessonState.lessonPlan.steps.length}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {lessonState.lessonPlan.steps.map((st, i) => {
              const isCurrent = i === currentStepIdx;
              const isPast = i < currentStepIdx;
              return (
                <button
                  key={st.id}
                  onClick={() => setCurrentStepIdx(i)}
                  className={`rounded-xl p-2.5 text-left border transition-all ${
                    isCurrent
                      ? "border-sky-500 bg-sky-50 text-sky-900 font-bold shadow-xs ring-1 ring-sky-500"
                      : isPast
                      ? "border-emerald-200 bg-emerald-50/70 text-emerald-900 font-medium"
                      : "border-slate-200 bg-slate-50/50 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <p className="text-[10px] text-slate-400 font-mono font-semibold">0{i + 1}</p>
                  <p className="text-xs truncate font-semibold mt-0.5">{st.title}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. LIVE REAL-TIME AUTOMATIC NOTES GENERATOR */}
        <LiveAutoNotes entries={autoNotes} lessonTitle={lessonState.title} />

        {/* 5. JUDGE INSPECTOR PANEL (Requirement #39 & #40) */}
        <JudgeInspector lessonState={lessonState} />
      </div>

      {/* MODALS */}
      <InterruptionModal
        isOpen={isInterruptionOpen}
        onClose={() => setIsInterruptionOpen(false)}
        onInterrupt={handleInterrupt}
        onResumeLesson={handleResumeFromInterruption}
        activeConceptTitle={currentStep.title}
      />

      <DoubtPanel
        isOpen={isDoubtOpen}
        onClose={() => setIsDoubtOpen(false)}
        lessonId={lessonId}
        onSpeak={speakText}
        onAddDoubtToAutoNotes={handleAddDoubtToAutoNotes}
      />

      <FinalAssessmentModal
        isOpen={isAssessmentOpen}
        score={82}
        onOpenNotes={() => setArtifactModalType("notes")}
        onOpenFlashcards={() => setArtifactModalType("flashcards")}
        onOpenHomework={() => setArtifactModalType("homework")}
      />

      <ArtifactsModal
        type={artifactModalType}
        onClose={() => setArtifactModalType(null)}
      />
    </div>
  );
}
