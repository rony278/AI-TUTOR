"use client";

import { useState } from "react";
import { QuestionData, EvaluationResult } from "@/types/teaching";
import {
  HelpCircle,
  Lightbulb,
  Mic,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

interface InteractiveQuestionProps {
  question: QuestionData;
  onSubmitAnswer: (answer: string, selectedOptionId?: string) => Promise<void>;
  evaluation?: EvaluationResult;
  isEvaluating: boolean;
  onNextStep: () => void;
}

export function InteractiveQuestion({
  question,
  onSubmitAnswer,
  evaluation,
  isEvaluating,
  onNextStep,
}: InteractiveQuestionProps) {
  const [selectedOptId, setSelectedOptId] = useState<string>("");
  const [freeTextAnswer, setFreeTextAnswer] = useState<string>("");
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);

  // Toggle voice recognition
  const toggleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      setFreeTextAnswer("Current decreases because higher resistance opposes the flow of charges.");
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
          setFreeTextAnswer(transcript);
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
      setFreeTextAnswer("Current decreases because higher resistance opposes the flow of charges.");
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isEvaluating) return;

    if (question.type === "MCQ") {
      if (!selectedOptId) return;
      const opt = question.options?.find((o) => o.id === selectedOptId);
      await onSubmitAnswer(opt?.text || "", selectedOptId);
    } else {
      if (!freeTextAnswer.trim()) return;
      await onSubmitAnswer(freeTextAnswer);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600 border border-amber-200">
            <HelpCircle className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 font-bold">
              Diagnostic Checkpoint • {question.type}
            </span>
            <h4 className="text-xs font-bold text-slate-900">{question.conceptTitle}</h4>
          </div>
        </div>

        {/* Hint button */}
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-1 text-[11px] text-slate-600 hover:text-amber-800 rounded-full px-2.5 py-1 border border-slate-200 hover:border-amber-300 hover:bg-amber-50 transition-colors font-medium"
        >
          <Lightbulb className="h-3 w-3 text-amber-600" />
          <span>{showHint ? "Hide Hint" : "Get Hint"}</span>
        </button>
      </div>

      {/* Hint panel */}
      {showHint && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-900">
          <strong>Teacher Hint:</strong> {question.hint}
        </div>
      )}

      {/* Prompt */}
      <p className="text-sm font-bold text-slate-900 leading-snug">{question.prompt}</p>

      {/* OPTIONS (MCQ) or TEXT INPUT */}
      {!evaluation ? (
        question.type === "MCQ" && question.options ? (
          <div className="space-y-2">
            {question.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedOptId(opt.id)}
                className={`w-full flex items-center justify-between rounded-2xl p-3.5 text-left text-xs font-medium border transition-all ${
                  selectedOptId === opt.id
                    ? "border-sky-500 bg-sky-50/90 text-sky-950 font-bold shadow-xs ring-1 ring-sky-500"
                    : "border-slate-200 bg-slate-50/70 text-slate-800 hover:border-slate-300 hover:bg-slate-100"
                }`}
              >
                <span>{opt.text}</span>
                <span
                  className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                    selectedOptId === opt.id
                      ? "border-sky-600 bg-sky-600 text-white font-bold text-[10px]"
                      : "border-slate-400"
                  }`}
                >
                  {selectedOptId === opt.id && "✓"}
                </span>
              </button>
            ))}

            <button
              onClick={() => handleSubmit()}
              disabled={!selectedOptId || isEvaluating}
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 py-3 text-xs font-bold text-white shadow-md shadow-sky-500/20 hover:brightness-105 disabled:opacity-50 transition-all"
            >
              {isEvaluating ? "Evaluating Your Reasoning..." : "Submit Answer"}
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <textarea
                rows={3}
                value={freeTextAnswer}
                onChange={(e) => setFreeTextAnswer(e.target.value)}
                placeholder="Explain in your own words using physical concepts or analogies..."
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-3.5 pr-10 text-xs text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              <button
                type="button"
                onClick={toggleVoiceInput}
                title={isListening ? "Listening..." : "Click to speak answer"}
                className={`absolute right-3 top-3 p-1.5 rounded-xl transition-colors ${
                  isListening
                    ? "bg-rose-500 text-white animate-pulse"
                    : "text-slate-500 hover:text-sky-600 hover:bg-slate-200"
                }`}
              >
                <Mic className="h-4 w-4" />
              </button>
            </div>

            <button
              type="submit"
              disabled={!freeTextAnswer.trim() || isEvaluating}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 py-3 text-xs font-bold text-white shadow-md shadow-sky-500/20 hover:brightness-105 disabled:opacity-50 transition-all"
            >
              {isEvaluating ? "Evaluating Your Reasoning..." : "Submit Explanation"}
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        )
      ) : (
        /* EVALUATION FEEDBACK DISPLAY */
        <div className="space-y-3 pt-2">
          <div
            className={`rounded-2xl border p-4 text-xs space-y-2 ${
              evaluation.isCorrect
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border-rose-200 bg-rose-50 text-rose-900"
            }`}
          >
            <div className="flex items-center justify-between font-bold">
              <span className="flex items-center gap-1.5">
                {evaluation.isCorrect ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Mastery Check: Correct ({evaluation.score}%)
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 text-rose-600" />
                    Misconception Triggered ({evaluation.score}%)
                  </>
                )}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                Action: {evaluation.recommendedAction}
              </span>
            </div>

            <p className="leading-relaxed font-medium">{evaluation.feedback}</p>
            <p className="text-xs text-sky-800 font-bold italic">{evaluation.encouragement}</p>
          </div>

          <button
            onClick={onNextStep}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3 text-xs font-bold text-white shadow-md shadow-emerald-500/20 hover:brightness-105 transition-all"
          >
            <span>Continue Adaptive Lesson</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
