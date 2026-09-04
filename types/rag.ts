// ==========================================
// RAG & DOCUMENT TYPES
// ==========================================

export type SupportedFileType = "PDF" | "DOC" | "DOCX" | "PPT" | "PPTX" | "TXT";

export interface DocumentMetadata {
  id: string;
  name: string;
  fileType: SupportedFileType;
  fileSize: number;
  uploadedAt: string;
  pageCount: number;
  topicsExtracted: string[];
  status: "UPLOADING" | "EXTRACTING" | "EMBEDDING" | "INDEXED" | "ERROR";
  summary: string;
  totalChunks: number;
}

export interface MaterialChunk {
  id: string;
  documentId: string;
  documentTitle: string;
  pageNumber: number;
  chapter?: string;
  section: string;
  content: string;
  embedding?: number[];
  tokenCount: number;
}

export interface SearchResult {
  chunk: MaterialChunk;
  score: number;
  highlight: string;
}

export interface GroundedCitation {
  documentId: string;
  documentTitle: string;
  chapter?: string;
  page: number;
  section: string;
  sourceSnippet: string;
}
