import { NextResponse } from "next/server";
import { DatabaseStore } from "@/lib/db/in-memory-db";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { lessonId = "lesson_physics_101" } = body;
    const db = DatabaseStore.getInstance();
    const state = db.getOrCreateLessonState(lessonId);

    const notes = {
      title: `${state.title} — Executive Study Notes`,
      generatedAt: new Date().toLocaleDateString(),
      executiveSummary:
        "Newton's Second Law establishes direct proportionality between applied net force and resultant acceleration (F = ma). In electrical systems, Ohm's Law defines current as directly proportional to voltage and inversely proportional to resistance (I = V/R). Resistance opposes electron movement, restricting current magnitude analogous to a constricted hydraulic pipe.",
      importantFormulas: [
        { formula: "F = m · a", description: "Newton's 2nd Law: Net Force = mass × acceleration" },
        { formula: "a = F / m", description: "Acceleration proportionality: a ∝ F, a ∝ 1/m" },
        { formula: "V = I · R", description: "Ohm's Law: Voltage = Current × Resistance" },
        { formula: "I = V / R", description: "Current magnitude: Inversely proportional to Resistance" },
      ],
      keyConcepts: [
        {
          term: "Direct Proportionality",
          definition: "When force doubles while mass is held constant, acceleration must double.",
        },
        {
          term: "Electrical Resistance",
          definition: "Opposition to charge flow. Higher resistance lowers current for a constant voltage.",
        },
        {
          term: "Hydraulic Analogy",
          definition: "Voltage = Pump Pressure; Current = Water Flow Rate; Resistance = Pipe Pinching/Friction.",
        },
      ],
      misconceptionsAnalyzed: [
        {
          trap: "Believing increasing resistance speeds up or increases current",
          correction: "Resistance resists flow; narrowing the conduit reduces throughput.",
        },
      ],
      recommendedRevisionPoints: [
        "Review Series Circuit equivalent resistance (R_total = R1 + R2).",
        "Practice calculating acceleration when both force and mass are altered simultaneously.",
      ],
    };

    return NextResponse.json({ success: true, notes });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
