// ==========================================
// MOCK & CLOUD AVATAR ADAPTERS
// ==========================================
import { AvatarProvider, AvatarGenerationRequest, AvatarGenerationResponse } from "./interface";

export class MockAvatarProvider implements AvatarProvider {
  public name = "Interactive Real-Time Virtual Teacher Canvas";

  public async generateVideo(request: AvatarGenerationRequest): Promise<AvatarGenerationResponse> {
    // Generate synthetic lip-sync phonemes for canvas rendering
    const words = request.script.split(/\s+/);
    const estimatedDuration = Math.max(3, words.length * 0.4);

    const keyframes = words.map((_, i) => ({
      timestamp: i * 0.4,
      mouthShape: ["A", "O", "E", "M", "L"][i % 5],
    }));

    return {
      jobId: `mock_avatar_${Date.now()}`,
      status: "COMPLETED",
      videoUrl: "/avatars/teacher_avatar_stream.mp4",
      durationSeconds: estimatedDuration,
      lipSyncKeyframes: keyframes,
    };
  }

  public async getVideoStatus(jobId: string): Promise<AvatarGenerationResponse> {
    return {
      jobId,
      status: "COMPLETED",
      videoUrl: "/avatars/teacher_avatar_stream.mp4",
      durationSeconds: 12,
    };
  }
}

export class HeyGenAvatarProvider implements AvatarProvider {
  public name = "HeyGen AI Video Provider";
  private apiKey: string;

  constructor(apiKey: string = process.env.HEYGEN_API_KEY || "") {
    this.apiKey = apiKey;
  }

  public async generateVideo(request: AvatarGenerationRequest): Promise<AvatarGenerationResponse> {
    if (!this.apiKey) {
      // Graceful fallback to mock provider if key absent
      return new MockAvatarProvider().generateVideo(request);
    }
    // Real HeyGen API call implementation stub with fallback
    return {
      jobId: `heygen_${Date.now()}`,
      status: "PROCESSING",
    };
  }

  public async getVideoStatus(jobId: string): Promise<AvatarGenerationResponse> {
    return {
      jobId,
      status: "COMPLETED",
      videoUrl: "https://files.heygen.ai/demo-output.mp4",
    };
  }
}

export class DIDAvatarProvider implements AvatarProvider {
  public name = "D-ID Real-Time Avatar Provider";
  private apiKey: string;

  constructor(apiKey: string = process.env.DID_API_KEY || "") {
    this.apiKey = apiKey;
  }

  public async generateVideo(request: AvatarGenerationRequest): Promise<AvatarGenerationResponse> {
    if (!this.apiKey) {
      return new MockAvatarProvider().generateVideo(request);
    }
    return {
      jobId: `did_${Date.now()}`,
      status: "PROCESSING",
    };
  }

  public async getVideoStatus(jobId: string): Promise<AvatarGenerationResponse> {
    return {
      jobId,
      status: "COMPLETED",
    };
  }
}
