'use client'

import { useChat } from '@ai-sdk/react';
import { useEffect, useRef } from 'react';
import Microphone from '../components/Microphone';

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, append } = useChat();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((m, i) => (
          <div key={i} className="whitespace-pre-wrap">
            <b>{m.role}:</b> {m.content}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <input
          value={input}
          onChange={handleInputChange}
          className="flex-1 border p-2"
          placeholder="Say something"
        />
        <button type="submit" className="border px-4">Send</button>
        <Microphone onTranscript={(t) => append({ role: 'user', content: t })} />
      </form>
    </div>
  );
}
