"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Upload,
  Search,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { sampleDocuments, sampleChunks } from "@/lib/db/in-memory-db";

export default function MaterialsPage() {
  const [documents] = useState(sampleDocuments);
  const [selectedChunk, setSelectedChunk] = useState(sampleChunks[1]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChunks = sampleChunks.filter(
    (c) =>
      c.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.section.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-grid-pattern py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold">
              RAG Knowledge Base & Grounded Library
            </span>
            <h1 className="text-3xl font-black text-slate-900 mt-1">Material Library</h1>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              Every concept taught by your AI Teacher is strictly grounded in and cited from these indexed materials.
            </p>
          </div>

          <Link
            href="/learn"
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-sky-500/20 hover:brightness-105"
          >
            <Upload className="h-4 w-4" />
            <span>Upload New Material</span>
          </Link>
        </div>

        {/* DOCUMENTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg space-y-4 hover:border-sky-300 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-sky-50 p-3.5 text-sky-700 border border-sky-200">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-mono font-medium">
                      {doc.fileType} • {doc.pageCount} Pages • {doc.totalChunks} Chunks
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                  {doc.status}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-medium">{doc.summary}</p>

              {/* Extracted topics */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Extracted Concept Topics</span>
                <div className="flex flex-wrap gap-1.5">
                  {doc.topicsExtracted.map((t, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-slate-50 px-2.5 py-1 text-[10px] text-slate-700 font-semibold border border-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action bar */}
              <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                <span className="text-[10px] font-mono text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Vector Embeddings Ready
                </span>

                <Link
                  href="/classroom/lesson_physics_101"
                  className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3.5 py-1.5 text-xs font-bold text-slate-900 hover:bg-sky-600 hover:text-white transition-all shadow-2xs"
                >
                  <span>Launch Lesson</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* RAG CHUNK INSPECTOR (Requirement #14) */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 font-bold flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                Live Vector Retrieval Grounding Inspector
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">Underlying Indexed Chunks</h3>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chunk text..."
                className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
              />
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Chunks List */}
            <div className="space-y-2 md:col-span-1 max-h-[380px] overflow-y-auto pr-2">
              {filteredChunks.map((chunk) => {
                const isSelected = selectedChunk.id === chunk.id;
                return (
                  <button
                    key={chunk.id}
                    onClick={() => setSelectedChunk(chunk)}
                    className={`w-full text-left rounded-2xl p-3.5 border transition-all text-xs ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-50/80 text-slate-900 shadow-sm ring-1 ring-emerald-500 font-semibold"
                        : "border-slate-200 bg-slate-50/70 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="text-emerald-700 font-bold">Page {chunk.pageNumber}</span>
                      <span className="text-slate-400">{chunk.tokenCount} tokens</span>
                    </div>
                    <p className="font-bold truncate text-slate-900">{chunk.section}</p>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{chunk.content}</p>
                  </button>
                );
              })}
            </div>

            {/* Detailed Chunk Display */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:col-span-2 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">
                    {selectedChunk.documentTitle}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">{selectedChunk.section}</h4>
                </div>
                <div className="text-right font-mono text-[10px] text-slate-500 font-semibold">
                  <span>Page {selectedChunk.pageNumber}</span>
                  <span className="block text-emerald-700 font-bold">Chunk ID: {selectedChunk.id}</span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 font-mono text-slate-800 text-xs leading-relaxed shadow-2xs">
                "{selectedChunk.content}"
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2">
                <span className="text-emerald-700 flex items-center gap-1 font-bold">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Semantic Embedding Generated (1536 dims)
                </span>
                <Link
                  href="/classroom/lesson_physics_101"
                  className="rounded-xl bg-emerald-100 px-3 py-1.5 text-emerald-900 font-bold hover:bg-emerald-200 transition-colors border border-emerald-300"
                >
                  Teach this concept in Classroom →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
