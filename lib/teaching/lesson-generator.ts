// ==========================================
// DYNAMIC LESSON GENERATOR (GEMINI POWERED)
// Builds custom 7-step pedagogical lectures for any asked topic
// ==========================================
import {
  LessonPlan,
  LessonStep,
  KnowledgeGraph,
  LearnerLevel,
  QualificationLevel,
  LearningGoal,
  SupportedLanguage,
  TeachingStyle,
  LessonDuration,
  LessonDepth,
} from "@/types/teaching";
import { GeminiLLMProvider } from "@/providers/llm/gemini-provider";

export interface GenerateLessonOptions {
  topic?: string;
  documentId?: string;
  qualificationLevel?: QualificationLevel;
  level?: LearnerLevel;
  goal?: LearningGoal;
  language?: SupportedLanguage;
  preferredStyle?: TeachingStyle;
  availableTime?: LessonDuration;
  depth?: LessonDepth;
  documentText?: string;
  apiKey?: string;
}

export class LessonGenerator {
  /**
   * Generates a fully personalized LessonPlan and KnowledgeGraph for any asked topic
   */
  public static async generateLesson(
    options: GenerateLessonOptions,
    lessonId: string
  ): Promise<{ lessonPlan: LessonPlan; knowledgeGraph: KnowledgeGraph }> {
    const rawTopic = options.topic?.trim() || "Newton's Laws & Circuits";
    const qualification = options.qualificationLevel || "Undergraduate (College / B.Tech / B.Sc)";
    const level = options.level || "Beginner";
    const language = options.language || "English";
    const style = options.preferredStyle || "Visual";
    const availableTime = options.availableTime || "20m";

    // Duration mapping
    let targetMins = 20;
    if (availableTime === "5m") targetMins = 5;
    else if (availableTime === "10m") targetMins = 10;
    else if (availableTime === "30m") targetMins = 30;
    else if (availableTime === "60m") targetMins = 60;

    const allocatedTime = {
      introMinutes: Math.max(1, Math.round(targetMins * 0.1)),
      conceptsMinutes: Math.max(2, Math.round(targetMins * 0.5)),
      interactionMinutes: Math.max(1, Math.round(targetMins * 0.2)),
      assessmentMinutes: Math.max(1, Math.round(targetMins * 0.15)),
      bufferMinutes: Math.max(1, Math.round(targetMins * 0.05)),
    };

    const gemini = new GeminiLLMProvider(options.apiKey);

    if (gemini.hasValidKey()) {
      try {
        const generated = await this.generateWithGemini(
          gemini,
          rawTopic,
          qualification,
          level,
          language,
          style,
          targetMins,
          lessonId,
          allocatedTime,
          options.documentText
        );
        if (generated && generated.lessonPlan.steps.length >= 4) {
          return generated;
        }
      } catch (err) {
        console.warn("[LessonGenerator] Gemini generation failed, using intelligent template fallback:", err);
      }
    }

    // Fallback dynamic generator (produces custom lecture tailored to the asked topic)
    return this.generateFallbackLesson(
      rawTopic,
      qualification,
      level,
      language,
      style,
      targetMins,
      lessonId,
      allocatedTime
    );
  }

