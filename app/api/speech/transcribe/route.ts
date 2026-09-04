import { NextResponse } from "next/server";
import { DeepgramSTTProvider } from "@/providers/speech/speech-provider";

export async function POST(req: Request) {
  try {
    const provider = new DeepgramSTTProvider();
    const res = await provider.transcribe({
      audioBlob: new ArrayBuffer(0),
    });

    return NextResponse.json({
      success: true,
      transcript: res.transcript,
      confidence: res.confidence,
      provider: provider.name,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
