"use client";

import { useState } from "react";
import { Play, Sparkles, Send, X } from "lucide-react";

interface InterruptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInterrupt: (query: string) => Promise<string>;
  onResumeLesson: () => void;
  activeConceptTitle: string;
}

export function InterruptionModal({
  isOpen,
  onClose,
  onInterrupt,
  onResumeLesson,
  activeConceptTitle,
}: InterruptionModalProps) {
  const [query, setQuery] = useState("Wait, why does current decrease when resistance increases?");
  const [teacherReply, setTeacherReply] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isProcessing) return;

    setIsProcessing(true);
    const reply = await onInterrupt(query);
    setTeacherReply(reply);
    setIsProcessing(false);
  };

  const handleResume = () => {
    setTeacherReply(null);
    onResumeLesson();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4">
      <div className="w-full max-w-lg rounded-3xl border border-amber-300 bg-white p-6 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-200 pb-3">
          <div className="flex items-center gap-2 text-amber-800">
            <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500 animate-ping" />
            <h4 className="text-sm font-bold font-mono uppercase tracking-wider">
              REAL-TIME INTERRUPTION MODE
            </h4>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs text-slate-700">
          Lesson paused on: <strong className="text-slate-900">{activeConceptTitle}</strong>. Your teacher will address
          your question without resetting lesson state.
        </p>

        {/* Query Input or Teacher Reply */}
        {!teacherReply ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask teacher anything right now..."
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setQuery("Can you explain this in Hindi or Hinglish?")}
                className="text-[11px] text-amber-800 font-bold hover:underline"
              >
                Quick: "Explain this in Hindi"
              </button>

              <button
                type="submit"
                disabled={isProcessing}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-xs font-bold text-white hover:brightness-105 disabled:opacity-50 shadow-xs"
              >
                {isProcessing ? "Teacher Thinking..." : "Ask Question"}
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 pt-1">
            <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 space-y-2 text-xs text-amber-950">
              <div className="flex items-center gap-2 font-bold text-amber-800">
                <Sparkles className="h-4 w-4 text-amber-600" />
                <span>Dr. Sarah Vance (AI Educator):</span>
              </div>
              <p className="text-slate-800 leading-relaxed font-medium">{teacherReply}</p>
            </div>

            <button
              onClick={handleResume}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3 text-xs font-bold text-white hover:brightness-105 shadow-md shadow-emerald-500/20 transition-all"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>Resume Lesson From Checkpoint</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
