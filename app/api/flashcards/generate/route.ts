import { NextResponse } from "next/server";
import { DatabaseStore } from "@/lib/db/in-memory-db";
import { GeminiLLMProvider } from "@/providers/llm/gemini-provider";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { lessonId = "lesson_physics_101" } = body;
    const db = DatabaseStore.getInstance();
    const state = db.getOrCreateLessonState(lessonId);

    const gemini = new GeminiLLMProvider();
    if (gemini.hasValidKey()) {
      try {
        const prompt = `Generate 5 high-yield study flashcards for this lesson:
Topic: "${state.title}"
Subject: "${state.lessonPlan?.subject || "General"}"

Format as JSON array of 5 objects:
[
  {
    "id": "fc_1",
    "type": "Formula" | "Concept" | "Application" | "Question/Answer",
    "front": "Question or term on front of card",
    "back": "Clear concise answer or explanation on back",
    "concept": "Name of concept"
  }
]`;

        const dynamicFlashcards = await gemini.generateJson<any[]>([
          { role: "user", content: prompt }
        ]);

        if (Array.isArray(dynamicFlashcards) && dynamicFlashcards.length > 0) {
          return NextResponse.json({ success: true, flashcards: dynamicFlashcards });
        }
      } catch (err) {
        console.warn("[flashcards/generate] Gemini generation failed, using fallback:", err);
      }
    }

    // Dynamic fallback based on lesson steps
    const flashcards = state.lessonPlan?.steps?.slice(0, 5).map((step, idx) => ({
      id: `fc_${idx + 1}`,
      type: step.visual?.type === "EQUATION" ? "Formula" : "Concept",
      front: `What is the core intuition behind ${step.title}?`,
      back: step.spokenScript?.slice(0, 180) + "...",
      concept: step.title,
    })) || [
      {
        id: "fc_1",
        type: "Concept",
        front: `What is the foundational law of ${state.title}?`,
        back: state.lessonPlan?.overview || "Proportional dynamics governing the system.",
        concept: state.title,
      },
    ];

    return NextResponse.json({ success: true, flashcards });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

