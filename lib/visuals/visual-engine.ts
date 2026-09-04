// ==========================================
// SUBJECT-AWARE VISUAL INTELLIGENCE ENGINE
// ==========================================
import { VisualType, VisualPayload, LearnerLevel, LearningGoal } from "@/types/teaching";

export interface VisualSelectorInput {
  subject: string;
  conceptTitle: string;
  learnerLevel: LearnerLevel;
  learningGoal: LearningGoal;
  activeMisconception?: string;
}

export class VisualIntelligenceEngine {
  /**
   * Automatically derives the highest-comprehension visual representation for any educational concept
   */
  public static selectVisual(input: VisualSelectorInput): VisualPayload {
    const concept = input.conceptTitle.toLowerCase();
    const subject = input.subject.toLowerCase();

    // If an active misconception was detected, force high-comprehension intuitive analogy or process
    if (input.activeMisconception) {
      return {
        type: "ANALOGY",
        title: "Adaptive Analogy Representation",
        caption: "Switching from abstract notation to mechanical intuition to remediate misconception.",
        data: {
          analogyType: "hydraulic_pipe",
          explanation: "Visualizing current as water volume and resistance as physical pipe constriction.",
        },
      };
    }

    // Physics concepts
    if (subject.includes("physics") || concept.includes("force") || concept.includes("newton")) {
      if (input.learnerLevel === "Beginner") {
        return {
          type: "DIAGRAM",
          title: "Free-Body Dynamic Force Vector Diagram",
          caption: "Real-time force vectors acting on a 10kg mass (F_net = m · a)",
          data: {
            diagramType: "physics_cart",
            massKg: 10,
            forceNewtons: 40,
            accelerationMps2: 4,
          },
        };
      }
      return {
        type: "EQUATION",
        title: "Vector Differential Formulation",
        caption: "F_net(t) = m \\frac{d^2 x}{dt^2}",
        data: {
          formula: "F_{\\text{net}} = m \\cdot \\frac{d^2 x}{dt^2}",
        },
      };
    }

    // Circuit / Electrical concepts
    if (concept.includes("ohm") || concept.includes("circuit") || concept.includes("resistance")) {
      return {
        type: "SIMULATION",
        title: "Direct-Current Closed Loop Circuit",
        caption: "Observe how increasing resistance dims the lamp and throttles current.",
        data: {
          circuitType: "single_loop",
          resistanceOhms: 50,
          currentAmps: 0.24,
          bulbIntensityPercent: 35,
        },
      };
    }

    // Computer Science / Programming
    if (subject.includes("code") || subject.includes("cs") || concept.includes("algorithm") || concept.includes("react")) {
      return {
        type: "CODE_EXECUTION",
        title: "Step-by-Step State & Pointer Execution",
        caption: "Visualizing stack frames and variable mutations.",
        data: {
          code: `function binarySearch(arr, target) {\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}`,
          activeLine: 4,
          pointers: { left: 0, mid: 4, right: 8 },
        },
      };
    }

    // Mathematics
    if (subject.includes("math") || concept.includes("equation") || concept.includes("derivative")) {
      return {
        type: "GRAPH",
        title: "Dynamic Continuous Function Graph",
        caption: "f(x) = ax² + bx + c with real-time root tracking.",
        data: {
          functionType: "quadratic",
          roots: [-2, 3],
        },
      };
    }

    // Default: Clear Process Flowchart
    return {
      type: "FLOWCHART",
      title: `${input.conceptTitle} Conceptual Hierarchy`,
      caption: "Stepwise logical decomposition.",
      data: {
        steps: ["Foundational Axiom", "Transformational Operation", "Concrete Application"],
      },
    };
  }
}
