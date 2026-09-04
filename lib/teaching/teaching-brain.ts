// ==========================================
// AI TEACHER TEACHING BRAIN (STATE MACHINE)
// ==========================================
import {
  BrainState,
  LessonState,
  StudentResponsePayload,
  EvaluationResult,
  SupportedLanguage,
  LearnerLevel,
} from "@/types/teaching";
import { MisconceptionDetector } from "./misconception-detector";
import { LearningConfidenceModel } from "./confidence-model";
import { AdaptivePolicyEngine } from "./policy-engine";

export class TeachingBrain {
  /**
   * Evaluates student answer, updates lesson state, triggers misconception detection,
   * invokes policy engine, and returns updated lesson state + evaluation
   */
  public static processStudentAnswer(
    state: LessonState,
    response: StudentResponsePayload
  ): { updatedState: LessonState; evaluation: EvaluationResult } {
    const currentStep = state.lessonPlan.steps[state.currentStepIndex];
    const question = currentStep?.question;

    let isCorrect = false;
    let score = 0;
    let feedback = "";
    let encouragement = "";

    // 1. Evaluate correctness
    if (question?.type === "MCQ" && question.options) {
      const selected = question.options.find((o) => o.id === response.selectedOptionId);
      isCorrect = Boolean(selected?.isCorrect);
      score = isCorrect ? 100 : 25;
      if (isCorrect) {
        feedback = `Spot on! ${question.correctAnswerSummary}`;
        encouragement = "Excellent physical intuition. You grasped the direct proportionality.";
      } else {
        feedback = `Not quite. ${question.correctAnswerSummary}`;
        encouragement = "Let's break down this relationship together. Physics is about understanding patterns, not memorizing.";
      }
    } else {
      // Free text / Explain in own words
      const text = response.studentAnswer.toLowerCase();
      if (
        (text.includes("oppose") || text.includes("resist") || text.includes("reduce") || text.includes("decrease") || text.includes("less") || text.includes("dim")) &&
        !text.includes("increase current")
      ) {
        isCorrect = true;
        score = 90;
        feedback = "Outstanding explanation! You correctly identified that higher resistance restricts current flow, resulting in reduced power and brightness.";
        encouragement = "Your reasoning is rock solid!";
      } else {
        isCorrect = false;
        score = 40;
        feedback = "Notice that resistance acts as a constriction. When resistance goes up, current decreases, which causes the bulb to dim.";
        encouragement = "Great attempt! Connecting microscopic resistance to visible lightbulb brightness is a big step.";
      }
    }

    // 2. Misconception Engine
    const misconceptionAnalysis = MisconceptionDetector.detect({
      questionId: response.questionId,
      conceptTitle: question?.conceptTitle || "Physics Dynamics",
      studentAnswer: response.studentAnswer,
      selectedOptionId: response.selectedOptionId,
    });

    // 3. Confidence & Stability Model
    const currentConceptNode = state.knowledgeGraph.nodes.find(
      (n) => n.id === state.currentConceptId
    );
    const confidenceMetrics = LearningConfidenceModel.evaluate({
      isCorrect,
      score,
      responseLatencySeconds: response.timeSpentSeconds,
      expectedLatencySeconds: 25,
      hintsUsedCount: response.hintsUsedCount,
      repeatedMistakeCount: misconceptionAnalysis.isMisconception ? 1 : 0,
      previousMastery: currentConceptNode?.masteryScore || 50,
    });

    // 4. Adaptive Policy Engine
    const decision = AdaptivePolicyEngine.decideNextStep(
      state,
      isCorrect,
      misconceptionAnalysis,
      confidenceMetrics
    );

    // 5. Update Brain State and Concept Mastery
    const nextBrainState: BrainState = misconceptionAnalysis.isMisconception
      ? "ADAPT"
      : isCorrect
      ? "CONTINUE"
      : "RETEACH";

    const nextKnowledgeGraph = JSON.parse(JSON.stringify(state.knowledgeGraph));
    const targetNode = nextKnowledgeGraph.nodes.find(
      (n: any) => n.id === state.currentConceptId
    );

    if (targetNode) {
      targetNode.masteryScore = confidenceMetrics.understandingScore;
      targetNode.confidenceScore = confidenceMetrics.learningConfidenceScore;
      targetNode.stability = confidenceMetrics.conceptStability;
      if (confidenceMetrics.understandingScore >= 80) {
        targetNode.status = "MASTERED";
      } else if (misconceptionAnalysis.isMisconception) {
        targetNode.status = "STRUGGLING";
        if (!targetNode.misconceptionsIdentified.includes(misconceptionAnalysis.misconceptionType)) {
          targetNode.misconceptionsIdentified.push(misconceptionAnalysis.misconceptionType);
        }
      } else {
        targetNode.status = "LEARNING";
      }
    }

    // New adaptation history item if triggered
    const newAdaptationHistory = [...state.adaptationHistory];
    if (decision.adaptationEvent) {
      newAdaptationHistory.unshift(decision.adaptationEvent);
    }

    const evaluation: EvaluationResult = {
      isCorrect,
      score,
      feedback,
      encouragement,
      detectedMisconception: misconceptionAnalysis.isMisconception
        ? {
            isMisconception: true,
            misconceptionType: misconceptionAnalysis.misconceptionType,
            severity: misconceptionAnalysis.severity,
            explanation: misconceptionAnalysis.explanation,
            recommendedStrategy: misconceptionAnalysis.recommendedStrategy,
          }
        : undefined,
      recommendedAction: decision.nextAction,
      updatedMastery: confidenceMetrics.understandingScore,
      updatedConfidence: confidenceMetrics.learningConfidenceScore,
    };

    const updatedState: LessonState = {
      ...state,
      brainState: nextBrainState,
      currentDifficulty: decision.nextDifficulty,
      knowledgeGraph: nextKnowledgeGraph,
      questionsAskedCount: state.questionsAskedCount + 1,
      correctAnswersCount: state.correctAnswersCount + (isCorrect ? 1 : 0),
      activeMisconceptions: misconceptionAnalysis.isMisconception
        ? Array.from(new Set([...state.activeMisconceptions, misconceptionAnalysis.misconceptionType]))
        : state.activeMisconceptions,
      adaptationHistory: newAdaptationHistory,
      lastEvaluation: evaluation,
    };

    return { updatedState, evaluation };
  }

