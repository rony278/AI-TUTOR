import { NextResponse } from "next/server";
import { ElevenLabsTTSProvider } from "@/providers/speech/speech-provider";

export async function POST(req: Request) {
  try {
    const { text, language = "en" } = await req.json();
    const provider = new ElevenLabsTTSProvider();
    const res = await provider.synthesize({ text, language });

    return NextResponse.json({
      success: true,
      durationSeconds: res.durationSeconds,
      wordTimestamps: res.wordTimestamps,
      provider: provider.name,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
