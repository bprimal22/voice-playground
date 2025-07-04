# AGENTS.md  — Phase 0: AI SDK Chat + Microphone

### 1. Dependencies & keys

* Add **AI SDK Core**, **AI SDK React/UI**, and the **OpenAI provider** to your package manifest. ([ai-sdk.dev][3], [ai-sdk.dev][7])
* Store `OPENAI_API_KEY` (or any provider secret) in `.env.local`; the playground reads it via Next 15's built‑in env import. ([nextjs.org][6])

### 2. Transcription endpoint

* Create an App Router API route under `app/api/transcribe`.
* Inside, call AI SDK's experimental `transcribe` helper, pointing at the `openai.transcription('whisper‑1')` model. ([ai-sdk.dev][3], [openai.com][10])
* Return JSON containing the textual transcript; this keeps key material server‑side and lets you swap providers without touching the client.

### 3. Chat interface

* Use the `useChat` hook from AI SDK UI to wire up streamed conversational state; it handles optimistic UI and incremental tokens automatically. ([ai-sdk.dev][7])
* Render incoming messages in a scrollable list and place a text input plus Send button at the bottom.

### 4. Microphone capture

* On mic button press, request permission through `navigator.mediaDevices.getUserMedia` with `audio: true` constraints. ([developer.mozilla.org][8])
* Construct a `MediaRecorder` with an `audio/webm` mime type; emit blobs every quarter‑second for low latency. ([stackoverflow.com][9])
* POST each blob to `/api/transcribe`, append the returned text to the current chat, and visibly mark partial vs. final results.

### 5. Edge‑case guidance

* **Chunk size trade‑off**: smaller blobs reduce delay but increase HTTP overhead; WebSockets are a later optimisation. ([stackoverflow.com][9])
* **Browser quirks**: MediaRecorder isn't supported on every codec in Safari; stick to Opus/WebM for maximum reach. ([developer.mozilla.org][12])
* **Data accuracy**: Whisper occasionally "hallucinates" text; consider inline latency/quality metrics so you can compare with other engines. ([wired.com][13], [apnews.com][14])
* **Edge runtime**: placing the transcription route on Vercel's Edge Network shaves round‑trip time, aligning with the real‑time ambitions of Next 15's Turbopack build pipeline. ([nextjs.org][2])

### 6. Checklist to ship Phase 0

1. Packages installed and keys loaded.
2. `app/api/transcribe` route returning JSON transcripts.
3. Chat page streaming AI SDK responses.
4. Mic button toggles recording and appends live transcripts.
5. Basic latency console logs for later benchmarking.

> **Next steps** — Once Phase 0 feels solid, plug in additional `ITranscriber` adapters (e.g., LiveKit or Gemini Live), then graduate to full voice‑mode by implementing the duplex `/api/voice` endpoint with your first `IVoiceAgent`.  The same UI remains untouched, fulfilling the modular promise of the playground. ([cloud.google.com][15])

[1]: https://nextjs.org/blog/next-15?utm_source=chatgpt.com "Next.js 15"
[2]: https://nextjs.org/blog/next-15-3?utm_source=chatgpt.com "Next.js 15.3"
[3]: https://ai-sdk.dev/docs/reference/ai-sdk-core/transcribe?utm_source=chatgpt.com "AI SDK Core: transcribe"
[4]: https://ai.google.dev/gemini-api/docs/live?utm_source=chatgpt.com "Get started with Live API | Gemini API | Google AI for Developers"
[5]: https://docs.livekit.io/agents/build/audio/?utm_source=chatgpt.com "Agent speech and audio - LiveKit Docs"
[6]: https://nextjs.org/docs/app?utm_source=chatgpt.com "Next.js Docs: App Router"
[7]: https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-chat?utm_source=chatgpt.com "useChat - AI SDK UI"
[8]: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia?utm_source=chatgpt.com "MediaDevices: getUserMedia() method - Web APIs | MDN"
