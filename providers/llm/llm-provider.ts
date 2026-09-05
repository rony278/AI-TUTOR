// ==========================================
// LLM PROVIDER IMPLEMENTATIONS & MOCK
// Single Gemini API key architecture
// ==========================================
import { LLMProvider, LLMMessage, LLMGenerateOptions } from "./interface";
import { GeminiLLMProvider } from "./gemini-provider";

export { GeminiLLMProvider };

export class MockLLMProvider implements LLMProvider {
  public name = "AI Teacher Adaptive Educator Brain (Mock/Offline Engine)";

  public async generateText(messages: LLMMessage[]): Promise<string> {
    const userPrompt = messages[messages.length - 1]?.content.toLowerCase() || "";

    if (userPrompt.includes("misconception")) {
      return JSON.stringify({
        isMisconception: true,
        type: "Inverse Proportion Inversion",
        strategy: "GIVE_ANALOGY",
      });
    }

    if (userPrompt.includes("hindi") || userPrompt.includes("hinglish")) {
      return "Main aapko simple Hinglish aur Hindi mein explain karta hoon: current aur resistance inversely proportional hote hain. Resistance badhegi toh current kam hoga.";
    }

    return "In science and physics, we observe foundational dynamics governing natural laws. By employing intuitive analogies, we can clearly see how each variable interacts and balances.";
  }

  public async generateJson<T>(messages: LLMMessage[]): Promise<T> {
    const userPrompt = messages[messages.length - 1]?.content.toLowerCase() || "";

    if (userPrompt.includes("lesson")) {
      return {
        title: "Adaptive Science Dynamics",
        stepsCount: 7,
      } as unknown as T;
    }

    return {
      status: "success",
      confidence: 0.95,
    } as unknown as T;
  }
}

let cachedProvider: LLMProvider | null = null;

export function getLLMProvider(): LLMProvider {
  if (cachedProvider) return cachedProvider;

  const gemini = new GeminiLLMProvider();
  if (gemini.hasValidKey()) {
    cachedProvider = gemini;
    return cachedProvider;
  }

  // Fallback to offline mock provider if no key provided
  cachedProvider = new MockLLMProvider();
  return cachedProvider;
}

