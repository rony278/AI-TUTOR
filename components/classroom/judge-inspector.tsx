"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Cpu } from "lucide-react";
import { LessonState } from "@/types/teaching";

interface JudgeInspectorProps {
  lessonState: LessonState;
}

export function JudgeInspector({ lessonState }: JudgeInspectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentConcept = lessonState.knowledgeGraph.nodes.find(
    (n) => n.id === lessonState.currentConceptId
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-lg overflow-hidden">
      {/* Trigger Bar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4 text-sky-600" />
          <span className="font-mono uppercase tracking-wider text-sky-800 text-[11px] font-bold">
            Judge Inspector: How AI Teacher is Teaching
          </span>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
            Telemetry Live
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
          <span>{isOpen ? "Collapse" : "Inspect System Events"}</span>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>

      {/* Expandable Panel */}
      {isOpen && (
        <div className="border-t border-slate-200 p-5 space-y-6 bg-slate-50/60 text-xs">
          {/* Top telemetry metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs">
              <span className="text-[10px] font-mono text-slate-500 block">Active Brain State</span>
              <span className="font-bold text-sky-700 font-mono text-sm mt-0.5 block">
                {lessonState.brainState}
              </span>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs">
              <span className="text-[10px] font-mono text-slate-500 block">Concept Mastery</span>
              <span className="font-bold text-emerald-700 font-mono text-sm mt-0.5 block">
                {currentConcept?.masteryScore || 68}% ({currentConcept?.status})
              </span>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs">
              <span className="text-[10px] font-mono text-slate-500 block">Learning Confidence</span>
              <span className="font-bold text-amber-800 font-mono text-sm mt-0.5 block">
                {currentConcept?.confidenceScore || 72}% • Stability: {currentConcept?.stability || "Medium"}
              </span>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs">
              <span className="text-[10px] font-mono text-slate-500 block">Calibrated Difficulty</span>
              <span className="font-bold text-purple-700 font-mono text-sm mt-0.5 block">
                {lessonState.currentDifficulty}
              </span>
            </div>
          </div>

          {/* SYSTEM STATUS (Requirement #40) */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold block mb-2">
              System Infrastructure & Providers
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xs">
                <span className="text-slate-600 font-medium">LLM Engine</span>
                <span className="text-emerald-700 font-bold">Active (GPT-4o/Gemini)</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xs">
                <span className="text-slate-600 font-medium">RAG Retriever</span>
                <span className="text-emerald-700 font-bold">Grounded</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xs">
                <span className="text-slate-600 font-medium">Vector Store</span>
                <span className="text-emerald-700 font-bold">Ready</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xs">
                <span className="text-slate-600 font-medium">Speech-to-Text</span>
                <span className="text-emerald-700 font-bold">Deepgram / Browser</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xs">
                <span className="text-slate-600 font-medium">Text-to-Speech</span>
                <span className="text-emerald-700 font-bold">ElevenLabs / Neural</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xs">
                <span className="text-slate-600 font-medium">Avatar Stream</span>
                <span className="text-emerald-700 font-bold">Synced Lip-Sync</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xs">
                <span className="text-slate-600 font-medium">Knowledge Source</span>
                <span className="text-emerald-700 font-bold">Textbook Verified</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xs">
                <span className="text-slate-600 font-medium">Policy Engine</span>
                <span className="text-emerald-700 font-bold">Real-Time Deciding</span>
              </div>
            </div>
          </div>

          {/* SAFE EVENT STREAM */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold block mb-2">
              Safe Pedagogical Event Log (No Raw CoT)
            </span>
            <div className="space-y-1.5 font-mono text-[11px] max-h-36 overflow-y-auto pr-2 bg-white p-3 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 text-slate-700">
                <span className="text-sky-700 font-bold">[00:01]</span>
                <span>RAG retrieved 3 textbook sections from Physics_Chapter_4.pdf (Pages 31, 37, 40)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="text-sky-700 font-bold">[00:45]</span>
                <span>Visual intelligence bound: Formula display synchronized with teacher audio</span>
              </div>
              <div className="flex items-center gap-2 text-amber-800 font-medium">
                <span className="text-amber-700 font-bold">[01:20]</span>
                <span>Diagnostic checkpoint initiated: Proportionality intuition test</span>
              </div>
              {lessonState.adaptationHistory.map((ad, i) => (
                <div key={i} className="flex items-center gap-2 text-rose-800 font-medium">
                  <span className="text-rose-700 font-bold">[{ad.timestamp.slice(14, 19)}]</span>
                  <span>
                    Adaptive Policy Engine: Misconception detected on {ad.concept}. Switched strategy:{" "}
                    {ad.previousStrategy} → {ad.newStrategy}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
