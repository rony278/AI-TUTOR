import Link from "next/link";
import { Sparkles, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10 text-xs text-slate-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 border border-sky-200 text-sky-600">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">AI Teacher</p>
              <p className="text-[11px] text-slate-500">"The AI teacher that learns how you learn."</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px]">
            <span className="flex items-center gap-1.5 text-slate-700 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Grounded Pedagogical State Machine
            </span>
            <Link href="/under-the-hood" className="hover:text-slate-900 transition-colors">
              Under the Hood
            </Link>
            <Link href="/technology" className="hover:text-slate-900 transition-colors">
              Technology Stack
            </Link>
            <Link href="/demo" className="text-amber-700 hover:text-amber-800 transition-colors font-semibold">
              Judge Demo Mode
            </Link>
          </div>

          <div className="text-[11px] text-slate-500">
            Adaptive Human-Like AI Educator • Full-Stack Hackathon Implementation
          </div>
        </div>
      </div>
    </footer>
  );
}
