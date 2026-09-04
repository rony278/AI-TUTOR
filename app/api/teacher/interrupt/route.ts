import { NextResponse } from "next/server";
import { DatabaseStore } from "@/lib/db/in-memory-db";
import { TeachingBrain } from "@/lib/teaching/teaching-brain";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { lessonId = "lesson_physics_101", query, resume = false } = body;
    const db = DatabaseStore.getInstance();
    const currentState = db.getOrCreateLessonState(lessonId);

    if (resume) {
      const resumed = TeachingBrain.resumeFromInterruption(currentState);
      db.activeLessonState = resumed;
      return NextResponse.json({
        success: true,
        resumed: true,
        lessonState: resumed,
      });
    }

    const { updatedState, teacherReply } = TeachingBrain.handleInterruption(
      currentState,
      query || "Why does current decrease?"
    );

    db.activeLessonState = updatedState;

    return NextResponse.json({
      success: true,
      interrupted: true,
      teacherReply,
      lessonState: updatedState,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Interruption handling failed" },
      { status: 500 }
    );
  }
}
