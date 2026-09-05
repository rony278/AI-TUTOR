"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  FileText,
  Brain,
  AlertTriangle,
  CheckCircle2,
  Languages,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Loader2,
  Zap,
  Search,
} from "lucide-react";


export default function JudgeDemoPage() {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeLessonId, setActiveLessonId] = useState("lesson_physics_101");
  const [customTopic, setCustomTopic] = useState("");

  const [topicData, setTopicData] = useState({
    title: "Newton's Second Law & Ohm's Electrical Dynamics",
    subject: "Physics",
    qualification: "Undergraduate (College)",
    formula: "F = m · a",
    concept1: "Voltage (12V)",
    concept2: "Current (I)",
    concept3: "Resistance & Ohm's Law",
    teacherQuote: "When net force acts on a mass, it accelerates proportionally in that direction.",
    question: "If net force acting on an object doubles while mass remains constant, what happens to acceleration?",
    wrongOption: "Intentional Student Trap: Student selects 'Acceleration stays constant while velocity doubles'",
    correctOption: "Acceleration doubles (2x)",
    misconception: "Kinematics Conflation: Student confused velocity with acceleration.",
    analogyTitle: "Hydraulic Water-Pipe Analogy",
    analogyQuote: "Squeezing the pipe (higher resistance) constricts water flow (current). When resistance goes up, current must drop!",
    hindiScript: "Bilkul! Current aur resistance inversely proportional hote hain. Jaise pipe ko squeeze karne par paani ka flow kam ho jata hai, waise hi resistance badhne par current kam ho jata hai.",
    nextTopic: "Series Circuits (5 min)",
  });

  const presetTopics = [
    {
      name: "Newton's Laws & Circuits",
      title: "Newton's Second Law & Ohm's Electrical Dynamics",
      subject: "Physics",
      formula: "F = m · a",
      concept1: "Voltage (12V)",
      concept2: "Current (I)",
      concept3: "Resistance & Ohm's Law",
      teacherQuote: "When net force acts on a mass, it accelerates proportionally in that direction.",
      question: "If net force acting on an object doubles while mass remains constant, what happens to acceleration?",
      wrongOption: "Trap: 'Acceleration stays constant while velocity doubles'",
      correctOption: "Acceleration doubles (2x)",
      misconception: "Kinematics Conflation: Student confused velocity with instantaneous acceleration.",
      analogyTitle: "Hydraulic Water-Pipe Analogy",
      analogyQuote: "Squeezing the pipe (higher resistance) constricts water flow (current). Resistance goes up, current drops!",
      hindiScript: "Bilkul! Current aur resistance inversely proportional hote hain. Jaise pipe ko squeeze karne par paani ka flow kam ho jata hai, waise hi resistance badhne par current kam ho jata hai.",
      nextTopic: "Series Circuits (5 min)",
    },
    {
      name: "React Component Lifecycle",
      title: "React Component Lifecycle & State Dynamics",
      subject: "Computer Science",
      formula: "UI = f(state, props)",
      concept1: "Initial Mount",
      concept2: "State Re-render",
      concept3: "Cleanup / Unmount",
      teacherQuote: "Every React component is a pure function of its state and props. When state mutates, a re-render is scheduled.",
      question: "If you mutate a state variable directly without calling the setter function, what happens?",
      wrongOption: "Trap: 'The component re-renders immediately with the new value'",
      correctOption: "React misses the mutation because direct mutation bypasses scheduled re-renders",
      misconception: "Reference Invalidation Fallacy: Assuming in-place object mutation triggers reactive re-render cycles.",
      analogyTitle: "Restaurant Kitchen Order Slip Analogy",
      analogyQuote: "Writing your own note without handing the ticket to the head chef means the kitchen never cooks your new order!",
      hindiScript: "Bilkul! React mein state ko directly mutate karne par React ko pata hi nahi chalta ki re-render karna hai. Hamesha setState setter use karein.",
      nextTopic: "useEffect Dependency Arrays (5 min)",
    },
    {
      name: "Photosynthesis & Energy",
      title: "Photosynthesis: Light Reactions & Calvin Cycle",
      subject: "Biology",
      formula: "6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂",
      concept1: "Photon Capture",
      concept2: "Electron Transport",
      concept3: "Glucose Synthesis",
      teacherQuote: "Chloroplasts capture photons to split water molecules, generating ATP and NADPH to fuel carbon fixation.",
      question: "What is the primary source of the oxygen gas released during photosynthesis?",
      wrongOption: "Trap: 'Oxygen comes from the broken down carbon dioxide (CO₂) molecule'",
      correctOption: "Oxygen originates exclusively from the photolysis (splitting) of water (H₂O)",
      misconception: "Carbon Fixation Source Fallacy: Confusing oxygen byproduct with oxygen atoms in CO₂ intake.",
      analogyTitle: "Solar Battery & Sugar Bakery Analogy",
      analogyQuote: "Light reactions act like solar solar panels charging battery packs, which then power the dark kitchen bakery!",
      hindiScript: "Bilkul! Paudhe jo oxygen release karte hain, wo carbon dioxide se nahi balki paani (H2O) ke split hone se aati hai.",
      nextTopic: "Cellular Respiration ATP Coupling (5 min)",
    },
    {
      name: "Machine Learning Gradient Descent",
      title: "Gradient Descent & Loss Optimization",
      subject: "Artificial Intelligence",
      formula: "θ := θ - α · ∇J(θ)",
      concept1: "Loss Function J(θ)",
      concept2: "Learning Rate α",
      concept3: "Gradient Vector ∇J",
      teacherQuote: "Gradient descent computes the steepest slope of the error surface and takes small steps downhill toward minimum error.",
      question: "If the learning rate (alpha) is set excessively high, what is the most likely outcome?",
      wrongOption: "Trap: 'The model reaches the optimal minimum in fewer steps'",
      correctOption: "The weights will overshoot the valley and diverge uncontrollably",
      misconception: "Monotonic Speedup Fallacy: Believing larger step sizes guarantee strictly faster convergence.",
      analogyTitle: "Foggy Mountain Hiker Analogy",
      analogyQuote: "Taking giant leaps with your eyes closed down a foggy valley causes you to hurdle right over the bottom and crash into the opposite cliff!",
      hindiScript: "Bilkul! Agar learning rate bohot bada ho, toh loss decrease hone ke bajaye diverge ho jayega aur model crash karega.",
      nextTopic: "Stochastic & Adam Optimizers (5 min)",
    },
  ];

  // Handle topic switch or generation
  const handleSelectTopic = async (topicObj: any) => {
    setIsGenerating(true);
    try {
      const storedKey = typeof window !== "undefined" ? localStorage.getItem("gemini_api_key") || "" : "";
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (storedKey.trim()) headers["x-gemini-key"] = storedKey.trim();

      const res = await fetch("/api/lesson/create", {
        method: "POST",
        headers,
        body: JSON.stringify({
          topic: topicObj.title || topicObj.name,
          qualificationLevel: "Undergraduate (College / B.Tech / B.Sc)",
          level: "Beginner",
          language: "English",
          availableTime: "20m",
          apiKey: storedKey || undefined,
        }),
      });
      const data = await res.json();
      if (data.success && data.lessonId) {
        setActiveLessonId(data.lessonId);
        if (data.lessonState && typeof window !== "undefined") {
          sessionStorage.setItem(`lesson_${data.lessonId}`, JSON.stringify(data.lessonState));
        }
      }
      setTopicData(topicObj);
      setCurrentSceneIdx(0);
    } catch (err) {
      console.warn("Topic demo generation failed:", err);
      setTopicData(topicObj);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCustomTopicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopic.trim()) return;

    setIsGenerating(true);
    try {
      const storedKey = typeof window !== "undefined" ? localStorage.getItem("gemini_api_key") || "" : "";
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (storedKey.trim()) headers["x-gemini-key"] = storedKey.trim();

      const res = await fetch("/api/lesson/create", {
        method: "POST",
        headers,
        body: JSON.stringify({
          topic: customTopic.trim(),
          qualificationLevel: "Undergraduate (College / B.Tech / B.Sc)",
          level: "Beginner",
          language: "English",
          availableTime: "20m",
          apiKey: storedKey || undefined,
        }),
      });
      const data = await res.json();
      const newLessonId = data.lessonId || `lesson_${Date.now()}`;
      setActiveLessonId(newLessonId);
      if (data.lessonState && typeof window !== "undefined") {
        sessionStorage.setItem(`lesson_${newLessonId}`, JSON.stringify(data.lessonState));
      }

      const plan = data.lessonPlan;
      const step1 = plan?.steps?.[0];
      const step4 = plan?.steps?.[3];
      const step5 = plan?.steps?.[4];

      setTopicData({
        title: plan?.title || customTopic.trim(),
        subject: plan?.subject || "General Science",
        qualification: "Undergraduate (College)",
        formula: (step1?.visual?.data as any)?.formula || (step1?.visual?.title) || "Key Axiom Formula",
        concept1: data.knowledgeGraph?.nodes?.[0]?.title || "Fundamental Principles",
        concept2: data.knowledgeGraph?.nodes?.[1]?.title || "Core Mechanics",
        concept3: data.knowledgeGraph?.nodes?.[2]?.title || "Practical Application",
        teacherQuote: step1?.spokenScript?.slice(0, 140) || `Mastering ${customTopic} through closed-loop adaptive intelligence.`,
        question: step4?.question?.prompt || `In ${customTopic}, how do variables balance when input changes?`,
        wrongOption: `Trap: ${step4?.question?.options?.find((o: any) => !o.isCorrect)?.misconceptionTrigger || "Inverted relationship"}`,
        correctOption: step4?.question?.options?.find((o: any) => o.isCorrect)?.text || "Directly proportional throughput",
        misconception: step4?.question?.options?.find((o: any) => !o.isCorrect)?.misconceptionTrigger || "Conceptual Inversion Trap",
        analogyTitle: step5?.visual?.title || "Intuitive Real-World Analogy",
        analogyQuote: step5?.spokenScript?.slice(0, 140) || "Using concrete mental models helps demystify abstract principles!",
        hindiScript: step1?.spokenScriptHinglish || step1?.spokenScriptHindi || "Bilkul! Hum is topic ko step-by-step Hindi aur Hinglish mein samajh sakte hain bina kisi confusion ke.",
        nextTopic: `${customTopic} Advanced Module (5 min)`,
      });
      setCurrentSceneIdx(0);
    } catch (err) {
      console.warn("Failed to generate custom demo:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const demoScenes = [
    {
      id: 1,
      title: "Scene 1: Welcome & Pedagogical Objective",
      subtitle: `Target Topic: ${topicData.title}`,
      badge: "Vision",
      description: "Demonstrating that AI Teacher is NOT a chatbot, but an active, closed-loop educational intelligence that learns how you learn.",
      visualContent: (
        <div className="rounded-2xl border border-sky-300 bg-sky-50/70 p-6 text-center space-y-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-md shadow-sky-500/30">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">{topicData.title}</h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto font-medium">
            "The AI teacher that learns how you learn."
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs font-mono font-bold text-slate-500">
            <span>UNDERSTAND</span> → <span>PLAN</span> → <span>EXPLAIN</span> → <span>DEMONSTRATE</span> →{" "}
            <span>QUESTION</span> → <span>ADAPT</span>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Scene 2: Material Ingestion & Qualification Setup",
      subtitle: `Calibrating Pedagogy for ${topicData.subject}`,
      badge: "RAG & Profile",
      description: `Learner selects ${topicData.qualification} qualification, Beginner proficiency, Hindi/Hinglish language, and Visual style.`,
      visualContent: (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-emerald-600" />
              <span className="font-bold text-slate-900">{topicData.title}.pdf</span>
            </div>
            <span className="text-emerald-700 font-mono font-bold">Semantic Vectors Indexed</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-slate-400 text-[10px] block font-mono font-bold">Qualification</span>
              <span className="text-slate-900 font-bold">{topicData.qualification}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-slate-400 text-[10px] block font-mono font-bold">Language</span>
              <span className="text-sky-700 font-bold">Hinglish / Hindi</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-slate-400 text-[10px] block font-mono font-bold">Time Budget</span>
              <span className="text-amber-800 font-bold">20 Minutes</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-slate-400 text-[10px] block font-mono font-bold">Style</span>
              <span className="text-purple-700 font-bold">Visual & Analogical</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Scene 3: Deep AI Processing & Knowledge Graph",
      subtitle: "Structuring prerequisites, concepts, and time boundaries",
      badge: "Planning",
      description: "AI Teaching Brain builds an interactive concept graph and budgets milestones.",
      visualContent: (
        <div className="rounded-2xl border border-purple-200 bg-purple-50/70 p-6 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-purple-800 font-bold">
            <Brain className="h-4 w-4 text-purple-600" />
            <span>Topological Concept Dependency Graph Generated</span>
          </div>
          <div className="flex items-center justify-around py-3 font-mono font-bold">
            <div className="p-2 rounded-xl bg-white border border-emerald-300 text-emerald-800 shadow-2xs truncate max-w-[140px]">
              {topicData.concept1}
            </div>
            <span className="text-slate-400">→</span>
            <div className="p-2 rounded-xl bg-white border border-sky-300 text-sky-800 shadow-2xs truncate max-w-[140px]">
              {topicData.concept2}
            </div>
            <span className="text-slate-400">→</span>
            <div className="p-2 rounded-xl bg-white border border-rose-300 text-rose-800 shadow-2xs truncate max-w-[140px]">
              {topicData.concept3}
            </div>
          </div>
          <p className="text-[11px] text-slate-700 font-medium">
            Allocated: Intro (2m) • Core Breakdown (5m) • System Demo (5m) • Diagnostic Checks (4m) • Assessment (4m).
          </p>
        </div>
      ),
    },
    {
      id: 4,
      title: "Scene 4: AI Teacher Introduces the Concept",
      subtitle: "Synchronized Spoken Audio + Dynamic Visual Stage",
      badge: "Visual Intelligence",
      description: "Teacher introduces the governing formula and foundational intuition with visual synchronization.",
      visualContent: (
        <div className="rounded-2xl border border-sky-300 bg-white p-6 space-y-4 text-center shadow-sm">
          <div className="inline-block rounded-2xl border border-sky-200 bg-sky-50 px-6 py-4 font-mono text-3xl sm:text-4xl font-black text-slate-900">
            {topicData.formula}
          </div>
          <p className="text-xs text-slate-700 max-w-md mx-auto italic font-medium">
            "{topicData.teacherQuote}"
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[10px] text-emerald-800 font-bold border border-emerald-200">
            <ShieldCheck className="h-3 w-3 text-emerald-600" />
            Grounded in Dynamic Curriculum • {topicData.subject}
          </div>
        </div>
      ),
    },
    {
      id: 5,
      title: "Scene 5: Diagnostic Checkpoint Question",
      subtitle: "Teacher tests intuitive understanding, not rote memorization",
      badge: "Questioning",
      description: `Teacher asks: "${topicData.question}"`,
      visualContent: (
        <div className="rounded-2xl border border-amber-300 bg-amber-50/70 p-6 space-y-3 text-xs">
          <h4 className="font-bold text-slate-900 text-sm">
            Question: {topicData.question}
          </h4>
          <div className="space-y-2">
            <div className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700">
              A) {topicData.correctOption}
            </div>
            <div className="p-2.5 rounded-xl border border-amber-300 bg-amber-100 text-amber-950 font-bold">
              B) {topicData.wrongOption}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      title: "Scene 6: Misconception Detected & Policy Triggered",
      subtitle: "AI Teacher does NOT say 'Wrong' — it diagnoses the cognitive flaw",
      badge: "Cognitive Diagnosis",
      description: "Misconception engine detects conceptual confusion. Policy Engine adapts strategy from Technical to Visual Analogy and reduces difficulty.",
      visualContent: (
        <div className="rounded-2xl border border-rose-300 bg-rose-50/80 p-6 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-rose-800 font-bold">
            <AlertTriangle className="h-4 w-4 text-rose-600" />
            <span>Misconception Detected: {topicData.misconception}</span>
          </div>
          <p className="text-slate-800 font-medium">
            Student selected the cognitive trap. Teacher detects flawed mental model and intervenes immediately.
          </p>
          <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
            <div className="p-2 rounded-xl bg-white border border-rose-200 shadow-2xs">
              <span className="text-slate-400 block font-bold">Strategy Switch</span>
              <span className="text-amber-800 font-bold">Technical → Visual Analogy</span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-rose-200 shadow-2xs">
              <span className="text-slate-400 block font-bold">Difficulty Shift</span>
              <span className="text-emerald-800 font-bold">Intermediate → Beginner</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 7,
      title: "Scene 7: Adaptive Real-World Analogy & Mastery Recovered",
      subtitle: `Teacher re-explains using: ${topicData.analogyTitle}`,
      badge: "Adaptive Re-teaching",
      description: "Teacher uses an intuitive real-world mental model. Student re-tests and answers correctly!",
      visualContent: (
        <div className="rounded-2xl border border-emerald-300 bg-emerald-50/80 p-6 space-y-3 text-xs">
          <div className="flex items-center justify-between text-emerald-800 font-bold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Adaptive Remediation Complete
            </span>
            <span className="text-xs font-mono">Score: 100%</span>
          </div>
          <p className="text-slate-800 font-medium">
            "Teacher: {topicData.analogyQuote}"
          </p>
          <div className="p-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-900 font-bold shadow-2xs">
            Student Follow-Up Answer: "{topicData.correctOption}" ✓ Correct!
          </div>
        </div>
      ),
    },
    {
      id: 8,
      title: "Scene 8: Real-Time Seamless Multilingual Switch",
      subtitle: "Student requests: 'Explain this in Hindi/Hinglish'",
      badge: "Multilingual",
      description: "Teacher instantly shifts language without resetting lesson state, concept mastery, or position.",
      visualContent: (
        <div className="rounded-2xl border border-sky-300 bg-sky-50/70 p-6 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-sky-800 font-bold">
            <Languages className="h-4 w-4 text-sky-600" />
            <span>Multilingual Teaching Stream Activated</span>
          </div>
          <p className="text-slate-800 italic leading-relaxed font-medium">
            "AI Teacher: {topicData.hindiScript}"
          </p>
          <span className="text-[10px] font-mono text-slate-500 block font-semibold">
            State Preserved: Step 6/7 • Mastery: 85% • Time Remaining: 12:45
          </span>
        </div>
      ),
    },
    {
      id: 9,
      title: "Scene 9: Final Assessment & Comprehensive Report",
      subtitle: "Overall Mastery Score: 85%",
      badge: "Assessment",
      description: "Full assessment breakdown highlighting mastered concepts, resolved cognitive traps, and performance rubric.",
      visualContent: (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 text-center text-xs shadow-sm">
          <span className="text-5xl font-black text-slate-900">
            85%
          </span>
          <div className="grid grid-cols-2 gap-2 text-left">
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold">
              <strong>Mastered:</strong> {topicData.concept1}, {topicData.concept2}
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-semibold">
              <strong>Remediated:</strong> {topicData.concept3}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 10,
      title: "Scene 10: Next Best Action & Personalized Artifacts",
      subtitle: `Recommended Next Step: ${topicData.nextTopic}`,
      badge: "Long-Term Memory",
      description: `AI Teacher creates personalized study notes, flashcards, and homework for ${topicData.title}.`,
      visualContent: (
        <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900">Recommended Next Step:</span>
            <span className="rounded-full bg-white px-3 py-1 text-sky-800 font-mono font-bold border border-sky-200">
              {topicData.nextTopic}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center font-bold">
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-2xs">Study Notes Ready</div>
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-2xs">5 Flashcards Ready</div>
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-2xs">5-Q Practice Set Ready</div>
          </div>
        </div>
      ),
    },
  ];


  // Auto progression when playing
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentSceneIdx((prev) => {
          if (prev < demoScenes.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, demoScenes.length]);

  const activeScene = demoScenes[currentSceneIdx];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-grid-pattern py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 border border-amber-300 font-mono">
                HACKATHON JUDGE MODE
              </span>
              <span className="text-xs text-slate-500 font-mono font-semibold">3–5 Minute Automated Walk-Through</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 mt-1">Live Judge Demo</h1>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              Automated end-to-end simulation proving RAG, Misconception Detection, and Adaptive Strategy Switching.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs font-bold transition-all shadow-md ${
                isPlaying
                  ? "bg-rose-600 text-white shadow-rose-500/20"
                  : "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-500/25 hover:brightness-105"
              }`}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
              <span>{isPlaying ? "Pause Auto-Run" : "START JUDGE DEMO"}</span>
            </button>

            <button
              onClick={() => {
                setCurrentSceneIdx(0);
                setIsPlaying(false);
              }}
              title="Reset Demo to Scene 1"
              className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-500 hover:text-slate-900 shadow-2xs"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* DYNAMIC TOPIC SELECTION & GENERATION FOR DEMO */}
        <div className="rounded-3xl border border-sky-300 bg-white p-5 sm:p-6 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-700 font-bold flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-sky-600" />
                Live Dynamic Topic Calibration
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                Active Demo Topic: <span className="text-sky-700">{topicData.title}</span>
              </h3>
            </div>
            <Link
              href={`/classroom/${activeLessonId}`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-700 transition-all shadow-xs self-start sm:self-auto"
            >
              <span>Launch Live Classroom →</span>
            </Link>
          </div>

          {/* Quick presets */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-500">Select Preset Lecture or Type Your Own:</span>
            <div className="flex flex-wrap gap-2">
              {presetTopics.map((pt) => (
                <button
                  key={pt.name}
                  disabled={isGenerating}
                  onClick={() => handleSelectTopic(pt)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold border transition-all ${
                    topicData.title === pt.title
                      ? "border-sky-500 bg-sky-50 text-sky-900 font-bold ring-1 ring-sky-500 shadow-xs"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {pt.name}
                </button>
              ))}
            </div>
          </div>

          {/* Custom topic input */}
          <form onSubmit={handleCustomTopicSubmit} className="flex gap-2 pt-1">
            <div className="relative flex-1">
              <input
                type="text"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="Ask for ANY topic (e.g. French Revolution, DNA Replication, Binary Search Trees...)"
                disabled={isGenerating}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={isGenerating || !customTopic.trim()}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:brightness-105 disabled:opacity-50 transition-all"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Generate Demo ⚡</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* DEMO PROGRESS BAR (Requirement #38) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-slate-500">
              Demo Progress: Scene {currentSceneIdx + 1} of {demoScenes.length}
            </span>
            <span className="text-amber-700">{activeScene.badge}</span>
          </div>


          <div className="grid grid-cols-10 gap-1.5">
            {demoScenes.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentSceneIdx(i);
                  setIsPlaying(false);
                }}
                className={`h-2.5 rounded-full transition-all ${
                  i === currentSceneIdx
                    ? "bg-amber-500 scale-y-125 shadow-sm"
                    : i < currentSceneIdx
                    ? "bg-emerald-500"
                    : "bg-slate-200 hover:bg-slate-300"
                }`}
                title={s.title}
              />
            ))}
          </div>
        </div>

        {/* ACTIVE SCENE SHOWCASE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScene.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl space-y-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                  {activeScene.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{activeScene.title}</h3>
                <p className="text-xs text-sky-700 font-bold mt-0.5">{activeScene.subtitle}</p>
                <p className="text-xs text-slate-600 mt-2 max-w-2xl leading-relaxed font-medium">
                  {activeScene.description}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs text-slate-600 font-bold shrink-0">
                Scene {activeScene.id} / 10
              </div>
            </div>

            {/* Visual content for scene */}
            <div className="pt-2">{activeScene.visualContent}</div>

            {/* Manual navigation controls */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-xs font-semibold">
              <button
                disabled={currentSceneIdx === 0}
                onClick={() => {
                  setCurrentSceneIdx((prev) => prev - 1);
                  setIsPlaying(false);
                }}
                className="flex items-center gap-1 text-slate-500 hover:text-slate-900 disabled:opacity-20"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous Scene</span>
              </button>

              <button
                disabled={currentSceneIdx === demoScenes.length - 1}
                onClick={() => {
                  setCurrentSceneIdx((prev) => prev + 1);
                  setIsPlaying(false);
                }}
                className="flex items-center gap-1 rounded-xl bg-slate-100 px-4 py-2 font-bold text-slate-900 hover:bg-slate-200 disabled:opacity-20"
              >
                <span>Next Scene</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Direct Link to Classroom */}
        <div className="text-center pt-2">
          <Link
            href={`/classroom/${activeLessonId}`}
            className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-6 py-3 text-xs text-white font-bold hover:bg-sky-700 shadow-md shadow-sky-500/20 transition-all"
          >
            <span>Open Interactive Classroom for "{topicData.title}" in Live Mode</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
