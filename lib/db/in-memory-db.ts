// ==========================================
// IN-MEMORY DATABASE & PRE-LOADED DATA
// ==========================================
import { StudentProfile, KnowledgeGraph, LessonState, LessonPlan } from "@/types/teaching";
import { DocumentMetadata, MaterialChunk } from "@/types/rag";

// Default Student Profile
export const defaultStudentProfile: StudentProfile = {
  id: "student_001",
  name: "Alex Morgan",
  qualificationLevel: "Undergraduate (College / B.Tech / B.Sc)",
  level: "Beginner",
  goal: "Understand",
  language: "English",
  preferredStyle: "Visual",
  availableTime: "20m",
  depth: "Balanced",
  learningSpeed: "Moderate",
  retentionScore: 84,
  learningStreakDays: 6,
  totalHoursLearned: 18.5,
  completedLessonsCount: 14,
  topicsStudied: ["Newton's Laws", "Basic Kinematics", "Electric Circuits", "Linear Equations"],
  weakConcepts: ["Resistance & Ohm's Law", "Vectors in 2D"],
  masteredConcepts: ["Newton's 1st Law", "Kinetic Energy", "Voltage Sources", "Electric Current"],
  recentMisconceptions: [
    {
      concept: "Ohm's Law",
      description: "Believed increasing resistance increases current flow.",
      resolved: false,
      date: "2026-09-02",
    },
    {
      concept: "Newton's 2nd Law",
      description: "Confused acceleration with instantaneous velocity.",
      resolved: true,
      date: "2026-08-28",
    },
  ],
};

// Initial Sample Documents for RAG
export const sampleDocuments: DocumentMetadata[] = [
  {
    id: "doc_physics_ch4",
    name: "Physics_Chapter_4_Dynamics_and_Circuits.pdf",
    fileType: "PDF",
    fileSize: 4194304, // 4 MB
    uploadedAt: "2026-09-04T10:15:00Z",
    pageCount: 42,
    topicsExtracted: ["Newton's 2nd Law", "Force & Acceleration", "Electric Current", "Resistance", "Ohm's Law"],
    status: "INDEXED",
    summary: "Comprehensive high school and introductory college physics covering Newtonian mechanics, classical forces, and elementary direct-current electrical circuits.",
    totalChunks: 18,
  },
  {
    id: "doc_ml_fundamentals",
    name: "Machine_Learning_Core_Concepts.pdf",
    fileType: "PDF",
    fileSize: 5242880, // 5 MB
    uploadedAt: "2026-09-03T14:30:00Z",
    pageCount: 56,
    topicsExtracted: ["Supervised Learning", "Gradient Descent", "Loss Functions", "Neural Networks"],
    status: "INDEXED",
    summary: "Foundational machine learning text introducing mathematical optimization, feature representations, and neural network architectures.",
    totalChunks: 24,
  },
];

// Pre-indexed Material Chunks for RAG Grounding
export const sampleChunks: MaterialChunk[] = [
  {
    id: "chunk_phys_01",
    documentId: "doc_physics_ch4",
    documentTitle: "Physics_Chapter_4_Dynamics_and_Circuits.pdf",
    chapter: "Chapter 4: Dynamics",
    pageNumber: 31,
    section: "Newton's Second Law of Motion",
    tokenCount: 160,
    content:
      "Newton's second law of motion states that the acceleration of an object as produced by a net force is directly proportional to the magnitude of the net force, in the same direction as the net force, and inversely proportional to the mass of the object. Mathematically: F = m * a, where F is net force in Newtons (N), m is mass in kilograms (kg), and a is acceleration in meters per second squared (m/s²). If force doubles while mass is held constant, acceleration must double.",
  },
  {
    id: "chunk_phys_02",
    documentId: "doc_physics_ch4",
    documentTitle: "Physics_Chapter_4_Dynamics_and_Circuits.pdf",
    chapter: "Chapter 4: Electricity & Circuits",
    pageNumber: 37,
    section: "Ohm's Law and Electrical Resistance",
    tokenCount: 185,
    content:
      "Ohm's law defines the relationship between voltage (V), electric current (I), and resistance (R). The electric current flowing through a conductor is directly proportional to the potential difference across it, provided temperature and other physical conditions remain unchanged: V = I * R, or rewritten as I = V / R. Resistance represents the opposition to the flow of electric charges. An analogy is water flowing through a constricted pipe: narrowing the pipe (higher resistance) reduces the rate of water flow (current) for a given water pressure (voltage).",
  },
  {
    id: "chunk_phys_03",
    documentId: "doc_physics_ch4",
    documentTitle: "Physics_Chapter_4_Dynamics_and_Circuits.pdf",
    chapter: "Chapter 4: Electricity & Circuits",
    pageNumber: 40,
    section: "Series and Parallel Resistive Networks",
    tokenCount: 170,
    content:
      "In a series circuit, resistors are connected end-to-end. The total equivalent resistance is the algebraic sum of individual resistances: R_total = R1 + R2 + ... + Rn. The current throughout a series circuit is identical at every point, while the potential difference drops across each resistor according to V_k = I * R_k.",
  },
];

