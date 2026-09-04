import { NextResponse } from "next/server";
import { DatabaseStore, physicsLessonPlan } from "@/lib/db/in-memory-db";
import { LearnerLevel, LearningGoal, SupportedLanguage, TeachingStyle, LessonDuration, LessonDepth } from "@/types/teaching";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      topic,
      documentId,
      qualificationLevel = "Undergraduate (College / B.Tech / B.Sc)",
      level = "Beginner",
      goal = "Understand",
      language = "English",
      preferredStyle = "Visual",
      availableTime = "20m",
      depth = "Balanced",
    } = body;

    const db = DatabaseStore.getInstance();
    const lessonId = `lesson_${Date.now()}`;

    // Update student profile configuration
    db.studentProfile = {
      ...db.studentProfile,
      qualificationLevel,
      level: level as LearnerLevel,
      goal: goal as LearningGoal,
      language: language as SupportedLanguage,
      preferredStyle: preferredStyle as TeachingStyle,
      availableTime: availableTime as LessonDuration,
      depth: depth as LessonDepth,
    };

    // Calculate time allocations based on availableTime
    let targetMins = 20;
    if (availableTime === "5m") targetMins = 5;
    else if (availableTime === "10m") targetMins = 10;
    else if (availableTime === "30m") targetMins = 30;
    else if (availableTime === "60m") targetMins = 60;

    const customPlan = {
      ...physicsLessonPlan,
      id: lessonId,
      title: topic || (documentId ? "Document Deep-Dive: Dynamics & Circuits" : physicsLessonPlan.title),
      targetDurationMinutes: targetMins,
      allocatedTime: {
        introMinutes: Math.max(1, Math.round(targetMins * 0.1)),
        conceptsMinutes: Math.max(2, Math.round(targetMins * 0.5)),
        interactionMinutes: Math.max(1, Math.round(targetMins * 0.2)),
        assessmentMinutes: Math.max(1, Math.round(targetMins * 0.15)),
        bufferMinutes: Math.max(1, Math.round(targetMins * 0.05)),
      },
    };

    const lessonState = db.getOrCreateLessonState(lessonId);
    lessonState.lessonPlan = customPlan;
    lessonState.currentLanguage = language as SupportedLanguage;
    lessonState.currentDifficulty = level as LearnerLevel;

    return NextResponse.json({
      success: true,
      lessonId,
      lessonPlan: customPlan,
      studentProfile: db.studentProfile,
      knowledgeGraph: db.knowledgeGraph,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create lesson" },
      { status: 500 }
    );
  }
}
