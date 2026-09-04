"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Play,
  Brain,
  FileText,
  Activity,
  CheckCircle,
  Eye,
  Shuffle,
  ShieldCheck,
  Compass,
  Cpu,
} from "lucide-react";
import { VirtualClassroomPreview } from "@/components/landing/virtual-classroom-preview";

export default function LandingPage() {
  const howItWorksSteps = [
    {
      num: "01",
      title: "Understand",
      subtitle: "AI reads your topic or material",
      description: "Upload PDFs, lecture slides, textbooks, or input any subject from scratch. Deep semantic RAG extracts concepts and prerequisite hierarchies.",
      icon: FileText,
      color: "from-blue-500 to-cyan-600",
    },
    {
      num: "02",
      title: "Plan",
      subtitle: "AI creates a personalized lesson",
      description: "Budgets time precisely across introduction, demonstration, checkpoint questions, and diagnostic remediation based on your available time.",
      icon: Compass,
      color: "from-cyan-500 to-teal-600",
    },
    {
      num: "03",
      title: "Teach",
      subtitle: "AI explains using video, voice and visuals",
      description: "Human-like avatar presents synchronized formulas, interactive physics diagrams, circuit simulations, and code execution.",
      icon: Eye,
      color: "from-teal-500 to-emerald-600",
    },
    {
      num: "04",
      title: "Check",
      subtitle: "AI asks questions",
      description: "Socratic and conceptual diagnostic checkpoints evaluate intuition, not just rote recall. Supports voice or typing response.",
      icon: Brain,
      color: "from-amber-500 to-orange-600",
    },
    {
      num: "05",
      title: "Adapt",
      subtitle: "AI identifies misconceptions",
      description: "Detects why you got it wrong. If you invert Ohm's law, the teacher immediately pivots from technical math to an intuitive water-pipe analogy.",
      icon: Shuffle,
      color: "from-rose-500 to-pink-600",
    },
    {
      num: "06",
      title: "Master",
      subtitle: "AI verifies understanding",
      description: "Follow-up questions verify cognitive repair, update your Knowledge Universe mastery scores, and recommend your next best topic.",
      icon: CheckCircle,
      color: "from-purple-500 to-indigo-600",
    },
  ];

  return (
    <div className="relative min-h-screen bg-grid-pattern">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-tr from-sky-200/50 to-indigo-200/40 blur-[130px]" />

      {/* HERO SECTION */}
      <section className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-sky-300 bg-sky-50 px-4 py-1.5 text-xs font-semibold text-sky-800 backdrop-blur-md shadow-xs"
          >
            <Sparkles className="h-3.5 w-3.5 text-sky-600" />
            <span>The AI teacher that learns how you learn</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black tracking-tight text-slate-900 sm:text-7xl font-sans"
          >
            AI Teacher
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 sm:text-xl font-normal leading-relaxed"
          >
            Upload anything. Choose your level, language and available time. AI Teacher builds the lesson, teaches you,
            asks questions, detects confusion and adapts in real time.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Link
              href="/learn"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 hover:brightness-105 transition-all hover:scale-[1.02]"
            >
              <span>Start Learning</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/demo"
              className="flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-6 py-3.5 text-sm font-semibold text-amber-900 hover:bg-amber-100 backdrop-blur-md transition-all shadow-xs"
            >
              <Play className="h-4 w-4 fill-current text-amber-600" />
              <span>Watch Demo</span>
              <span className="rounded bg-amber-200/60 px-2 py-0.5 text-[10px] text-amber-900 font-mono font-bold">3 min</span>
            </Link>
          </motion.div>
        </div>

        {/* HERO VISUALIZATION PREVIEW */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <VirtualClassroomPreview />
        </motion.div>
      </section>

      {/* CORE PRINCIPLE: CHATBOT VS ADAPTIVE TEACHER */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold">Core Architecture Philosophy</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-2">Why AI Teacher is NOT a Chatbot</h3>
          <p className="text-sm text-slate-600 mt-2">
            A chatbot waits for you to ask questions. A real educator plans the path, gauges your understanding, and
            intervenes when misconceptions arise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Chatbot Box */}
          <div className="rounded-3xl border border-rose-200 bg-rose-50/60 p-6 shadow-xs">
            <div className="flex items-center gap-2 text-rose-800 font-bold mb-4 text-sm">
              <span>Standard AI Chatbot (Passive)</span>
            </div>
            <div className="space-y-3 text-xs text-slate-600 font-mono">
              <div className="p-3 rounded-xl bg-white border border-rose-200/80 shadow-2xs">Student asks random question</div>
              <div className="text-center text-slate-400 font-bold">↓</div>
              <div className="p-3 rounded-xl bg-white border border-rose-200/80 shadow-2xs">AI generates text block</div>
              <div className="text-center text-slate-400 font-bold">↓</div>
              <div className="p-3 rounded-xl bg-rose-100/60 border border-rose-300 text-rose-900 font-semibold">
                No lesson plan, no diagnostic check, no adaptation
              </div>
            </div>
          </div>

          {/* AI Teacher Box */}
          <div className="rounded-3xl border border-sky-300 bg-sky-50/60 p-6 shadow-md shadow-sky-500/5">
            <div className="flex items-center gap-2 text-sky-900 font-bold mb-4 text-sm">
              <Sparkles className="h-4 w-4 text-sky-600" />
              <span>AI Teacher (Active Pedagogical Engine)</span>
            </div>
            <div className="space-y-2.5 text-xs text-slate-800 font-mono">
              <div className="p-2.5 rounded-xl bg-white border border-sky-200 font-medium text-sky-900 shadow-2xs">
                Learner Model + Material RAG Analysis
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                Knowledge Graph + Time-Allocated Lesson Plan
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-amber-200 text-amber-900 shadow-2xs font-medium">
                Teacher Explains with Dynamic Video & Synchronized Visuals
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-rose-200 text-rose-900 shadow-2xs font-medium">
                Diagnostic Question → Misconception Detector
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold shadow-2xs">
                Adaptive Intervention (Analogy Switch) → Verified Mastery
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold">The 6-Step Loop</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-2">How It Works</h3>
          <p className="text-sm text-slate-600 mt-2">
            The closed-loop teaching engine that guarantees comprehension before advancing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {howItWorksSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="group relative rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm hover:border-sky-300 hover:shadow-md transition-all hover:translate-y-[-2px]"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-sky-600 transition-colors">
                    {step.num}
                  </span>
                  <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${step.color} text-white shadow-sm`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-slate-900">{step.title}</h4>
                <p className="text-xs font-semibold text-sky-700 mt-0.5">{step.subtitle}</p>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl border border-sky-300 bg-gradient-to-b from-sky-50/90 to-white p-10 md:p-16 shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h3 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Ready to experience real adaptive teaching?
            </h3>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Choose your topic, set your time, and attend your first personalized class with AI Teacher.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/learn"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 hover:brightness-105 transition-all"
              >
                <span>Build My Lesson</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/demo"
                className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-all shadow-xs"
              >
                <span>Launch Demo Mode</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
