> **One‑paragraph gist** — *My‑Voice‑Playground* is a Next.js 15 demo workspace that lets you benchmark multiple speech‑to‑text (STT) and real‑time voice‑agent stacks behind a single chat interface.  A thin "adapter" layer hides vendor differences, so you can toggle between **AI SDK**, **OpenAI Realtime**, **Gemini Live**, and **LiveKit Agents** on the fly while measuring latency, accuracy, and cost.  The project embraces the App Router, React 19 readiness, and Turbopack build tooling introduced in Next.js 15. ([nextjs.org][1], [nextjs.org][2])

### 🎯 Goals

* **Compare providers**: quickly A/B test AI SDK vs. OpenAI Realtime vs. Gemini Live vs. LiveKit Agents for both transcription and full‑duplex voice. ([ai-sdk.dev][3], [ai.google.dev][4], [docs.livekit.io][5])
* **Single UI surface**: typed chat, push‑to‑talk mic, and live voice mode all share the same React page powered by App Router conventions. ([nextjs.org][6])
* **Server‑side secrets**: keep every API key in Next's built‑in environment system so PRs run safely on Vercel edge infrastructure.

### 🗂 High‑level folder map

* **app/** – the route tree, including
  - page.tsx (chat shell)
  - api/transcribe (POST audio → text)
  - api/voice (WebSocket or SSE for duplex voice)
* **components/** – purely visual pieces: chat window, microphone button, provider selector, etc.
* **hooks/** – reusable browser logic such as audio capture and WebSocket management.
* **lib/providers/** – one file per vendor that implements shared interfaces `ITranscriber` and `IVoiceAgent`; swap‑in/out here only.
* **context/** – global React context holding the currently selected provider and its credentials.
* **styles/** & **.env.local** – Tailwind (optional) and secrets, respectively.

### 🔄 Runtime flow

1. **Typed messages** stream through `useChat` from AI SDK UI, delivering incremental responses. ([ai-sdk.dev][7])
2. **Push‑to‑talk mic** starts the MediaRecorder API, slices audio into \~250 ms blobs, and posts each to the transcription route. ([developer.mozilla.org][8], [stackoverflow.com][9])
3. The server chooses the active `ITranscriber` adapter—AI SDK Whisper by default—for speech‑to‑text. ([ai-sdk.dev][3], [openai.com][10])
4. **Voice mode** upgrades to a WebSocket where both audio frames and JSON chat events stream bidirectionally; the `IVoiceAgent` handles STT, LLM, and TTS in one loop. ([docs.livekit.io][5], [ai.google.dev][4])
5. Each phase is timestamped so the UI can display end‑to‑end latency and per‑provider costs.

### 🛠 Extending the playground

* Drop a new adapter in **lib/providers** and export the same interface; it instantly appears in the Provider Selector.
* Because browser blobs still can't travel through App Router server actions, keep audio uploads on classic API routes or Edge Functions. ([reddit.com][11])
* Turbopack handles local dev and production builds; React 19 codemods are available if migrating from earlier versions. ([nextjs.org][1])

[1]: https://nextjs.org/blog/next-15?utm_source=chatgpt.com "Next.js 15"
[2]: https://nextjs.org/blog/next-15-3?utm_source=chatgpt.com "Next.js 15.3"
[3]: https://ai-sdk.dev/docs/reference/ai-sdk-core/transcribe?utm_source=chatgpt.com "AI SDK Core: transcribe"
[4]: https://ai.google.dev/gemini-api/docs/live?utm_source=chatgpt.com "Get started with Live API | Gemini API | Google AI for Developers"
[5]: https://docs.livekit.io/agents/build/audio/?utm_source=chatgpt.com "Agent speech and audio - LiveKit Docs"
[6]: https://nextjs.org/docs/app?utm_source=chatgpt.com "Next.js Docs: App Router"
[7]: https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-chat?utm_source=chatgpt.com "useChat - AI SDK UI"
