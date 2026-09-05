"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  Sparkles,
  BookOpen,
  Clock,
  Globe,
  Sliders,
  Check,
  ChevronRight,
  Loader2,
  Trash2,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";
import {
  LearnerLevel,
  QualificationLevel,
  LearningGoal,
  SupportedLanguage,
  TeachingStyle,
  LessonDuration,
  LessonDepth,
} from "@/types/teaching";

export default function CreateLessonPage() {
  const router = useRouter();

  // Mode: Topic vs Material
  const [activeTab, setActiveTab] = useState<"topic" | "material">("topic");

  // Topic input (defaults to empty so user enters any topic)
  const [topicInput, setTopicInput] = useState("");

  // Material Upload State
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; type: string; pages: number } | null>(null);
  const [pastedText, setPastedText] = useState("");
  const [usePastedText, setUsePastedText] = useState(false);

  // Learner Profile Configuration with Qualification Level
  const [qualificationLevel, setQualificationLevel] = useState<QualificationLevel>(
    "Undergraduate (College / B.Tech / B.Sc)"
  );
  const [level, setLevel] = useState<LearnerLevel>("Beginner");
  const [goal, setGoal] = useState<LearningGoal>("Understand");
  const [language, setLanguage] = useState<SupportedLanguage>("English");
  const [style, setStyle] = useState<TeachingStyle>("Visual");
  const [time, setTime] = useState<LessonDuration>("20m");
  const [depth, setDepth] = useState<LessonDepth>("Balanced");

  // Optional in-browser Gemini API Key configuration
  const [apiKey, setApiKey] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("gemini_api_key") || "";
      if (saved) setApiKey(saved);
    }
  }, []);

  const handleKeySave = (val: string) => {
    setApiKey(val);
    if (typeof window !== "undefined") {
      localStorage.setItem("gemini_api_key", val.trim());
    }
  };

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const processingMessages = [
    "Reading material and extracting text tokens",
    `Calibrating pedagogy for Qualification: ${qualificationLevel}`,
    "Extracting foundational scientific concepts & formulas",
    "Identifying prerequisite concepts and dependency graph",
    "Building interactive knowledge graph topology",
    "Planning pedagogical milestones and allocating time",
    "Selecting visual representations and equations",
    "Preparing diagnostic questions & cognitive traps",
    "Calibrating final mastery assessment rubric",
    "Teacher ready. Entering classroom...",
  ];

  const qualificationOptions: QualificationLevel[] = [
    "Middle School (Grade 6 - 8)",
    "High School (Grade 9 - 10)",
    "Senior Secondary (Grade 11 - 12)",
    "Undergraduate (College / B.Tech / B.Sc)",
    "Postgraduate / Master's / PhD",
    "Working Professional / Self-Taught",
  ];

  const handleStartProcessing = async () => {
    setIsProcessing(true);
    setCurrentStepIndex(0);

    for (let i = 0; i < processingMessages.length; i++) {
      setCurrentStepIndex(i);
      await new Promise((r) => setTimeout(r, 450));
    }

    const chosenTopic = activeTab === "topic"
      ? (topicInput.trim() || "Artificial Intelligence & Neural Networks")
      : (uploadedFile?.name || "Uploaded Course Document");

    // Call create API with dynamic topic and API key
    let targetLessonId = `lesson_${Date.now()}`;
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (apiKey.trim()) {
        headers["x-gemini-key"] = apiKey.trim();
      }

      const res = await fetch("/api/lesson/create", {
        method: "POST",
        headers,
        body: JSON.stringify({
          topic: chosenTopic,
          documentId: activeTab === "material" && uploadedFile ? "doc_physics_ch4" : undefined,
          qualificationLevel,
          level,
          goal,
          language,
          preferredStyle: style,
          availableTime: time,
          depth,
          apiKey: apiKey.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (data.success && data.lessonId) {
        targetLessonId = data.lessonId;
        if (data.lessonState && typeof window !== "undefined") {
          sessionStorage.setItem(`lesson_${targetLessonId}`, JSON.stringify(data.lessonState));
        }
      }
    } catch (err) {
      console.error("Failed to create dynamic lesson:", err);
    }

    router.push(`/classroom/${targetLessonId}`);
  };


  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-grid-pattern py-12 px-4 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-sky-200/50 blur-[120px]" />

      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-700">
            Intelligent Curriculum Generator
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">Create Your Lesson</h1>
          <p className="text-sm text-slate-600 mt-2">
            Configure your topic, material, qualification level, and learning style. Your AI Teacher tailors the class accordingly.
          </p>
        </div>

        {/* PROCESSING MODAL OVERLAY */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4"
            >
              <div className="w-full max-w-md rounded-3xl border border-sky-300 bg-white p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 border border-sky-200">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">AI Analysis & Lesson Planning</h3>
                    <p className="text-xs text-slate-500 font-mono">Calibrated to {qualificationLevel}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {processingMessages.map((msg, idx) => {
                    const isDone = idx < currentStepIndex;
                    const isCurrent = idx === currentStepIndex;
                    return (
                      <div
                        key={idx}
                        className={`flex items-center gap-2.5 text-xs transition-colors ${
                          isCurrent
                            ? "text-sky-700 font-bold"
                            : isDone
                            ? "text-slate-400"
                            : "text-slate-300"
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        ) : isCurrent ? (
                          <span className="h-3.5 w-3.5 rounded-full border-2 border-sky-600 border-t-transparent animate-spin shrink-0" />
                        ) : (
                          <span className="h-3.5 w-3.5 rounded-full bg-slate-200 shrink-0" />
                        )}
                        <span className="truncate">{msg}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-300"
                    style={{ width: `${((currentStepIndex + 1) / processingMessages.length) * 100}%` }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN CARD */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl space-y-6">
          {/* GEMINI API KEY STATUS BAR */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${apiKey ? "bg-emerald-500 animate-pulse" : "bg-sky-500"}`} />
                <span className="font-bold text-slate-800">Single Gemini API Key Engine</span>
                <span className="text-slate-500 text-[11px] hidden sm:inline">
                  {apiKey ? `(Key: ${apiKey.slice(0, 6)}...${apiKey.slice(-4)})` : "(Using .env or intelligent generator)"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowKeyInput(!showKeyInput)}
                className="text-sky-600 font-bold hover:underline text-[11px]"
              >
                {showKeyInput ? "Close" : apiKey ? "Change Key" : "+ Enter Gemini API Key"}
              </button>
            </div>

            {showKeyInput && (
              <div className="pt-2 border-t border-slate-200 space-y-2">
                <p className="text-[11px] text-slate-600">
                  Paste your Google Gemini API key to generate live custom lectures on <strong>any topic</strong>. Saved locally in your browser.
                </p>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => handleKeySave(e.target.value)}
                    placeholder="AIzaSy..."
                    className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKeyInput(false)}
                    className="rounded-xl bg-sky-600 px-4 py-1.5 text-white font-bold text-xs hover:bg-sky-700 transition-colors"
                  >
                    Save Key
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* TAB SELECTOR: OPTION A vs OPTION B */}
          <div className="flex rounded-2xl bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => setActiveTab("topic")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
                activeTab === "topic"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-sky-600" />
              <span>Option A: Teach me a topic</span>
            </button>
            <button
              onClick={() => setActiveTab("material")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
                activeTab === "material"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileText className="h-3.5 w-3.5 text-emerald-600" />
              <span>Option B: Teach me from my material</span>
            </button>
          </div>

          {/* TAB CONTENT */}
          {activeTab === "topic" ? (
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-800">What do you want to learn? (Any topic or concept)</label>
              <input
                type="text"
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                placeholder="e.g. Photosynthesis, Binary Search Trees, Machine Learning, World War II, Indian Constitution..."
                className="w-full rounded-2xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all font-sans"
              />
              <div className="flex flex-wrap gap-1.5 text-xs text-slate-600 pt-1">
                <span className="font-semibold text-slate-500 mr-1 text-[11px] self-center">Try asking:</span>
                {[
                  "Photosynthesis & Light Reactions",
                  "Binary Search Trees",
                  "Machine Learning Gradient Descent",
                  "Calculus Derivatives & Limits",
                  "Newton's Laws & Circuits",
                  "French Revolution",
                ].map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => setTopicInput(prompt)}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300 transition-all shadow-2xs"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">Upload Learning Material</label>
                <button
                  onClick={() => setUsePastedText(!usePastedText)}
                  className="text-xs text-sky-700 font-semibold hover:underline"
                >
                  {usePastedText ? "Upload file instead" : "Paste text instead"}
                </button>
              </div>

              {!usePastedText ? (
                <>
                  {/* File Dropzone */}
                  <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center hover:border-sky-500 transition-colors cursor-pointer">
                    <Upload className="mx-auto h-8 w-8 text-slate-400 mb-2" />
                    <p className="text-xs text-slate-800 font-semibold">Drag & drop your educational document</p>
                    <p className="text-[11px] text-slate-500 mt-1">Supports PDF, DOC, DOCX, PPT, PPTX, TXT</p>
                  </div>

                  {/* Uploaded File Card */}
                  {uploadedFile && (
                    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-xs shadow-2xs">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-emerald-50 p-2 text-emerald-700 border border-emerald-200">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{uploadedFile.name}</p>
                          <p className="text-[10px] text-slate-500">
                            {uploadedFile.type} • {uploadedFile.size} • {uploadedFile.pages} pages •{" "}
                            <span className="text-emerald-700 font-semibold">Indexed for Grounded RAG</span>
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setUploadedFile(null)}
                        className="rounded-lg p-1.5 text-slate-400 hover:text-rose-600 hover:bg-white transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <textarea
                  rows={4}
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder="Paste textbook excerpt, lecture notes, or research snippet..."
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50/50 p-4 text-xs text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none"
                />
              )}
            </div>
          )}

          {/* LEARNER CONFIGURATION (CONFIGURE YOUR TEACHER) */}
          <div className="border-t border-slate-200 pt-6 space-y-6">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-sky-600" />
              <h2 className="text-sm font-bold text-slate-900">Configure Your Teacher</h2>
            </div>

            {/* 1. QUALIFICATION LEVEL (NEW EXPLICIT REQUIREMENT) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-sky-600" />
                  <span>Education / Qualification Level</span>
                </label>
                <span className="text-[10px] font-mono text-slate-500">Calibrates vocabulary & rigor</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {qualificationOptions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQualificationLevel(q)}
                    className={`rounded-xl py-2.5 px-3 text-xs font-medium border text-left transition-all ${
                      qualificationLevel === q
                        ? "border-sky-500 bg-sky-50/80 text-sky-900 shadow-xs font-bold ring-1 ring-sky-500"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <span className="block truncate">{q}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Proficiency Level */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">Current Proficiency</label>
              <div className="grid grid-cols-3 gap-2">
                {(["Beginner", "Intermediate", "Advanced"] as LearnerLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setLevel(lvl)}
                    className={`rounded-xl py-2 text-xs font-medium border transition-all ${
                      level === lvl
                        ? "border-sky-500 bg-sky-50/80 text-sky-900 shadow-xs font-bold"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Goal */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">Learning Objective</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(
                  [
                    "Understand",
                    "Exam Preparation",
                    "Interview Preparation",
                    "Revision",
                    "Learn From Scratch",
                    "Practical Application",
                  ] as LearningGoal[]
                ).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGoal(g)}
                    className={`rounded-xl py-2 px-3 text-xs font-medium border text-left truncate transition-all ${
                      goal === g
                        ? "border-sky-500 bg-sky-50/80 text-sky-900 shadow-xs font-bold"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Language */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">Teaching Language</label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {(
                  [
                    "English",
                    "Hindi",
                    "Hinglish",
                    "Tamil",
                    "Telugu",
                    "Bengali",
                    "Marathi",
                    "Kannada",
                    "Malayalam",
                  ] as SupportedLanguage[]
                ).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={`rounded-xl py-2 text-xs font-medium border transition-all ${
                      language === lang
                        ? "border-sky-500 bg-sky-50/80 text-sky-900 shadow-xs font-bold"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Teaching Style */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">Teaching Style</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(["Visual", "Practical", "Socratic", "Simple", "Technical", "Example-driven"] as TeachingStyle[]).map(
                  (st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStyle(st)}
                      className={`rounded-xl py-2 px-3 text-xs font-medium border text-left transition-all ${
                        style === st
                          ? "border-sky-500 bg-sky-50/80 text-sky-900 shadow-xs font-bold"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      {st}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* 6. Available Time & Depth */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Available Time</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["5m", "10m", "20m", "30m", "60m", "7d"] as LessonDuration[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className={`rounded-xl py-2 text-xs font-medium border transition-all ${
                        time === t
                          ? "border-sky-500 bg-sky-50/80 text-sky-900 shadow-xs font-bold"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Lesson Depth</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Quick", "Balanced", "Deep"] as LessonDepth[]).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDepth(d)}
                      className={`rounded-xl py-2 text-xs font-medium border transition-all ${
                        depth === d
                          ? "border-sky-500 bg-sky-50/80 text-sky-900 shadow-xs font-bold"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PRIMARY CTA */}
          <button
            onClick={handleStartProcessing}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 py-4 text-sm font-bold text-white shadow-xl shadow-sky-500/20 hover:brightness-105 transition-all hover:scale-[1.01]"
          >
            <span>Build My Lesson ⚡</span>
          </button>
        </div>
      </div>
    </div>
  );
}
