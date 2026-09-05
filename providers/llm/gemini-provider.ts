// ==========================================
// GEMINI LLM PROVIDER IMPLEMENTATION
// Single API key architecture (GEMINI_API_KEY / GOOGLE_API_KEY)
// ==========================================
import { LLMProvider, LLMMessage, LLMGenerateOptions } from "./interface";

export class GeminiLLMProvider implements LLMProvider {
  public name = "Google Gemini (Fast & Adaptive Educator)";
  private apiKey: string;
  private primaryModel: string = "gemini-1.5-flash";
  private fallbackModel: string = "gemini-2.0-flash";

  constructor(apiKey: string = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "") {
    this.apiKey = apiKey.trim();
  }

  public hasValidKey(): boolean {
    return Boolean(this.apiKey && this.apiKey.length > 5);
  }

  public async generateText(messages: LLMMessage[], options?: LLMGenerateOptions): Promise<string> {
    if (!this.hasValidKey()) {
      return "";
    }

    try {
      return await this.callGeminiApi(this.primaryModel, messages, options, false);
    } catch (err) {
      console.warn(`[GeminiLLMProvider] ${this.primaryModel} failed, trying ${this.fallbackModel}:`, err);
      try {
        return await this.callGeminiApi(this.fallbackModel, messages, options, false);
      } catch (fallbackErr) {
        console.error("[GeminiLLMProvider] All Gemini API attempts failed:", fallbackErr);
        throw fallbackErr;
      }
    }
  }

  public async generateJson<T>(messages: LLMMessage[], schemaDescription?: string): Promise<T> {
    if (!this.hasValidKey()) {
      throw new Error("No GEMINI_API_KEY configured");
    }

    const jsonMessages = [...messages];
    if (schemaDescription) {
      jsonMessages.push({
        role: "user",
        content: `IMPORTANT: Respond ONLY with a valid JSON object strictly matching this schema/format: ${schemaDescription}. Do not include markdown codeblocks or conversational filler.`,
      });
    }

    let rawText = "";
    try {
      rawText = await this.callGeminiApi(this.primaryModel, jsonMessages, { temperature: 0.3 }, true);
    } catch (err) {
      console.warn(`[GeminiLLMProvider] JSON generation failed with ${this.primaryModel}, trying ${this.fallbackModel}:`, err);
      rawText = await this.callGeminiApi(this.fallbackModel, jsonMessages, { temperature: 0.3 }, true);
    }

    return this.parseJsonResponse<T>(rawText);
  }

  private async callGeminiApi(
    model: string,
    messages: LLMMessage[],
    options?: LLMGenerateOptions,
    isJson: boolean = false
  ): Promise<string> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`;

    const systemMessages = messages.filter((m) => m.role === "system");
    const conversationMessages = messages.filter((m) => m.role !== "system");

    const contents = conversationMessages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    if (contents.length === 0 && systemMessages.length > 0) {
      contents.push({
        role: "user",
        parts: [{ text: systemMessages.map((s) => s.content).join("\n\n") }],
      });
    }

    const payload: any = {
      contents,
      generationConfig: {
        temperature: options?.temperature ?? 0.7,
        maxOutputTokens: options?.maxTokens ?? 8192,
      },
    };

    if (systemMessages.length > 0 && conversationMessages.length > 0) {
      payload.systemInstruction = {
        parts: [{ text: systemMessages.map((s) => s.content).join("\n\n") }],
      };
    }

    if (isJson) {
      payload.generationConfig.responseMimeType = "application/json";
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];

    if (!candidate || !candidate.content?.parts?.[0]?.text) {
      if (candidate?.finishReason === "SAFETY") {
        throw new Error("Gemini response blocked by safety filters");
      }
      throw new Error("No text content returned from Gemini API");
    }

    return candidate.content.parts[0].text;
  }

  private parseJsonResponse<T>(text: string): T {
    let clean = text.trim();
    if (clean.startsWith("```json")) {
      clean = clean.slice(7);
    } else if (clean.startsWith("```")) {
      clean = clean.slice(3);
    }
    if (clean.endsWith("```")) {
      clean = clean.slice(0, -3);
    }
    clean = clean.trim();

    try {
      return JSON.parse(clean) as T;
    } catch {
      const firstBrace = clean.indexOf("{");
      const lastBrace = clean.lastIndexOf("}");
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        const jsonSub = clean.substring(firstBrace, lastBrace + 1);
        return JSON.parse(jsonSub) as T;
      }
      throw new Error(`Failed to parse JSON response: ${clean.slice(0, 100)}...`);
    }
  }
}