  private static async generateWithGemini(
    gemini: GeminiLLMProvider,
    topic: string,
    qualification: string,
    level: string,
    language: string,
    style: string,
    targetMins: number,
    lessonId: string,
    allocatedTime: any,
    documentText?: string
  ): Promise<{ lessonPlan: LessonPlan; knowledgeGraph: KnowledgeGraph }> {
    const prompt = `You are an elite educational pedagogy engine and AI Teacher.
Create a complete interactive 7-step lesson plan and 3-node concept dependency knowledge graph for the requested topic.

Topic: "${topic}"
Learner Qualification: "${qualification}"
Proficiency: "${level}"
Primary Language: "${language}"
Teaching Style: "${style}"
Duration: ${targetMins} minutes
${documentText ? `Document Context: ${documentText.slice(0, 1500)}` : ""}

Requirements:
1. Return a JSON object with two keys: "lessonPlan" and "knowledgeGraph".
2. "lessonPlan" must have:
   - "id": "${lessonId}"
   - "title": (concise, educational title for the topic)
   - "subject": (the broad subject, e.g. "Physics", "Computer Science", "Biology", "Mathematics", "History")
   - "overview": (2-sentence description)
   - "targetDurationMinutes": ${targetMins}
   - "allocatedTime": ${JSON.stringify(allocatedTime)}
   - "steps": an array of exactly 7 steps:
     * Step 1 (action: "EXPLAIN"): Introduction & foundational concept. Must include spokenScript in English, spokenScriptHindi (Devanagari script), spokenScriptHinglish (Roman Hindi), and spokenScriptTamil. Must include visual with type "EQUATION" or "PROCESS" or "DIAGRAM".
     * Step 2 (action: "SHOW_DIAGRAM"): Core breakdown with visual type "DIAGRAM" or "FLOWCHART".
     * Step 3 (action: "SHOW_EXAMPLE"): Interactive visual demonstration. Visual type "PROCESS" or "SIMULATION" or "COMPARISON".
     * Step 4 (action: "ASK_MCQ"): Diagnostic checkpoint question testing intuitive understanding. Must include "question" object with: "id", "conceptId", "conceptTitle", "type": "MCQ", "difficulty": "${level}", "prompt", "options": array of 3-4 options where ONE has "isCorrect": true, and WRONG options have "misconceptionTrigger" explaining the cognitive trap, "correctAnswerSummary", "hint".
     * Step 5 (action: "GIVE_ANALOGY"): Adaptive intervention analogy. Uses an intuitive real-world analogy to demystify the core concept. Visual type "ANALOGY" with title, caption, data containing analogy details.
     * Step 6 (action: "ASK_SHORT_ANSWER"): Follow-up checkpoint checking application of the analogy. Includes "question" with type "EXPLAIN_IN_OWN_WORDS", prompt, correctAnswerSummary, hint.
     * Step 7 (action: "EXPLAIN"): Final synthesis, summary, and mastery consolidation.
3. "knowledgeGraph" must have:
   - "nodes": 3-4 concepts related to "${topic}" with "id", "title", "description", "status": "LEARNING", "masteryScore": 50, "confidenceScore": 50, "stability": "Medium", "difficulty": "${level}", "prerequisites": [], "misconceptionsIdentified": []
   - "edges": array of dependencies { from: string, to: string, relationship: "prerequisite" }

Ensure all scripts sound warm, engaging, and encourage active learning. Return ONLY the JSON object.`;

    const result = await gemini.generateJson<{ lessonPlan: LessonPlan; knowledgeGraph: KnowledgeGraph }>([
      {
        role: "system",
        content: "You are an AI Teacher curriculum generator. Always respond with pure valid JSON matching the requested structure.",
      },
      {
        role: "user",
        content: prompt,
      },
    ]);

    if (result && result.lessonPlan && result.knowledgeGraph) {
      result.lessonPlan.id = lessonId;
      result.lessonPlan.targetDurationMinutes = targetMins;
      result.lessonPlan.allocatedTime = allocatedTime;
      return result;
    }

    throw new Error("Invalid structure returned from Gemini");
  }

