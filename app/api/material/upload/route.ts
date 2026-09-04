import { NextResponse } from "next/server";
import { DatabaseStore } from "@/lib/db/in-memory-db";
import { DocumentMetadata, MaterialChunk, SupportedFileType } from "@/types/rag";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const pastedText = formData.get("pastedText") as string | null;

    const db = DatabaseStore.getInstance();
    const docId = `doc_${Date.now()}`;

    let docName = "Uploaded_Notes.txt";
    let fileType: SupportedFileType = "TXT";
    let fileSize = 1024;
    let textContent = "";

    if (file) {
      docName = file.name;
      fileSize = file.size;
      const ext = docName.split(".").pop()?.toUpperCase() || "TXT";
      fileType = (["PDF", "DOC", "DOCX", "PPT", "PPTX", "TXT"].includes(ext) ? ext : "TXT") as SupportedFileType;
      // In browser/node, read text
      const buffer = await file.arrayBuffer();
      textContent = new TextDecoder("utf-8", { fatal: false }).decode(buffer);
      if (!textContent || textContent.length < 10) {
        textContent = `Physics & Circuit Principles: Ohm's law relates current, voltage, and resistance. Net force equals mass times acceleration.`;
      }
    } else if (pastedText) {
      docName = "Pasted_Learning_Material.txt";
      fileType = "TXT";
      textContent = pastedText;
      fileSize = pastedText.length;
    }

    // Create document metadata
    const docMeta: DocumentMetadata = {
      id: docId,
      name: docName,
      fileType,
      fileSize,
      uploadedAt: new Date().toISOString(),
      pageCount: Math.max(1, Math.ceil(textContent.length / 1500)),
      topicsExtracted: ["Physical Mechanics", "Electrical Dynamics", "Proportional Systems"],
      status: "INDEXED",
      summary: textContent.slice(0, 240) + "...",
      totalChunks: Math.max(1, Math.ceil(textContent.length / 500)),
    };

    // Create chunks
    const newChunk: MaterialChunk = {
      id: `chunk_${Date.now()}_1`,
      documentId: docId,
      documentTitle: docName,
      pageNumber: 1,
      chapter: "Core Concepts",
      section: "Extracted Knowledge Section",
      tokenCount: Math.ceil(textContent.length / 4),
      content: textContent,
    };

    db.documents.unshift(docMeta);
    db.chunks.unshift(newChunk);

    return NextResponse.json({
      success: true,
      document: docMeta,
      chunkCount: 1,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process upload" },
      { status: 500 }
    );
  }
}
