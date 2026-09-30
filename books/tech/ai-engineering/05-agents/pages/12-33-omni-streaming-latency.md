## Streaming and latency for omni

- A live voice agent lives or dies on **latency** — the gap between you finishing a word and the model starting its reply. Text agents can think for two seconds; a voice that pauses two seconds feels broken. The target is roughly **sub-500 ms** to first audio.
- The enemy is the naive pipeline: wait for the whole user utterance → transcribe → run the LLM to completion → synthesize the whole reply → play. Each stage waits for the last; latencies add up to seconds.

<svg viewBox="0 0 360 104" role="img" aria-label="Sequential pipeline stages add latency while a streaming design overlaps them" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="10" y="14" font-size="6" fill="#a03050">sequential (slow)</text>
  <g font-size="5.5"><rect x="10" y="18" width="46" height="14" fill="#fdeef2" stroke="#a03050"/><text x="33" y="28" text-anchor="middle">listen</text><rect x="58" y="18" width="46" height="14" fill="#fdeef2" stroke="#a03050"/><text x="81" y="28" text-anchor="middle">think</text><rect x="106" y="18" width="46" height="14" fill="#fdeef2" stroke="#a03050"/><text x="129" y="28" text-anchor="middle">speak</text></g>
  <text x="160" y="28" font-size="6" fill="#a03050">→ seconds</text>
  <text x="10" y="52" font-size="6" fill="#1a3a2a">streaming (fast)</text>
  <g font-size="5.5"><rect x="10" y="56" width="60" height="12" fill="#eaf6ea" stroke="#1a3a2a"/><text x="40" y="65" text-anchor="middle">listen ↺</text><rect x="30" y="70" width="60" height="12" fill="#eaf6ea" stroke="#1a3a2a"/><text x="60" y="79" text-anchor="middle">think ↺</text><rect x="55" y="84" width="60" height="12" fill="#eaf6ea" stroke="#1a3a2a"/><text x="85" y="93" text-anchor="middle">speak ↺</text></g>
  <text x="150" y="80" font-size="6" fill="#1a3a2a">→ overlap = fast</text>
</svg>

- **The fixes, all forms of overlap:**
  - **Streaming input.** Process audio as it arrives (chunked), not after the user stops — the model is half-done thinking before you finish talking.
  - **Streaming output.** The talker emits speech tokens continuously; playback starts on the first chunk.
  - **Turn detection / barge-in.** A voice-activity detector spots when you stop, and lets you *interrupt* the model mid-sentence (barge-in), which means it must stop generating instantly.
- These are the same real-time audio problems from Booklet 2's speech module, now wrapped around a full multimodal brain. The voice-agent frameworks in Module 14 (Pipecat, LiveKit) exist to orchestrate exactly this.

:::warn
The most common omni-agent failure is not wrong answers — it is **awkward turns**: the model talks over you, or leaves a two-second silence, or cannot be interrupted. Users forgive a mediocre answer delivered smoothly and abandon a great answer delivered clumsily. Turn-taking is a first-class feature, not polish.
:::
