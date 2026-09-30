## Streaming speech to speech

- The classic voice assistant is a **cascade**: ASR → language model → TTS. It works, but each stage waits for the last to finish, so replies lag by seconds and the system cannot listen while it talks.
- **Moshi** (Kyutai, 2024) rethought this as one model that handles speech in and speech out, in real time. It is **full-duplex**: it models the user's audio stream *and* its own audio stream at once, so it can listen and speak simultaneously, like a real conversation.
- It layers three pieces: **Mimi** (a streaming neural codec) for audio tokens, **Helium** (a 7-billion-parameter text model) for reasoning, and an "**inner monologue**" — predicting its own text alongside its audio, which sharply improves what it says.

<svg viewBox="0 0 320 84" role="img" aria-label="Two audio streams, user and model, processed together by one model that outputs speech with about 200 millisecond latency" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <path d="M10 24 Q18 14 26 24 T42 24" stroke="#24405e" fill="none"/><text x="26" y="38" text-anchor="middle" fill="#6b6b6b">user stream</text>
  <path d="M10 56 Q18 46 26 56 T42 56" stroke="#1a3a2a" fill="none"/><text x="26" y="70" text-anchor="middle" fill="#6b6b6b">model stream</text>
  <path d="M52 30 L86 38" stroke="#1a1a1a" marker-end="url(#ss2)"/><path d="M52 54 L86 46" stroke="#1a1a1a" marker-end="url(#ss2)"/>
  <rect x="90" y="28" width="80" height="28" rx="3" fill="#24405e"/><text x="130" y="46" text-anchor="middle" fill="#fff">Moshi</text>
  <path d="M172 42 L204 42" stroke="#1a1a1a" marker-end="url(#ss2)"/>
  <text x="262" y="38" text-anchor="middle">full-duplex speech</text><text x="262" y="52" text-anchor="middle" fill="#6b6b6b">~200 ms latency</text>
  <defs><marker id="ss2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- The same multi-stream design powers **Hibiki**, a real-time speech-to-speech *translation* model — it speaks the translation as you talk.

:::note
Latency is the product here. A cascade stacks each stage's delay; an end-to-end duplex model reaches ~200 ms — near the threshold where a conversation stops feeling like a walkie-talkie. Removing the turn-taking wait is what makes it feel alive.
:::
