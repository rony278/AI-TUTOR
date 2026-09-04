import { NextResponse } from "next/server";
import { DatabaseStore } from "@/lib/db/in-memory-db";
import { TeachingBrain } from "@/lib/teaching/teaching-brain";
import { SupportedLanguage } from "@/types/teaching";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { lessonId = "lesson_physics_101", language } = body;
    const db = DatabaseStore.getInstance();
    const currentState = db.getOrCreateLessonState(lessonId);

    const updatedState = TeachingBrain.switchLanguage(currentState, language as SupportedLanguage);
    db.activeLessonState = updatedState;

    return NextResponse.json({
      success: true,
      currentLanguage: language,
      lessonState: updatedState,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to switch language" },
      { status: 500 }
    );
  }
}
