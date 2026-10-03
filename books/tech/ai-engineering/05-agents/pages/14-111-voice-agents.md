## Voice agents

- A **voice agent** talks and listens in real time — a phone support bot, a voice assistant, a drive-through order-taker. It is an agent (tools, loop) wrapped in a **speech pipeline** with a punishing constraint: **latency**. A pause that is fine in text feels broken in conversation.

<svg viewBox="0 0 360 92" role="img" aria-label="Voice pipeline: speech-to-text, the agent, text-to-speech, with turn detection" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="36" width="56" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="38" y="48" text-anchor="middle" font-size="6">🎤 STT</text><text x="38" y="57" text-anchor="middle" font-size="5.5" fill="#6b6b6b">speech→text</text>
  <rect x="90" y="34" width="70" height="28" rx="4" fill="#24405e"/><text x="125" y="51" text-anchor="middle" fill="#fff" font-size="6.5">agent (LLM+tools)</text>
  <rect x="184" y="36" width="56" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="212" y="48" text-anchor="middle" font-size="6">🔊 TTS</text><text x="212" y="57" text-anchor="middle" font-size="5.5" fill="#6b6b6b">text→speech</text>
  <rect x="264" y="34" width="86" height="28" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="307" y="48" text-anchor="middle" font-size="6">turn detection</text><text x="307" y="57" text-anchor="middle" font-size="5.5" fill="#6b6b6b">VAD · barge-in</text>
  <path d="M66 48 L88 48" stroke="#888" marker-end="url(#va2)"/><path d="M160 48 L182 48" stroke="#888" marker-end="url(#va2)"/><path d="M240 48 L262 48" stroke="#888" marker-end="url(#va2)"/>
  <defs><marker id="va2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The pipeline** (Booklet 2's speech, wrapped around an agent): **STT** (speech-to-text) transcribes the user → the **agent** reasons and maybe calls tools → **TTS** (text-to-speech) speaks the reply. Or, with an omni model (12-32), the middle collapses into one speech-to-speech model — lower latency, fewer seams.
- **Turn-taking is a first-class problem** (12-33): a **VAD** (voice-activity detector) senses when the user stops speaking so the agent knows to respond; **barge-in** lets the user interrupt the agent mid-sentence, which means the agent must stop generating and speaking instantly. Get this wrong and the agent talks over people or leaves dead air — the fastest way to make a voice bot feel broken.
- **Frameworks** — **Pipecat** and **LiveKit Agents** orchestrate this real-time pipeline (audio streaming, VAD, interruption, tool calls) so you assemble a voice agent from components instead of building the streaming plumbing.

:::note
A voice agent is the whole booklet in real time: perception (STT/omni), an agent loop with tools, and generation (TTS/omni) — under a latency budget of a few hundred milliseconds. That constraint reorders priorities: streaming everything, overlapping stages, and flawless turn-taking matter as much as the agent's answers. Users forgive a mediocre answer delivered smoothly and abandon a great answer delivered with awkward pauses.
:::
