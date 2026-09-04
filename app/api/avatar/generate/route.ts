import { NextResponse } from "next/server";
import { MockAvatarProvider } from "@/providers/avatar/mock-avatar";

export async function POST(req: Request) {
  try {
    const { script, language = "English" } = await req.json();
    const provider = new MockAvatarProvider();
    const res = await provider.generateVideo({ script, language });

    return NextResponse.json({
      success: true,
      jobId: res.jobId,
      status: res.status,
      videoUrl: res.videoUrl,
      durationSeconds: res.durationSeconds,
      keyframes: res.lipSyncKeyframes,
      provider: provider.name,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
