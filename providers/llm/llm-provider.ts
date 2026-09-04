// ==========================================
// LLM PROVIDER IMPLEMENTATIONS & MOCK
// ==========================================
import { LLMProvider, LLMMessage, LLMGenerateOptions } from "./interface";

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

    return "In physics and electrical dynamics, we observe that resistance opposes the passage of electric charges. By employing the water-pipe analogy, we can see why narrowing the passage reduces total flow rate.";
  }

  public async generateJson<T>(messages: LLMMessage[]): Promise<T> {
    const userPrompt = messages[messages.length - 1]?.content.toLowerCase() || "";

    if (userPrompt.includes("lesson")) {
      return {
        title: "Adaptive Dynamics & Circuit Flow",
        stepsCount: 7,
      } as unknown as T;
    }

    return {
      status: "success",
      confidence: 0.95,
    } as unknown as T;
  }
}

export class OpenAILLMProvider implements LLMProvider {
  public name = "OpenAI GPT-4o";
  private apiKey: string;

  constructor(apiKey: string = process.env.OPENAI_API_KEY || "") {
    this.apiKey = apiKey;
  }

  public async generateText(messages: LLMMessage[], options?: LLMGenerateOptions): Promise<string> {
    if (!this.apiKey) {
      return new MockLLMProvider().generateText(messages);
    }
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages,
          temperature: options?.temperature ?? 0.7,
        }),
      });
      const data = await res.json();
      return data.choices?.[0]?.message?.content || "";
    } catch {
      return new MockLLMProvider().generateText(messages);
    }
  }

  public async generateJson<T>(messages: LLMMessage[]): Promise<T> {
    const text = await this.generateText(messages);
    try {
      return JSON.parse(text);
    } catch {
      return new MockLLMProvider().generateJson<T>(messages);
    }
  }
}
