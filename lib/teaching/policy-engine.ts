// ==========================================
// ADAPTIVE TEACHING POLICY ENGINE
// ==========================================
import { PolicyAction, LearnerLevel, TeacherAdaptationEvent, LessonState } from "@/types/teaching";
import { MisconceptionDetectionResult } from "./misconception-detector";
import { ConfidenceMetrics } from "./confidence-model";

export interface PolicyDecision {
  nextAction: PolicyAction;
  nextDifficulty: LearnerLevel;
  strategyChange?: {
    from: string;
    to: string;
  };
  visualSwitch?: string;
  adaptationEvent?: TeacherAdaptationEvent;
  recommendationNote: string;
}

export class AdaptivePolicyEngine {
  /**
   * Decides the optimal next pedagogical action based on live learner signals
   */
  public static decideNextStep(
    state: LessonState,
    isCorrect: boolean,
    misconception: MisconceptionDetectionResult,
    confidenceMetrics: ConfidenceMetrics
  ): PolicyDecision {
    const currentConcept = state.knowledgeGraph.nodes.find(
      (n) => n.id === state.currentConceptId
    ) || state.knowledgeGraph.nodes[0];

    // CASE 1: Critical or Moderate Misconception Detected
    if (misconception.isMisconception) {
      const prevDiff = state.currentDifficulty;
      const newDiff: LearnerLevel = prevDiff === "Advanced" ? "Intermediate" : "Beginner";

      const adaptationEvent: TeacherAdaptationEvent = {
        timestamp: new Date().toISOString(),
        concept: currentConcept.title,
        issueDetected: misconception.misconceptionType,
        previousStrategy: "Technical Rigorous Explanation",
        newStrategy: misconception.recommendedStrategy === "GIVE_ANALOGY" ? "Physical Intuitive Analogy" : "Step-by-Step Simplification",
        previousDifficulty: prevDiff,
        newDifficulty: newDiff,
        visualSwitch: misconception.recommendedVisual,
        reasoning: misconception.explanation,
      };

      return {
        nextAction: misconception.recommendedStrategy,
        nextDifficulty: newDiff,
        strategyChange: {
          from: "Technical / Formal",
          to: misconception.recommendedStrategy === "GIVE_ANALOGY" ? "Analogical / Intuitive" : "Simplified",
        },
        visualSwitch: misconception.recommendedVisual,
        adaptationEvent,
        recommendationNote: `Detected cognitive trap: ${misconception.misconceptionType}. Switching to visual analogy and easing difficulty to ${newDiff}.`,
      };
    }

    // CASE 2: Incorrect without specific misconception (general confusion / wrong answer)
    if (!isCorrect) {
      const prevDiff = state.currentDifficulty;
      const newDiff: LearnerLevel = prevDiff === "Advanced" ? "Intermediate" : "Beginner";

      const adaptationEvent: TeacherAdaptationEvent = {
        timestamp: new Date().toISOString(),
        concept: currentConcept.title,
        issueDetected: "Incorrect response / conceptual ambiguity",
        previousStrategy: "Direct Questioning",
        newStrategy: "Simplified Visual Demonstration",
        previousDifficulty: prevDiff,
        newDifficulty: newDiff,
        visualSwitch: "DIAGRAM: Step-by-Step Breakdown",
        reasoning: "Student encountered difficulty; decomposing concept into smaller prerequisites.",
      };

      return {
        nextAction: "SIMPLIFY",
        nextDifficulty: newDiff,
        strategyChange: {
          from: "Direct Questioning",
          to: "Step-by-Step Simplification",
        },
        visualSwitch: "DIAGRAM: Component Breakdown",
        adaptationEvent,
        recommendationNote: "Lowering difficulty to reinforce fundamental mechanics.",
      };
    }

    // CASE 3: Correct answer with High Confidence -> Accelerate / Deepen
    if (isCorrect && confidenceMetrics.conceptStability === "High") {
      const nextDiff: LearnerLevel = state.currentDifficulty === "Beginner" ? "Intermediate" : "Advanced";

      const adaptationEvent: TeacherAdaptationEvent = {
        timestamp: new Date().toISOString(),
        concept: currentConcept.title,
        issueDetected: "Concept Mastered with High Stability",
        previousStrategy: "Guided Explanation",
        newStrategy: "Advanced Application / Synthesis",
        previousDifficulty: state.currentDifficulty,
        newDifficulty: nextDiff,
        visualSwitch: "SIMULATION: Multi-Variable Circuit",
        reasoning: "Student demonstrates high retention and swift response time.",
      };

      return {
        nextAction: "ASK_APPLICATION",
        nextDifficulty: nextDiff,
        strategyChange: {
          from: "Foundational Concepts",
          to: "Real-World Application Challenge",
        },
        visualSwitch: "SIMULATION: High Complexity",
        adaptationEvent,
        recommendationNote: `Concept mastered (${confidenceMetrics.understandingScore}%). Advancing challenge level to ${nextDiff}.`,
      };
    }

    // CASE 4: Correct answer with Moderate Confidence -> Standard Continue
    return {
      nextAction: "EXPLAIN",
      nextDifficulty: state.currentDifficulty,
      recommendationNote: "Solid progression. Continuing to next sequential concept in lesson plan.",
    };
  }
}
