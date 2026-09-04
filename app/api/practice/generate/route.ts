import { NextResponse } from "next/server";
import { DatabaseStore } from "@/lib/db/in-memory-db";

export async function POST(req: Request) {
  try {
    const db = DatabaseStore.getInstance();
    const weakConcept = db.studentProfile.weakConcepts[0] || "Resistance & Ohm's Law";

    const practiceSet = {
      title: `Personalized Practice Set: Targeted Mastery on ${weakConcept}`,
      difficultyBasis: "Calibrated to your recent misconception recovery",
      questions: [
        {
          id: "hw_1",
          difficulty: "Easy",
          concept: "Newton's Second Law",
          prompt: "A 5 kg block is accelerated at 3 m/s². What net force is acting on the block?",
          options: ["8 N", "15 N", "1.67 N", "45 N"],
          correctOptionIndex: 1,
          explanation: "F = m · a = 5 kg × 3 m/s² = 15 N.",
        },
        {
          id: "hw_2",
          difficulty: "Easy",
          concept: "Ohm's Law Fundamentals",
          prompt: "A circuit has a 12V battery and a 4Ω resistor. How much current flows through the circuit?",
          options: ["48 A", "3 A", "0.33 A", "16 A"],
          correctOptionIndex: 1,
          explanation: "I = V / R = 12V / 4Ω = 3 Amperes.",
        },
        {
          id: "hw_3",
          difficulty: "Medium",
          concept: "Proportional Reasoning",
          prompt: "If you want to quadruple the acceleration of a rocket while its mass remains constant, how must the net thrust force change?",
          options: ["Cut by 4", "Double", "Quadruple (4x)", "Increase by 16x"],
          correctOptionIndex: 2,
          explanation: "Because a ∝ F, acceleration increases linearly with force. Quadrupling force quadruples acceleration.",
        },
        {
          id: "hw_4",
          difficulty: "Medium",
          concept: "Resistance & Constriction",
          prompt: "In a circuit with fixed 9V supply, replacing an 18Ω resistor with a 36Ω resistor causes current to:",
          options: ["Halve from 0.5A to 0.25A", "Double from 0.5A to 1.0A", "Remain 0.5A", "Drop to zero"],
          correctOptionIndex: 0,
          explanation: "I_initial = 9/18 = 0.5A. I_new = 9/36 = 0.25A. Doubling resistance cuts current in half.",
        },
        {
          id: "hw_5",
          difficulty: "Challenge",
          concept: "Multi-Variable Synthesis",
          prompt: "An electric cart of mass 20 kg is driven by an electric motor. The motor's current is I = V/R. If battery voltage is 24V, motor resistance is 6Ω, and the force generated is F = 5 × I, what is the cart's acceleration?",
          options: ["0.5 m/s²", "1.0 m/s²", "4.0 m/s²", "20.0 m/s²"],
          correctOptionIndex: 1,
          explanation: "First, I = 24V / 6Ω = 4A. Then, F = 5 × 4A = 20 N. Finally, a = F / m = 20 N / 20 kg = 1.0 m/s².",
        },
      ],
    };

    return NextResponse.json({ success: true, practiceSet });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
