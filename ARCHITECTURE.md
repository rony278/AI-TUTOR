# AI Teacher — Architectural Blueprint

## 1. High-Level Architecture Overview

The fundamental architectural principle of **AI Teacher** is that it is a **closed-loop pedagogical state machine**, not an open-ended conversational chatbot.

```
+-----------------------------------------------------------------------------------+
|                                 STUDENT CLIENT                                    |
|   Interactive Classroom  •  Animated Avatar  •  Waveform  •  Visual Intelligence   |
+-----------------------------------------+-----------------------------------------+
                                          |
                      (Events & Diagnostic Submissions)
                                          v
+-----------------------------------------------------------------------------------+
|                            AI TEACHING BRAIN (STATE MACHINE)                     |
|                                                                                   |
|   DISCOVER --> PLAN --> TEACH --> CHECK --> DIAGNOSE --> ADAPT --> RETEACH ...    |
+-----------------------------------------+-----------------------------------------+
                                          |
               +--------------------------+--------------------------+
               |                                                     |
               v                                                     v
+-----------------------------+                       +-----------------------------+
|    RAG RETRIEVAL PIPELINE   |                       |   ADAPTIVE POLICY ENGINE    |
| - Document Chunking         |                       | - Misconception Detector    |
| - Vector Semantic Indexing  |                       | - Confidence & Stability    |
| - Grounded Chapter Citations|                       | - Strategy & Visual Switch  |
+-----------------------------+                       +-----------------------------+
               |                                                     |
               +--------------------------+--------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                             MULTIMODAL DELIVERY ENGINE                            |
|                                                                                   |
|  [LLM Provider]         [Speech Synthesis]        [Visual Engine]  [Avatar Engine]|
|   OpenAI / Gemini /       ElevenLabs / Web          Dynamic SVGs /  HeyGen / D-ID |
|   Adaptive Mock           Speech API                Simulators      Canvas Lip-Sync|
+-----------------------------------------------------------------------------------+
```

---

## 2. The 10 Discrete Teaching Brain States

1. **`DISCOVER`**: Ingests student inputs, uploaded PDFs/DOCs, or topic queries.
2. **`PLAN`**: Synthesizes the curriculum, constructs the prerequisite knowledge graph, and allocates minutes per milestone.
3. **`TEACH`**: Delivers synchronized spoken audio, formula representations, and visual demonstrations.
4. **`CHECK`**: Presents diagnostic checkpoints (MCQs, conceptual queries, short explanations).
5. **`DIAGNOSE`**: Executes `MisconceptionDetector` and evaluates latency, hint counts, and error patterns.
6. **`ADAPT`**: Automatically reconfigures the lesson plan, modifies difficulty, and triggers alternate explanatory strategies.
7. **`RETEACH`**: Presents intuitive analogies (e.g. hydraulic water-pipe model for electrical current).
8. **`RECHECK`**: Verifies understanding with simpler follow-up questions to confirm cognitive recovery.
9. **`MASTER`**: Records concept mastery and updates the topological Knowledge Universe.
10. **`CONTINUE`**: Advances to the next prerequisite concept in the learning path.

---

## 3. Cognitive Misconception Detection & Policy Engine

When a student provides an answer, `MisconceptionDetector.detect()` performs semantic pattern matching against known pedagogical traps:

- **Inverse Proportion Fallacy**: Confusing inverse relationships (e.g., $I = V/R \rightarrow$ assuming higher resistance increases current flow).
- **Kinematics Conflation**: Confusing velocity with acceleration ($F = ma$).
- **Quadratic Misinterpretation**: Believing linear relationships scale quadratically.

When a misconception is confirmed:
- `AdaptivePolicyEngine.decideNextStep()` switches strategy: `Technical / Formal` $\rightarrow$ `Intuitive Physical Analogy`.
- `VisualIntelligenceEngine` alters the visual payload: Equation $\rightarrow$ Animated Hydraulic Pipe Constriction.
- Difficulty drops: `Intermediate` $\rightarrow$ `Beginner`.
- Telemetry events stream to the **Judge Inspector** without leaking raw Chain-of-Thought.

---

## 4. Grounded RAG Architecture

Hallucination prevention is enforced through deterministic chunking and source tagging:

$$\text{Document Upload} \longrightarrow \text{Text Sanitization} \longrightarrow \text{Chunking (500 tokens)} \longrightarrow \text{Vector Projection (1536d)} \longrightarrow \text{Hybrid Search}$$

When the teacher refers to uploaded material, the UI renders the citation badge:
- Document Name
- Page Number
- Chapter & Section
- Underlying Text Snippet Modal