  /**
   * Real-Time Interruption Handler (Requirement #20)
   * Answers question in current context without losing lesson position
   */
  public static handleInterruption(
    state: LessonState,
    studentQuery: string
  ): { updatedState: LessonState; teacherReply: string } {
    let reply = "";
    const lower = studentQuery.toLowerCase();

    if (lower.includes("current decrease") || lower.includes("why does current")) {
      reply =
        "Great question! Think of electric current as the volume of electrons passing each second. When resistance increases, there are more atomic collisions opposing their path. Just like putting a strainer in a flowing water pipe, the flow rate must drop unless you pump harder with higher voltage! Now, let's pick right back up from where we were.";
    } else if (lower.includes("hindi") || lower.includes("hinglish")) {
      reply =
        "Bilkul! Ab se main aapko Hindi aur Hinglish mein bhi explain karunga, jabki hamara scientific context bilkul intact rahega. Chaliye continue karte hain!";
    } else {
      reply = `That is an insightful question about ${state.lessonPlan.title}. In this context, remember that all variables in physics balance each other mathematically. Let's resume our lesson checkpoint.`;
    }

    const updatedState: LessonState = {
      ...state,
      mode: "INTERRUPTED",
      isPaused: true,
      interruptionContext: {
        studentQuery,
        teacherAnswer: reply,
        returnStepIndex: state.currentStepIndex,
      },
    };

    return { updatedState, teacherReply: reply };
  }

  /**
   * Resume from interruption
   */
  public static resumeFromInterruption(state: LessonState): LessonState {
    return {
      ...state,
      mode: "TEACH",
      isPaused: false,
      interruptionContext: undefined,
    };
  }

  /**
   * Switch Language (Requirement #21)
   * Seamlessly switches language without resetting lesson state, concept, or mastery
   */
  public static switchLanguage(
    state: LessonState,
    newLanguage: SupportedLanguage
  ): LessonState {
    return {
      ...state,
      currentLanguage: newLanguage,
      studentProfile: {
        ...state.studentProfile,
        language: newLanguage,
      },
    };
  }

  /**
   * Toggle Exam Mode (Requirement #26)
   */
  public static toggleExamMode(state: LessonState): LessonState {
    const newMode = state.mode === "EXAM" ? "TEACH" : "EXAM";
    return {
      ...state,
      mode: newMode,
    };
  }
}
