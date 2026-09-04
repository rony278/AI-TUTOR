// ==========================================
// AI TEACHER — TYPE DEFINITIONS
// ==========================================

export type LearnerLevel = "Beginner" | "Intermediate" | "Advanced";

export type QualificationLevel =
  | "Middle School (Grade 6 - 8)"
  | "High School (Grade 9 - 10)"
  | "Senior Secondary (Grade 11 - 12)"
  | "Undergraduate (College / B.Tech / B.Sc)"
  | "Postgraduate / Master's / PhD"
  | "Working Professional / Self-Taught";

export type LearningGoal =
  | "Understand"
  | "Exam Preparation"
  | "Interview Preparation"
  | "Revision"
  | "Learn From Scratch"
  | "Practical Application";

export type TeachingStyle =
  | "Visual"
  | "Practical"
  | "Socratic"
  | "Simple"
  | "Technical"
  | "Example-driven";

export type SupportedLanguage =
  | "English"
  | "Hindi"
  | "Hinglish"
  | "Tamil"
  | "Telugu"
  | "Bengali"
  | "Marathi"
  | "Kannada"
  | "Malayalam";

export type LessonDuration = "5m" | "10m" | "20m" | "30m" | "60m" | "7d";
export type LessonDepth = "Quick" | "Balanced" | "Deep";

export interface StudentProfile {
  id: string;
  name: string;
  qualificationLevel: QualificationLevel;
  level: LearnerLevel;
  goal: LearningGoal;
  language: SupportedLanguage;
  preferredStyle: TeachingStyle;
  availableTime: LessonDuration;
  depth: LessonDepth;
  learningSpeed: "Deliberate" | "Moderate" | "Fast";
  retentionScore: number; // 0 - 100
  learningStreakDays: number;
  totalHoursLearned: number;
  completedLessonsCount: number;
  topicsStudied: string[];
  weakConcepts: string[];
  masteredConcepts: string[];
  recentMisconceptions: {
    concept: string;
    description: string;
    resolved: boolean;
    date: string;
  }[];
}

// Concept Graph State
export type ConceptStatus = "NOT_STARTED" | "LEARNING" | "STRUGGLING" | "MASTERED";

export interface ConceptNode {
  id: string;
  title: string;
  description: string;
  status: ConceptStatus;
  masteryScore: number; // 0 - 100
  confidenceScore: number; // 0 - 100
  stability: "Low" | "Medium" | "High";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  prerequisites: string[]; // ids of prerequisite concepts
  subconcepts: string[];
  sourceDocument?: {
    documentId: string;
    title: string;
    page?: number;
    section?: string;
  };
  misconceptionsIdentified: string[];
  lastPracticed?: string;
  decayPercent?: number; // for knowledge decay tracking
}

export interface KnowledgeGraph {
  nodes: ConceptNode[];
  edges: { from: string; to: string; relationship: "prerequisite" | "relates_to" }[];
}

// Teaching Brain State Machine
export type BrainState =
  | "DISCOVER"
  | "PLAN"
  | "TEACH"
  | "CHECK"
  | "DIAGNOSE"
  | "ADAPT"
  | "RETEACH"
  | "RECHECK"
  | "MASTER"
  | "CONTINUE";

// Teaching Policy Actions
export type PolicyAction =
  | "EXPLAIN"
  | "SIMPLIFY"
  | "GIVE_ANALOGY"
  | "SHOW_EXAMPLE"
  | "SHOW_DIAGRAM"
  | "SHOW_EQUATION"
  | "SHOW_CODE"
  | "ASK_MCQ"
  | "ASK_SHORT_ANSWER"
  | "ASK_APPLICATION"
  | "GIVE_HINT"
  | "RETEACH"
  | "INCREASE_DIFFICULTY"
  | "DECREASE_DIFFICULTY"
  | "RECAP"
  | "PRACTICE"
  | "SKIP_AHEAD"
  | "RECOMMEND_REVISION";

export type VisualType =
  | "EQUATION"
  | "GRAPH"
  | "FLOWCHART"
  | "DIAGRAM"
  | "TIMELINE"
  | "MAP"
  | "CODE"
  | "CODE_EXECUTION"
  | "PROCESS"
  | "COMPARISON"
  | "SIMULATION"
  | "ANALOGY"
  | "IMAGE";

