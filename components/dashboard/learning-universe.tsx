"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ConceptNode } from "@/types/teaching";

interface LearningUniverseProps {
  nodes: ConceptNode[];
  onSelectConcept?: (node: ConceptNode) => void;
}

export function LearningUniverse({ nodes, onSelectConcept }: LearningUniverseProps) {
  const [selectedNode, setSelectedNode] = useState<ConceptNode>(nodes[0] || null);

  // Position nodes radially/constellation-style on canvas
  const nodeCoordinates = [
    { x: 50, y: 35 }, // Newton 2nd law (Center top)
    { x: 22, y: 65 }, // Voltage (Left)
    { x: 50, y: 70 }, // Current (Center bottom)
    { x: 78, y: 60 }, // Resistance & Ohm's Law (Right)
    { x: 82, y: 25 }, // Series Circuits (Top Right)
  ];

  return (
    <div className="relative rounded-3xl border border-slate-200 bg-gradient-to-b from-sky-50/30 via-white to-slate-50 p-6 sm:p-8 shadow-xl overflow-hidden backdrop-blur-2xl">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute -top-10 left-1/3 h-64 w-64 rounded-full bg-sky-200/40 blur-[90px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-indigo-200/30 blur-[90px]" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-sky-700 font-bold flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-sky-600" />
            Signature Feature • Topological Knowledge Representation
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">The Learning Universe</h3>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-medium">
          <span className="flex items-center gap-1 text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Mastered
          </span>
          <span className="flex items-center gap-1 text-amber-700">
            <span className="h-2 w-2 rounded-full bg-amber-500" /> Learning
          </span>
          <span className="flex items-center gap-1 text-rose-700">
            <span className="h-2 w-2 rounded-full bg-rose-500" /> Needs Revision
          </span>
        </div>
      </div>

      {/* Interactive Constellation Galaxy Canvas */}
      <div className="relative h-[340px] w-full rounded-2xl border border-slate-200 bg-slate-50/60 overflow-hidden shadow-inner">
        {/* SVG Constellation Connection Lines */}
        <svg className="absolute inset-0 h-full w-full pointer-events-none">
          <line x1="22%" y1="65%" x2="50%" y2="70%" stroke="rgba(2, 132, 199, 0.4)" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="22%" y1="65%" x2="78%" y2="60%" stroke="rgba(2, 132, 199, 0.3)" strokeWidth="2" />
          <line x1="50%" y1="70%" x2="78%" y2="60%" stroke="rgba(2, 132, 199, 0.5)" strokeWidth="2" />
          <line x1="78%" y1="60%" x2="82%" y2="25%" stroke="rgba(225, 29, 72, 0.5)" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="50%" y1="35%" x2="78%" y2="60%" stroke="rgba(124, 58, 237, 0.3)" strokeWidth="1.5" />
        </svg>

        {/* Nodes */}
        {nodes.map((node, i) => {
          const coords = nodeCoordinates[i] || { x: 50, y: 50 };
          const isSelected = selectedNode?.id === node.id;

          let glowColor = "border-amber-400 bg-white text-amber-900 shadow-md shadow-amber-500/15";
          if (node.status === "MASTERED") {
            glowColor = "border-emerald-500 bg-white text-emerald-900 shadow-md shadow-emerald-500/15";
          } else if (node.status === "STRUGGLING") {
            glowColor = "border-rose-400 bg-white text-rose-900 shadow-md shadow-rose-500/15";
          }

          return (
            <div
              key={node.id}
              onClick={() => {
                setSelectedNode(node);
                onSelectConcept?.(node);
              }}
              style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110 group"
            >
              <div
                className={`relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border-2 text-center p-1 transition-all ${glowColor} ${
                  isSelected ? "ring-2 ring-sky-500 scale-110 shadow-lg" : ""
                }`}
              >
                <div className="space-y-0.5">
                  <span className="font-mono text-xs sm:text-sm font-black block">
                    {node.masteryScore}%
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-bold line-clamp-1 block text-slate-700">
                    {node.title.split(" ")[0]}
                  </span>
                </div>

                {/* Animated Pulsing Orbit Ring for Selected */}
                {isSelected && (
                  <span className="absolute -inset-2 rounded-2xl border-2 border-sky-400/80 animate-ping pointer-events-none" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Inspector Drawer for Selected Node */}
      {selectedNode && (
        <motion.div
          key={selectedNode.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-xs"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-sky-700 uppercase">
                Concept Topology Node
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                  selectedNode.status === "MASTERED"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : selectedNode.status === "STRUGGLING"
                    ? "bg-rose-50 text-rose-800 border-rose-200"
                    : "bg-amber-50 text-amber-800 border-amber-200"
                }`}
              >
                {selectedNode.status}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              Mastery: <strong className="text-slate-900">{selectedNode.masteryScore}%</strong> • Confidence:{" "}
              <strong className="text-slate-900">{selectedNode.confidenceScore}%</strong>
            </div>
          </div>

          <p className="text-xs text-slate-700 font-medium">{selectedNode.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-200">
              <span className="text-[10px] font-mono text-slate-500 block font-semibold">Identified Misconceptions</span>
              <p className="text-slate-800 mt-0.5 font-medium">
                {selectedNode.misconceptionsIdentified.length > 0
                  ? selectedNode.misconceptionsIdentified.join(" • ")
                  : "No active misconceptions detected."}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-200">
              <span className="text-[10px] font-mono text-slate-500 block font-semibold">Textbook Grounding</span>
              <p className="text-slate-800 mt-0.5 truncate font-medium">
                {selectedNode.sourceDocument?.title || "Physics_Chapter_4.pdf (Page 37)"}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
