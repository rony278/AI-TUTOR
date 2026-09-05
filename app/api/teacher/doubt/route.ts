import { NextResponse } from "next/server";
import { DatabaseStore } from "@/lib/db/in-memory-db";
import { DoubtResolutionEngine } from "@/lib/teaching/doubt-engine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { lessonId = "lesson_physics_101", question, studentDoubt } = body;
    const query = (question || studentDoubt || "").trim();

    if (!query) {
      return NextResponse.json({ success: false, error: "Question is required" }, { status: 400 });
    }

    const db = DatabaseStore.getInstance();
    const state = db.getOrCreateLessonState(lessonId);

    const resolution = await DoubtResolutionEngine.resolveDoubt(query, state, db.chunks || []);

    return NextResponse.json({
      success: true,
      resolution,
      sourceType: resolution.sourceType,
    });

  } catch (error: any) {
    console.error("Doubt error:", error);
    return NextResponse.json({ success: false, error: error?.message || "Internal server error" }, { status: 500 });
  }
}
