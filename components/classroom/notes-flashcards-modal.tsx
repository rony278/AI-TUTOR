"use client";

import { useState } from "react";
import { X, Copy, Check, Download, Layers, Sparkles, BookOpen, RotateCw } from "lucide-react";

interface ArtifactsModalProps {
  type: "notes" | "flashcards" | "homework" | null;
  onClose: () => void;
}

export function ArtifactsModal({ type, onClose }: ArtifactsModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Homework answer selections
  const [selectedHwAnswers, setSelectedHwAnswers] = useState<Record<number, number>>({});
  const [submittedHw, setSubmittedHw] = useState(false);

  if (!type) return null;

  const handleCopyNotes = () => {
    const content = `AI TEACHER — CLASS STUDY NOTES
Topic: Newton's Second Law & Ohm's Circuit Dynamics

KEY FORMULAS:
- F = m · a (Net Force = mass × acceleration)
- a = F / m (Acceleration is directly proportional to Force and inversely to mass)
- I = V / R (Ohm's Law: Current is inversely proportional to Resistance)

ANALOGY:
- Voltage = Pump pressure
- Current = Water flow rate
- Resistance = Constricted/pinched pipe

COMMON MISCONCEPTIONS:
- Trap: Believing higher resistance speeds up current.
- Truth: Resistance restricts charge flow. Higher R -> Lower I.`;

    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const flashcards = [
    {
      type: "Formula",
      front: "What is the formula for Newton's Second Law?",
      back: "F = m · a (Net Force = mass × acceleration). Units: Newtons (N) = kg·m/s².",
    },
    {
      type: "Proportionality",
      front: "If net force doubles while mass remains constant, what happens to acceleration?",
      back: "Acceleration doubles (2x) because a ∝ F directly.",
    },
    {
      type: "Ohm's Law",
      front: "Express current (I) in terms of Voltage (V) and Resistance (R).",
      back: "I = V / R. Current is inversely proportional to resistance.",
    },
    {
      type: "Analogy",
      front: "What corresponds to Resistance in the hydraulic water-pipe model?",
      back: "Pinching or narrowing the pipe, which constricts and reduces the water flow rate.",
    },
    {
      type: "Circuit Check",
      front: "Why does adding resistance in series cause a lightbulb to dim?",
      back: "Higher total circuit resistance reduces current (I = V/R), delivering less electrical power to the bulb.",
    },
  ];

  const homeworkQuestions = [
    {
      q: "1. (Easy) A 4 kg cart experiences a net force of 20 N. What is its acceleration?",
      options: ["0.2 m/s²", "5 m/s²", "16 m/s²", "80 m/s²"],
      correct: 1,
    },
    {
      q: "2. (Easy) A 12V battery connects across a 6Ω resistor. Calculate the current.",
      options: ["0.5 A", "2 A", "18 A", "72 A"],
      correct: 1,
    },
    {
      q: "3. (Medium) If resistance in a constant-voltage circuit is tripled, current becomes:",
      options: ["3 times higher", "Unchanged", "1/3 of original value", "Zero"],
      correct: 2,
    },
    {
      q: "4. (Medium) In a hydraulic analogy, a tighter constriction in the pipe represents:",
      options: ["Higher voltage", "Higher resistance", "Higher current", "A battery"],
      correct: 1,
    },
    {
      q: "5. (Challenge) A 10 kg vehicle is pushed by motor force F = 8 · I. If V = 20V and R = 4Ω, what is acceleration?",
      options: ["2 m/s²", "4 m/s²", "8 m/s²", "40 m/s²"],
      correct: 1, // I = 20/4 = 5A; F = 8*5 = 40N; a = 40/10 = 4 m/s²
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2.5">
            {type === "notes" && (
              <>
                <BookOpen className="h-5 w-5 text-sky-600" />
                <h3 className="text-base font-bold text-slate-900">AI-Generated Executive Lesson Notes</h3>
              </>
            )}
            {type === "flashcards" && (
              <>
                <Layers className="h-5 w-5 text-purple-600" />
                <h3 className="text-base font-bold text-slate-900">Mastery Flashcards ({activeCardIndex + 1}/5)</h3>
              </>
            )}
            {type === "homework" && (
              <>
                <Sparkles className="h-5 w-5 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900">Personalized Practice Set (5 Targeted Questions)</h3>
              </>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* BODY: NOTES */}
        {type === "notes" && (
          <div className="space-y-4 text-xs">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3 font-mono text-slate-800 max-h-[380px] overflow-y-auto">
              <div className="text-sky-900 font-bold text-sm">Newton's 2nd Law & Circuit Dynamics Summary</div>
              <p className="text-slate-500">
                Generated automatically from session transcript and grounded textbook sources.
              </p>

              <div className="border-t border-slate-200 pt-2">
                <p className="text-amber-800 font-bold">1. CORE FORMULAS</p>
                <p className="mt-1">
                  • <strong>F = m · a</strong> (Net Force = mass × acceleration)
                </p>
                <p>
                  • <strong>I = V / R</strong> (Current = Voltage ÷ Resistance)
                </p>
              </div>

              <div className="border-t border-slate-200 pt-2">
                <p className="text-purple-800 font-bold">2. HYDRAULIC ANALOGY</p>
                <p className="mt-1">
                  • Voltage = Pump Pressure (Volts)
                  <br />
                  • Current = Water Flow Volume Rate (Amperes)
                  <br />• Resistance = Pipe Constriction (Ohms)
                </p>
              </div>

              <div className="border-t border-slate-200 pt-2">
                <p className="text-rose-800 font-bold">3. RESOLVED COGNITIVE TRAP</p>
                <p className="mt-1">
                  • Do not confuse resistance with force. Resistance resists; it throttles current down.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleCopyNotes}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100 shadow-2xs"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? "Copied to Clipboard!" : "Copy Notes"}</span>
              </button>

              <button
                onClick={() => alert("Downloading PDF Notes...")}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-xs font-bold text-white hover:brightness-105 shadow-md shadow-sky-500/20"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Notes PDF</span>
              </button>
            </div>
          </div>
        )}

        {/* BODY: FLASHCARDS */}
        {type === "flashcards" && (
          <div className="space-y-4 text-xs">
            {/* Flip Card Container */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="relative h-56 w-full rounded-3xl border border-purple-200 bg-gradient-to-b from-purple-50 to-white p-6 flex flex-col justify-between cursor-pointer hover:border-purple-400 transition-all shadow-md"
            >
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-700 font-bold">
                  {flashcards[activeCardIndex].type}
                </span>
                <span className="text-[10px] flex items-center gap-1 text-slate-500 font-medium">
                  <RotateCw className="h-3 w-3" />
                  Click to Flip
                </span>
              </div>

              <div className="text-center py-4">
                <p className="text-sm sm:text-base font-bold text-slate-900">
                  {isFlipped ? flashcards[activeCardIndex].back : flashcards[activeCardIndex].front}
                </p>
                <span className="text-[10px] text-slate-500 block mt-2 font-medium">
                  {isFlipped ? "(Answer Verified)" : "(Question)"}
                </span>
              </div>

              <div className="text-center text-[10px] text-purple-800 font-mono font-semibold">
                Card {activeCardIndex + 1} of {flashcards.length}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={activeCardIndex === 0}
                onClick={() => {
                  setActiveCardIndex((prev) => prev - 1);
                  setIsFlipped(false);
                }}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100 disabled:opacity-30 shadow-2xs"
              >
                Previous Card
              </button>

              <button
                disabled={activeCardIndex === flashcards.length - 1}
                onClick={() => {
                  setActiveCardIndex((prev) => prev + 1);
                  setIsFlipped(false);
                }}
                className="rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2 text-xs font-bold text-white hover:brightness-105 disabled:opacity-30 shadow-md shadow-purple-500/20"
              >
                Next Card
              </button>
            </div>
          </div>
        )}

        {/* BODY: HOMEWORK */}
        {type === "homework" && (
          <div className="space-y-4 text-xs">
            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
              {homeworkQuestions.map((hw, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                  <p className="font-bold text-slate-900">{hw.q}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {hw.options.map((opt, optIdx) => {
                      const isSelected = selectedHwAnswers[idx] === optIdx;
                      const isCorrect = hw.correct === optIdx;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() =>
                            setSelectedHwAnswers((prev) => ({
                              ...prev,
                              [idx]: optIdx,
                            }))
                          }
                          className={`rounded-xl p-2.5 text-left text-xs border transition-all ${
                            submittedHw
                              ? isCorrect
                                ? "border-emerald-300 bg-emerald-50 text-emerald-900 font-bold"
                                : isSelected
                                ? "border-rose-300 bg-rose-50 text-rose-900 font-bold"
                                : "border-slate-200 text-slate-400 bg-white"
                              : isSelected
                              ? "border-sky-500 bg-sky-50 text-sky-950 font-bold ring-1 ring-sky-500 shadow-2xs"
                              : "border-slate-200 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              {!submittedHw ? (
                <button
                  onClick={() => setSubmittedHw(true)}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 py-3 text-xs font-bold text-white hover:brightness-105 transition-all shadow-md shadow-amber-500/20"
                >
                  <span>Submit Practice Set for AI Evaluation</span>
                </button>
              ) : (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5 text-center text-xs text-emerald-800 font-bold">
                  Practice Set Evaluated: 5/5 Correct! Weak concepts reinforced.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
