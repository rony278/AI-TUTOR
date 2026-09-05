"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Brain, BookOpen, Compass, Layers, Play, Key, Check } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [apiKey, setApiKey] = useState("");
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [tempKey, setTempKey] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("gemini_api_key") || "";
      setApiKey(saved);
      setTempKey(saved);
    }
  }, []);

  const handleSaveKey = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("gemini_api_key", tempKey.trim());
      setApiKey(tempKey.trim());
      setIsKeyModalOpen(false);
    }
  };

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: Brain },
    { href: "/learn", label: "New Lesson", icon: Sparkles },
    { href: "/knowledge", label: "Knowledge Universe", icon: Compass },
    { href: "/materials", label: "Materials", icon: BookOpen },
    { href: "/under-the-hood", label: "Architecture", icon: Layers },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-xl shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-md shadow-sky-500/20 group-hover:shadow-sky-500/30 transition-all">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-slate-900 font-sans">AI Teacher</span>
              <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-semibold text-sky-700 border border-sky-200">
                v2.0
              </span>
            </div>
            <p className="text-[10px] text-slate-500 hidden sm:block">The AI teacher that learns how you learn</p>
          </div>
        </Link>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-slate-100 text-sky-700 font-semibold border border-slate-200/80 shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2.5">
          {/* Gemini API Key Button */}
          <button
            onClick={() => setIsKeyModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-all"
            title="Configure Gemini API Key"
          >
            <Key className="h-3 w-3 text-sky-600" />
            <span className="hidden sm:inline">Gemini Key</span>
            <span className={`h-1.5 w-1.5 rounded-full ${apiKey ? "bg-emerald-500" : "bg-amber-400"}`} />
          </button>

          <Link
            href="/demo"
            className="group relative flex items-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 hover:bg-amber-100 transition-all"
          >
            <Play className="h-3.5 w-3.5 fill-current text-amber-600 group-hover:scale-110 transition-transform" />
            <span>Judge Demo</span>
            <span className="flex h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
          </Link>

          <Link
            href="/learn"
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-sky-500/20 hover:brightness-105 transition-all"
          >
            Start Learning
          </Link>
        </div>
      </div>

      {/* GEMINI KEY MODAL */}
      {isKeyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <Key className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Google Gemini API Key</h3>
                <p className="text-xs text-slate-500">Single API key powers all lectures & doubts</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Enter your Gemini API key from <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer" className="text-sky-600 underline font-semibold">Google AI Studio</a>. This enables real-time generation for any asked topic.
            </p>

            <input
              type="password"
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-sky-500 focus:outline-none"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsKeyModalOpen(false)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveKey}
                className="flex items-center gap-1.5 rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-700"
              >
                <Check className="h-3.5 w-3.5" />
                <span>Save Key</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
