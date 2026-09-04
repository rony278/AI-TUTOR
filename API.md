# AI Teacher — API Specification

All endpoints are built using Next.js 14 API Routes with server-side validation and security boundaries.

---

## 1. Material & Document Endpoints

### `POST /api/material/upload`
Uploads educational files (PDF, DOC, DOCX, PPT, PPTX, TXT) or raw pasted text.
- **Request**: Multipart Form Data (`file` or `pastedText`)
- **Response**:
```json
{
  "success": true,
  "document": {
    "id": "doc_physics_ch4",
    "name": "Physics_Chapter_4.pdf",
    "pageCount": 42,
    "totalChunks": 18,
    "status": "INDEXED"
  }
}
```

### `POST /api/material/process`
Runs cinematic AI extraction stages and builds concept graph.
- **Request Body**: `{ "documentId": "string", "topic": "string" }`
- **Response**: Array of 10 processing stages and knowledge graph nodes.

---

## 2. Lesson Management

### `POST /api/lesson/create`
Initializes a new adaptive lesson based on topic or uploaded material with student configuration.
- **Request Body**:
```json
{
  "topic": "Newton's Laws & Circuits",
  "documentId": "doc_physics_ch4",
  "level": "Beginner",
  "goal": "Understand",
  "language": "English",
  "preferredStyle": "Visual",
  "availableTime": "20m",
  "depth": "Balanced"
}
```

---

## 3. Teaching & Adaptation Endpoints

### `POST /api/teacher/evaluate`
Core teaching loop evaluator running `TeachingBrain.processStudentAnswer()`.
- **Request Body**:
```json
{
  "lessonId": "lesson_physics_101",
  "questionId": "q_resistance_current_misconception",
  "studentAnswer": "Current increases",
  "selectedOptionId": "opt_res_a",
  "timeSpentSeconds": 12
}
```
- **Response**: Returns correctness, detected misconception, recommended policy action, and updated mastery.

### `POST /api/teacher/interrupt`
Handles real-time learner interruptions in current context without losing state.
- **Request Body**:
```json
{
  "lessonId": "lesson_physics_101",
  "query": "Wait, why does current decrease when resistance increases?",
  "resume": false
}
```

### `POST /api/teacher/language`
Switches delivery language on the fly (English, Hindi, Hinglish, Tamil, etc.).
- **Request Body**: `{ "lessonId": "string", "language": "Hindi" }`

---

## 4. Post-Lesson Artifacts

### `POST /api/notes/generate`
Generates structured executive study notes with formulas, summaries, and resolved mistakes.

### `POST /api/flashcards/generate`
Generates 5 interactive flashcards (Formula, Concept, Analogy, Application).

### `POST /api/practice/generate`
Generates a 5-question personalized homework practice set targeting weak concepts.
