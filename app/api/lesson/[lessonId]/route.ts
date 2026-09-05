import { NextResponse } from "next/server";
import { DatabaseStore } from "@/lib/db/in-memory-db";

export async function GET(
  req: Request,
  { params }: { params: { lessonId: string } }
) {
  try {
    const lessonId = params?.lessonId || "lesson_physics_101";
    const db = DatabaseStore.getInstance();

    let lessonState = db.lessons.get(lessonId);

    if (!lessonState && lessonId !== "lesson_physics_101") {
      const { searchParams } = new URL(req.url);
      const topicQuery = searchParams.get("topic");
      if (topicQuery) {
        const { LessonGenerator } = await import("@/lib/teaching/lesson-generator");
        const { lessonPlan, knowledgeGraph } = await LessonGenerator.generateLesson(
          { topic: topicQuery },
          lessonId
        );
        lessonState = {
          lessonId,
          title: lessonPlan.title,
          studentProfile: { ...db.studentProfile },
          brainState: "TEACH",
          knowledgeGraph,
          lessonPlan,
          currentStepIndex: 0,
          currentConceptId: lessonPlan.steps[0]?.conceptId || "concept_core",
          currentDifficulty: "Beginner",
          currentLanguage: "English",
          mode: "TEACH",
          timeRemainingSeconds: lessonPlan.targetDurationMinutes * 60,
          totalElapsedSeconds: 0,
          isPaused: false,
          isSpeaking: false,
          isListening: false,
          questionsAskedCount: 0,
          correctAnswersCount: 0,
          activeMisconceptions: [],
          resolvedMisconceptions: [],
          adaptationHistory: [],
        };
        db.setLessonState(lessonId, lessonState);
      }
    }

    if (!lessonState) {
      lessonState = db.getOrCreateLessonState(lessonId);
    }

    return NextResponse.json({
      success: true,
      lessonId,
      lessonState,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load lesson" },
      { status: 500 }
    );
  }
}
