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
} from "lucide-react";

export default function JudgeDemoPage() {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const demoScenes = [
    {
      id: 1,
      title: "Scene 1: Welcome & Pedagogical Objective",
      subtitle: "The AI teacher that learns how you learn",
      badge: "Vision",
      description: "Demonstrating that AI Teacher is NOT a chatbot, but an active, closed-loop educational intelligence.",
      visualContent: (
        <div className="rounded-2xl border border-sky-300 bg-sky-50/70 p-6 text-center space-y-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-md shadow-sky-500/30">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">AI Teacher</h3>
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
      subtitle: "Uploading Physics_Chapter_4.pdf with Qualification Level Selection",
      badge: "RAG & Profile",
      description: "Learner selects Undergraduate qualification, Beginner proficiency, Hindi/Hinglish language, and Visual style.",
      visualContent: (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-emerald-600" />
              <span className="font-bold text-slate-900">Physics_Chapter_4_Dynamics_and_Circuits.pdf</span>
            </div>
            <span className="text-emerald-700 font-mono font-bold">18 Chunks Indexed</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-slate-400 text-[10px] block font-mono font-bold">Qualification</span>
              <span className="text-slate-900 font-bold">Undergraduate (College)</span>
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
            <div className="p-2 rounded-xl bg-white border border-emerald-300 text-emerald-800 shadow-2xs">
              Voltage (12V)
            </div>
            <span className="text-slate-400">→</span>
            <div className="p-2 rounded-xl bg-white border border-sky-300 text-sky-800 shadow-2xs">
              Current (I)
            </div>
            <span className="text-slate-400">→</span>
            <div className="p-2 rounded-xl bg-white border border-rose-300 text-rose-800 shadow-2xs">
              Resistance & Ohm's Law
            </div>
          </div>
          <p className="text-[11px] text-slate-700 font-medium">
            Allocated: Intro (2m) • Newton's 2nd Law (5m) • Ohm's Law (5m) • Diagnostic Checks (4m) • Assessment (4m).
          </p>
        </div>
      ),
    },
    {
      id: 4,
      title: "Scene 4: AI Teacher Introduces Newton's Second Law",
      subtitle: "Synchronized Spoken Audio + Dynamic Free-Body Diagram",
      badge: "Visual Intelligence",
      description: "Teacher introduces F = ma with dynamic vector arrows stretching proportionally.",
      visualContent: (
        <div className="rounded-2xl border border-sky-300 bg-white p-6 space-y-4 text-center shadow-sm">
          <div className="inline-block rounded-2xl border border-sky-200 bg-sky-50 px-6 py-4 font-mono text-4xl font-black text-slate-900">
            F = m · a
          </div>
          <p className="text-xs text-slate-700 max-w-md mx-auto italic font-medium">
            "Teacher: When net force acts on a mass, it accelerates proportionally in that direction."
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[10px] text-emerald-800 font-bold border border-emerald-200">
            <ShieldCheck className="h-3 w-3 text-emerald-600" />
            Grounded in Physics_Chapter_4.pdf • Page 31
          </div>
        </div>
      ),
    },
    {
      id: 5,
      title: "Scene 5: Diagnostic Checkpoint Question",
      subtitle: "Teacher tests intuitive understanding",
      badge: "Questioning",
      description: "Teacher asks: 'If force doubles while mass remains constant, what happens to acceleration?'",
      visualContent: (
        <div className="rounded-2xl border border-amber-300 bg-amber-50/70 p-6 space-y-3 text-xs">
          <h4 className="font-bold text-slate-900 text-sm">
            Question: If net force acting on an object doubles while mass remains constant, what happens to acceleration?
          </h4>
          <div className="space-y-2">
            <div className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700">
              A) Acceleration doubles (2x)
            </div>
            <div className="p-2.5 rounded-xl border border-amber-300 bg-amber-100 text-amber-950 font-bold">
              B) Intentional Student Trap: Student selects 'Acceleration stays constant while velocity doubles'
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
      description: "Misconception engine detects kinematics confusion. Policy Engine adapts strategy from Technical to Visual Analogy and reduces difficulty.",
      visualContent: (
        <div className="rounded-2xl border border-rose-300 bg-rose-50/80 p-6 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-rose-800 font-bold">
            <AlertTriangle className="h-4 w-4 text-rose-600" />
            <span>Misconception Detected: Kinematics Conflation</span>
          </div>
          <p className="text-slate-800 font-medium">
            Student confused velocity with acceleration. Believes constant force directly holds constant velocity.
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
      title: "Scene 7: Adaptive Water-Pipe Analogy & Mastery Recovered",
      subtitle: "Teacher re-explains using hydraulic constriction",
      badge: "Adaptive Re-teaching",
      description: "Teacher shows water flowing through a pinched pipe. Student re-tests and answers correctly!",
      visualContent: (
        <div className="rounded-2xl border border-emerald-300 bg-emerald-50/80 p-6 space-y-3 text-xs">
          <div className="flex items-center justify-between text-emerald-800 font-bold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Hydraulic Analogy Remediation Complete
            </span>
            <span className="text-xs font-mono">Score: 100%</span>
          </div>
          <p className="text-slate-800 font-medium">
            "Teacher: Squeezing the pipe (higher resistance) constricts water flow (current). When resistance goes up,
            current must drop!"
          </p>
          <div className="p-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-900 font-bold shadow-2xs">
            Student Follow-Up Answer: "Current decreases because resistance opposes electron throughput." ✓ Correct!
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
            "AI Teacher: Bilkul! Current aur resistance inversely proportional hote hain. Jaise pipe ko squeeze karne par
            paani ka flow kam ho jata hai, waise hi resistance badhne par current kam ho jata hai."
          </p>
          <span className="text-[10px] font-mono text-slate-500 block font-semibold">
            State Preserved: Step 6/7 • Mastery: 82% • Time Remaining: 12:45
          </span>
        </div>
      ),
    },
    {
      id: 9,
      title: "Scene 9: Final Assessment & Comprehensive Report",
      subtitle: "Overall Mastery Score: 82%",
      badge: "Assessment",
      description: "Full assessment breakdown highlighting mastered concepts, weak concepts, and cognitive trap resolution.",
      visualContent: (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 text-center text-xs shadow-sm">
          <span className="text-5xl font-black text-slate-900">
            82%
          </span>
          <div className="grid grid-cols-2 gap-2 text-left">
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold">
              <strong>Mastered:</strong> Newton's 2nd Law, Voltage
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-semibold">
              <strong>Needs Practice:</strong> Ohm's Law Resistance
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 10,
      title: "Scene 10: Next Best Action & Personalized Artifacts",
      subtitle: "Personalized Practice Set, Notes, Flashcards & Next Topic",
      badge: "Long-Term Memory",
      description: "AI Teacher recommends a 5-minute revision on Resistance and advances learning path to Series Circuits.",
      visualContent: (
        <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900">Recommended Next Topic:</span>
            <span className="rounded-full bg-white px-3 py-1 text-sky-800 font-mono font-bold border border-sky-200">
              Series Circuits (5 min)
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
            href="/classroom/lesson_physics_101"
            className="inline-flex items-center gap-2 text-xs text-sky-700 font-bold hover:underline"
          >
            <span>Open Interactive Classroom in Live Mode</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
