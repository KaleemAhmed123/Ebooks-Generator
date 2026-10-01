## How do you drive a 45-minute AI system design interview?

- It's a communication test as much as a design one. Budget the time and lead the conversation.
  - **~5 min — Requirements.** Ask clarifying questions; pin functional + non-functional (scale, latency, quality bar, cost, privacy). Write them down. Don't design yet.
  - **~5 min — Define success + high-level sketch.** State how quality is measured and draw the end-to-end data flow + API. Get a nod before going deep.
  - **~20 min — Deep dive** the AI core the interviewer cares about (retrieval, serving, agent, eval) and the scale/cost math. Think aloud; state assumptions.
  - **~10 min — Scale, failure, safety, tradeoffs.** Capacity numbers, fallbacks, injection/PII, and the **explicit tradeoffs** you chose.
  - **~5 min — Wrap.** Summarise, name what you'd do with more time, and the biggest risk.
- Habits that score:
  - **Drive** — propose structure, don't wait to be led.
  - **Numbers** — do the back-of-envelope capacity/cost out loud.
  - **Evaluation & tradeoffs** — raise them unprompted; it's the senior signal.
  - **Check in** — "does that match what you want me to focus on?"
- Red flags: jumping to a solution before requirements, ignoring quality measurement, claiming no tradeoffs, hand-waving scale.

:::interview
What's really being tested: that you can time-box and *lead* the discussion — requirements → success metric → deep dive with numbers → tradeoffs — communicating structure, which is what the interview actually measures.
:::
