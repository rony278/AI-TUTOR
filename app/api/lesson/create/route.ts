import { NextResponse } from "next/server";
import { DatabaseStore } from "@/lib/db/in-memory-db";
import { LessonGenerator } from "@/lib/teaching/lesson-generator";
import {
  LearnerLevel,
  LearningGoal,
  SupportedLanguage,
  TeachingStyle,
  LessonDuration,
  LessonDepth,
  LessonState,
} from "@/types/teaching";

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

    // Find any document text if documentId is passed
    let documentText: string | undefined = undefined;
    if (documentId) {
      const docChunks = db.chunks.filter((c) => c.documentId === documentId);
      if (docChunks.length > 0) {
        documentText = docChunks.map((c) => `${c.section}: ${c.content}`).join("\n\n");
      }
    }

    const headerKey = req.headers.get("x-gemini-key") || req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
    const apiKey = (body.apiKey || headerKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "").trim();

    // Generate dynamic lesson plan & knowledge graph using Gemini (or smart fallback)
    const { lessonPlan, knowledgeGraph } = await LessonGenerator.generateLesson(
      {
        topic,
        documentId,
        qualificationLevel,
        level: level as LearnerLevel,
        goal: goal as LearningGoal,
        language: language as SupportedLanguage,
        preferredStyle: preferredStyle as TeachingStyle,
        availableTime: availableTime as LessonDuration,
        depth: depth as LessonDepth,
        documentText,
        apiKey,
      },
      lessonId
    );

    // Create full lesson state
    const lessonState: LessonState = {
      lessonId,
      title: lessonPlan.title,
      studentProfile: { ...db.studentProfile },
      brainState: "TEACH",
      knowledgeGraph,
      lessonPlan,
      currentStepIndex: 0,
      currentConceptId: lessonPlan.steps[0]?.conceptId || "concept_core",
      currentDifficulty: level as LearnerLevel,
      currentLanguage: language as SupportedLanguage,
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

    // Store in global DB
    db.setLessonState(lessonId, lessonState);

    return NextResponse.json({
      success: true,
      lessonId,
      lessonPlan,
      lessonState,
      studentProfile: db.studentProfile,
      knowledgeGraph,
    });
  } catch (error: any) {
    console.error("[api/lesson/create] Error generating lesson:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create lesson" },
      { status: 500 }
    );
  }
}

