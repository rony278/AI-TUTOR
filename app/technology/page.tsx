"use client";

import { useState } from "react";
import { Cpu } from "lucide-react";
import { getAppConfig } from "@/lib/env";

export default function TechnologyPage() {
  const [config] = useState(() => getAppConfig());

  const techStack = [
    {
      category: "Frontend Framework",
      technology: "Next.js 14 (App Router) + React 18 + TypeScript",
      status: "IMPLEMENTED & ACTIVE",
      notes: "High-performance server & client components with clean light theme styling.",
    },
    {
      category: "Styling & UI Kit",
      technology: "Tailwind CSS + Framer Motion + Lucide Icons",
      status: "IMPLEMENTED & ACTIVE",
      notes: "Crisp light aesthetic, glass panels, subtle borders, and accessible typography.",
    },
    {
      category: "Large Language Models (LLM)",
      technology: "OpenAI GPT-4o / Google Gemini / Adaptive Mock Engine",
      status: config.isDemoMode ? "DEMO MODE (Intelligent Offline Mock)" : "LIVE CLOUD CONNECTED",
      notes: "Full provider abstraction via LLMProvider interface with automatic fallback resilience.",
    },
    {
      category: "Embeddings",
      technology: "OpenAI text-embedding-3-small & Semantic Vectors",
      status: "IMPLEMENTED & ACTIVE",
      notes: "1536-dimensional semantic vector projections for chunk matching.",
    },
    {
      category: "Vector Database",
      technology: "In-Memory Semantic Vector Store + Qdrant/Pinecone Adapters",
      status: "IMPLEMENTED & ACTIVE",
      notes: "Hybrid lexical and semantic cosine search with strict chapter & page citation grounding.",
    },
    {
      category: "Speech-to-Text (STT)",
      technology: "Web SpeechRecognition API + Deepgram Nova-2 STT Adapter",
      status: "IMPLEMENTED & ACTIVE",
      notes: "Real-time microphone voice input with fallback to simulated high-accuracy transcription.",
    },
    {
      category: "Text-to-Speech (TTS)",
      technology: "Web SpeechSynthesis API + ElevenLabs Multilingual Neural Voice",
      status: "IMPLEMENTED & ACTIVE",
      notes: "Browser speech synthesis with accent selection (English, Hindi, Hinglish) and ElevenLabs fallback.",
    },
    {
      category: "AI Avatar & Video Delivery",
      technology: "Real-Time Canvas Lip-Sync Avatar + HeyGen / D-ID Video Provider Adapters",
      status: "IMPLEMENTED & ACTIVE",
      notes: "Synchronized mouth visemes and audio waveforms reflecting spoken syllable timings.",
    },
    {
      category: "Teaching Brain State Machine",
      technology: "Custom 10-State Pedagogical Orchestrator (TypeScript)",
      status: "PROPRIETARY CORE INNOVATION",
      notes: "DISCOVER → PLAN → TEACH → CHECK → DIAGNOSE → ADAPT → RETEACH → RECHECK → MASTER → CONTINUE.",
    },
    {
      category: "Cognitive Diagnostic Engine",
      technology: "MisconceptionDetector & LearningConfidenceModel",
      status: "PROPRIETARY CORE INNOVATION",
      notes: "Detects inverse proportional fallacies, confabulations, and calculates Concept Stability without emotion fake-claims.",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-grid-pattern py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div className="border-b border-slate-200 pb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold flex items-center gap-1.5">
            <Cpu className="h-4 w-4 text-sky-600" />
            Full Transparency & Vendor Independence
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-1">AI & Technology Stack</h1>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Complete disclosure of active technologies, cloud providers, and resilient fallback mechanisms.
          </p>
        </div>

        {/* Status Pill */}
        <div className="flex items-center justify-between rounded-2xl border border-sky-300 bg-sky-50 p-4 text-xs">
          <div className="flex items-center gap-2 text-sky-900">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold">Current System Mode:</span>
            <span className="font-mono font-bold">{config.isDemoMode ? "DEMO_MODE=true (Zero API Keys Needed)" : "PRODUCTION CLOUD (Live API Keys Active)"}</span>
          </div>
          <span className="text-[11px] text-slate-600 font-mono font-semibold">100% Deterministic Fallback Guaranteed</span>
        </div>

        {/* Stack Table */}
        <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 font-mono text-[10px] uppercase text-slate-500 font-bold">
              <tr>
                <th className="py-3.5 px-6">System Component</th>
                <th className="py-3.5 px-6">Technology / Provider</th>
                <th className="py-3.5 px-6">Implementation Status</th>
                <th className="py-3.5 px-6">Architectural Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {techStack.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900">{item.category}</td>
                  <td className="py-4 px-6 font-mono font-medium text-slate-800">{item.technology}</td>
                  <td className="py-4 px-6">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200 font-mono">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 text-[11px] leading-relaxed max-w-xs font-medium">{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
