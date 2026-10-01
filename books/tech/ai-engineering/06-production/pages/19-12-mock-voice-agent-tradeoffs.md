## Mock: voice agent — scale, failure, tradeoffs

- **Scale** is concurrent *calls*, not QPS — each call holds an open, stateful, streaming session for its whole duration (minutes), so the constraint is *concurrent sessions* the fleet can hold, and each session ties up ASR, LLM, and TTS capacity at once. Size for peak simultaneous calls, not request rate.
- **Failure modes** are latency and audio failures:

| Failure | Response |
|---|---|
| LLM TTFT spike | fallback to a faster/smaller model; filler ("let me check…") |
| ASR mishears | confidence + confirmation on high-stakes slots (names, amounts) |
| user interrupts (barge-in) | cancel in-flight LLM+TTS instantly (17-60a) |
| network jitter | jitter buffer; graceful degrade to text |
| tool call mid-call is slow | speak a holding phrase while it runs |

- **Tradeoffs probed.** *Cascade (ASR→LLM→TTS) vs omni model* — cascade is modular, debuggable, and lets you swap best-of-breed parts; an omni speech-to-speech model cuts latency and preserves tone but is harder to control and inspect. *Fast small model vs capable large model* — voice punishes latency more than a chat box, so bias toward the faster model and escalate only when needed. *Interrupt aggressiveness* — cancel too eagerly and you cut the user off; too slowly and it feels laggy.

:::interview
"Cascade or a single speech-to-speech model?"

Depends on what the product weights. **Cascade** (VAD→ASR→LLM→TTS) is the pragmatic default: each stage is swappable, debuggable, and independently scalable, and you can drop in the best ASR and TTS — at the cost of latency across the hops and lost prosody/emotion. A **speech-to-speech omni model** cuts latency and preserves tone and interruption-handling naturally, but is harder to steer, inspect, and add tools to. I'd start cascade for control and observability, and move to omni for the paths where sub-300 ms and natural prosody are the product. Naming the control/observability-vs-latency/naturalness axis is the signal.
:::
