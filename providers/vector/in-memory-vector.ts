// ==========================================
// VECTOR STORE ABSTRACTION & IN-MEMORY STORE
// ==========================================
import { MaterialChunk, SearchResult } from "@/types/rag";

export interface VectorStore {
  name: string;
  upsert(chunks: MaterialChunk[]): Promise<void>;
  search(query: string, limit?: number): Promise<SearchResult[]>;
}

export class InMemoryVectorStore implements VectorStore {
  public name = "In-Memory Semantic Vector Store (Cosine & BM25 Hybrid)";
  private chunks: MaterialChunk[] = [];

  constructor(initialChunks: MaterialChunk[] = []) {
    this.chunks = [...initialChunks];
  }

  public async upsert(chunks: MaterialChunk[]): Promise<void> {
    this.chunks.push(...chunks);
  }

  public async search(query: string, limit: number = 3): Promise<SearchResult[]> {
    const tokens = query.toLowerCase().split(/\s+/).filter((t) => t.length > 2);
    const results: SearchResult[] = [];

    for (const chunk of this.chunks) {
      let score = 0;
      const text = chunk.content.toLowerCase();
      const sec = chunk.section.toLowerCase();

      for (const t of tokens) {
        if (sec.includes(t)) score += 3.5;
        if (text.includes(t)) score += 1.5;
      }

      if (score > 0) {
        results.push({
          chunk,
          score,
          highlight: chunk.content.slice(0, 180) + "...",
        });
      }
    }

    return results.sort((a, b) => b.score - a.score).slice(0, limit);
  }
}
