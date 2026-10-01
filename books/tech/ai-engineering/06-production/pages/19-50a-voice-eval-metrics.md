## Voice assistant: evaluation

- A voice agent fails in ways text eval can't see — it can transcribe wrong, respond too slowly to feel natural, talk over the user, or sound robotic. Evaluation spans the whole pipeline (19-11), not just the LLM's words.

| Layer | Metric |
|---|---|
| **ASR** | word error rate (WER); worse on accents, noise, jargon |
| **latency** | end-to-end response time, barge-in reaction time |
| **LLM** | task success, correctness (as text) |
| **TTS** | naturalness (MOS), pronunciation of names/numbers |
| **conversation** | turn-taking, interruption handling, task completion |

- **Latency is a first-class quality metric here**, not just an ops number — a correct answer that arrives a second late *feels* wrong in conversation, so you evaluate response time and barge-in reaction alongside correctness (19-11's budget). A voice eval that ignores latency measures the wrong thing.
- **Test the seams, not just the parts.** Each component can pass in isolation while the *assembled* conversation fails — ASR mis-transcribes a name that the LLM then answers confidently about, or a slow tool call creates dead air. End-to-end conversation testing (with real audio, accents, interruptions, background noise) is where the failures actually live (the integration lesson from 19-74).

:::interview
"How do you evaluate a voice agent?"

Across the whole pipeline, because failures hide in each stage and the seams. **ASR**: word error rate, especially on accents/noise/jargon. **Latency**: end-to-end response time *and* barge-in reaction — and I treat latency as a *quality* metric, not just ops, because a late answer feels wrong conversationally. **LLM**: task success and correctness. **TTS**: naturalness and correct pronunciation of names/numbers. **Conversation**: turn-taking and interruption handling end to end, with *real* audio (accents, noise, overlaps), because components pass in isolation while the assembled conversation fails — a mis-transcribed name the LLM then confidently answers about. Naming latency-as-quality and end-to-end conversational testing over unit metrics is the signal.
:::
