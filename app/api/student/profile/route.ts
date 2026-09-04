import { NextResponse } from "next/server";
import { DatabaseStore } from "@/lib/db/in-memory-db";

export async function GET() {
  const db = DatabaseStore.getInstance();
  return NextResponse.json({
    success: true,
    profile: db.studentProfile,
    knowledgeGraph: db.knowledgeGraph,
  });
}

export async function POST(req: Request) {
  try {
    const updates = await req.json();
    const db = DatabaseStore.getInstance();
    db.studentProfile = { ...db.studentProfile, ...updates };
    return NextResponse.json({
      success: true,
      profile: db.studentProfile,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
