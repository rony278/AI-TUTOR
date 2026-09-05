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
        const prompt = `Generate a personalized 5-question practice homework set for this lesson:
Topic: "${state.title}"
Subject: "${state.lessonPlan?.subject || "General"}"

Format strictly as JSON matching this object:
{
  "title": "Personalized Practice Set: Targeted Mastery on ${state.title}",
  "difficultyBasis": "Calibrated to your active lesson performance",
  "questions": [
    {
      "id": "hw_1",
      "difficulty": "Easy" | "Medium" | "Challenge",
      "concept": "Concept Title",
      "prompt": "The question prompt",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctOptionIndex": 0,
      "explanation": "Clear step-by-step rationale for why the answer is correct"
    }
  ]
}`;

        const dynamicPractice = await gemini.generateJson<any>([
          { role: "user", content: prompt }
        ]);

        if (dynamicPractice && Array.isArray(dynamicPractice.questions) && dynamicPractice.questions.length > 0) {
          return NextResponse.json({ success: true, practiceSet: dynamicPractice });
        }
      } catch (err) {
        console.warn("[practice/generate] Gemini generation failed, using fallback:", err);
      }
    }

    const weakConcept = state.knowledgeGraph?.nodes?.[0]?.title || state.title;

    const practiceSet = {
      title: `Personalized Practice Set: Targeted Mastery on ${weakConcept}`,
      difficultyBasis: "Calibrated to your recent concept checkpoints",
      questions: [
        {
          id: "hw_1",
          difficulty: "Easy",
          concept: weakConcept,
          prompt: `What is the primary governing factor in ${weakConcept}?`,
          options: [
            "Proportional balance between drive and constraint",
            "Random stochastic fluctuation",
            "Independent constant behavior",
            "Static equilibrium without change",
          ],
          correctOptionIndex: 0,
          explanation: `In ${weakConcept}, throughput is governed by the direct balance between driving potential and resistive constraints.`,
        },
        {
          id: "hw_2",
          difficulty: "Medium",
          concept: weakConcept,
          prompt: `If the system load or opposition doubles while drive remains constant, how does the throughput react?`,
          options: ["It halves", "It doubles", "It quadruples", "It remains unchanged"],
          correctOptionIndex: 0,
          explanation: "Throughput is inversely proportional to resistance; doubling opposition halves throughput.",
        },
        {
          id: "hw_3",
          difficulty: "Medium",
          concept: weakConcept,
          prompt: `Which real-world analogy best captures the relationship in ${weakConcept}?`,
          options: [
            "A constricted conduit throttling flow rate under constant pump pressure",
            "A closed box with no external inputs",
            "An accelerating rocket with infinite fuel",
            "A motionless pendulum",
          ],
          correctOptionIndex: 0,
          explanation: "The conduit analogy cleanly illustrates how higher resistance constricts flow throughput.",
        },
        {
          id: "hw_4",
          difficulty: "Challenge",
          concept: weakConcept,
          prompt: `How can throughput be maintained at its original level if resistance triples?`,
          options: [
            "Triple the driving potential",
            "Reduce the driving potential to 1/3",
            "Increase resistance further",
            "Do nothing; it self-corrects",
          ],
          correctOptionIndex: 0,
          explanation: "Because Output = Drive / Resistance, tripling Drive counteracts the 3x increase in Resistance.",
        },
        {
          id: "hw_5",
          difficulty: "Challenge",
          concept: weakConcept,
          prompt: `Why is identifying misconceptions early critical when studying ${weakConcept}?`,
          options: [
            "To prevent confusion between direct and inverse dependencies",
            "Because errors cannot be corrected later",
            "To avoid doing calculations",
            "To skip intermediate concepts",
          ],
          correctOptionIndex: 0,
          explanation: "Targeted misconception resolution prevents intuitive inversions from propagating into advanced modules.",
        },
      ],
    };

    return NextResponse.json({ success: true, practiceSet });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

