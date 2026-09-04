"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Flame,
  Clock,
  Award,
  Sparkles,
  ArrowRight,
  RotateCcw,
  FileText,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { defaultStudentProfile, physicsKnowledgeGraph, sampleDocuments } from "@/lib/db/in-memory-db";
import { LearningUniverse } from "@/components/dashboard/learning-universe";

export default function DashboardPage() {
  const [profile] = useState(defaultStudentProfile);
  const [knowledgeGraph] = useState(physicsKnowledgeGraph);

  const learningPathModules = [
    { num: "01", title: "Classical Dynamics Fundamentals", status: "COMPLETED", score: "94%" },
    { num: "02", title: "Newton's Second Law & Momentum", status: "COMPLETED", score: "88%" },
    { num: "03", title: "Work, Energy & Conservative Fields", status: "COMPLETED", score: "90%" },
    { num: "04", title: "Electrostatic Potential & Voltage", status: "COMPLETED", score: "92%" },
    { num: "05", title: "Current Flow & Resistance Dynamics", status: "RECOMMENDED", score: "74%" },
    { num: "06", title: "Series & Parallel Circuit Networks", status: "LOCKED", score: "--" },
    { num: "07", title: "Electromagnetic Induction & Faraday", status: "LOCKED", score: "--" },
    { num: "08", title: "Advanced Quantum Wave Mechanics", status: "LOCKED", score: "--" },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-grid-pattern py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="mx-auto max-w-7xl space-y-10">
        {/* 1. HERO SECTION (Requirement #36) */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-3xl border border-slate-200 bg-gradient-to-r from-sky-50 via-white to-slate-50 p-8 shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold">
                Student Dashboard • {profile.name}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2.5 py-0.5 text-[10px] font-bold text-sky-800 border border-sky-200">
                <GraduationCap className="h-3 w-3" />
                {profile.qualificationLevel}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Good evening.</h1>
            <p className="text-sm text-slate-600 font-medium">"Your next breakthrough is waiting."</p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1 font-mono font-semibold">
              <span className="flex items-center gap-1 text-amber-600">
                <Flame className="h-4 w-4 fill-current" />
                {profile.learningStreakDays} Day Streak
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-sky-700">
                <Clock className="h-4 w-4" />
                {profile.totalHoursLearned} Hours Learned
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-700">
                <Award className="h-4 w-4" />
                {profile.completedLessonsCount} Completed Topics
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/classroom/lesson_physics_101"
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-sky-500/25 hover:brightness-105 transition-all"
            >
              <span>Resume Active Lesson</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/learn"
              className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-all shadow-2xs"
            >
              <span>Create New Lesson</span>
            </Link>
          </div>
        </div>

        {/* 2. TODAY'S SNAPSHOT */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-1 shadow-sm">
            <span className="font-mono text-[10px] uppercase text-slate-400 font-bold block">Today's Study Time</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">18 min</span>
              <span className="text-emerald-700 font-bold text-[11px]">+6 min vs avg</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Target daily goal: 20 min</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-1 shadow-sm">
            <span className="font-mono text-[10px] uppercase text-slate-400 font-bold block">Verified Concept Mastery</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-emerald-700">2 Concepts</span>
              <span className="text-slate-500 text-[11px] font-medium">Mastered</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Newton's 2nd Law & Voltage Potential</p>
          </div>

          <div className="rounded-3xl border border-amber-300 bg-amber-50/70 p-5 space-y-1 shadow-sm">
            <span className="font-mono text-[10px] uppercase text-amber-800 font-bold block">Recommended Next Action</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-slate-900">Series Circuits</span>
            </div>
            <p className="text-[11px] text-amber-900 font-medium">5-minute refresher on Ohm's Law resistance</p>
          </div>
        </div>

        {/* 3. SIGNATURE FEATURE: LEARNING UNIVERSE (Requirement #35) */}
        <LearningUniverse nodes={knowledgeGraph.nodes} />

        {/* 4. LEARNING DNA & KNOWLEDGE DECAY (Requirement #30 & #29) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEARNING DNA */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-lg space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-sky-700 font-bold">
                  Personalized Cognitive Profile
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">Learning DNA</h3>
              </div>
              <span className="text-[11px] font-mono text-slate-500 font-medium">100% Performance-Based</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 block font-semibold">Learning Speed</span>
                <span className="font-bold text-sky-800 text-sm">{profile.learningSpeed}</span>
                <p className="text-[10px] text-slate-500">Calibrates pause intervals & questions</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 block font-semibold">Preferred Teaching Style</span>
                <span className="font-bold text-emerald-800 text-sm">{profile.preferredStyle} & Analogies</span>
                <p className="text-[10px] text-slate-500">Best retention with hydraulic models</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 block font-semibold">Long-Term Retention</span>
                <span className="font-bold text-purple-800 text-sm">{profile.retentionScore}%</span>
                <p className="text-[10px] text-slate-500">High stability on foundational laws</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 block font-semibold">Common Cognitive Trap</span>
                <span className="font-bold text-rose-800 text-xs">Inverse Proportionality</span>
                <p className="text-[10px] text-slate-500">Remediated via water-pipe analogy</p>
              </div>
            </div>

            {/* Why Am I Seeing This? (Requirement #28) */}
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-sky-800 text-xs">
                <Sparkles className="h-3.5 w-3.5 text-sky-600" />
                <span>Why am I seeing this personalization?</span>
              </div>
              <p className="text-slate-700 leading-relaxed text-[11px] font-medium">
                "Based on your profile as an <strong>{profile.qualificationLevel}</strong> student who recently investigated
                circuits, your AI Teacher will automatically deploy hydraulic physical models to ground abstract formulas."
              </p>
            </div>
          </div>

          {/* KNOWLEDGE DECAY TRACKER (Requirement #29) */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-lg space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-800 font-bold">
                  Retention & Spaced Repetition
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">Knowledge Decay</h3>
              </div>
              <span className="text-[11px] font-mono text-slate-500 font-medium">Decay Curve Active</span>
            </div>

            <div className="space-y-3 text-xs">
              {/* Decay Item 1 */}
              <div className="rounded-2xl border border-amber-300 bg-amber-50/70 p-4 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Resistance & Ohm's Law</span>
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-900 border border-amber-300">
                    Needs Practice (92% → 74%)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-rose-500 w-[74%]" />
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-600">Last reviewed 3 days ago</span>
                  <Link
                    href="/classroom/lesson_physics_101"
                    className="flex items-center gap-1 text-[11px] font-bold text-amber-800 hover:underline"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>5-Min Refresher</span>
                  </Link>
                </div>
              </div>

              {/* Decay Item 2 */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Newton's Second Law</span>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-900 border border-emerald-300">
                    Strong (88%)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 w-[88%]" />
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-600">Last reviewed today</span>
                  <span className="text-[11px] text-emerald-800 font-bold">High Stability</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. AI LEARNING PATH (Requirement #34) */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-700 font-bold">
                Curriculum Progression Roadmap
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">AI Learning Path: Classical Physics & Circuits</h3>
            </div>
            <span className="text-xs text-sky-800 font-bold">Recommended: Step 05</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {learningPathModules.map((m) => {
              const isDone = m.status === "COMPLETED";
              const isRec = m.status === "RECOMMENDED";
              return (
                <div
                  key={m.num}
                  className={`rounded-2xl border p-4 transition-all ${
                    isRec
                      ? "border-sky-400 bg-sky-50 shadow-md ring-1 ring-sky-400"
                      : isDone
                      ? "border-emerald-200 bg-emerald-50/50"
                      : "border-slate-200 bg-slate-50 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-slate-500 font-bold">{m.num}</span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        isDone
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : isRec
                          ? "bg-sky-200 text-sky-900 animate-pulse border border-sky-300"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-xs mb-2 line-clamp-2">{m.title}</h5>
                  <span className="text-[10px] font-mono text-slate-600 font-medium">Mastery: {m.score}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. MATERIAL LIBRARY CARDS (Requirement #37) */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                Uploaded Knowledge Base
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">Recent Learning Materials</h3>
            </div>
            <Link href="/materials" className="text-xs text-sky-700 font-bold hover:underline flex items-center gap-1">
              <span>View All Materials</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {sampleDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-start justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-sky-300 transition-all group shadow-2xs"
              >
                <div className="flex items-start gap-3.5">
                  <div className="rounded-2xl bg-sky-50 p-3 text-sky-700 border border-sky-200 group-hover:scale-105 transition-transform">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-bold text-slate-900 group-hover:text-sky-800 transition-colors">{doc.name}</h5>
                    <p className="text-[11px] text-slate-600 max-w-sm line-clamp-2">{doc.summary}</p>
                    <p className="text-[10px] text-slate-500 font-mono pt-1">
                      {doc.pageCount} Pages • {doc.totalChunks} Chunks • Grounded RAG
                    </p>
                  </div>
                </div>

                <Link
                  href="/classroom/lesson_physics_101"
                  className="rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-800 hover:bg-sky-600 hover:text-white transition-all shrink-0 ml-2 shadow-2xs"
                >
                  Continue Lesson
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
