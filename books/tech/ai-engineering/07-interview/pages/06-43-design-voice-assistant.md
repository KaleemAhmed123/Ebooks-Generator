## Design a real-time voice assistant.

- **Requirements:** natural spoken conversation — low end-to-end latency (feel is ruined past ~1s), barge-in (user interrupts), robust to noise, multi-turn.
- **Classic pipeline:** **ASR** (speech→text, streaming) → **LLM** (generate reply) → **TTS** (text→speech, streaming). Plus **VAD** (voice-activity detection) for turn-taking and barge-in.
- **The latency budget is the whole game** — it's the *sum* of ASR + LLM TTFT + TTS. Techniques:
  - **Stream everything** — partial ASR transcripts, start LLM before the user finishes, stream TTS as the LLM streams tokens.
  - **Fast models per stage**; small/quantized LLM or routing for simple turns.
  - **Speculative / early TTS** on the first clause so audio starts before the full reply exists.
  - **Barge-in** — VAD detects the user speaking → cancel TTS and LLM generation, re-listen.
- **Newer option:** a **speech-to-speech** model (audio in/out directly) cuts the ASR/TTS hops and latency, and preserves tone/emotion — at the cost of less control over each stage.
- **Ops:** measure per-stage and end-to-end latency percentiles; handle ASR errors gracefully; tool calls for actions.
- **Tradeoffs:** pipeline (modular, controllable) vs end-to-end S2S (lower latency, less control); model size vs latency.

:::interview
What's really being tested: that you treat end-to-end latency as a summed budget solved by streaming + barge-in + fast models, know the ASR→LLM→TTS pipeline and VAD, and the S2S alternative's tradeoff.
:::
