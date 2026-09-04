// ==========================================
// ENVIRONMENT VALIDATION & CONFIGURATION
// ==========================================

export interface AppConfig {
  isDemoMode: boolean;
  appUrl: string;
  providers: {
    llm: {
      hasOpenAI: boolean;
      hasGoogle: boolean;
      hasAnthropic: boolean;
      activeProvider: "openai" | "google" | "anthropic" | "mock";
    };
    speechToText: {
      hasDeepgram: boolean;
      activeProvider: "deepgram" | "browser" | "mock";
    };
    textToSpeech: {
      hasElevenLabs: boolean;
      activeProvider: "elevenlabs" | "browser" | "mock";
    };
    avatar: {
      hasHeyGen: boolean;
      hasDID: boolean;
      activeProvider: "heygen" | "did" | "mock";
    };
    vectorDb: {
      hasQdrant: boolean;
      hasPinecone: boolean;
      activeProvider: "qdrant" | "pinecone" | "in-memory";
    };
  };
}

export function getAppConfig(): AppConfig {
  const isDemo =
    process.env.DEMO_MODE === "true" ||
    (!process.env.OPENAI_API_KEY && !process.env.GOOGLE_API_KEY);

  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);
  const hasGoogle = Boolean(process.env.GOOGLE_API_KEY);
  const hasAnthropic = Boolean(process.env.ANTHROPIC_API_KEY);

  const hasDeepgram = Boolean(process.env.DEEPGRAM_API_KEY);
  const hasElevenLabs = Boolean(process.env.ELEVENLABS_API_KEY);

  const hasHeyGen = Boolean(process.env.HEYGEN_API_KEY);
  const hasDID = Boolean(process.env.DID_API_KEY);

  const hasQdrant = Boolean(process.env.QDRANT_URL && process.env.QDRANT_API_KEY);
  const hasPinecone = Boolean(process.env.PINECONE_API_KEY);

  let activeLLM: "openai" | "google" | "anthropic" | "mock" = "mock";
  if (!isDemo) {
    if (hasGoogle) activeLLM = "google";
    else if (hasOpenAI) activeLLM = "openai";
    else if (hasAnthropic) activeLLM = "anthropic";
  }

  return {
    isDemoMode: isDemo,
    appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    providers: {
      llm: {
        hasOpenAI,
        hasGoogle,
        hasAnthropic,
        activeProvider: activeLLM,
      },
      speechToText: {
        hasDeepgram,
        activeProvider: !isDemo && hasDeepgram ? "deepgram" : "browser",
      },
      textToSpeech: {
        hasElevenLabs,
        activeProvider: !isDemo && hasElevenLabs ? "elevenlabs" : "browser",
      },
      avatar: {
        hasHeyGen,
        hasDID,
        activeProvider: !isDemo && hasHeyGen ? "heygen" : !isDemo && hasDID ? "did" : "mock",
      },
      vectorDb: {
        hasQdrant,
        hasPinecone,
        activeProvider: !isDemo && hasQdrant ? "qdrant" : !isDemo && hasPinecone ? "pinecone" : "in-memory",
      },
    },
  };
}
