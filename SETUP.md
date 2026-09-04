# AI Teacher — Setup & Deployment Guide

## System Requirements
- Node.js 18.17+ or 20+ (tested on Node v22.18.0)
- npm 9+ or pnpm or yarn
- Modern web browser with Web Speech API support (Chrome, Edge, Safari, Firefox)

---

## 1. Local Development Setup

```bash
# Clone the repository
git clone https://github.com/your-org/ai-teacher.git
cd ai-teacher

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

By default, `.env` contains:
```env
DEMO_MODE=true
```
When `DEMO_MODE=true`, the entire application runs with rich, realistic pre-indexed materials (Physics Chapter 4: Newton's Laws & Circuits, Machine Learning), full adaptive teaching simulations, and Web Speech API synthesis without requiring any external paid API keys.

---

## 2. Enabling Cloud AI Providers (Optional)

To connect real cloud providers, update `.env`:

```env
DEMO_MODE=false

# LLM Providers (Pick one or more)
OPENAI_API_KEY=sk-...
GOOGLE_API_KEY=AIza...
ANTHROPIC_API_KEY=sk-ant-...

# Speech Providers
ELEVENLABS_API_KEY=...
DEEPGRAM_API_KEY=...

# Avatar Providers
HEYGEN_API_KEY=...
DID_API_KEY=...

# Vector Database
QDRANT_URL=https://...
QDRANT_API_KEY=...
```

The system uses a resilient fallback architecture: if any third-party API is unreachable or rate-limited, it automatically falls back to local providers without interrupting the student's lesson.

---

## 3. Running Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## 4. Production Build & Verification

```bash
npm run build
npm start
```
