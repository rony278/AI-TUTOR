"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { TeacherAdaptationEvent } from "@/types/teaching";

interface AdaptationBannerProps {
  adaptation: TeacherAdaptationEvent;
}

export function AdaptationBanner({ adaptation }: AdaptationBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-3xl border border-rose-300 bg-rose-50/90 p-5 shadow-lg"
    >
      <div className="flex items-center justify-between border-b border-rose-200 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-rose-600 animate-ping" />
          <h4 className="text-xs font-mono font-bold tracking-widest text-rose-800 uppercase">
            ⚡ TEACHER ADAPTING IN REAL TIME
          </h4>
        </div>
        <span className="text-[10px] font-mono text-slate-700 bg-white px-2.5 py-0.5 rounded-full border border-rose-200 font-bold">
          Policy Engine Triggered
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        {/* Concept */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs">
          <span className="text-[10px] font-mono text-slate-500 block">Target Concept</span>
          <span className="font-bold text-slate-900 truncate block mt-0.5">{adaptation.concept}</span>
        </div>

        {/* Issue Detected */}
        <div className="rounded-2xl border border-rose-200 bg-white p-3 shadow-2xs">
          <span className="text-[10px] font-mono text-rose-700 block font-semibold">Issue Detected</span>
          <span className="font-bold text-rose-900 truncate block mt-0.5">{adaptation.issueDetected}</span>
        </div>

        {/* Strategy Pivot */}
        <div className="rounded-2xl border border-amber-200 bg-white p-3 shadow-2xs">
          <span className="text-[10px] font-mono text-amber-700 block font-semibold">Changing Strategy</span>
          <div className="flex items-center gap-1 text-[11px] font-bold text-amber-900 mt-0.5 truncate">
            <span>Technical</span>
            <ArrowRight className="h-3 w-3 shrink-0 text-amber-600" />
            <span className="text-emerald-700">Analogy</span>
          </div>
        </div>

        {/* Difficulty Calibration */}
        <div className="rounded-2xl border border-sky-200 bg-white p-3 shadow-2xs">
          <span className="text-[10px] font-mono text-sky-700 block font-semibold">Calibrated Difficulty</span>
          <div className="flex items-center gap-1 text-[11px] font-bold text-sky-900 mt-0.5">
            <span>{adaptation.previousDifficulty}</span>
            <ArrowRight className="h-3 w-3 shrink-0 text-sky-600" />
            <span className="text-emerald-700">{adaptation.newDifficulty}</span>
          </div>
        </div>
      </div>

      {/* Additional example notice */}
      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-800 bg-white px-3.5 py-2 rounded-xl border border-rose-100 shadow-2xs font-medium">
        <span className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-amber-600" />
          <span>Intervention: Visual hydraulic water-pipe constriction added to lesson plan</span>
        </span>
        <span className="text-[10px] text-emerald-700 font-mono font-bold">Next Checkpoint: Calibrated</span>
      </div>
    </motion.div>
  );
}
