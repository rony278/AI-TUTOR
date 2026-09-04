"use client";

import { useState } from "react";
import {
  HelpCircle,
  Mic,
  MicOff,
  Send,
  Sparkles,
  BookOpen,
  X,
  Volume2,
  CheckCircle2,
  BookmarkPlus,
  Loader2,
} from "lucide-react";
import { DoubtResolution } from "@/lib/teaching/doubt-engine";

interface DoubtPanelProps {
  isOpen: boolean;
  onClose: () => void;
  lessonId: string;
  onSpeak: (text: string) => void;
  onAddDoubtToAutoNotes: (doubt: string, answer: string, source: string) => void;
}

export function DoubtPanel({
  isOpen,
  onClose,
  lessonId,
  onSpeak,
  onAddDoubtToAutoNotes,
}: DoubtPanelProps) {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isResolving, setIsResolving] = useState(false);
  const [currentResolution, setCurrentResolution] = useState<DoubtResolution | null>(null);

  if (!isOpen) return null;

  // Voice speech-to-text
  const toggleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      setQuery("Why does current decrease when resistance increases?");
      return;
    }

    try {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;

      if (!isListening) {
        recognition.start();
        setIsListening(true);
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setQuery(transcript);
          setIsListening(false);
        };
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
      } else {
        recognition.stop();
        setIsListening(false);
      }
    } catch {
      setIsListening(false);
      setQuery("Why does current decrease when resistance increases?");
    }
  };

  const handleAskDoubt = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim() || isResolving) return;

    setIsResolving(true);
    try {
      const res = await fetch("/api/teacher/doubt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId,
          question: query,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCurrentResolution(data.resolution);
        onSpeak(data.resolution.audioSpeech);
        // Automatically save to auto-notes
        onAddDoubtToAutoNotes(
          data.resolution.question,
          data.resolution.answer,
          data.resolution.sourceType === "LESSON_TEACHINGS"
            ? `Lesson Teachings: ${data.resolution.matchedStepTitle}`
            : "Teacher Expert Synthesis"
        );
      }
    } catch {
      // fallback
    } finally {
      setIsResolving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4">
      <div className="w-full max-w-xl rounded-3xl border border-sky-300 bg-white p-6 sm:p-7 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 border border-sky-200">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Student Doubt System</h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Checks what was taught in the lesson first • Voice & Text enabled
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Doubt Input Form */}
        <form onSubmit={handleAskDoubt} className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask any doubt (e.g., 'Why does current decrease?' or 'What is F = ma?')"
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3.5 pr-20 text-xs text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium"
            />
            <div className="absolute right-2.5 top-2.5 flex items-center gap-1">
              <button
                type="button"
                onClick={toggleVoiceInput}
                title={isListening ? "Listening..." : "Click for Voice Input"}
                className={`p-1.5 rounded-xl transition-colors ${
                  isListening
                    ? "bg-rose-500 text-white animate-pulse"
                    : "text-slate-400 hover:text-sky-600 hover:bg-slate-200"
                }`}
              >
                <Mic className="h-4 w-4" />
              </button>
              <button
                type="submit"
                disabled={!query.trim() || isResolving}
                className="rounded-xl bg-sky-600 p-1.5 text-white hover:bg-sky-700 disabled:opacity-40 transition-colors"
              >
                {isResolving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Quick preset doubts */}
          <div className="flex flex-wrap gap-1.5 text-[11px]">
            <span className="text-slate-400 font-medium">Quick doubts:</span>
            <button
              type="button"
              onClick={() => setQuery("Why does current decrease when resistance increases?")}
              className="text-sky-700 font-bold hover:underline"
            >
              "Why does current decrease?"
            </button>
            •
            <button
              type="button"
              onClick={() => setQuery("What happens to acceleration if force doubles?")}
              className="text-sky-700 font-bold hover:underline"
            >
              "What if force doubles?"
            </button>
            •
            <button
              type="button"
              onClick={() => setQuery("What is friction force?")}
              className="text-sky-700 font-bold hover:underline"
            >
              "What is friction?"
            </button>
          </div>
        </form>

        {/* RESOLUTION RESULT DISPLAY */}
        {currentResolution && (
          <div className="space-y-3 pt-2">
            {/* Grounding Source Badge: LESSON TEACHING vs TEACHER EXPERT */}
            <div className="flex items-center justify-between">
              {currentResolution.sourceType === "LESSON_TEACHINGS" ? (
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200 shadow-2xs">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Found in Lesson Teachings ({currentResolution.matchedStepTitle})</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-800 border border-purple-200 shadow-2xs">
                  <Sparkles className="h-3.5 w-3.5 text-purple-600" />
                  <span>Teacher Expert Synthesis (Beyond Syllabus Covered)</span>
                </div>
              )}

              <button
                onClick={() => onSpeak(currentResolution.audioSpeech)}
                className="flex items-center gap-1 text-[11px] text-sky-700 font-bold hover:underline"
              >
                <Volume2 className="h-3.5 w-3.5" />
                <span>Listen</span>
              </button>
            </div>

            {/* Answer Box */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs">
              <p className="text-slate-900 leading-relaxed font-medium">{currentResolution.answer}</p>

              {currentResolution.groundedQuote && (
                <div className="border-t border-slate-200 pt-2 text-[11px] text-slate-600 italic bg-white p-2.5 rounded-xl border border-slate-200">
                  <strong className="text-emerald-700 not-italic">Textbook/Curriculum Citation:</strong> "
                  {currentResolution.groundedQuote.slice(0, 160)}..."
                </div>
              )}

              <div className="text-[10px] text-slate-500 pt-1 flex items-center justify-between font-mono">
                <span>{currentResolution.pedagogicalTip}</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <BookmarkPlus className="h-3 w-3" />
                  Auto-Saved to Notes
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
