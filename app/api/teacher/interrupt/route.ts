import { NextResponse } from "next/server";
import { DatabaseStore } from "@/lib/db/in-memory-db";
import { TeachingBrain } from "@/lib/teaching/teaching-brain";
import { GeminiLLMProvider } from "@/providers/llm/gemini-provider";


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

    let teacherReply = "";
    const gemini = new GeminiLLMProvider();
    if (gemini.hasValidKey()) {
      try {
        const currentStep = currentState.lessonPlan?.steps?.[currentState.currentStepIndex];
        const prompt = `A student interrupted during a lecture to ask a question.
Lesson Title: "${currentState.title}"
Current Step: "${currentStep?.title || "Lesson Module"}"
Language: "${currentState.currentLanguage}"
Student Interruption Question: "${query}"

Provide a concise, encouraging 2-sentence pedagogical reply addressing their question directly in the context of ${currentState.title}, ending with a prompt to resume the checkpoint.`;

        const aiReply = await gemini.generateText([
          { role: "user", content: prompt }
        ]);
        if (aiReply && aiReply.trim().length > 10) {
          teacherReply = aiReply.trim();
        }
      } catch (err) {
        console.warn("[interrupt] Gemini interruption failed, using brain fallback:", err);
      }
    }

    if (!teacherReply) {
      const result = TeachingBrain.handleInterruption(
        currentState,
        query || "Can you explain this further?"
      );
      teacherReply = result.teacherReply;
    }

    const updatedState = {
      ...currentState,
      mode: "INTERRUPTED" as const,
      isPaused: true,
      interruptionContext: {
        studentQuery: query,
        teacherAnswer: teacherReply,
        returnStepIndex: currentState.currentStepIndex,
      },
    };

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
