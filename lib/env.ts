// ==========================================
// ENVIRONMENT VALIDATION & CONFIGURATION
// Configured to operate on a single Gemini API key (GEMINI_API_KEY)
// ==========================================

export interface AppConfig {
  isDemoMode: boolean;
  appUrl: string;
  providers: {
    llm: {
      hasGemini: boolean;
      activeProvider: "gemini" | "mock";
    };
    speechToText: {
      activeProvider: "browser" | "mock";
    };
    textToSpeech: {
      activeProvider: "browser" | "mock";
    };
    avatar: {
      activeProvider: "mock";
    };
    vectorDb: {
      activeProvider: "in-memory";
    };
  };
}

export function getAppConfig(): AppConfig {
  const geminiApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
  const hasGemini = Boolean(geminiApiKey && geminiApiKey.trim().length > 5);

  const isDemo = process.env.DEMO_MODE === "true" && !hasGemini;
  const activeLLM: "gemini" | "mock" = hasGemini ? "gemini" : "mock";

  return {
    isDemoMode: isDemo,
    appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    providers: {
      llm: {
        hasGemini,
        activeProvider: activeLLM,
      },
      speechToText: {
        activeProvider: "browser",
      },
      textToSpeech: {
        activeProvider: "browser",
      },
      avatar: {
        activeProvider: "mock",
      },
      vectorDb: {
        activeProvider: "in-memory",
      },
    },
  };
}

