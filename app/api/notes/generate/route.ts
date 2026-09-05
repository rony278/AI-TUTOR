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
        const prompt = `Generate executive study notes for this lesson:
Topic: "${state.title}"
Subject: "${state.lessonPlan?.subject || "General"}"
Overview: "${state.lessonPlan?.overview || ""}"

Respond with JSON format:
{
  "title": "${state.title} — Executive Study Notes",
  "generatedAt": "${new Date().toLocaleDateString()}",
  "executiveSummary": "Concise 2-sentence summary of the core concepts and laws.",
  "importantFormulas": [
    { "formula": "key formula or rule", "description": "what it means" }
  ],
  "keyConcepts": [
    { "term": "Concept Name", "definition": "Clear concise definition" }
  ],
  "misconceptionsAnalyzed": [
    { "trap": "Common pitfall or student trap", "correction": "Why it is wrong and correct reasoning" }
  ],
  "recommendedRevisionPoints": [
    "Actionable revision point 1",
    "Actionable revision point 2"
  ]
}`;

        const dynamicNotes = await gemini.generateJson<any>([
          { role: "user", content: prompt }
        ]);

        if (dynamicNotes && dynamicNotes.executiveSummary) {
          return NextResponse.json({ success: true, notes: dynamicNotes });
        }
      } catch (err) {
        console.warn("[notes/generate] Gemini generation failed, using fallback:", err);
      }
    }

    // Dynamic fallback based on current lesson plan
    const notes = {
      title: `${state.title} — Executive Study Notes`,
      generatedAt: new Date().toLocaleDateString(),
      executiveSummary: state.lessonPlan?.overview ||
        `Core principles and relationships governing ${state.title}, emphasizing proportional reasoning and physical balance.`,
      importantFormulas: state.lessonPlan?.steps
        ?.filter((s) => s.visual?.type === "EQUATION")
        ?.map((s) => ({
          formula: s.visual.data?.formula || "Core Governing Formula",
          description: s.visual.caption || s.title,
        })) || [
          { formula: "Governing Law", description: `Primary relationship in ${state.title}` },
        ],
      keyConcepts: state.knowledgeGraph?.nodes?.map((n) => ({
        term: n.title,
        definition: n.description,
      })) || [
        { term: "Core Principle", definition: `Foundational law governing ${state.title}` },
      ],
      misconceptionsAnalyzed: [
        {
          trap: `Inverting the causal relationship in ${state.title}`,
          correction: "Opposition restricts throughput; increasing constraints reduces flow under constant driving potential.",
        },
      ],
      recommendedRevisionPoints: [
        `Practice predicting system reactions when multiple parameters in ${state.title} vary simultaneously.`,
        "Review the intuitive real-world mental model introduced during the lesson.",
      ],
    };

    return NextResponse.json({ success: true, notes });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

