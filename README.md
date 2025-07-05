# Voice Playground

> **One‑paragraph gist** — *My‑Voice‑Playground* is a Next.js 15 demo workspace that lets you benchmark multiple speech‑to‑text (STT) and real‑time voice‑agent stacks behind a single chat interface. A thin "adapter" layer hides vendor differences, so you can toggle between **AI SDK**, **OpenAI Realtime**, **Gemini Live**, and **LiveKit Agents** on the fly while measuring latency, accuracy, and cost. The project embraces the App Router, React 19 readiness, and Turbopack build tooling introduced in Next.js 15.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env.local` file in the project root and set your OpenAI key:
   ```env
   OPENAI_API_KEY=your-key-here
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

## Docs

- [AI SDK Core `transcribe` helper](https://ai-sdk.dev/docs/reference/ai-sdk-core/transcribe?utm_source=chatgpt.com)
- [AI SDK UI `useChat` hook](https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-chat?utm_source=chatgpt.com)
