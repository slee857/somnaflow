import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get("audio") as File;

    if (!audioFile) {
      return NextResponse.json({ error: "No audio file" }, { status: 400 });
    }

    const transcription = await client.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
    });

    return NextResponse.json({ text: transcription.text });
  } catch (err: unknown) {
    console.error("Transcription error:", err);
    const maybeStatus =
      typeof err === "object" && err && "status" in err ? Number((err as { status?: unknown }).status) : 500;
    const maybeMessage =
      typeof err === "object" && err && "message" in err
        ? String((err as { message?: unknown }).message)
        : "Transcription failed";
    return NextResponse.json(
      { error: maybeMessage || "Transcription failed" },
      { status: Number.isFinite(maybeStatus) && maybeStatus >= 400 ? maybeStatus : 500 },
    );
  }
}
