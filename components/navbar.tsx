"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Brain, BookOpen, Compass, Layers, Cpu, Play } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

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
    </header>
  );
}