// Physics Knowledge Graph
export const physicsKnowledgeGraph: KnowledgeGraph = {
  nodes: [
    {
      id: "concept_newton_2",
      title: "Newton's Second Law",
      description: "Fundamental relationship between net force, mass, and resulting acceleration (F = ma).",
      status: "LEARNING",
      masteryScore: 68,
      confidenceScore: 72,
      stability: "Medium",
      difficulty: "Beginner",
      prerequisites: [],
      subconcepts: ["concept_force_acceleration", "concept_mass_inertia"],
      sourceDocument: {
        documentId: "doc_physics_ch4",
        title: "Physics_Chapter_4_Dynamics_and_Circuits.pdf",
        page: 31,
        section: "Newton's Second Law of Motion",
      },
      misconceptionsIdentified: [
        "Confusing acceleration with velocity",
        "Believing constant motion requires continuous net force",
      ],
      lastPracticed: "2026-09-04",
      decayPercent: 12,
    },
    {
      id: "concept_voltage",
      title: "Electric Voltage (Potential Difference)",
      description: "Work done per unit charge in moving between two electrical points; the driving 'pressure'.",
      status: "MASTERED",
      masteryScore: 92,
      confidenceScore: 90,
      stability: "High",
      difficulty: "Beginner",
      prerequisites: [],
      subconcepts: ["concept_ohms_law"],
      sourceDocument: {
        documentId: "doc_physics_ch4",
        title: "Physics_Chapter_4_Dynamics_and_Circuits.pdf",
        page: 36,
        section: "Electric Potential and Electromotive Force",
      },
      misconceptionsIdentified: [],
      lastPracticed: "2026-09-01",
      decayPercent: 5,
    },
    {
      id: "concept_current",
      title: "Electric Current",
      description: "Rate of flow of electric charges past a given cross-section per second (I = Q / t).",
      status: "MASTERED",
      masteryScore: 88,
      confidenceScore: 86,
      stability: "High",
      difficulty: "Beginner",
      prerequisites: ["concept_voltage"],
      subconcepts: ["concept_ohms_law"],
      sourceDocument: {
        documentId: "doc_physics_ch4",
        title: "Physics_Chapter_4_Dynamics_and_Circuits.pdf",
        page: 37,
        section: "Electric Current Definition",
      },
      misconceptionsIdentified: [],
      lastPracticed: "2026-09-02",
      decayPercent: 8,
    },
    {
      id: "concept_ohms_law",
      title: "Resistance & Ohm's Law",
      description: "Fundamental circuit law connecting current, voltage, and electrical resistance (V = I * R).",
      status: "STRUGGLING",
      masteryScore: 42,
      confidenceScore: 40,
      stability: "Low",
      difficulty: "Intermediate",
      prerequisites: ["concept_voltage", "concept_current"],
      subconcepts: ["concept_series_circuits", "concept_parallel_circuits"],
      sourceDocument: {
        documentId: "doc_physics_ch4",
        title: "Physics_Chapter_4_Dynamics_and_Circuits.pdf",
        page: 37,
        section: "Ohm's Law and Electrical Resistance",
      },
      misconceptionsIdentified: [
        "Student believes increasing resistance increases current flow",
        "Confusing potential difference with current consumption",
      ],
      lastPracticed: "2026-09-03",
      decayPercent: 26,
    },
    {
      id: "concept_series_circuits",
      title: "Series Circuits",
      description: "Circuits where charge follows a single continuous path, causing cumulative resistance.",
      status: "NOT_STARTED",
      masteryScore: 10,
      confidenceScore: 15,
      stability: "Low",
      difficulty: "Intermediate",
      prerequisites: ["concept_ohms_law"],
      subconcepts: [],
      sourceDocument: {
        documentId: "doc_physics_ch4",
        title: "Physics_Chapter_4_Dynamics_and_Circuits.pdf",
        page: 40,
        section: "Series and Parallel Resistive Networks",
      },
      misconceptionsIdentified: [],
      decayPercent: 0,
    },
  ],
  edges: [
    { from: "concept_voltage", to: "concept_current", relationship: "prerequisite" },
    { from: "concept_voltage", to: "concept_ohms_law", relationship: "prerequisite" },
    { from: "concept_current", to: "concept_ohms_law", relationship: "prerequisite" },
    { from: "concept_ohms_law", to: "concept_series_circuits", relationship: "prerequisite" },
  ],
};

