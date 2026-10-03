## Omni models: thinker-talker

- An **omni** model handles **any-to-any**: text, image, audio, and video in; text *and* speech out. The problem it solves is that speech output is not just text — it needs timing, prosody, and to start speaking before the full answer is planned.
- The dominant design (Qwen2.5-Omni and kin, 2025) is **thinker-talker**.

<svg viewBox="0 0 360 100" role="img" aria-label="A thinker module produces text and semantics that a talker module turns into streaming speech tokens" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="8" y="34" width="56" height="34" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="36" y="48" text-anchor="middle" font-size="6">any input</text><text x="36" y="59" text-anchor="middle" font-size="5.5">text/img/audio</text>
  <rect x="88" y="30" width="80" height="42" rx="4" fill="#24405e"/><text x="128" y="46" text-anchor="middle" fill="#fff" font-size="7">Thinker</text><text x="128" y="59" text-anchor="middle" fill="#cdd" font-size="5.5">reasons → text</text>
  <rect x="196" y="30" width="80" height="42" rx="4" fill="#a03050"/><text x="236" y="46" text-anchor="middle" fill="#fff" font-size="7">Talker</text><text x="236" y="59" text-anchor="middle" fill="#fc8" font-size="5.5">text → speech</text>
  <rect x="300" y="24" width="52" height="20" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="326" y="37" text-anchor="middle" font-size="6">text out</text>
  <rect x="300" y="50" width="52" height="20" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="326" y="63" text-anchor="middle" font-size="6">🔊 speech</text>
  <path d="M64 51 L86 51" stroke="#888" marker-end="url(#om)"/><path d="M168 51 L194 51" stroke="#888" marker-end="url(#om)"/><path d="M276 42 L298 36" stroke="#888" marker-end="url(#om)"/><path d="M276 55 L298 60" stroke="#888" marker-end="url(#om)"/>
  <defs><marker id="om" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Thinker** is the reasoning brain — a full multimodal LLM that consumes everything and produces text plus high-level semantic representations.
- **Talker** is a lighter autoregressive model that consumes the thinker's *streaming* output and emits **speech tokens** (decoded to audio by a neural codec — the RVQ codecs from Booklet 2). It can start talking while the thinker is still finishing the thought.
- Splitting the two lets each specialize and, crucially, lets speech *stream* — the talker does not wait for the whole text.

:::note
Thinker-talker mirrors how people speak: you form the idea (thinker) and articulate it (talker) as somewhat separate acts, starting to talk before the sentence is fully planned. Architecturally it decouples reasoning latency from speech latency — the key to a voice assistant that feels responsive rather than walkie-talkie.
:::
