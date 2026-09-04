// ==========================================
// LLM PROVIDER ABSTRACTION
// ==========================================

export interface LLMMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface LLMGenerateOptions {
  temperature?: number;
  maxTokens?: number;
  responseFormat?: "text" | "json";
}

export interface LLMProvider {
  name: string;
  generateText(messages: LLMMessage[], options?: LLMGenerateOptions): Promise<string>;
  generateJson<T>(messages: LLMMessage[], schemaDescription?: string): Promise<T>;
}
