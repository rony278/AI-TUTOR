"use client";

import { useState } from "react";
import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";
import { physicsKnowledgeGraph } from "@/lib/db/in-memory-db";
import { LearningUniverse } from "@/components/dashboard/learning-universe";

export default function KnowledgePage() {
  const [graph] = useState(physicsKnowledgeGraph);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-grid-pattern py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold flex items-center gap-1.5">
              <Compass className="h-4 w-4" />
              Cognitive Topology & Dependency Architecture
            </span>
            <h1 className="text-3xl font-black text-slate-900 mt-1">Knowledge Universe</h1>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              Interactive topological representation of your concept mastery, prerequisites, and active cognitive traps.
            </p>
          </div>

          <Link
            href="/classroom/lesson_physics_101"
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-sky-500/20 hover:brightness-105"
          >
            <span>Practice Active Concepts</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Learning Universe Visual */}
        <LearningUniverse nodes={graph.nodes} />

        {/* Detailed Concept Breakdown Table (Requirement #13) */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Full Concept Mastery Ledger</h3>
          <p className="text-xs text-slate-600 font-medium">
            Real-time tracking of difficulty, prerequisites, source grounding, and stability.
          </p>

          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 font-mono text-[10px] uppercase text-slate-500 font-bold">
                <tr>
                  <th className="pb-3 pr-4">Concept Title</th>
                  <th className="pb-3 px-4">Status</th>
                  <th className="pb-3 px-4">Mastery</th>
                  <th className="pb-3 px-4">Confidence</th>
                  <th className="pb-3 px-4">Difficulty</th>
                  <th className="pb-3 px-4">Prerequisites</th>
                  <th className="pb-3 pl-4">Decay Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {graph.nodes.map((n) => (
                  <tr key={n.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 pr-4 font-bold text-slate-900">{n.title}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                          n.status === "MASTERED"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : n.status === "STRUGGLING"
                            ? "bg-rose-50 text-rose-800 border-rose-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        }`}
                      >
                        {n.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">{n.masteryScore}%</td>
                    <td className="py-3.5 px-4 font-mono text-slate-700 font-semibold">{n.confidenceScore}%</td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">{n.difficulty}</td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      {n.prerequisites.length > 0 ? n.prerequisites.join(", ") : "None (Axiom)"}
                    </td>
                    <td className="py-3.5 pl-4 font-mono text-[11px]">
                      {(n.decayPercent || 0) > 20 ? (
                        <span className="text-amber-800 font-bold">At Risk ({n.decayPercent}% decay)</span>
                      ) : (
                        <span className="text-emerald-700 font-bold">Stable ({n.decayPercent || 0}% decay)</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
