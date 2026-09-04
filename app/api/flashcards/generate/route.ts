import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const flashcards = [
      {
        id: "fc_1",
        type: "Formula",
        front: "What is the formula for Newton's Second Law?",
        back: "F = m · a (Net Force = mass × acceleration). In units: 1 Newton = 1 kg·m/s².",
        concept: "Newton's 2nd Law",
      },
      {
        id: "fc_2",
        type: "Concept",
        front: "What happens to acceleration if net force triples and mass remains constant?",
        back: "Acceleration triples (3x), because acceleration is directly proportional to net force (a = F/m).",
        concept: "Proportionality",
      },
      {
        id: "fc_3",
        type: "Formula",
        front: "State Ohm's Law solving explicitly for Current (I).",
        back: "I = V / R (Current = Voltage ÷ Resistance). Current is inversely proportional to resistance.",
        concept: "Ohm's Law",
      },
      {
        id: "fc_4",
        type: "Application",
        front: "In the water-pipe analogy of electricity, what corresponds to Voltage, Current, and Resistance?",
        back: "Voltage = Water Pressure (Pump)\nCurrent = Water Flow Rate\nResistance = Pipe Narrowing / Constriction",
        concept: "Hydraulic Analogy",
      },
      {
        id: "fc_5",
        type: "Question/Answer",
        front: "If you add a 50Ω resistor in series to a circuit with a lightbulb, why does the lightbulb dim?",
        back: "Total circuit resistance increases, which decreases current (I = V/R_total). Less current means lower power output and dimmer light.",
        concept: "Circuit Dynamics",
      },
    ];

    return NextResponse.json({ success: true, flashcards });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
