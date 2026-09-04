// ==========================================
// SPEECH PROVIDER INTERFACES
// ==========================================

export interface SynthesisRequest {
  text: string;
  language?: string;
  voiceStyle?: "engaging_educator" | "patient_mentor" | "socratic_guide";
  rate?: number;
}

export interface SynthesisResponse {
  audioUrl?: string;
  audioBuffer?: ArrayBuffer;
  durationSeconds: number;
  wordTimestamps?: { word: string; start: number; end: number }[];
}

export interface TextToSpeechProvider {
  name: string;
  synthesize(request: SynthesisRequest): Promise<SynthesisResponse>;
}

export interface TranscriptionRequest {
  audioBlob: Blob | ArrayBuffer;
  language?: string;
}

export interface TranscriptionResponse {
  transcript: string;
  confidence: number;
  words?: { word: string; confidence: number }[];
}

export interface SpeechToTextProvider {
  name: string;
  transcribe(request: TranscriptionRequest): Promise<TranscriptionResponse>;
}
