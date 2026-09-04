// ==========================================
// EDUCATIONAL LEARNING CONFIDENCE & STABILITY MODEL
// ==========================================

export interface EducationalSignals {
  isCorrect: boolean;
  score: number; // 0 - 100
  responseLatencySeconds: number;
  expectedLatencySeconds: number;
  hintsUsedCount: number;
  repeatedMistakeCount: number;
  previousMastery: number;
}

export interface ConfidenceMetrics {
  understandingScore: number; // 0 - 100
  learningConfidenceScore: number; // 0 - 100
  conceptStability: "Low" | "Medium" | "High";
  latencyHealth: "Swift" | "Normal" | "Hesitant";
  adaptationTriggered: boolean;
}

export class LearningConfidenceModel {
  /**
   * Computes educational understanding and stability strictly from verifiable learning signals
   */
  public static evaluate(signals: EducationalSignals): ConfidenceMetrics {
    // 1. Understanding Score: weighted by current correctness and historical mastery
    const weightCurrent = 0.65;
    const weightHistory = 0.35;
    let understanding = Math.round(
      signals.score * weightCurrent + signals.previousMastery * weightHistory
    );
    understanding = Math.max(0, Math.min(100, understanding));

    // 2. Latency health
    let latencyHealth: "Swift" | "Normal" | "Hesitant" = "Normal";
    const latencyRatio = signals.responseLatencySeconds / Math.max(5, signals.expectedLatencySeconds);

    if (latencyRatio > 1.8) {
      latencyHealth = "Hesitant";
    } else if (latencyRatio < 0.6) {
      latencyHealth = "Swift";
    }

    // 3. Learning Confidence: penalize for hints, hesitation, or repeated mistakes
    let confidence = signals.isCorrect ? 85 : 45;

    // Penalty for excessive hints (each hint subtracts 12 pts)
    confidence -= signals.hintsUsedCount * 12;

    // Penalty for hesitation
    if (latencyHealth === "Hesitant") {
      confidence -= 15;
    }

    // Penalty for repeated mistakes on this concept
    confidence -= signals.repeatedMistakeCount * 18;

    confidence = Math.max(15, Math.min(98, confidence));

    // 4. Concept Stability
    let conceptStability: "Low" | "Medium" | "High" = "Medium";
    if (understanding >= 80 && confidence >= 75 && signals.repeatedMistakeCount === 0) {
      conceptStability = "High";
    } else if (understanding < 50 || confidence < 50 || signals.repeatedMistakeCount >= 2) {
      conceptStability = "Low";
    }

    return {
      understandingScore: understanding,
      learningConfidenceScore: confidence,
      conceptStability,
      latencyHealth,
      adaptationTriggered: !signals.isCorrect || conceptStability === "Low",
    };
  }
}