export interface VisualPayload {
  type: VisualType;
  title: string;
  caption: string;
  data: any; // visual-specific rendering config
  syncTimestampSeconds?: number;
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  misconceptionTrigger?: string; // if selected, indicates this specific misconception
}

export type QuestionType =
  | "MCQ"
  | "CONCEPTUAL"
  | "SHORT_ANSWER"
  | "APPLICATION"
  | "PROBLEM_SOLVING"
  | "EXPLAIN_IN_OWN_WORDS";

export interface QuestionData {
  id: string;
  conceptId: string;
  conceptTitle: string;
  type: QuestionType;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  prompt: string;
  options?: QuestionOption[];
  correctAnswerSummary: string;
  hint: string;
  socraticFollowUps?: string[];
}

export interface StudentResponsePayload {
  questionId: string;
  studentAnswer: string;
  selectedOptionId?: string;
  timeSpentSeconds: number;
  hintsUsedCount: number;
  inputMode: "voice" | "typing";
}

export interface EvaluationResult {
  isCorrect: boolean;
  score: number; // 0 - 100
  feedback: string;
  encouragement: string;
  detectedMisconception?: {
    isMisconception: boolean;
    misconceptionType: string;
    severity: "Low" | "Moderate" | "Critical";
    explanation: string;
    recommendedStrategy: string;
  };
  recommendedAction: PolicyAction;
  updatedMastery: number;
  updatedConfidence: number;
}

export interface TeacherAdaptationEvent {
  timestamp: string;
  concept: string;
  issueDetected: string;
  previousStrategy: string;
  newStrategy: string;
  previousDifficulty: LearnerLevel;
  newDifficulty: LearnerLevel;
  visualSwitch: string;
  reasoning: string;
}

export interface LessonStep {
  id: string;
  conceptId: string;
  title: string;
  action: PolicyAction;
  spokenScript: string;
  spokenScriptHindi?: string;
  spokenScriptHinglish?: string;
  spokenScriptTamil?: string;
  visual: VisualPayload;
  question?: QuestionData;
  sourceCitation?: {
    docTitle: string;
    page: number;
    section: string;
    snippet: string;
  };
  durationEstimateSeconds: number;
  isCompleted?: boolean;
}

export interface LessonPlan {
  id: string;
  title: string;
  subject: string;
  overview: string;
  targetDurationMinutes: number;
  allocatedTime: {
    introMinutes: number;
    conceptsMinutes: number;
    interactionMinutes: number;
    assessmentMinutes: number;
    bufferMinutes: number;
  };
  steps: LessonStep[];
}

export interface LessonState {
  lessonId: string;
  title: string;
  studentProfile: StudentProfile;
  brainState: BrainState;
  knowledgeGraph: KnowledgeGraph;
  lessonPlan: LessonPlan;
  currentStepIndex: number;
  currentConceptId: string;
  currentDifficulty: LearnerLevel;
  currentLanguage: SupportedLanguage;
  mode: "TEACH" | "EXAM" | "INTERRUPTED" | "SOCRATIC";
  timeRemainingSeconds: number;
  totalElapsedSeconds: number;
  isPaused: boolean;
  isSpeaking: boolean;
  isListening: boolean;
  questionsAskedCount: number;
  correctAnswersCount: number;
  activeMisconceptions: string[];
  resolvedMisconceptions: string[];
  adaptationHistory: TeacherAdaptationEvent[];
  interruptionContext?: {
    studentQuery: string;
    teacherAnswer: string;
    returnStepIndex: number;
  };
  lastEvaluation?: EvaluationResult;
}

export interface FinalAssessmentSummary {
  overallScore: number;
  masteredConcepts: string[];
  weakConcepts: string[];
  misconceptionsSummary: {
    concept: string;
    description: string;
    resolved: boolean;
  }[];
  recommendedRevision: {
    concept: string;
    reason: string;
    durationMinutes: number;
  }[];
  nextBestTopic: {
    title: string;
    description: string;
    estimatedMinutes: number;
  };
}
