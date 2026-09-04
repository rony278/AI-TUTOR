"use client";

import { useState } from "react";
import { ExternalLink, X, ShieldCheck, FileText } from "lucide-react";

interface GroundedSourceModalProps {
  docTitle?: string;
  page?: number;
  section?: string;
  snippet?: string;
}

export function GroundedSourceBadge({
  docTitle = "Physics_Chapter_4_Dynamics_and_Circuits.pdf",
  page = 37,
  section = "Ohm's Law and Electrical Resistance",
  snippet = "Ohm's law defines the relationship between voltage (V), electric current (I), and resistance (R)... I = V / R. Resistance represents the opposition to the flow of electric charges. An analogy is water flowing through a constricted pipe: narrowing the pipe reduces the rate of water flow.",
}: GroundedSourceModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs text-emerald-800 hover:bg-emerald-100 transition-all shadow-2xs"
      >
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
        <span className="font-bold">Grounded in your material:</span>
        <span className="text-slate-600 group-hover:underline">
          Ch. 4, Pg. {page} ({section.split(" ")[0]}...)
        </span>
        <ExternalLink className="h-3 w-3 text-emerald-600 opacity-70 group-hover:opacity-100" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4">
          <div className="w-full max-w-lg rounded-3xl border border-emerald-300 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-emerald-50 p-2 text-emerald-700 border border-emerald-200">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Grounded Textbook Source</h4>
                  <p className="text-[11px] font-mono text-emerald-700 font-bold">Verified RAG Citation</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-500 font-mono text-[11px]">
                <span>Document: {docTitle}</span>
                <span className="text-emerald-700 font-bold">Page {page}</span>
              </div>
              <p className="font-bold text-slate-900">{section}</p>
              <div className="border-t border-slate-200 pt-2 text-slate-700 leading-relaxed italic bg-white p-3.5 rounded-xl border border-slate-200">
                "{snippet}"
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <ShieldCheck className="h-3.5 w-3.5" />
                100% Vector Retrieved Match
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-xl bg-slate-100 px-4 py-1.5 text-xs font-bold text-slate-800 hover:bg-slate-200 transition-all"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
