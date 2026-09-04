# AI Teacher

> **"The AI teacher that learns how you learn."**

[![Next.js](https://img.shields.io/badge/Next.js-14.2.35%20App%20Router-000000?style=flat&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-Light%20Theme-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![Status](https://img.shields.io/badge/Build-Passing%20(25%20Routes)-emerald)](https://localhost:3000)

---

## 🌟 Vision & Core Philosophy

**AI Teacher** is a production-grade, human-like virtual educator engineered to transform passive digital education into an active, personalized masterclass.

### The Foundational Principle:
> **AI Teacher must NOT behave like a chatbot.**  
> A chatbot passively waits for you to ask questions. A real educator plans the path, gauges your understanding, observes your intuition, diagnoses cognitive traps, and intervenes in real time.

The core closed-loop teaching engine operates on:

```
UNDERSTAND ──► PLAN ──► EXPLAIN ──► DEMONSTRATE ──► QUESTION ──► EVALUATE ──► ADAPT ──► CONTINUE
```

---

## 🚀 Key Features & Innovations

### 1. 🤖 Friendly AI Robot Educator Avatar
- **No Stock Human Photos**: Represented by a modern, high-tech **AI Robot Teacher** avatar (`/robot-teacher.jpg`).
- **Real-Time Synchronized Delivery**:
  - Ambient cyan pulsing glows synchronized with live speech.
  - Interactive Digital Visemes mode with animated LED screen eyes, antenna status beacon, and dynamic lip-sync mouth.
  - On-screen synchronized whiteboard annotations ($F = m \cdot a$) that appear dynamically at exact spoken timestamps.

### 2. 🧠 Closed-Loop Pedagogical Brain State Machine
- Seamlessly coordinates 10 discrete cognitive states:
  $$\text{DISCOVER} \rightarrow \text{PLAN} \rightarrow \text{TEACH} \rightarrow \text{CHECK} \rightarrow \text{DIAGNOSE} \rightarrow \text{ADAPT} \rightarrow \text{RETEACH} \rightarrow \text{RECHECK} \rightarrow \text{MASTER} \rightarrow \text{CONTINUE}$$
- Tracks live `LessonState`, active concept nodes, dynamic difficulty, speech rate, and student confidence.

### 3. ❓ Intelligent Doubt Clearing System (Lesson-Grounded First)
- **Not purely LLM-based**: Solves doubts using a strict educational priority hierarchy:
  1. **First Check**: Evaluates against earlier taught lesson steps and grounded document chunks.
  2. **If Found in Curriculum**: Cites exact lesson steps, document titles, pages, and excerpts (e.g. `Physics_Chapter_4.pdf`, p. 37).
  3. **If Beyond Scope**: AI Teacher synthesizes an expert pedagogical answer and bridges the concept back to lesson foundations.
- **Multimodal**: Supports both **Voice Speech-to-Text** input and **Keyboard typing**.
- **Auto-Recorded**: Every resolved doubt is immediately logged to the student's live class notes.

### 4. 📝 Real-Time Automatic Notes Generator
- **Zero Manual Effort**: Notes are recorded in real time as the lesson progresses.
- **Captures 4 Core Learning Events**:
  - 📖 **Concepts**: Definitions and principles introduced.
  - ⚡ **Formulas**: Equations and variable units ($F = ma$, $I = V/R$).
  - ⚠️ **Misconceptions Resolved**: Cognitive fallacies identified during checkpoints and teacher remedies.
  - ❓ **Answered Doubts**: All doubts cleared with verified curriculum citations.
- **Export & Copy**: Features instant **Copy to Clipboard** and **Download Markdown** (`.md`).

### 5. 🎓 Educational Qualification Level Calibration
Configured during lesson creation to tailor language, depth, and explanatory rigor:
- **Middle School** (Grade 6 - 8)
- **High School** (Grade 9 - 10)
- **Senior Secondary** (Grade 11 - 12)
- **Undergraduate** (College / B.Tech / B.Sc)
- **Postgraduate** (Master's / PhD)
- **Working Professional** / Self-Taught

### 6. 🎨 Clean, Minimalist Light Theme UI
- Modern, clean aesthetic built with `#f8fafc` background, crisp white cards, `#0284c7` sky brand accents, and high-contrast slate typography.
- **Decluttered & Easy to Use**:
  - **Streamlined Top Bar**: Step progress (`Step 1 of 7`), title, language dropdown, timer, and clear `Ask Doubt` / `Interrupt` buttons.
  - **Student Helper Card**: Replaces overwhelming machine learning telemetry with calm, reassuring student guidance.
  - **Discreet Architecture Inspector**: Telemetry, state machines, and event trees are neatly tucked into a collapsible drawer for evaluators and judges.

### 7. 🧪 Subject-Aware Visual Intelligence
- Automatically selects and renders subject-specific interactive stages:
  - **Dynamics & Mechanics**: Interactive Free-Body Cart simulator with mass and force vector sliders.
  - **Circuits & Ohm's Law**: Live DC circuit with resistance slider and reactive lightbulb brightness.
  - **Remedial Analogy**: Hydraulic water-pipe constriction model for intuitive grasp of resistance.

### 8. 🗣️ Real-Time Interruption & Instant Multilingual Switching
- **Interruption Mode**: Tap **Interrupt** at any second to pause the teacher, ask a question, receive voice clarification, and resume seamlessly without losing progress.
- **7 Supported Languages**: English, Hindi, Hinglish, Tamil, Telugu, Bengali, and Marathi.

### 9. 🌌 Learning Universe & Spaced Repetition Knowledge Decay
- Interactive constellation graph tracking concept mastery, confidence, and prerequisites.
- Identifies **Knowledge Decay** curves and recommends targeted 5-minute refreshers.

---

## 🏗️ Architecture & Project Structure

```
├── app/
│   ├── page.tsx                           # Landing page with virtual classroom preview
│   ├── learn/page.tsx                     # Lesson creation (Topic/Material, Qualification Level)
│   ├── classroom/[lessonId]/page.tsx      # Core Classroom (Robot Avatar, Visual Stage, Questions)
│   ├── dashboard/page.tsx                 # Student Dashboard & Learning DNA
│   ├── knowledge/page.tsx                 # Interactive Learning Universe Graph
│   ├── demo/page.tsx                      # Automated 10-Scene Hackathon Judge Demo
│   └── api/
│       ├── teacher/doubt/route.ts         # Grounded doubt clearing API
│       ├── teacher/evaluate/route.ts      # Diagnostic answer evaluation & trap detector
│       ├── teacher/interrupt/route.ts     # Real-time lesson interruption
│       ├── teacher/language/route.ts      # On-the-fly language switching
│       ├── lesson/create/route.ts         # Multi-source lesson planner
│       └── notes/generate/route.ts        # Auto study notes generator
├── components/
│   ├── classroom/
│   │   ├── teacher-avatar.tsx             # Robot Teacher Avatar (Speech, Waveforms, Visemes)
│   │   ├── visual-stage.tsx               # Physics cart, Ohm's circuit, and water-pipe simulators
│   │   ├── doubt-panel.tsx                # Voice/Text doubt clearing modal
│   │   ├── live-auto-notes.tsx            # Live automatic note-taking feed
│   │   ├── interactive-question.tsx       # Voice/typing question checkpoints
│   │   └── judge-inspector.tsx            # Discreet architecture telemetry drawer
│   └── navbar.tsx                         # Streamlined header navigation
├── lib/
│   ├── teaching/
│   │   ├── doubt-engine.ts                # Curriculum-grounded doubt resolution logic
│   │   ├── teaching-brain.ts              # 10-state pedagogical state machine
│   │   ├── misconception-detector.ts      # Cognitive trap diagnosis engine
│   │   └── policy-engine.ts               # Difficulty & explanation adapter
│   └── db/in-memory-db.ts                 # Pre-indexed curriculum chunks & profiles
└── public/
    └── robot-teacher.jpg                  # High-tech AI Robot Teacher avatar
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+ (Tested on Node 22)
- npm or yarn

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/your-org/ai-teacher.git
cd ai-teacher

# 2. Install dependencies
npm install

# 3. Configure environment
# DEMO_MODE=true is pre-configured for 100% standalone offline operation
cp .env.example .env
```

### Running the App

#### Development Mode:
```bash
npm run dev
```

#### Production Mode (Recommended):
```bash
npm run build
npm run start
```

Open your browser at **[http://localhost:3000](http://localhost:3000)**.

---

## 🎯 Key Application Routes

| Route | Description |
| :--- | :--- |
| `/` | Landing page with the product philosophy and animated feature preview |
| `/classroom/lesson_physics_101` | **Live Classroom**: Robot Teacher video/visemes, simulations, live auto-notes, and doubt assistant |
| `/learn` | **Create Lesson**: Choose topic or upload PDF, set qualification level and time budget |
| `/dashboard` | **Student Dashboard**: Learning DNA, streak, knowledge decay curves, and topic modules |
| `/knowledge` | **Learning Universe**: Interactive node graph representing mastered and prerequisite concepts |
| `/demo` | **Judge Demo Mode**: Automated 10-scene demonstration of all hackathon requirements |
| `/under-the-hood` | Deep-dive documentation of the 10-state pedagogical brain and policy engine |

---

## 📄 License

MIT License • Built for Hackathon Excellence.
