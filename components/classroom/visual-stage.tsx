"use client";

import { useState } from "react";
import { VisualPayload } from "@/types/teaching";
import { Sliders, Zap, Droplets, Activity } from "lucide-react";

interface VisualStageProps {
  visual: VisualPayload;
}

export function VisualStage({ visual }: VisualStageProps) {
  // Local interactive states for simulations
  const [cartForce, setCartForce] = useState<number>(40);
  const cartMass = 10;
  const cartAcceleration = (cartForce / cartMass).toFixed(1);

  // Circuit simulation states
  const [resistance, setResistance] = useState<number>(50);
  const voltage = 12;
  const current = (voltage / resistance).toFixed(2);
  const bulbBrightness = Math.max(10, Math.min(100, Math.round((parseFloat(current) / 0.48) * 100)));

  return (
    <div className="relative rounded-3xl border border-slate-200 bg-white p-5 shadow-lg flex flex-col justify-between overflow-hidden">
      {/* Visual Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-sky-700 font-bold">
            Visual Intelligence • {visual.type}
          </span>
          <h3 className="text-sm font-bold text-slate-900 mt-0.5">{visual.title}</h3>
        </div>
        <span className="text-[10px] text-slate-600 rounded-full bg-slate-100 px-2.5 py-1 border border-slate-200 font-medium">
          Live Interactive Stage
        </span>
      </div>

      {/* DYNAMIC VISUAL CONTENT RENDERING */}
      <div className="flex-1 flex items-center justify-center min-h-[260px] py-2">
        {/* CASE 1: EQUATION DISPLAY */}
        {visual.type === "EQUATION" && (
          <div className="w-full text-center space-y-6">
            <div className="inline-block rounded-2xl border border-sky-300 bg-sky-50/70 px-8 py-6 shadow-sm">
              <span className="font-mono text-4xl sm:text-5xl font-black tracking-wider text-slate-900">
                {visual.data?.formula || "F = m · a"}
              </span>
            </div>

            {/* Variable breakdowns */}
            {visual.data?.variables && (
              <div className="grid grid-cols-3 gap-2 max-w-md mx-auto text-xs">
                {visual.data.variables.map((v: any, i: number) => (
                  <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 shadow-2xs">
                    <p className="font-mono font-bold text-base" style={{ color: v.color }}>
                      {v.symbol}
                    </p>
                    <p className="font-bold text-slate-800 text-[11px]">{v.name}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{v.unit}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CASE 2: DIAGRAM */}
        {visual.type === "DIAGRAM" && (
          <div className="w-full space-y-4">
            {visual.data?.diagramType === "physics_cart" || (!visual.data?.steps && !visual.data?.cards) ? (
              <>
                <div className="relative h-44 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-center overflow-hidden">
                  <div className="absolute bottom-6 left-0 right-0 h-1 bg-slate-300" />
                  <div
                    className="relative rounded-2xl border-2 border-sky-500 bg-white p-4 text-center transition-all duration-300 shadow-md"
                    style={{ width: "160px", transform: `translateX(${Math.min(60, cartForce - 40)}px)` }}
                  >
                    <span className="text-xs font-bold text-slate-900 block">Mass = {cartMass} kg</span>
                    <span className="text-[10px] text-slate-500">Cart body</span>
                    <div className="absolute -bottom-3 left-4 h-5 w-5 rounded-full border-2 border-slate-700 bg-slate-800" />
                    <div className="absolute -bottom-3 right-4 h-5 w-5 rounded-full border-2 border-slate-700 bg-slate-800" />
                  </div>
                  <div
                    className="absolute flex items-center transition-all duration-300"
                    style={{ left: "calc(50% + 80px)" }}
                  >
                    <div
                      className="h-2 bg-gradient-to-r from-amber-500 to-rose-600 rounded-l"
                      style={{ width: `${Math.min(120, cartForce * 1.5)}px` }}
                    />
                    <div className="w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[11px] border-l-rose-600" />
                    <span className="ml-2 font-mono text-xs font-bold text-rose-700 whitespace-nowrap">
                      F = {cartForce} N
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-3 border border-slate-200">
                  <span className="text-xs font-medium text-slate-600 whitespace-nowrap">Adjust Net Force:</span>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={cartForce}
                    onChange={(e) => setCartForce(parseInt(e.target.value))}
                    className="w-full accent-sky-600 cursor-pointer"
                  />
                  <span className="font-mono text-xs font-bold text-sky-700 min-w-[3.5rem] text-right">
                    a = {cartAcceleration} m/s²
                  </span>
                </div>
              </>
            ) : (
              <div className="w-full py-4 text-center space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(visual.data?.steps || visual.data?.cards || ["Core Concept", "Interaction", "Output"]).map(
                    (item: any, idx: number) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-sky-200 bg-sky-50/70 p-4 shadow-2xs text-left space-y-1.5"
                      >
                        <span className="text-[10px] font-mono font-bold text-sky-700">0{idx + 1}</span>
                        <h4 className="text-xs font-bold text-slate-900">{typeof item === "string" ? item : item.title}</h4>
                        {typeof item === "object" && item.detail && (
                          <p className="text-[11px] text-slate-600 leading-relaxed">{item.detail}</p>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* CASE 3: ANALOGY VISUAL */}
        {visual.type === "ANALOGY" && (
          <div className="w-full space-y-4">
            {visual.data?.analogyType === "hydraulic_pipe" ? (
              <div className="rounded-2xl border border-amber-300 bg-amber-50/70 p-4">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-xs mb-3">
                  <Droplets className="h-4 w-4 text-amber-600" />
                  <span>Hydraulic Analogy: Visualizing Ohm's Law (I = V / R)</span>
                </div>
                <div className="relative h-28 w-full rounded-xl bg-white border border-amber-200 flex items-center justify-between px-6 overflow-hidden shadow-xs">
                  <div className="flex flex-col items-center">
                    <div className="h-14 w-14 rounded-full border-2 border-emerald-500 bg-emerald-50 flex items-center justify-center font-bold text-emerald-800 text-xs text-center p-1 shadow-xs">
                      Water Pump (12V)
                    </div>
                    <span className="text-[9px] font-semibold text-slate-600 mt-1">Driving Pressure</span>
                  </div>
                  <div className="relative flex flex-col items-center">
                    <div className="h-16 w-12 rounded-lg border-2 border-rose-500 bg-rose-50 flex flex-col items-center justify-center text-center p-1 shadow-xs">
                      <span className="text-[10px] font-bold text-rose-800">Pinch Clamp</span>
                      <span className="text-[8px] text-slate-500">High Resistance</span>
                    </div>
                    <span className="text-[9px] font-bold text-rose-700 mt-1">Restricts Flow</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-24 rounded-lg border border-sky-400 bg-sky-50 flex items-center justify-center gap-1 text-sky-800 text-xs font-bold font-mono shadow-xs">
                      <Activity className="h-3.5 w-3.5 animate-pulse text-sky-600" />
                      Low Flow
                    </div>
                    <span className="text-[9px] font-semibold text-slate-600 mt-1">Throttled Current (I)</span>
                  </div>
                </div>
                <p className="text-xs text-slate-800 mt-3 leading-relaxed font-medium">
                  Notice: Squeezing the pipe <strong className="text-rose-700">more tightly (higher resistance)</strong>{" "}
                  forces <strong className="text-amber-800">less water (lower current)</strong> to pass through per second.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-amber-300 bg-gradient-to-br from-amber-50/80 to-orange-50/60 p-5 space-y-4">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                  <Droplets className="h-4 w-4 text-amber-600" />
                  <span>Real-World Pedagogical Analogy</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-xl bg-white border border-amber-200 p-3 shadow-2xs">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Driving Drive / Input</span>
                    <span className="text-xs font-bold text-emerald-800 block mt-1">
                      {visual.data?.pressureLevel || "Input Potential"}
                    </span>
                  </div>
                  <div className="rounded-xl bg-white border border-amber-200 p-3 shadow-2xs">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Constraint / Load</span>
                    <span className="text-xs font-bold text-rose-800 block mt-1">
                      {visual.data?.constrictionLevel || "Constriction / Constraint"}
                    </span>
                  </div>
                  <div className="rounded-xl bg-white border border-amber-200 p-3 shadow-2xs">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Observable Output</span>
                    <span className="text-xs font-bold text-sky-800 block mt-1">
                      {visual.data?.flowRate || "Throughput Rate"}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {visual.caption || "Applying real-world intuitive models helps convert abstract rules into clear mental pictures."}
                </p>
              </div>
            )}
          </div>
        )}

        {/* CASE 4: SIMULATION */}
        {visual.type === "SIMULATION" && (
          <div className="w-full space-y-4">
            {visual.data?.circuitType === "single_loop" || (!visual.data?.parameterName && !visual.data?.steps) ? (
              <>
                <div className="relative h-44 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-around overflow-hidden shadow-xs">
                  <div className="flex flex-col items-center">
                    <div className="h-16 w-12 rounded-xl border-2 border-emerald-500 bg-white flex items-center justify-center font-bold text-emerald-700 text-xs shadow-xs">
                      {voltage}V DC
                    </div>
                    <span className="text-[10px] text-slate-600 mt-1 font-semibold">Voltage Source</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-24 rounded-lg border-2 border-dashed border-rose-400 bg-rose-50 flex items-center justify-center font-mono text-xs text-rose-800 font-bold shadow-xs">
                      {resistance} Ω
                    </div>
                    <span className="text-[10px] text-slate-600 mt-1 font-semibold">Resistance (R)</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="relative h-14 w-14 rounded-full border-2 transition-all duration-300 flex items-center justify-center"
                      style={{
                        backgroundColor: `rgba(250, 204, 21, ${bulbBrightness / 100})`,
                        borderColor: bulbBrightness > 40 ? "#ca8a04" : "#94a3b8",
                        boxShadow: bulbBrightness > 30 ? `0 0 ${bulbBrightness / 2}px rgba(250, 204, 21, 0.7)` : "none",
                      }}
                    >
                      <Zap className={`h-6 w-6 ${bulbBrightness > 40 ? "text-slate-900" : "text-slate-500"}`} />
                    </div>
                    <span className="text-[10px] text-slate-800 mt-1 font-bold">
                      Bulb: {bulbBrightness}% Lumens
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-3 border border-slate-200">
                  <span className="text-xs font-medium text-slate-600 whitespace-nowrap">Adjust Circuit Resistance:</span>
                  <input
                    type="range"
                    min="10"
                    max="120"
                    value={resistance}
                    onChange={(e) => setResistance(parseInt(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                  <span className="font-mono text-xs font-bold text-slate-900 min-w-[4rem] text-right">
                    I = {current} A
                  </span>
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{visual.title}</span>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold">Dynamic State: Active</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(visual.data?.steps || ["Input A", "Processing", "Reaction", "Equilibrium"]).map((s: string, idx: number) => (
                    <div key={idx} className="rounded-xl bg-white border border-slate-200 p-2.5 text-center shadow-2xs">
                      <span className="text-[9px] font-mono text-slate-400 font-bold block">Stage 0{idx + 1}</span>
                      <span className="text-xs font-bold text-slate-800">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* DEFAULT FALLBACK / FLOWCHART / PROCESS */}
        {(visual.type === "FLOWCHART" || visual.type === "PROCESS" || visual.type === "COMPARISON") && (
          <div className="w-full text-center space-y-3">
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {(visual.data?.steps || ["Input Axiom", "System Dynamics", "Observable Output"]).map(
                (st: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="rounded-2xl border border-sky-300 bg-sky-50 px-5 py-3.5 text-xs font-bold text-sky-900 shadow-xs">
                      {st}
                    </div>
                    {idx < (visual.data?.steps?.length || 3) - 1 && (
                      <span className="text-slate-400 font-bold">→</span>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        )}

      </div>

      {/* Caption footer */}
      <div className="border-t border-slate-200 pt-2 text-[11px] text-slate-600 italic font-medium">
        {visual.caption}
      </div>
    </div>
  );
}
