// ==========================================
// RAG RETRIEVER & GROUNDING ENGINE
// ==========================================
import { sampleChunks } from "@/lib/db/in-memory-db";
import { MaterialChunk, SearchResult, GroundedCitation } from "@/types/rag";

export class RagRetriever {
  private chunks: MaterialChunk[];

  constructor(chunks: MaterialChunk[] = sampleChunks) {
    this.chunks = chunks;
  }

  /**
   * Performs semantic & lexical search over uploaded learning material chunks
   */
  public search(query: string, limit: number = 3): SearchResult[] {
    const terms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 2);

    const scored = this.chunks.map((chunk) => {
      let score = 0;
      const contentLower = chunk.content.toLowerCase();
      const sectionLower = chunk.section.toLowerCase();

      terms.forEach((term) => {
        if (contentLower.includes(term)) score += 1.5;
        if (sectionLower.includes(term)) score += 3.0;
        if (chunk.chapter?.toLowerCase().includes(term)) score += 2.0;
      });

      // Highlight snippet
      const firstIndex = contentLower.indexOf(terms[0] || "");
      let snippet = chunk.content;
      if (firstIndex !== -1) {
        const start = Math.max(0, firstIndex - 40);
        const end = Math.min(chunk.content.length, firstIndex + 140);
        snippet = (start > 0 ? "..." : "") + chunk.content.substring(start, end) + (end < chunk.content.length ? "..." : "");
      }

      return {
        chunk,
        score,
        highlight: snippet,
      };
    });

    return scored
      .filter((res) => res.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  /**
   * Creates a grounded citation object to verify authentic textbook grounding
   */
  public getCitationForChunk(chunk: MaterialChunk): GroundedCitation {
    return {
      documentId: chunk.documentId,
      documentTitle: chunk.documentTitle,
      chapter: chunk.chapter,
      page: chunk.pageNumber,
      section: chunk.section,
      sourceSnippet: chunk.content,
    };
  }
}
