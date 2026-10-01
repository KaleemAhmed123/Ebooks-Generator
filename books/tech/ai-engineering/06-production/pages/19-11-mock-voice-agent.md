## Mock: real-time voice agent — design

- **Prompt:** "Design a real-time voice assistant (phone-quality conversation)." **Clarify:** natural turn-taking, sub-second response feel, handles interruptions, tools/RAG mid-conversation, thousands of concurrent calls.
- Voice is **the latency mock**: the entire design bends around a strict end-to-end budget, because humans notice conversational lag above ~300–500 ms.

<svg viewBox="0 0 360 92" role="img" aria-label="Voice pipeline: audio in, VAD, streaming ASR, LLM, streaming TTS, audio out, with a latency budget across the stages" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="8" y="30" width="34" height="16" rx="2" fill="#f4f4f4" stroke="#888"/><text x="25" y="41" text-anchor="middle">audio</text>
  <rect x="48" y="30" width="34" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="65" y="41" text-anchor="middle">VAD</text>
  <rect x="88" y="30" width="46" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="111" y="41" text-anchor="middle">ASR (stream)</text>
  <rect x="140" y="30" width="40" height="16" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="160" y="41" text-anchor="middle">LLM</text>
  <rect x="186" y="30" width="46" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="209" y="41" text-anchor="middle">TTS (stream)</text>
  <rect x="238" y="30" width="34" height="16" rx="2" fill="#f4f4f4" stroke="#888"/><text x="255" y="41" text-anchor="middle">audio</text>
  <path d="M42 38 L46 38" stroke="#888" marker-end="url(#v1)"/><path d="M82 38 L86 38" stroke="#888" marker-end="url(#v1)"/><path d="M134 38 L138 38" stroke="#888" marker-end="url(#v1)"/><path d="M180 38 L184 38" stroke="#888" marker-end="url(#v1)"/><path d="M232 38 L236 38" stroke="#888" marker-end="url(#v1)"/>
  <text x="150" y="62" text-anchor="middle" font-size="6">budget ≈ 300–500ms: VAD 50 · ASR 100 · LLM TTFT 150 · TTS 100</text>
  <text x="150" y="78" text-anchor="middle" font-size="6" fill="#a03050">everything STREAMS and overlaps — you cannot afford sequential stages</text>
  <defs><marker id="v1" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **Pipeline:** audio → **VAD** (voice-activity detection for turn-taking) → **streaming ASR** (speech-to-text as the user talks) → **LLM** → **streaming TTS** (speech as tokens generate) → audio. Or an **omni/speech-to-speech** model (Booklet 2's Moshi-style) that collapses ASR+LLM+TTS to cut latency further.
- **Everything overlaps.** You cannot run stages sequentially and fit the budget — ASR streams partial transcripts, the LLM starts on them, TTS speaks the first tokens while later ones generate. **Interruption handling** (barge-in): when the user speaks, cancel the in-flight LLM/TTS immediately (the disconnect/cancel discipline of 17-60a).

:::interview
"Where does the latency budget go in a voice agent, and how do you protect it?"

Decompose it: VAD ~50 ms, streaming ASR ~100 ms, LLM **TTFT** ~150 ms, streaming TTS ~100 ms — and it only fits because the stages **overlap** (ASR streams into the LLM, TTS speaks while the LLM decodes), never run sequentially. I protect it by picking a low-latency LLM path (small/fast model or spec-decode, on Groq-class hardware if needed, 17-05), streaming every stage, and handling **barge-in** by cancelling in-flight generation the instant the user talks. Naming TTFT (not total latency) as the LLM's contribution, and overlap as the thing that makes the budget possible, is the signal.
:::
