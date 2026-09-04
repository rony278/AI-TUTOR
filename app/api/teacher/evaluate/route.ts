import { NextResponse } from "next/server";
import { DatabaseStore } from "@/lib/db/in-memory-db";
import { TeachingBrain } from "@/lib/teaching/teaching-brain";
import { StudentResponsePayload } from "@/types/teaching";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      lessonId = "lesson_physics_101",
      questionId,
      studentAnswer,
      selectedOptionId,
      timeSpentSeconds = 15,
      hintsUsedCount = 0,
      inputMode = "typing",
    } = body;

    const db = DatabaseStore.getInstance();
    const currentState = db.getOrCreateLessonState(lessonId);

    const responsePayload: StudentResponsePayload = {
      questionId,
      studentAnswer: studentAnswer || "",
      selectedOptionId,
      timeSpentSeconds,
      hintsUsedCount,
      inputMode,
    };

    const { updatedState, evaluation } = TeachingBrain.processStudentAnswer(
      currentState,
      responsePayload
    );

    // Save updated state to DB
    db.activeLessonState = updatedState;

    return NextResponse.json({
      success: true,
      evaluation,
      lessonState: updatedState,
      latestAdaptation: updatedState.adaptationHistory[0] || null,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to evaluate answer" },
      { status: 500 }
    );
  }
}