// Physics Master Demo Lesson Plan
export const physicsLessonPlan: LessonPlan = {
  id: "lesson_physics_101",
  title: "Newton's Second Law & Ohm's Electrical Dynamics",
  subject: "Physics",
  overview: "Master the fundamental laws governing mechanical forces and electrical currents with interactive physical simulations and adaptive analogies.",
  targetDurationMinutes: 20,
  allocatedTime: {
    introMinutes: 2,
    conceptsMinutes: 10,
    interactionMinutes: 4,
    assessmentMinutes: 3,
    bufferMinutes: 1,
  },
  steps: [
    {
      id: "step_1_intro",
      conceptId: "concept_newton_2",
      title: "Introduction to Newton's Second Law",
      action: "EXPLAIN",
      spokenScript:
        "Welcome! I am your AI Teacher. Today we are investigating one of nature's most foundational principles: Newton's Second Law of Motion. Whenever a net force acts upon an object, it doesn't merely move at constant speed—it accelerates. Let's look closely at the mathematical relationship.",
      spokenScriptHindi:
        "नमस्ते! मैं आपका एआई शिक्षक हूँ। आज हम प्रकृति के सबसे बुनियादी सिद्धांतों में से एक की खोज कर रहे हैं: न्यूटन का गति का दूसरा नियम। जब भी किसी वस्तु पर शुद्ध बल लगता है, तो वह केवल स्थिर गति से नहीं चलती—उसमें त्वरण पैदा होता है। आइए गणितीय संबंध को देखें।",
      spokenScriptHinglish:
        "Namaste! Main aapka AI Teacher hoon. Aaj hum physics ka ek foundational law explore kar rahe hain: Newton's Second Law of Motion. Jab bhi kisi object par net force lagti hai, toh acceleration create hoti hai. Chaliye equation ko dekhte hain.",
      spokenScriptTamil:
        "வணக்கம்! நான் உங்கள் AI ஆசிரியர். இன்று நாம் இயற்கையின் மிக அடிப்படையான விதியை ஆராய்கிறோம்: நியூட்டனின் இரண்டாம் இயக்க விதி. ஒரு பொருளின் மீது விசை செயல்படும் போது, அது முடுக்கமடைகிறது.",
      visual: {
        type: "EQUATION",
        title: "Newton's Second Law Formula",
        caption: "Net force equals mass multiplied by acceleration.",
        data: {
          formula: "F = m \\cdot a",
          variables: [
            { symbol: "F", name: "Net Force", unit: "Newtons (N)", color: "#38bdf8" },
            { symbol: "m", name: "Mass", unit: "Kilograms (kg)", color: "#10b981" },
            { symbol: "a", name: "Acceleration", unit: "Meters per second squared (m/s²)", color: "#f59e0b" },
          ],
        },
      },
      sourceCitation: {
        docTitle: "Physics_Chapter_4_Dynamics_and_Circuits.pdf",
        page: 31,
        section: "Newton's Second Law of Motion",
        snippet: "Newton's second law of motion states that the acceleration of an object as produced by a net force is directly proportional to the magnitude of the net force...",
      },
      durationEstimateSeconds: 45,
    },
    {
      id: "step_2_visual_demo",
      conceptId: "concept_newton_2",
      title: "Free-Body Acceleration Dynamics",
      action: "SHOW_DIAGRAM",
      spokenScript:
        "Notice what happens on our force simulation diagram. As the horizontal push force increases while mass is kept at a fixed 10 kilograms, the acceleration vector surges proportionally. Watch the acceleration vector stretch!",
      spokenScriptHindi:
        "हमारे सिमुलेशन आरेख पर ध्यान दें। जैसे-जैसे बल बढ़ता है जबकि द्रव्यमान 10 किलोग्राम पर स्थिर रहता है, त्वरण वेक्टर आनुपातिक रूप से बढ़ता है।",
      spokenScriptHinglish:
        "Simulation diagram par dhyan dijiye. Jaise hi push force badhti hai aur mass 10 kg constant rehta hai, acceleration vector proportionally double ho jata hai.",
      visual: {
        type: "DIAGRAM",
        title: "Free-Body Force & Acceleration Simulation",
        caption: "Dynamic cart with adjustable force vector demonstrating F = ma.",
        data: {
          diagramType: "physics_cart",
          massKg: 10,
          forceNewtons: 40,
          accelerationMps2: 4,
        },
      },
      durationEstimateSeconds: 50,
    },
    {
      id: "step_3_checkpoint_question",
      conceptId: "concept_newton_2",
      title: "Concept Checkpoint: Force & Acceleration",
      action: "ASK_MCQ",
      spokenScript:
        "Now, let's test your intuition. If the net force acting on a moving object doubles while its mass remains strictly constant, what happens to its acceleration?",
      spokenScriptHindi:
        "अब, आपकी समझ का परीक्षण करते हैं। यदि किसी वस्तु पर लगने वाला शुद्ध बल दोगुना हो जाता है जबकि उसका द्रव्यमान बिल्कुल स्थिर रहता है, तो उसके त्वरण का क्या होगा?",
      spokenScriptHinglish:
        "Ab ek quick conceptual check karte hain. Agar kisi moving object par net force double kar di jaye aur mass constant rahe, toh acceleration par kya asar padega?",
      visual: {
        type: "EQUATION",
        title: "Proportionality Check",
        caption: "Consider: a = F / m",
        data: {
          formula: "a = \\frac{F}{m}",
          highlight: "numerator",
        },
      },
      question: {
        id: "q_newton_double_force",
        conceptId: "concept_newton_2",
        conceptTitle: "Newton's Second Law",
        type: "MCQ",
        difficulty: "Beginner",
        prompt: "If the net force acting on an object doubles while its mass remains constant, what happens to its acceleration?",
        options: [
          {
            id: "opt_a",
            text: "Acceleration doubles (2x)",
            isCorrect: true,
          },
          {
            id: "opt_b",
            text: "Acceleration is cut in half (0.5x)",
            isCorrect: false,
            misconceptionTrigger: "Inverted relationship: believing force and acceleration are inversely related.",
          },
          {
            id: "opt_c",
            text: "Acceleration stays constant while velocity doubles",
            isCorrect: false,
            misconceptionTrigger: "Confusing acceleration with velocity: assuming force directly controls speed rather than rate of change.",
          },
          {
            id: "opt_d",
            text: "Acceleration quadruples (4x)",
            isCorrect: false,
            misconceptionTrigger: "Quadratic fallacy: thinking force scales as the square of acceleration.",
          },
        ],
        correctAnswerSummary: "Because acceleration is directly proportional to net force (a = F/m), doubling the force doubles the acceleration.",
        hint: "Look at the formula: a = F / m. What happens to 'a' when 'F' is multiplied by 2?",
        socraticFollowUps: [
          "What is the mathematical definition of directly proportional?",
          "If you push twice as hard on a skateboard, how does its rate of speeding up change?",
        ],
      },
      durationEstimateSeconds: 60,
    },
    {
      id: "step_4_ohms_law_intro",
      conceptId: "concept_ohms_law",
      title: "Connecting to Circuit Dynamics: Ohm's Law",
      action: "EXPLAIN",
      spokenScript:
        "Just as mechanical force drives acceleration against mass, electrical voltage drives current against resistance. According to Ohm's Law, current equals voltage divided by resistance: I = V / R.",
      spokenScriptHindi:
        "जिस तरह यांत्रिक बल द्रव्यमान के विरुद्ध त्वरण को प्रेरित करता है, उसी तरह विद्युत वोल्टेज प्रतिरोध के विरुद्ध धारा को चलाता है। ओम के नियम के अनुसार, I = V / R।",
      spokenScriptHinglish:
        "Jaise mechanics mein force mass ke against acceleration drive karta hai, waise hi electricity mein voltage resistance ke against current flow karta hai: I = V / R.",
      visual: {
        type: "EQUATION",
        title: "Ohm's Law Formulation",
        caption: "Electric current is directly proportional to voltage and inversely proportional to resistance.",
        data: {
          formula: "I = \\frac{V}{R}",
          variables: [
            { symbol: "I", name: "Current", unit: "Amperes (A)", color: "#38bdf8" },
            { symbol: "V", name: "Voltage", unit: "Volts (V)", color: "#10b981" },
            { symbol: "R", name: "Resistance", unit: "Ohms (Ω)", color: "#f43f5e" },
          ],
        },
      },
      sourceCitation: {
        docTitle: "Physics_Chapter_4_Dynamics_and_Circuits.pdf",
        page: 37,
        section: "Ohm's Law and Electrical Resistance",
        snippet: "Ohm's law defines the relationship between voltage, electric current, and resistance... I = V / R.",
      },
      durationEstimateSeconds: 50,
    },
    {
      id: "step_5_resistance_question",
      conceptId: "concept_ohms_law",
      title: "Diagnostic Check: Resistance vs Current",
      action: "ASK_MCQ",
      spokenScript:
        "Let's see how well you grasp electrical resistance. If you increase the resistance of a circuit while maintaining a constant voltage, what will happen to the electric current flowing through it?",
      spokenScriptHindi:
        "आइए देखें कि आप विद्युत प्रतिरोध को कितनी अच्छी तरह समझते हैं। यदि आप स्थिर वोल्टेज बनाए रखते हुए परिपथ का प्रतिरोध बढ़ाते हैं, तो धारा का क्या होगा?",
      spokenScriptHinglish:
        "Chaliye check karte hain. Agar voltage constant rahe aur aap circuit ka resistance badha dete hain, toh current par kya asar hoga?",
      visual: {
        type: "EQUATION",
        title: "Current Equation",
        caption: "Analyze: I = V / R as R increases",
        data: {
          formula: "I = \\frac{V}{R \\uparrow}",
          highlight: "denominator",
        },
      },
      question: {
        id: "q_resistance_current_misconception",
        conceptId: "concept_ohms_law",
        conceptTitle: "Resistance & Ohm's Law",
        type: "MCQ",
        difficulty: "Intermediate",
        prompt: "If you increase the electrical resistance (R) in a circuit while the voltage (V) remains constant, what happens to the current (I)?",
        options: [
          {
            id: "opt_res_a",
            text: "Current increases because resistance pushes charges faster",
            isCorrect: false,
            misconceptionTrigger: "Student believes increasing resistance increases current flow.",
          },
          {
            id: "opt_res_b",
            text: "Current decreases because resistance opposes charge flow",
            isCorrect: true,
          },
          {
            id: "opt_res_c",
            text: "Current remains identical; only power consumption changes",
            isCorrect: false,
            misconceptionTrigger: "Belief that current is an intrinsic constant unaffected by resistive load.",
          },
        ],
        correctAnswerSummary: "Resistance opposes the flow of charges. As R increases in I = V/R with constant V, the current I must decrease.",
        hint: "Think about the word 'resistance'—does it help flow or block it?",
      },
      durationEstimateSeconds: 65,
    },
    {
      id: "step_6_adaptive_analogy",
      conceptId: "concept_ohms_law",
      title: "Adaptive Intervention: The Water-Pipe Analogy",
      action: "GIVE_ANALOGY",
      spokenScript:
        "Let's step back and look at this with a real-world analogy: water flowing through pipes! Voltage is like water pressure from a pump. Current is the rate of water flowing out. Resistance is like pinching the pipe or filling it with sand. If you pinch the pipe tighter—increasing resistance—less water can get through!",
      spokenScriptHindi:
        "आइए इसे पानी के पाइप के उदाहरण से समझते हैं! वोल्टेज पानी के पंप जैसा दबाव है। धारा बहते पानी की गति है। प्रतिरोध पाइप को संकरा करने जैसा है। यदि आप पाइप को दबाते हैं—प्रतिरोध बढ़ाते हैं—तो कम पानी निकल पाता है!",
      spokenScriptHinglish:
        "Chaliye water-pipe analogy se samajhte hain! Voltage ek pump ka pressure hai, current paani ka flow rate hai, aur resistance pipe ko squeeze karna hai. Agar aap pipe ko squeeze karenge (resistance badhayenge), toh paani ka flow (current) kam ho jayega!",
      visual: {
        type: "ANALOGY",
        title: "Water-Pipe Hydraulic Analogy for Ohm's Law",
        caption: "Narrowing the pipe (higher R) constricts the flow (lower I) at equal pressure (V).",
        data: {
          analogyType: "hydraulic_pipe",
          pressureLevel: "Constant 12V",
          constrictionLevel: "High Resistance (Pitched Pipe)",
          flowRate: "Low Current Flow",
        },
      },
      durationEstimateSeconds: 55,
    },
    {
      id: "step_7_recheck_mastery",
      conceptId: "concept_ohms_law",
      title: "Mastery Re-Check: Applying the Analogy",
      action: "ASK_SHORT_ANSWER",
      spokenScript:
        "Now that we visualized the constricted pipe, imagine we replace a thick copper wire with a very thin, high-resistance wire. Explain in your own words: why does the brightness of an attached lightbulb dim?",
      spokenScriptHindi:
        "अब जब हमने संकरे पाइप को देख लिया है, तो अपने शब्दों में समझाइए: जब हम एक उच्च-प्रतिरोध वाला तार लगाते हैं, तो बल्ब की चमक क्यों धीमी हो जाती है?",
      spokenScriptHinglish:
        "Ab water-pipe analogy ke baad, apne words mein explain karein: agar hum ek thin, high-resistance wire use karein, toh lightbulb dim kyu ho jata hai?",
      visual: {
        type: "SIMULATION",
        title: "Interactive Circuit Simulation",
        caption: "Bulb brightness directly reflects current magnitude I.",
        data: {
          circuitType: "single_loop",
          resistanceOhms: 50,
          currentAmps: 0.24,
          bulbIntensityPercent: 30,
        },
      },
      question: {
        id: "q_bulb_dim_explanation",
        conceptId: "concept_ohms_law",
        conceptTitle: "Resistance & Ohm's Law",
        type: "EXPLAIN_IN_OWN_WORDS",
        difficulty: "Beginner",
        prompt: "Why does the lightbulb dim when resistance increases? (Explain in your own words using current, resistance, or the water analogy)",
        correctAnswerSummary: "Higher resistance restricts charge flow, reducing the current reaching the bulb filament, producing less light.",
        hint: "Mention how higher resistance reduces the electric current.",
      },
      durationEstimateSeconds: 70,
    },
  ],
};

