import { NextRequest, NextResponse } from 'next/server';
import { experimental_transcribe as transcribe } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: NextRequest) {
  const audio = await req.arrayBuffer();
  const start = Date.now();
  const result = await transcribe({
    model: openai.transcription('whisper-1'),
    audio,
  });
  console.log('whisper latency ms', Date.now() - start);
  return NextResponse.json({ transcript: result.text });
}
