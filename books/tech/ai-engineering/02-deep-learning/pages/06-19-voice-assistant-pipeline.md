## Voice assistant: putting it together

- A voice assistant chains this module's pieces into a live loop: hear, understand, think, speak — fast enough to feel like conversation.
- The **cascade** design wires named parts: VAD gates the mic, ASR (Whisper) transcribes, a language model decides the reply, TTS speaks it. Easy to build and debug; each part is swappable.

<svg viewBox="0 0 340 84" role="img" aria-label="A pipeline: microphone, voice activity detection, speech recognition, language model, text to speech, speaker output" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <g fill="#e8f4fd" stroke="#24405e"><rect x="6" y="30" width="34" height="22" rx="2"/><rect x="48" y="30" width="34" height="22" rx="2"/><rect x="90" y="30" width="42" height="22" rx="2"/><rect x="140" y="30" width="40" height="22" rx="2"/><rect x="188" y="30" width="42" height="22" rx="2"/></g>
  <text x="23" y="44" text-anchor="middle">mic</text><text x="65" y="44" text-anchor="middle">VAD</text><text x="111" y="44" text-anchor="middle">ASR</text><text x="160" y="44" text-anchor="middle">LLM</text><text x="209" y="44" text-anchor="middle">TTS</text>
  <rect x="238" y="30" width="42" height="22" rx="2" fill="#1a3a2a"/><text x="259" y="44" text-anchor="middle" fill="#fff">speaker</text>
  <g stroke="#1a1a1a"><path d="M40 41 L47 41" marker-end="url(#va)"/><path d="M82 41 L89 41" marker-end="url(#va)"/><path d="M132 41 L139 41" marker-end="url(#va)"/><path d="M180 41 L187 41" marker-end="url(#va)"/><path d="M230 41 L237 41" marker-end="url(#va)"/></g>
  <path d="M259 54 C259 74 23 74 23 54" stroke="#6b6b6b" fill="none" stroke-dasharray="3 2" marker-end="url(#va)"/><text x="140" y="72" text-anchor="middle" fill="#6b6b6b">loop: barge-in cancels playback</text>
  <defs><marker id="va" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- The **end-to-end** design (Moshi, page 06-13) replaces the middle boxes with one duplex model — lower latency and natural interruption, at the cost of tuning and control over each stage.

:::note
The engineering that decides quality is not the models — it is the seams. Streaming so the reply starts before the user finishes; **barge-in** (stopping playback the instant the user talks over it); a fallback when ASR is unsure. Latency and interruption handling separate a demo from a product. That is the job, and it is where this booklet's pieces finally meet.
:::
