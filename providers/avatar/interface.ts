// ==========================================
// AVATAR PROVIDER ABSTRACTION
// ==========================================

export interface AvatarGenerationRequest {
  script: string;
  avatarId?: string;
  voiceId?: string;
  language?: string;
  aspectRatio?: "16:9" | "9:16" | "1:1";
}

export interface AvatarGenerationResponse {
  jobId: string;
  status: "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED";
  videoUrl?: string;
  durationSeconds?: number;
  lipSyncKeyframes?: { timestamp: number; mouthShape: string }[];
}

export interface AvatarProvider {
  name: string;
  generateVideo(request: AvatarGenerationRequest): Promise<AvatarGenerationResponse>;
  getVideoStatus(jobId: string): Promise<AvatarGenerationResponse>;
}
