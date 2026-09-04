"use client";

import { useState } from "react";
import {
  BookOpen,
  Copy,
  Check,
  Download,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export interface AutoNoteEntry {
  id: string;
  timestamp: string;
  type: "CONCEPT" | "FORMULA" | "MISCONCEPTION_RESOLVED" | "DOUBT_ANSWERED";
  title: string;
  detail: string;
  formulaSnippet?: string;
  sourceTag?: string;
}

interface LiveAutoNotesProps {
  entries: AutoNoteEntry[];
  lessonTitle: string;
}

export function LiveAutoNotes({ entries, lessonTitle }: LiveAutoNotesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const formatted = entries
      .map(
        (e) =>
          `[${e.timestamp}] ${e.title} (${e.type})\n${e.detail}${
            e.formulaSnippet ? `\nFormula: ${e.formulaSnippet}` : ""
          }\n`
      )
      .join("\n---\n\n");

    navigator.clipboard.writeText(`AI TEACHER — LIVE AUTOMATIC CLASS NOTES\nTopic: ${lessonTitle}\n\n${formatted}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const formatted = entries
      .map(
        (e) =>
          `### ${e.title} (${e.timestamp})\n**Type:** ${e.type}\n\n${e.detail}\n${
            e.formulaSnippet ? `\n\`\`\`\n${e.formulaSnippet}\n\`\`\`\n` : ""
          }`
      )
      .join("\n\n---\n\n");

    const blob = new Blob([`# AI Teacher — Class Study Notes\n**Topic:** ${lessonTitle}\n\n${formatted}`], {
      type: "text/markdown",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `AI_Teacher_Notes_${lessonTitle.replace(/\s+/g, "_")}.md`;
    a.click();
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-lg overflow-hidden">
      {/* Trigger Bar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-200">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-xs">Live Automatic Class Notes</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[9px] font-bold text-rose-700 border border-rose-200">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping" />
                Auto-Taking Notes ({entries.length})
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
          <span>{isOpen ? "Hide Notes" : "View Live Auto-Notes"}</span>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>

      {/* Expandable Auto-Notes Feed */}
      {isOpen && (
        <div className="border-t border-slate-200 p-5 space-y-4 bg-slate-50/60 text-xs">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-slate-500 font-medium">
              Notes are recorded automatically as your teacher explains concepts, demonstrates visuals, and answers doubts.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs hover:bg-slate-100"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? "Copied" : "Copy Notes"}</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1 text-[11px] font-bold text-sky-800 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200 shadow-2xs hover:bg-sky-100"
              >
                <Download className="h-3 w-3 text-sky-600" />
                <span>Export Markdown</span>
              </button>
            </div>
          </div>

          {/* Notes Timeline List */}
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {entries.map((entry) => {
              let badgeColor = "bg-sky-50 text-sky-800 border-sky-200";
              let Icon = FileText;

              if (entry.type === "FORMULA") {
                badgeColor = "bg-purple-50 text-purple-800 border-purple-200";
                Icon = Sparkles;
              } else if (entry.type === "MISCONCEPTION_RESOLVED") {
                badgeColor = "bg-emerald-50 text-emerald-800 border-emerald-200";
                Icon = CheckCircle2;
              } else if (entry.type === "DOUBT_ANSWERED") {
                badgeColor = "bg-amber-50 text-amber-900 border-amber-200";
                Icon = AlertTriangle;
              }

              return (
                <div
                  key={entry.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 space-y-1.5 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold border ${badgeColor}`}>
                        <Icon className="h-3 w-3" />
                        {entry.type.replace("_", " ")}
                      </span>
                      <h5 className="font-bold text-slate-900 text-xs">{entry.title}</h5>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">{entry.timestamp}</span>
                  </div>

                  <p className="text-slate-700 leading-relaxed font-medium text-[11px]">{entry.detail}</p>

                  {entry.formulaSnippet && (
                    <div className="font-mono text-xs font-bold text-sky-900 bg-sky-50/70 p-2 rounded-xl border border-sky-200 inline-block mt-1">
                      {entry.formulaSnippet}
                    </div>
                  )}

                  {entry.sourceTag && (
                    <div className="text-[10px] text-slate-500 pt-1 font-mono">
                      Source Grounding: <strong>{entry.sourceTag}</strong>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
