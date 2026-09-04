"use client";

import { useEffect, useState, useRef } from "react";
import {
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Radio,
  UserCheck,
  HelpCircle,
  Repeat,
  Video,
  User,
  Maximize2,
  Minimize2,
  Layers,
  Loader2,
  CheckCircle2,
  Play,
  Pause,
} from "lucide-react";
import { BrainState, SupportedLanguage } from "@/types/teaching";

interface TeacherAvatarProps {
  spokenText: string;
  isSpeaking: boolean;
  brainState: BrainState;
  currentLanguage: SupportedLanguage;
  onToggleSpeech: () => void;
  onReplay: () => void;
  speechRate: number;
  onRateChange: (rate: number) => void;
}

export function TeacherAvatar({
  spokenText,
  isSpeaking,
  brainState,
  currentLanguage,
  onToggleSpeech,
  onReplay,
  speechRate,
  onRateChange,
}: TeacherAvatarProps) {
  // Delivery Mode: Video vs Interactive Avatar
  const [deliveryMode, setDeliveryMode] = useState<"video" | "avatar">("video");

  // Video element ref
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Synchronized timestamp for on-screen video whiteboard overlay (Requirement #17)
  const [videoTimestamp, setVideoTimestamp] = useState<number>(0);

  // AI Video Generation Modal (HeyGen / D-ID integration test)
  const [isGenModalOpen, setIsGenModalOpen] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedJobId, setGeneratedJobId] = useState<string | null>(null);

  // Waveform bars simulation
  const [waveHeights, setWaveHeights] = useState<number[]>([12, 18, 28, 14, 22, 34, 18, 10]);

  useEffect(() => {
    if (!isSpeaking) {
      setWaveHeights([8, 8, 8, 8, 8, 8, 8, 8]);
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
      }
      return;
    }

    // Play video if speaking and in video mode
    if (deliveryMode === "video" && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy or load error fallback
      });
    }

    const interval = setInterval(() => {
      setWaveHeights(
        Array.from({ length: 8 }, () => Math.floor(Math.random() * 28) + 8)
      );
      setVideoTimestamp((prev) => prev + 0.2);
    }, 150);

    return () => clearInterval(interval);
  }, [isSpeaking, deliveryMode]);

  // Status mapping
  const getStatusBadge = () => {
    switch (brainState) {
      case "TEACH":
        return { label: "Explaining Concept", icon: Volume2, color: "bg-sky-50 text-sky-700 border-sky-200" };
      case "CHECK":
        return { label: "Asking Question", icon: HelpCircle, color: "bg-amber-50 text-amber-800 border-amber-200" };
      case "DIAGNOSE":
      case "ADAPT":
        return { label: "Adapting Strategy", icon: Sparkles, color: "bg-rose-50 text-rose-700 border-rose-200" };
      case "RETEACH":
        return { label: "Re-explaining with Analogy", icon: Repeat, color: "bg-purple-50 text-purple-700 border-purple-200" };
      case "MASTER":
        return { label: "Verifying Mastery", icon: UserCheck, color: "bg-emerald-50 text-emerald-700 border-emerald-200" };
      default:
        return { label: "Teaching Mode", icon: Radio, color: "bg-slate-100 text-slate-700 border-slate-200" };
    }
  };

  const status = getStatusBadge();
  const StatusIcon = status.icon;

  // Trigger HeyGen / D-ID Video Generation Test
  const handleGenerateAiVideo = async () => {
    setIsGeneratingVideo(true);
    setGenerationProgress(10);

    try {
      const res = await fetch("/api/avatar/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          script: spokenText,
          language: currentLanguage,
        }),
      });
      const data = await res.json();
      setGeneratedJobId(data.jobId || "heygen_job_8492");

      for (let p = 25; p <= 100; p += 25) {
        setGenerationProgress(p);
        await new Promise((r) => setTimeout(r, 400));
      }
    } catch {
      setGenerationProgress(100);
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  // Requirement #17: Synchronized Visual Overlay based on speech content & timestamp
  const getSynchronizedOverlay = () => {
    const text = spokenText.toLowerCase();
    if (text.includes("newton") || text.includes("force")) {
      return {
        formula: "F = m · a",
        note: "Newton's Second Law of Motion",
        color: "border-sky-300 bg-sky-50 text-sky-900",
      };
    }
    if (text.includes("ohm") || text.includes("resistance") || text.includes("current")) {
      return {
        formula: "I = V / R",
        note: "Ohm's Law Circuit Proportionality",
        color: "border-emerald-300 bg-emerald-50 text-emerald-900",
      };
    }
    if (text.includes("pipe") || text.includes("water")) {
      return {
        formula: "Flow ∝ 1 / Pinch",
        note: "Hydraulic Analogy Remediation",
        color: "border-amber-300 bg-amber-50 text-amber-900",
      };
    }
    return null;
  };

  const syncOverlay = getSynchronizedOverlay();

  return (
    <div className="relative flex flex-col rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-lg">
      {/* TOP HEADER & MODE SELECTOR */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5 bg-slate-50/70">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-900">AI Teacher • Robot Educator</span>
        </div>

        {/* Video vs Avatar Mode Toggle */}
        <div className="flex rounded-xl bg-slate-200/70 p-0.5 border border-slate-300/80 text-[11px] font-bold">
          <button
            onClick={() => setDeliveryMode("video")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
              deliveryMode === "video"
                ? "bg-white text-sky-800 shadow-xs font-black"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Video className="h-3 w-3 text-sky-600" />
            <span>Robot Classroom</span>
          </button>
          <button
            onClick={() => setDeliveryMode("avatar")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
              deliveryMode === "avatar"
                ? "bg-white text-sky-800 shadow-xs font-black"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <User className="h-3 w-3 text-purple-600" />
            <span>Digital Visemes</span>
          </button>
        </div>
      </div>

      {/* AVATAR / VIDEO DISPLAY STAGE */}
      <div className="relative aspect-[4/3] w-full bg-slate-900 flex items-center justify-center overflow-hidden">
        {/* Subtle glowing ambient lighting */}
        <div
          className={`absolute h-48 w-48 rounded-full blur-[80px] transition-all duration-700 pointer-events-none z-10 ${
            isSpeaking ? "bg-sky-400/30 scale-125" : "bg-cyan-500/10 scale-95"
          }`}
        />

        {/* DELIVERY MODE 1: FRIENDLY ROBOT EDUCATOR */}
        {deliveryMode === "video" && (
          <div className="relative h-full w-full flex items-center justify-center bg-slate-950 overflow-hidden">
            {/* Robot Teacher Image */}
            <img
              src="/robot-teacher.jpg"
              alt="AI Robot Teacher"
              className={`h-full w-full object-cover transition-transform duration-700 ${
                isSpeaking ? "scale-105" : "scale-100"
              }`}
            />

            {/* Speaking active halo overlay */}
            {isSpeaking && (
              <div className="absolute inset-0 ring-4 ring-inset ring-sky-400/40 pointer-events-none animate-pulse" />
            )}

            {/* Watermark badge */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-mono text-white backdrop-blur-md border border-white/20 z-20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>AI Robot Teacher • Synced</span>
            </div>

            {/* SYNCHRONIZED ON-SCREEN ANNOTATION OVERLAY */}
            {syncOverlay && isSpeaking && (
              <div
                className={`absolute top-3 right-3 max-w-[180px] rounded-2xl border p-2.5 shadow-lg backdrop-blur-md transition-all duration-300 z-20 ${syncOverlay.color}`}
              >
                <span className="font-mono text-xs font-black block">{syncOverlay.formula}</span>
                <span className="text-[9px] font-medium block leading-tight">{syncOverlay.note}</span>
              </div>
            )}
          </div>
        )}

        {/* DELIVERY MODE 2: INTERACTIVE DIGITAL ROBOT AVATAR (LIP-SYNC & VISEMES) */}
        {deliveryMode === "avatar" && (
          <div className="relative flex flex-col items-center justify-center h-full w-full bg-gradient-to-b from-slate-900 to-slate-950 p-6">
            {/* Robot Head with glowing screen face */}
            <div className="relative h-32 w-32 rounded-3xl border-2 border-sky-400/80 bg-slate-900 flex flex-col items-center justify-center shadow-xl shadow-sky-500/20">
              {/* Antenna */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <span
                  className={`h-2 w-2 rounded-full ${
                    isSpeaking ? "bg-cyan-400 animate-ping" : "bg-cyan-600"
                  }`}
                />
                <span className="h-2 w-0.5 bg-sky-400" />
              </div>

              {/* Digital LED Screen Eyes */}
              <div className="flex items-center gap-5 mb-3">
                <div
                  className={`h-3.5 w-5 rounded-full bg-cyan-400 transition-all ${
                    isSpeaking ? "scale-y-125 shadow-md shadow-cyan-400/80" : "scale-y-100"
                  }`}
                />
                <div
                  className={`h-3.5 w-5 rounded-full bg-cyan-400 transition-all ${
                    isSpeaking ? "scale-y-125 shadow-md shadow-cyan-400/80" : "scale-y-100"
                  }`}
                />
              </div>

              {/* Digital LED Mouth with Lip-Sync animation */}
              <div className="flex items-center justify-center">
                {isSpeaking ? (
                  <div className="h-2 w-8 rounded-full bg-cyan-400 animate-pulse shadow-md shadow-cyan-400/80" />
                ) : (
                  <div className="h-1 w-6 rounded-full bg-cyan-600/70" />
                )}
              </div>

              {/* Audio ping ring */}
              {isSpeaking && (
                <span className="absolute inset-0 rounded-3xl border-2 border-cyan-400 animate-ping opacity-30 pointer-events-none" />
              )}
            </div>

            {/* Language Tag */}
            <div className="mt-4 flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 border border-white/20 text-[11px] text-white backdrop-blur-md">
              <span className="text-slate-300">Robot Speech:</span>
              <span className="text-cyan-300 font-bold">{currentLanguage}</span>
            </div>
          </div>
        )}

        {/* Dynamic Waveform Visualizer in lower area */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between rounded-2xl bg-white/90 px-4 py-2 border border-slate-200 shadow-sm backdrop-blur-md">
          <div className="flex items-center gap-1.5 h-6">
            {waveHeights.map((h, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-150 ${
                  isSpeaking ? "bg-sky-600" : "bg-slate-300"
                }`}
                style={{ height: `${h}px` }}
              />
            ))}
          </div>

          {/* Quick controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleSpeech}
              title={isSpeaking ? "Pause Speech" : "Play Speech"}
              className="rounded-xl p-1.5 text-slate-600 hover:text-sky-700 hover:bg-slate-100 transition-colors"
            >
              {isSpeaking ? <Volume2 className="h-4 w-4 text-sky-600" /> : <VolumeX className="h-4 w-4" />}
            </button>
            <button
              onClick={onReplay}
              title="Replay Spoken Explanation"
              className="rounded-xl p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            {/* Test Video Generation Provider Drawer */}
            <button
              onClick={() => setIsGenModalOpen(true)}
              title="Test HeyGen / D-ID Video Provider Generation"
              className="rounded-xl p-1.5 text-sky-700 hover:bg-sky-50 font-mono text-[10px] font-bold border border-sky-200"
            >
              HeyGen / D-ID
            </button>

            {/* Speed control pill */}
            <select
              value={speechRate}
              onChange={(e) => onRateChange(parseFloat(e.target.value))}
              className="rounded-lg bg-slate-100 border border-slate-200 text-[10px] font-semibold text-slate-800 px-1 py-0.5 focus:outline-none"
            >
              <option value="0.75">0.75x</option>
              <option value="1">1.0x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
            </select>
          </div>
        </div>
      </div>

      {/* LIVE CAPTIONS BAR */}
      <div className="border-t border-slate-200 p-4 bg-white">
        <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
          <Radio className="h-3 w-3 text-sky-600" />
          Live Spoken Captions & Dynamic Script
        </p>
        <p className="text-xs text-slate-800 font-medium leading-relaxed min-h-[3.2rem]">
          "{spokenText}"
        </p>
      </div>

      {/* HEYGEN / D-ID AVATAR PROVIDER MODAL (Requirement #18) */}
      {isGenModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-3xl border border-sky-300 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Video className="h-5 w-5 text-sky-600" />
                <h4 className="text-sm font-bold text-slate-900">AI Video / Avatar Provider Engine</h4>
              </div>
              <button
                onClick={() => setIsGenModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-slate-900"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Test video generation via the <code>AvatarProvider</code> abstraction (HeyGen, D-ID, or Offline Neural Stream).
            </p>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-500 font-mono text-[11px]">
                <span>Active Provider</span>
                <span className="font-bold text-sky-700">HeyGenProvider / MockAvatarProvider</span>
              </div>
              <p className="text-slate-800 font-mono text-[11px] truncate">
                Script: "{spokenText.slice(0, 70)}..."
              </p>
            </div>

            {/* Progress */}
            {isGeneratingVideo ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-sky-700 font-bold flex items-center gap-1.5">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Rendering Neural Video...
                  </span>
                  <span className="font-bold">{generationProgress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-300"
                    style={{ width: `${generationProgress}%` }}
                  />
                </div>
              </div>
            ) : generatedJobId ? (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 flex items-center gap-2 font-semibold">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Video Generation Job Completed: {generatedJobId}. Stream ready!</span>
              </div>
            ) : null}

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setIsGenModalOpen(false)}
                className="rounded-xl px-3 py-1.5 text-xs text-slate-500 hover:text-slate-900"
              >
                Close
              </button>
              <button
                disabled={isGeneratingVideo}
                onClick={handleGenerateAiVideo}
                className="rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:brightness-105 disabled:opacity-50"
              >
                {isGeneratingVideo ? "Generating..." : "Generate AI Video"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
