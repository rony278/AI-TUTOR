// ==========================================
// MISCONCEPTION DETECTOR ENGINE
// ==========================================

export interface MisconceptionAnalysisInput {
  questionId: string;
  conceptTitle: string;
  studentAnswer: string;
  selectedOptionId?: string;
  lessonContext?: string;
}

export interface MisconceptionDetectionResult {
  isMisconception: boolean;
  misconceptionType: string;
  severity: "Low" | "Moderate" | "Critical";
  explanation: string;
  recommendedStrategy: "GIVE_ANALOGY" | "SIMPLIFY" | "SHOW_DIAGRAM" | "RETEACH";
  recommendedVisual: string;
  recommendedFollowUpQuestionPrompt: string;
}

export class MisconceptionDetector {
  /**
   * Evaluates student response against known cognitive traps, conceptual confusions, and inverse relationships
   */
  public static detect(input: MisconceptionAnalysisInput): MisconceptionDetectionResult {
    const answerNormalized = input.studentAnswer.toLowerCase().trim();
    const concept = input.conceptTitle.toLowerCase();

    // 1. Ohm's law inverse relationship confusion (Resistance increases -> Current increases)
    if (
      (input.selectedOptionId === "opt_res_a") ||
      (concept.includes("ohm") && (answerNormalized.includes("increase") || answerNormalized.includes("faster") || answerNormalized.includes("more current")) && !answerNormalized.includes("decrease"))
    ) {
      return {
        isMisconception: true,
        misconceptionType: "Inverse Proportion Inversion (Resistance vs Current)",
        severity: "Critical",
        explanation:
          "The student mistakenly believes that electrical resistance accelerates charges rather than resisting them, confusing 'resistance' with driving potential or force.",
        recommendedStrategy: "GIVE_ANALOGY",
        recommendedVisual: "ANALOGY: Water-Pipe Restriction",
        recommendedFollowUpQuestionPrompt:
          "Think of water flowing through a garden hose. If you squeeze the hose tight (higher resistance), does more water come out or less?",
      };
    }

    // 2. Newton's 2nd law: Force doubles -> Acceleration halves or velocity confusion
    if (
      input.selectedOptionId === "opt_b" ||
      (concept.includes("newton") && (answerNormalized.includes("half") || answerNormalized.includes("decrease")))
    ) {
      return {
        isMisconception: true,
        misconceptionType: "Force-Acceleration Inverse Fallacy",
        severity: "Moderate",
        explanation:
          "The student inverted the direct proportionality in F = ma, assuming that higher force results in smaller acceleration.",
        recommendedStrategy: "SHOW_DIAGRAM",
        recommendedVisual: "DIAGRAM: Free-Body Cart Vector Scaling",
        recommendedFollowUpQuestionPrompt:
          "If you push a toy car twice as hard with the same weight, will it pick up speed faster or slower?",
      };
    }

    // 3. Newton's 2nd law: Acceleration stays constant while velocity doubles
    if (
      input.selectedOptionId === "opt_c" ||
      (concept.includes("newton") && answerNormalized.includes("velocity") && answerNormalized.includes("constant"))
    ) {
      return {
        isMisconception: true,
        misconceptionType: "Kinematics Confabulation: Velocity vs Acceleration",
        severity: "Moderate",
        explanation:
          "The student conflates velocity (speed and direction) with acceleration (the rate of change of velocity).",
        recommendedStrategy: "SIMPLIFY",
        recommendedVisual: "GRAPH: Velocity-Time Slope Comparison",
        recommendedFollowUpQuestionPrompt:
          "What is the difference between how fast you are going (velocity) and how rapidly your speedometer needle is climbing (acceleration)?",
      };
    }

    // 4. General free-form negative or confusion signals
    if (
      answerNormalized.includes("not sure") ||
      answerNormalized.includes("i don't know") ||
      answerNormalized.includes("confused") ||
      answerNormalized.length < 3
    ) {
      return {
        isMisconception: false,
        misconceptionType: "Low Concept Familiarity",
        severity: "Low",
        explanation: "The student indicates uncertainty rather than a deeply held misconception.",
        recommendedStrategy: "SIMPLIFY",
        recommendedVisual: "FLOWCHART: Foundational Steps",
        recommendedFollowUpQuestionPrompt: "Let's break this down into smaller steps. What does voltage do in a circuit?",
      };
    }

    // Default: No severe misconception detected
    return {
      isMisconception: false,
      misconceptionType: "None",
      severity: "Low",
      explanation: "No systemic cognitive misconception detected in the provided response.",
      recommendedStrategy: "RETEACH",
      recommendedVisual: "DIAGRAM",
      recommendedFollowUpQuestionPrompt: "Can you elaborate on your reasoning?",
    };
  }
}