  private static generateFallbackLesson(
    topic: string,
    qualification: string,
    level: string,
    language: string,
    style: string,
    targetMins: number,
    lessonId: string,
    allocatedTime: any
  ): { lessonPlan: LessonPlan; knowledgeGraph: KnowledgeGraph } {
    const cleanTopic = topic.replace(/^Teach me\s+/i, "").replace(/\s+from the beginning$/i, "").replace(/^Explain\s+/i, "").trim();
    const lower = cleanTopic.toLowerCase();

    // 1. DOMAIN INTELLIGENCE SYNTHESIZER
    let subject = "General Knowledge";
    let formula = `Key Principle of ${cleanTopic}`;
    let c1Title = `Foundational Principles of ${cleanTopic}`;
    let c1Desc = `The core axioms, definitions, and basic vocabulary of ${cleanTopic}.`;
    let c2Title = `Core Mechanisms & Interactions`;
    let c2Desc = `How the fundamental components of ${cleanTopic} operate and transform.`;
    let c3Title = `Applied Mastery & Edge Cases`;
    let c3Desc = `Real-world applications, problem-solving, and advanced synthesis of ${cleanTopic}.`;

    let step1Narration = `Welcome to your class on ${cleanTopic}! Today, we are breaking down its core architecture so you understand the "why" behind it, not just memorizing terms. Let's start with the foundational principles that define this subject.`;
    let step1Hindi = `नमस्ते! ${cleanTopic} के इस सत्र में आपका स्वागत है। आज हम इसके बुनियादी सिद्धांतों को गहराई से समझेंगे ताकि आपके मन में कोई संशय न रहे।`;
    let step1Hinglish = `Welcome! Aaj hum ${cleanTopic} ke core principles samjhenge. Is topic ka foundation strong karenge taaki practical application aasaan ho jaye.`;

    let step2Title = `Structural Breakdown: How ${cleanTopic} Works`;
    let step2Narration = `Let's examine how the core elements of ${cleanTopic} connect. Notice how the primary inputs pass through the core transformation process to produce observable outcomes.`;
    let step2DiagramSteps = ["Primary Input", "Transformation Process", "Observable Outcome"];

    let step3Title = `Live Demonstration: Dynamic Execution`;
    let step3Narration = `Watch the demonstration stage closely. As conditions change, observe how the system adapts and what key principles remain invariant.`;

    let step4Prompt = `In ${cleanTopic}, what is the primary factor that governs how the system behaves under standard conditions?`;
    let step4CorrectOption = `The balance between primary driving mechanisms and governing constraints`;
    let step4WrongOption1 = `Assuming downstream symptoms directly create foundational causes`;
    let step4WrongOption2 = `Believing the outcome remains completely independent of input changes`;
    let step4CorrectSummary = `Systems in ${cleanTopic} respond systematically to input changes governed by core constraints.`;
    let step4Misconception1 = `Causal Inversion: Confused an outcome symptom with the underlying root cause in ${cleanTopic}.`;
    let step4Misconception2 = `Static Fallacy: Believed ${cleanTopic} operates in total isolation from input parameters.`;
    let step4Hint = `Focus on the root transformation: what drives the change, and what regulates it?`;

    let step5Title = `Intuitive Mental Model Analogy`;
    let step5AnalogyType = "system_balance";
    let step5Narration = `To make this completely clear, think of an intuitive analogy: Imagine a well-designed blueprint and building project. When the blueprint specifications are clear, each step builds predictably on the last without structural collapse!`;
    let step5Hindi = `इसे और आसानी से समझने के लिए एक सरल उदाहरण लेते हैं: जैसे किसी मजबूत इमारत का नक्शा पहले बनता है, वैसे ही ${cleanTopic} में हर नियम दूसरे से जुड़ा हुआ है।`;
    let step5Hinglish = `Chaliye ek real-world analogy se samajhte hain: ${cleanTopic} bilkul ek interconnected building blueprint jaisa hai jahan har part dusre part ko support karta hai.`;
    let step5AnalogyData = {
      analogyType: "conceptual_scaffold",
      driver: "Foundational Rule",
      regulator: "Operating Constraint",
      outcome: "Harmonized System",
    };

    let step6Prompt = `In your own words: explain why understanding the core mechanism of ${cleanTopic} is essential for predicting its outcomes.`;
    let step6CorrectSummary = `Understanding the fundamental transformation allows one to predict outcomes when conditions vary.`;
    let step6Hint = `Describe the cause-and-effect relationship at work in ${cleanTopic}.`;

    // 2. DOMAIN SPECIALIZATIONS
    if (
      lower.includes("tree") || lower.includes("search") || lower.includes("sort") ||
      lower.includes("react") || lower.includes("algorithm") || lower.includes("code") ||
      lower.includes("data structure") || lower.includes("pointer") || lower.includes("graph") ||
      lower.includes("database") || lower.includes("programming") || lower.includes("python") ||
      lower.includes("javascript") || lower.includes("network") || lower.includes("hash")
    ) {
      subject = "Computer Science";
      formula = lower.includes("tree") ? "Time: O(log N) | Space: O(h)" : lower.includes("react") ? "UI = f(state, props)" : "T(n) = O(log N)";
      c1Title = `Data Invariants & Representation`;
      c1Desc = `Memory layout, node structure, and invariant rules governing ${cleanTopic}.`;
      c2Title = `Traversal & Operational Transformation`;
      c2Desc = `Insertion, deletion, and algorithmic traversal logic in ${cleanTopic}.`;
      c3Title = `Complexity & Edge-Case Handling`;
      c3Desc = `Worst-case boundaries, time-space tradeoffs, and balancing in ${cleanTopic}.`;

      step1Narration = `Welcome to Computer Science! Today we are dissecting ${cleanTopic}. In software engineering, data structures and algorithms aren't just syntax—they are strict mathematical contracts with performance guarantees.`;
      step2Title = `Algorithmic State & Invariant Rules`;
      step2Narration = `Notice how every operation in ${cleanTopic} must preserve its core invariant. If an operation violates this invariant, subsequent searches or computations fail.`;
      step2DiagramSteps = ["Root/Input State", "Comparison / Condition Branch", "Preserved Invariant"];

      step3Title = `Step-by-Step Traversal Trace`;
      step3Narration = `Watch the pointer traversal step by step. Notice how at each decision node, half of the search space is eliminated or state transitions deterministically.`;

      step4Prompt = lower.includes("tree")
        ? `In a Binary Search Tree (BST), when inserting a key with a value strictly less than the current node, where must it be placed?`
        : `In ${cleanTopic}, what condition ensures correct computational state without infinite recursion or data corruption?`;
      step4CorrectOption = lower.includes("tree")
        ? `Recursively in the left subtree to maintain BST ordering (Left < Node < Right)`
        : `Preserving the loop/structure invariant at each transition step`;
      step4WrongOption1 = lower.includes("tree")
        ? `In the right subtree because smaller values have lower memory addresses`
        : `Directly mutating values without updating linking pointers or state triggers`;
      step4WrongOption2 = `Placing it arbitrarily at the first available open slot without comparison`;
      step4CorrectSummary = lower.includes("tree")
        ? `BST invariant strictly mandates that every node in the left subtree is less than the parent, and every node in the right subtree is greater.`
        : `Preserving invariant guarantees predictability and avoids runtime corruption.`;
      step4Misconception1 = lower.includes("tree")
        ? `Inverted BST Partition: Placed smaller keys in the right subtree.`
        : `State Invalidation Fallacy: Mutated internal structure without updating dependencies.`;
      step4Misconception2 = `Unordered Storage Fallacy: Assumed tree nodes store items in insertion order like an array.`;
      step4Hint = `Remember the Golden Rule: smaller items go left, larger items go right!`;

      step5Title = `Dictionary & Split-Half Analogy`;
      step5AnalogyType = "dictionary_split";
      step5Narration = `Think of looking up a word in a printed physical dictionary. You flip to the exact middle: if the word comes earlier alphabetically, you instantly discard the entire right half! That is the true power of ${cleanTopic}.`;
      step5AnalogyData = {
        analogyType: "dictionary_lookup",
        driver: "Middle Split Comparison",
        regulator: "Discard Irrelevant Half",
        outcome: "Logarithmic Search O(log N)",
      };

      step6Prompt = `In your own words: why does maintaining the structural invariant in ${cleanTopic} guarantee logarithmic search time instead of linear search?`;
      step6CorrectSummary = `Eliminating half of the search space at each comparison step ensures search time scales with tree height O(log N) rather than total elements N.`;
      step6Hint = `Mention how splitting the problem in half repeatedly prevents checking every single item.`;
    } else if (
      lower.includes("photosynthesis") || lower.includes("cell") || lower.includes("dna") ||
      lower.includes("gene") || lower.includes("protein") || lower.includes("mitosis") ||
      lower.includes("enzyme") || lower.includes("respiration") || lower.includes("plant") ||
      lower.includes("bio") || lower.includes("bacteria") || lower.includes("organ")
    ) {
      subject = "Biology & Life Sciences";
      formula = lower.includes("photosynthesis") ? "6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂" : "DNA → mRNA → Protein";
      c1Title = `Molecular Machinery & Reactants`;
      c1Desc = `Cellular organelles, chemical inputs, and pigments driving ${cleanTopic}.`;
      c2Title = `Biochemical Pathways & Energy Transfer`;
      c2Desc = `Electron transfer, catalytic enzymes, and intermediate synthesis in ${cleanTopic}.`;
      c3Title = `Metabolic Balance & Cellular Output`;
      c3Desc = `Storage, byproduct release, and homeostatic regulation in ${cleanTopic}.`;

      step1Narration = `Welcome to Life Sciences! Today we explore ${cleanTopic}. Living systems are master chemical engineers, capturing energy from the environment and transforming it into biochemical currency.`;
      step2Title = `Metabolic Pathways & Electron Transport`;
      step2Narration = `Trace the chemical journey in ${cleanTopic}. High-energy inputs drive specialized molecular machines, generating cellular fuel with remarkable efficiency.`;
      step2DiagramSteps = ["Raw Reactants (H₂O, CO₂ / Substrates)", "Catalytic Membrane Reactions", "Chemical Output (Glucose / ATP)"];

      step3Title = `Molecular Reaction Demonstration`;
      step3Narration = `Watch the molecular simulation. Observe how incoming energy splits reactant bonds, creating a proton gradient across the thylakoid/cellular membrane.`;

      step4Prompt = lower.includes("photosynthesis")
        ? `During the light-dependent reactions of photosynthesis, what is the exact molecular source of the oxygen gas (O₂) released into the atmosphere?`
        : `In ${cleanTopic}, what is the vital role of the primary catalytic enzyme or energy carrier?`;
      step4CorrectOption = lower.includes("photosynthesis")
        ? `The photolysis (splitting) of water molecules (H₂O)`
        : `Lowering the activation energy to accelerate chemical transformation`;
      step4WrongOption1 = lower.includes("photosynthesis")
        ? `Oxygen atoms stripped away from incoming carbon dioxide (CO₂)`
        : `Consuming itself completely during the initial reaction`;
      step4WrongOption2 = `Atmospheric oxygen trapped inside leaf pores that gets exhaled`;
      step4CorrectSummary = lower.includes("photosynthesis")
        ? `Water (H₂O) is oxidized and split by photons in Photosystem II, liberating electrons, protons, and releasing O₂ as a byproduct.`
        : `Catalytic carriers facilitate energy transfer without being depleted.`;
      step4Misconception1 = lower.includes("photosynthesis")
        ? `Carbon Dioxide Oxygen Fallacy: Believed oxygen byproduct comes from CO₂ rather than H₂O.`
        : `Enzyme Consumption Fallacy: Believed enzymes are destroyed in reactions.`;
      step4Misconception2 = `Passive Gas Inversion: Believed plants simply pump ambient air without biochemical cleavage.`;
      step4Hint = `Think about which molecule gets split at the very beginning of the light reaction!`;

      step5Title = `Solar Factory & Battery Charger Analogy`;
      step5AnalogyType = "solar_factory";
      step5Narration = `Imagine a solar-powered charging station. The solar panels capture sunlight to charge portable battery packs (ATP and NADPH). Then, a dark kitchen bakery uses those charged batteries to bake loaves of sugar!`;
      step5AnalogyData = {
        analogyType: "solar_bakery",
        driver: "Solar Light Harvesting",
        regulator: "Battery Carrier Charging",
        outcome: "Stable Energy Storage",
      };

      step6Prompt = `In your own words: explain why water is essential for the light reactions of photosynthesis, and what happens when light is unavailable.`;
      step6CorrectSummary = `Water provides replacement electrons to the electron transport chain through photolysis; without light, ATP/NADPH cannot charge, halting sugar synthesis.`;
      step6Hint = `Mention electrons, water splitting, and the energy carriers.`;
    } else if (
      lower.includes("calculus") || lower.includes("derivative") || lower.includes("integral") ||
      lower.includes("limit") || lower.includes("algebra") || lower.includes("matrix") ||
      lower.includes("probability") || lower.includes("equation") || lower.includes("function")
    ) {
      subject = "Mathematics";
      formula = lower.includes("derivative") ? "f'(x) = lim_{h→0} [f(x+h) - f(x)] / h" : "∫ f(x) dx = F(x) + C";
      c1Title = `Limits & Infinitesimal Foundations`;
      c1Desc = `Approximations, secant slopes, and delta-epsilon boundaries for ${cleanTopic}.`;
      c2Title = `Operational Rules & Transformations`;
      c2Desc = `Product, quotient, chain rules, and functional linearity in ${cleanTopic}.`;
      c3Title = `Geometric & Physical Applications`;
      c3Desc = `Tangents, optimization, area under curves, and dynamics in ${cleanTopic}.`;

      step1Narration = `Welcome to Higher Mathematics! Today we explore ${cleanTopic}. Rather than treating math as rote formula memorization, we will visualize how limits bridge static algebra to dynamic instantaneous change.`;
      step2Title = `Geometric Construction & Tangent Slope`;
      step2Narration = `Look at the geometric curve. A secant line connecting two points becomes an exact tangent line as the horizontal gap h shrinks infinitesimally toward zero.`;
      step2DiagramSteps = ["Secant Chord [x, x+h]", "Shrink Gap h → 0", "Instantaneous Tangent Slope"];

      step3Title = `Interactive Dynamic Limit Simulation`;
      step3Narration = `Observe the simulation as h approaches zero. Notice how the difference quotient doesn't explode—it cleanly converges to the derivative function value.`;

      step4Prompt = lower.includes("derivative")
        ? `What does the derivative f'(x) geometrically represent at any point x along a differentiable curve?`
        : `In ${cleanTopic}, what is the fundamental condition that allows the mathematical expression to remain well-defined?`;
      step4CorrectOption = lower.includes("derivative")
        ? `The exact slope of the tangent line to the curve at point x`
        : `Convergence to a unique, finite limit from both directions`;
      step4WrongOption1 = `The total area enclosed underneath the function between 0 and x`;
      step4WrongOption2 = `The average rate of change computed across the entire domain`;
      step4CorrectSummary = `The derivative measures instantaneous rate of change, which corresponds geometrically to the slope of the tangent line.`;
      step4Misconception1 = `Average vs Instantaneous Conflation: Confused secant slope over an interval with tangent slope at a point.`;
      step4Misconception2 = `Integral-Derivative Inversion: Confused rate of change with accumulated area.`;
      step4Hint = `Think about your speedometer at a single exact second versus your average trip speed.`;

      step5Title = `Car Speedometer vs Odometer Analogy`;
      step5AnalogyType = "speedometer_tangent";
      step5Narration = `When driving a car, dividing your total trip distance by total hours gives your average speed. But glancing down at your speedometer needle gives your derivative: your exact instantaneous rate of change at that microsecond!`;
      step5AnalogyData = {
        analogyType: "speedometer_rate",
        driver: "Infinitesimal Time Step dt",
        regulator: "Distance Traveled ds",
        outcome: "Instantaneous Speed v = ds/dt",
      };

      step6Prompt = `In your own words: explain why the derivative of a constant function f(x) = C is always zero.`;
      step6CorrectSummary = `A constant function never changes value, meaning the rate of change is zero everywhere and its tangent slope is completely flat.`;
      step6Hint = `Does a flat horizontal line have any slope?`;
    } else if (
      lower.includes("revolution") || lower.includes("war") || lower.includes("history") ||
      lower.includes("constitution") || lower.includes("empire") || lower.includes("treaty") ||
      lower.includes("democracy") || lower.includes("rights") || lower.includes("colonial")
    ) {
      subject = "History & Political Science";
      formula = "Catalyst + Structural Tension → Paradigm Shift";
      c1Title = `Structural Preconditions & Social Friction`;
      c1Desc = `Economic crises, institutional rigidity, and societal inequities leading to ${cleanTopic}.`;
      c2Title = `Catalyst Event & Institutional Rupture`;
      c2Desc = `The flashpoint triggers, mobilizing coalitions, and collapse of old regimes in ${cleanTopic}.`;
      c3Title = `Reconstruction & Lasting Global Legacy`;
      c3Desc = `Constitutional outcomes, ideological diffusion, and modern precedents of ${cleanTopic}.`;

      step1Narration = `Welcome to History and Political Philosophy! Today we examine ${cleanTopic}. Great historical transformations are never random accidents—they arise when deep structural pressures meet an explosive catalyst.`;
      step2Title = `The Escalation Cascade`;
      step2Narration = `Trace the chain of causation. Notice how unresolved grievances and political disenfranchisement create a feedback loop that outpaces administrative reform.`;
      step2DiagramSteps = ["Systemic Inequality / Strain", "Institutional Refusal to Reform", "Revolutionary Rupture & Renewal"];

      step3Title = `Historical Timeline & Power Dynamics`;
      step3Narration = `Observe the power dynamics shift on the stage. When traditional authority loses legitimacy, power rapidly shifts toward mobilized grassroots movements and new assemblies.`;

      step4Prompt = `What is the primary difference between a short-term catalyst event and the underlying structural cause in ${cleanTopic}?`;
      step4CorrectOption = `Structural causes build systemic pressure over decades, whereas catalysts are sudden sparks that ignite existing tension`;
      step4WrongOption1 = `Catalysts alone cause historical events; structural conditions play no measurable role`;
      step4WrongOption2 = `Structural causes only develop after the revolutionary event is already completed`;
      step4CorrectSummary = `Historical upheavals require both structural preconditions (systemic strain) and a catalyst event to trigger systemic transformation.`;
      step4Misconception1 = `Great Man / Single Spark Fallacy: Attributing complex systemic revolutions solely to one individual or single day.`;
      step4Misconception2 = `Teleological Determinism: Assuming the final political outcome was completely inevitable from day one.`;
      step4Hint = `Distinguish between the dry firewood that accumulated for years and the single match that lit it!`;

      step5Title = `Pressure Cooker Analogy`;
      step5AnalogyType = "pressure_cooker";
      step5Narration = `Think of a pressure cooker on a blazing stove. If the safety valve is clamped shut and heat keeps rising, the explosion isn't caused by the final tiny increase in heat—it's caused by the lack of any institutional release valve!`;
      step5AnalogyData = {
        analogyType: "pressure_cooker",
        driver: "Rising Social Grievances",
        regulator: "Rigid Institutional Refusal",
        outcome: "Systemic Rupture",
      };

      step6Prompt = `In your own words: explain why addressing only the immediate catalyst without reforming underlying structural problems usually fails to prevent future conflict.`;
      step6CorrectSummary = `Without addressing structural root causes like economic distress or political exclusion, systemic tension remains high and will simply ignite from the next spark.`;
      step6Hint = `Think about treating the symptom versus curing the disease.`;
    }

    const concept1Id = `concept_${lessonId}_1`;
    const concept2Id = `concept_${lessonId}_2`;
    const concept3Id = `concept_${lessonId}_3`;

    const knowledgeGraph: KnowledgeGraph = {
      nodes: [
        {
          id: concept1Id,
          title: c1Title,
          description: c1Desc,
          status: "LEARNING",
          masteryScore: 60,
          confidenceScore: 65,
          stability: "Medium",
          difficulty: level as LearnerLevel,
          prerequisites: [],
          subconcepts: [concept2Id],
          misconceptionsIdentified: [step4Misconception1],
        },
        {
          id: concept2Id,
          title: c2Title,
          description: c2Desc,
          status: "STRUGGLING",
          masteryScore: 40,
          confidenceScore: 35,
          stability: "Low",
          difficulty: "Intermediate",
          prerequisites: [concept1Id],
          subconcepts: [concept3Id],
          misconceptionsIdentified: [step4Misconception2],
        },
        {
          id: concept3Id,
          title: c3Title,
          description: c3Desc,
          status: "NOT_STARTED",
          masteryScore: 10,
          confidenceScore: 15,
          stability: "Low",
          difficulty: "Intermediate",
          prerequisites: [concept2Id],
          subconcepts: [],
          misconceptionsIdentified: [],
        },
      ],
      edges: [
        { from: concept1Id, to: concept2Id, relationship: "prerequisite" },
        { from: concept2Id, to: concept3Id, relationship: "prerequisite" },
      ],
    };

    const steps: LessonStep[] = [
      {
        id: `step_1_intro`,
        conceptId: concept1Id,
        title: `Introduction: Foundation of ${cleanTopic}`,
        action: "EXPLAIN",
        spokenScript: step1Narration,
        spokenScriptHindi: step1Hindi,
        spokenScriptHinglish: step1Hinglish,
        spokenScriptTamil: `${cleanTopic} பற்றிய இந்த சிறப்பு பாடத்திற்கு உங்களை அன்புடன் வரவேற்கிறோம்.`,
        visual: {
          type: "PROCESS",
          title: `${cleanTopic}: Core Architecture`,
          caption: `Foundational pillars of ${cleanTopic} configured for ${qualification}.`,
          data: {
            steps: [`Origins of ${cleanTopic}`, `Governing Axiom`, `Practical Significance`],
            topic: cleanTopic,
            formula,
          },
        },
        durationEstimateSeconds: 45,
      },
      {
        id: `step_2_core_concept`,
        conceptId: concept1Id,
        title: step2Title,
        action: "SHOW_DIAGRAM",
        spokenScript: step2Narration,
        spokenScriptHindi: `आइए देखें कि ${cleanTopic} में अलग-अलग घटक एक-दूसरे को कैसे प्रभावित करते हैं।`,
        spokenScriptHinglish: `Ab dekhte hain ki ${cleanTopic} mein key variables aur components kaise interact karte hain.`,
        visual: {
          type: "FLOWCHART",
          title: `Interactions in ${cleanTopic}`,
          caption: `Systemic causal relationships governing ${cleanTopic}.`,
          data: {
            steps: step2DiagramSteps,
            formula,
          },
        },
        durationEstimateSeconds: 50,
      },
      {
        id: `step_3_visual_demonstration`,
        conceptId: concept2Id,
        title: step3Title,
        action: "SHOW_EXAMPLE",
        spokenScript: step3Narration,
        spokenScriptHindi: `सिमुलेशन पर ध्यान दें। सिस्टम का व्यवहार उसी अनुपात में परिवर्तित होता है।`,
        spokenScriptHinglish: `Simulation dekhiye! System dynamics real-time mein observe kijiye.`,
        visual: {
          type: "PROCESS",
          title: `Operational Dynamics of ${cleanTopic}`,
          caption: `Live process walkthrough for ${cleanTopic}.`,
          data: {
            steps: step2DiagramSteps,
            formula,
          },
        },
        durationEstimateSeconds: 50,
      },
      {
        id: `step_4_diagnostic_check`,
        conceptId: concept2Id,
        title: `Diagnostic Check: Intuition Checkpoint`,
        action: "ASK_MCQ",
        spokenScript: `Let's pause for a diagnostic checkpoint to test your intuitive grasp of ${cleanTopic}. Think carefully about cause and effect before selecting your answer!`,
        spokenScriptHindi: `आइए एक प्रश्न के माध्यम से आपकी समझ की जांच करें।`,
        spokenScriptHinglish: `Ek quick diagnostic question check karte hain. Dhyan se sochiye!`,
        visual: {
          type: "PROCESS",
          title: `Checkpoint: Conceptual Mechanism`,
          caption: `Evaluating intuitive comprehension for ${cleanTopic}.`,
          data: {
            steps: ["Question Prompt", "Cognitive Diagnostic", "Verified Mastery"],
            formula,
          },
        },
        question: {
          id: `q_${lessonId}_check`,
          conceptId: concept2Id,
          conceptTitle: c2Title,
          type: "MCQ",
          difficulty: "Intermediate",
          prompt: step4Prompt,
          options: [
            {
              id: "opt_a",
              text: step4CorrectOption,
              isCorrect: true,
            },
            {
              id: "opt_b",
              text: step4WrongOption1,
              isCorrect: false,
              misconceptionTrigger: step4Misconception1,
            },
            {
              id: "opt_c",
              text: step4WrongOption2,
              isCorrect: false,
              misconceptionTrigger: step4Misconception2,
            },
          ],
          correctAnswerSummary: step4CorrectSummary,
          hint: step4Hint,
        },
        durationEstimateSeconds: 65,
      },
      {
        id: `step_5_adaptive_analogy`,
        conceptId: concept2Id,
        title: step5Title,
        action: "GIVE_ANALOGY",
        spokenScript: step5Narration,
        spokenScriptHindi: step5Hindi,
        spokenScriptHinglish: step5Hinglish,
        visual: {
          type: "ANALOGY",
          title: `Mental Model for ${cleanTopic}`,
          caption: `Intuitive analogical mapping to anchor your mental model.`,
          data: step5AnalogyData,
        },
        durationEstimateSeconds: 55,
      },
      {
        id: `step_6_mastery_application`,
        conceptId: concept3Id,
        title: `Mastery Re-Check: Applying ${cleanTopic}`,
        action: "ASK_SHORT_ANSWER",
        spokenScript: `Now, in your own words: formulate your understanding based on what we just explored! Putting ideas into your own words is how real mastery solidifies.`,
        spokenScriptHindi: `अब अपने शब्दों में समझाइए कि आपने क्या सीखा।`,
        spokenScriptHinglish: `Apne words mein explain kijiye ki ${cleanTopic} ka main mechanism kaise kaam karta hai.`,
        visual: {
          type: "PROCESS",
          title: `Synthesis: Explaining in Your Own Words`,
          caption: `Articulate the core mechanism of ${cleanTopic}.`,
          data: {
            steps: ["Recall Core Rule", "Connect to Analogy", "Formulate Synthesis"],
          },
        },
        question: {
          id: `q_${lessonId}_explain`,
          conceptId: concept3Id,
          conceptTitle: c3Title,
          type: "EXPLAIN_IN_OWN_WORDS",
          difficulty: "Beginner",
          prompt: step6Prompt,
          correctAnswerSummary: step6CorrectSummary,
          hint: step6Hint,
        },
        durationEstimateSeconds: 70,
      },
      {
        id: `step_7_summary`,
        conceptId: concept3Id,
        title: `Mastery Wrap-Up: Key Takeaways on ${cleanTopic}`,
        action: "EXPLAIN",
        spokenScript: `Outstanding work today! You have successfully mastered the essential mechanics of ${cleanTopic}. You proved you can balance concepts, recognize cognitive traps, and apply real-world mental models. Your revision flashcards and executive notes are ready!`,
        spokenScriptHindi: `शाबाश! आपने ${cleanTopic} के मूल सिद्धांतों पर पूरी महारत हासिल कर ली है। आपके अध्ययन नोट्स और अभ्यास सेट तैयार हैं!`,
        spokenScriptHinglish: `Awesome job! Aapne ${cleanTopic} ko conceptually master kar liya hai. Revision notes aur flashcards ab ready hain.`,
        visual: {
          type: "PROCESS",
          title: `Mastery Report: ${cleanTopic}`,
          caption: `Comprehensive milestone summary for ${cleanTopic}.`,
          data: {
            steps: ["Foundation Established", "Misconceptions Cleared", "Mastery Verified ✓"],
            formula,
          },
        },
        durationEstimateSeconds: 40,
      },
    ];

    const lessonPlan: LessonPlan = {
      id: lessonId,
      title: `${cleanTopic}: Core Mastery & Dynamics`,
      subject,
      overview: `Master the foundational principles and practical applications of ${cleanTopic} through interactive pedagogical steps and adaptive analogies.`,
      targetDurationMinutes: targetMins,
      allocatedTime,
      steps,
    };

    return { lessonPlan, knowledgeGraph };
  }
}
