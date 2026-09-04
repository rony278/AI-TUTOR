"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Brain,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  Volume2,
} from "lucide-react";

export function VirtualClassroomPreview() {
  const steps = [
    {
      id: 1,
      badge: "Stage 01",
      title: "PDF Uploaded & Understood",
      desc: "Physics_Chapter_4.pdf indexed. 18 chunks extracted with formulas F=ma and I=V/R.",
      icon: FileText,
      color: "from-blue-500 to-cyan-600",
      accent: "text-sky-700",
      content: (
        <div className="rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-800 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
            <span className="text-slate-500">Document Chunk 02: Page 37</span>
            <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">Grounded</span>
          </div>
          <p className="text-sky-800 font-medium">"Ohm's law: I = V / R. Current is inversely proportional to resistance."</p>
        </div>
      ),
    },
    {
      id: 2,
      badge: "Stage 02",
      title: "Pedagogical Lesson Planned",
      desc: "20-minute adaptive lesson budgeted. Concept graph constructed with prerequisite checking.",
      icon: Brain,
      color: "from-purple-500 to-indigo-600",
      accent: "text-purple-700",
      content: (
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
            <p className="text-[10px] text-slate-500">Concept 01</p>
            <p className="font-bold text-slate-900">Newton's 2nd Law</p>
            <p className="text-[11px] font-mono text-emerald-600 font-semibold">F = m · a</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
            <p className="text-[10px] text-slate-500">Concept 02</p>
            <p className="font-bold text-slate-900">Resistance & Circuits</p>
            <p className="text-[11px] font-mono text-amber-600 font-semibold">Ohm's Law (V = IR)</p>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      badge: "Stage 03",
      title: "Teacher Explains with Visuals",
      desc: "Spoken neural audio and dynamic equation synchronization.",
      icon: Sparkles,
      color: "from-sky-500 to-blue-600",
      accent: "text-sky-700",
      content: (
        <div className="flex items-center gap-4 rounded-xl border border-sky-200 bg-sky-50/70 p-4 shadow-xs">
          <div className="h-12 w-12 rounded-2xl overflow-hidden border-2 border-sky-400 shadow-md shadow-sky-500/20 shrink-0">
            <img src="/robot-teacher.jpg" alt="AI Robot Teacher" className="h-full w-full object-cover" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-sky-800">AI Teacher • Explaining</span>
              <Volume2 className="h-3.5 w-3.5 text-sky-600 animate-pulse" />
            </div>
            <p className="text-xs text-slate-800 font-medium">"Notice what happens to current when resistance triples..."</p>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      badge: "Stage 04",
      title: "Diagnostic Question & Misconception",
      desc: "Student answered: 'Current increases'. Teacher detects inverse relationship fallacy.",
      icon: AlertTriangle,
      color: "from-amber-500 to-rose-500",
      accent: "text-rose-700",
      content: (
        <div className="rounded-xl border border-rose-200 bg-rose-50/80 p-3.5 text-xs shadow-xs">
          <div className="flex items-center gap-2 text-rose-700 font-bold mb-1">
            <AlertTriangle className="h-4 w-4" />
            Misconception Detected
          </div>
          <p className="text-slate-800">Student believes increasing resistance increases current flow.</p>
          <div className="mt-2 text-[11px] font-semibold text-rose-800 bg-white p-2 rounded-lg border border-rose-200">
            Strategy Pivot: Technical Explanation → Water-Pipe Hydraulic Analogy
          </div>
        </div>
      ),
    },
    {
      id: 5,
      badge: "Stage 05",
      title: "Real-Time Adaptation & Mastery",
      desc: "Teacher switches to visual pipe constriction. Student re-tests with 95% accuracy.",
      icon: CheckCircle2,
      color: "from-emerald-500 to-teal-600",
      accent: "text-emerald-700",
      content: (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-3.5 text-xs shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-emerald-800 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Mastery Verified (88%)
            </span>
            <span className="text-[10px] font-medium text-slate-500">Next: Series Circuits</span>
          </div>
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 w-[88%]" />
          </div>
        </div>
      ),
    },
  ];

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="relative mx-auto w-full max-w-4xl rounded-2xl border border-slate-200/90 bg-white/95 p-6 shadow-xl backdrop-blur-2xl">
      {/* Top window bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-rose-400" />
          <div className="h-3 w-3 rounded-full bg-amber-400" />
          <div className="h-3 w-3 rounded-full bg-emerald-400" />
          <span className="ml-2 text-xs font-mono font-medium text-slate-500">AI Teacher — Interactive Teaching Loop</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Adaptive Engine
        </div>
      </div>

      {/* Steps pills */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {steps.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setActiveStep(idx)}
            className={`rounded-xl p-2 text-left text-xs transition-all ${
              activeStep === idx
                ? "bg-sky-50 border border-sky-300 text-sky-900 shadow-xs font-semibold"
                : "bg-slate-50 border border-slate-200/80 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <p className="text-[9px] uppercase tracking-wider font-mono">{s.badge}</p>
            <p className="font-semibold truncate text-[11px]">{s.title.split(" ")[0]}</p>
          </button>
        ))}
      </div>

      {/* Main active visual showcase */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-xs"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className={`inline-block text-xs font-mono font-bold ${steps[activeStep].accent} mb-1`}>
                {steps[activeStep].badge}
              </span>
              <h4 className="text-lg font-bold text-slate-900 tracking-tight">{steps[activeStep].title}</h4>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">{steps[activeStep].desc}</p>
            </div>
            <div className={`p-3 rounded-2xl bg-gradient-to-br ${steps[activeStep].color} text-white shadow-md`}>
              {(() => {
                const Icon = steps[activeStep].icon;
                return <Icon className="h-6 w-6" />;
              })()}
            </div>
          </div>

          <div className="mt-4">{steps[activeStep].content}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
