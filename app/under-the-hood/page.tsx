"use client";

import Link from "next/link";
import {
  Layers,
  Brain,
  Zap,
} from "lucide-react";

export default function UnderTheHoodPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-grid-pattern py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold">
            Technical Architecture & Orchestration
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Under the Hood</h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            How AI Teacher delivers real-time adaptive pedagogy through state machines, cognitive diagnostic policy engines,
            and grounded vector retrieval.
          </p>
        </div>

        {/* 20-SECOND ARCHITECTURE VISUAL (Requirement #58) */}
        <div className="rounded-3xl border border-sky-300 bg-white p-6 sm:p-10 shadow-xl space-y-8">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Layers className="h-5 w-5 text-sky-600" />
              <span>Full End-to-End Orchestration Loop</span>
            </h3>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-mono font-bold text-emerald-800 border border-emerald-200">
              State Machine Driven
            </span>
          </div>

          {/* Architecture Flowchart Nodes */}
          <div className="space-y-4">
            {/* Level 1: Ingestion & Model */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-700 block font-bold">
                  01 • Learner Profiling
                </span>
                <h4 className="font-bold text-slate-900 text-sm">Learner DNA & Memory Model</h4>
                <p className="text-xs text-slate-600 font-medium">
                  Tracks qualification level, learning speed, preferred style, retention curves, and historical cognitive traps.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 block font-bold">
                  02 • Grounded Knowledge Retrieval
                </span>
                <h4 className="font-bold text-slate-900 text-sm">RAG & Vector Knowledge Graph</h4>
                <p className="text-xs text-slate-600 font-medium">
                  Chunks uploaded PDFs/DOCs/notes into indexed vectors. Strict citation enforcement prevents hallucination.
                </p>
              </div>
            </div>

            <div className="text-center text-slate-400 font-bold">↓</div>

            {/* Level 2: Core Brain */}
            <div className="rounded-3xl border-2 border-sky-300 bg-sky-50/70 p-6 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-sky-600" />
                  <h4 className="font-bold text-slate-900 text-base">AI Teacher Teaching Brain (State Machine)</h4>
                </div>
                <span className="text-xs font-mono text-sky-800 font-bold">10 Discrete States</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Coordinates: DISCOVER → PLAN → TEACH → CHECK → DIAGNOSE → ADAPT → RETEACH → RECHECK → MASTER → CONTINUE.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] font-mono font-bold">
                {["DISCOVER", "PLAN", "TEACH", "CHECK", "DIAGNOSE", "ADAPT", "RETEACH", "RECHECK", "MASTER", "CONTINUE"].map(
                  (s, i) => (
                    <span key={i} className="rounded-lg bg-white px-2 py-0.5 text-slate-800 border border-sky-200 shadow-2xs">
                      {s}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="text-center text-slate-400 font-bold">↓</div>

            {/* Level 3: Adaptive Policy Engine */}
            <div className="rounded-2xl border border-amber-300 bg-amber-50/70 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-600" />
                  <h4 className="font-bold text-slate-900 text-base">Adaptive Teaching Policy Engine</h4>
                </div>
                <span className="text-xs font-mono text-amber-900 font-bold">Deciding Next Action</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Evaluates correctness, latency, repeated mistakes, and hint count. If an inverse misconception is detected
                (e.g. Resistance vs Current), dynamically executes <strong className="text-amber-900">GIVE_ANALOGY</strong>,
                reduces difficulty, and swaps equations for hydraulic physical models.
              </p>
            </div>

            <div className="text-center text-slate-400 font-bold">↓</div>

            {/* Level 4: Delivery Multimodal Engine */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-1.5 text-xs">
                <span className="text-[10px] font-mono uppercase text-sky-700 block font-bold">Avatar / Video</span>
                <p className="font-bold text-slate-900">HeyGen / D-ID / Canvas</p>
                <p className="text-slate-600 text-[11px] font-medium">Synchronized facial lip-sync with speaking waveform.</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-1.5 text-xs">
                <span className="text-[10px] font-mono uppercase text-purple-700 block font-bold">Voice Engine</span>
                <p className="font-bold text-slate-900">ElevenLabs / Web Speech</p>
                <p className="text-slate-600 text-[11px] font-medium">Natural neural voice with real-time speed calibration.</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-1.5 text-xs">
                <span className="text-[10px] font-mono uppercase text-emerald-700 block font-bold">Visual Intelligence</span>
                <p className="font-bold text-slate-900">Dynamic SVG & Simulators</p>
                <p className="text-slate-600 text-[11px] font-medium">Free-body carts, circuits, water pipes, and code trace.</p>
              </div>
            </div>

            <div className="text-center text-slate-400 font-bold">↓</div>

            {/* Level 5: Student Interaction & Feedback Loop */}
            <div className="rounded-2xl border border-emerald-300 bg-emerald-50/70 p-5 flex items-center justify-between text-xs">
              <div className="space-y-1">
                <h5 className="font-bold text-emerald-900 text-sm">Continuous Pedagogical Feedback Loop</h5>
                <p className="text-slate-700 font-medium">
                  Student answers via voice/typing → Diagnostic Engine evaluates → Updates Knowledge Universe mastery.
                </p>
              </div>
              <Link
                href="/demo"
                className="rounded-xl bg-emerald-600 px-4 py-2 font-bold text-white hover:bg-emerald-700 transition-colors shrink-0 ml-4 shadow-xs"
              >
                Watch in Demo Mode →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
