'use client'

import { useRef, useState } from 'react';

interface Props {
  onTranscript: (text: string) => void;
}

export default function Microphone({ onTranscript }: Props) {
  const [recording, setRecording] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);

  async function toggle() {
    if (recording) {
      recorderRef.current?.stop();
      recorderRef.current?.stream.getTracks().forEach((t) => t.stop());
      setRecording(false);
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    recorderRef.current = recorder;
    recorder.ondataavailable = async (e) => {
      if (e.data.size === 0) return;
      const start = performance.now();
      const res = await fetch('/api/transcribe', { method: 'POST', body: e.data });
      const json = await res.json();
      console.log('transcribe latency', performance.now() - start);
      if (json.transcript) onTranscript(json.transcript as string);
    };
    recorder.start(250);
    setRecording(true);
  }

  return (
    <button type="button" onClick={toggle} className="border px-2">
      {recording ? 'Stop' : 'Mic'}
    </button>
  );
}
