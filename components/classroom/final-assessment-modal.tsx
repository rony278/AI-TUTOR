"use client";

import Link from "next/link";
import { CheckCircle2, AlertTriangle, ArrowRight, BookOpen, Layers, Sparkles, Award } from "lucide-react";
import confetti from "canvas-confetti";

interface FinalAssessmentModalProps {
  isOpen: boolean;
  score: number;
  onOpenNotes: () => void;
  onOpenFlashcards: () => void;
  onOpenHomework: () => void;
}

export function FinalAssessmentModal({
  isOpen,
  score,
  onOpenNotes,
  onOpenFlashcards,
  onOpenHomework,
}: FinalAssessmentModalProps) {
  if (!isOpen) return null;

  // Trigger celebration confetti
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  } catch {}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-3xl border border-sky-300 bg-white p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
            <Award className="h-3.5 w-3.5" />
            Lesson Completed
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Pedagogical Assessment Summary</h2>
          <p className="text-xs text-slate-600">
            Your understanding has been evaluated across foundational axioms, mechanics, and circuit dynamics.
          </p>
        </div>

        {/* Large Score Display */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-gradient-to-b from-sky-50 to-white p-6 text-center shadow-xs">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">Overall Mastery Score</span>
          <span className="text-6xl font-black text-slate-900 my-1">
            {score}%
          </span>
          <p className="text-xs text-emerald-700 font-bold">Cognitive repair successfully verified</p>
        </div>

        {/* Mastered vs Needs Practice */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Mastered */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>MASTERED CONCEPTS</span>
            </div>
            <ul className="space-y-1.5 text-slate-800 font-medium">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                Newton's Second Law of Motion (F = ma)
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                Direct Proportionality of Force & Acceleration
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                Electrical Voltage Potential
              </li>
            </ul>
          </div>

          {/* Needs Practice */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span>RECOMMENDED PRACTICE</span>
            </div>
            <ul className="space-y-1.5 text-slate-800 font-medium">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Electrical Resistance & Constriction
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Series Circuit Equivalent Resistance
              </li>
            </ul>
          </div>
        </div>

        {/* Misconception Tracking */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs">
          <span className="font-mono text-slate-500 uppercase text-[10px] font-bold block">
            Cognitive Diagnostics & Resolution
          </span>
          <div className="space-y-1.5">
            <p className="text-slate-800">
              <strong className="text-rose-700">Initial Misconception:</strong> Student initially believed increasing
              resistance increases current flow.
            </p>
            <p className="text-emerald-800 font-medium">
              <strong className="text-emerald-700">Resolution:</strong> Teacher adapted to hydraulic water-pipe analogy.
              Student subsequently answered 2 follow-up verification questions with 100% accuracy.
            </p>
          </div>
        </div>

        {/* Next Best Action */}
        <div className="flex items-center justify-between rounded-2xl border border-sky-200 bg-sky-50 p-4 text-xs">
          <div>
            <span className="text-[10px] font-mono text-sky-700 block uppercase font-bold">Next Best Concept</span>
            <span className="font-bold text-slate-900 text-sm">Series & Parallel Circuit Networks</span>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-sky-800 font-bold border border-sky-200 shadow-2xs">
            5 min recommended
          </span>
        </div>

        {/* ACTION BUTTONS */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <button
            onClick={onOpenNotes}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors shadow-2xs"
          >
            <BookOpen className="h-3.5 w-3.5 text-sky-600" />
            <span>Download Notes</span>
          </button>
          <button
            onClick={onOpenFlashcards}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors shadow-2xs"
          >
            <Layers className="h-3.5 w-3.5 text-purple-600" />
            <span>Review Flashcards</span>
          </button>
          <button
            onClick={onOpenHomework}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors shadow-2xs"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>5-Q Practice Set</span>
          </button>
        </div>

        {/* Continue to dashboard */}
        <Link
          href="/dashboard"
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 py-3.5 text-xs font-bold text-white hover:brightness-105 shadow-md shadow-sky-500/20 transition-all"
        >
          <span>Return to Dashboard & Learning Universe</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