// Global in-memory lesson state
export class DatabaseStore {
  private static instance: DatabaseStore;
  public studentProfile: StudentProfile;
  public documents: DocumentMetadata[];
  public chunks: MaterialChunk[];
  public knowledgeGraph: KnowledgeGraph;
  public activeLessonState: LessonState | null = null;

  private constructor() {
    this.studentProfile = { ...defaultStudentProfile };
    this.documents = [...sampleDocuments];
    this.chunks = [...sampleChunks];
    this.knowledgeGraph = JSON.parse(JSON.stringify(physicsKnowledgeGraph));
  }

  public static getInstance(): DatabaseStore {
    if (!DatabaseStore.instance) {
      DatabaseStore.instance = new DatabaseStore();
    }
    return DatabaseStore.instance;
  }

  public getOrCreateLessonState(lessonId: string): LessonState {
    if (this.activeLessonState && this.activeLessonState.lessonId === lessonId) {
      return this.activeLessonState;
    }

    const state: LessonState = {
      lessonId,
      title: physicsLessonPlan.title,
      studentProfile: { ...this.studentProfile },
      brainState: "TEACH",
      knowledgeGraph: JSON.parse(JSON.stringify(this.knowledgeGraph)),
      lessonPlan: JSON.parse(JSON.stringify(physicsLessonPlan)),
      currentStepIndex: 0,
      currentConceptId: physicsLessonPlan.steps[0].conceptId,
      currentDifficulty: this.studentProfile.level,
      currentLanguage: this.studentProfile.language,
      mode: "TEACH",
      timeRemainingSeconds: 20 * 60,
      totalElapsedSeconds: 0,
      isPaused: false,
      isSpeaking: false,
      isListening: false,
      questionsAskedCount: 0,
      correctAnswersCount: 0,
      activeMisconceptions: [],
      resolvedMisconceptions: [],
      adaptationHistory: [],
    };

    this.activeLessonState = state;
    return state;
  }
}
