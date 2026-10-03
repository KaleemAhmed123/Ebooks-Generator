## Voice agents: design for latency and error

- Two forces dominate voice-agent engineering: the **latency budget** and the fact that **speech is lossy and interruptible**. Design choices follow from both.

- **Chase latency at every stage.** Target roughly **sub-second** to first audio, ideally ~500 ms. Techniques: stream STT (transcribe as they speak, do not wait for silence), start the LLM on a partial transcript, stream TTS (speak the first words before the sentence is done), and pick fast models — a smaller LLM that answers in 300 ms often beats a smarter one that takes two seconds, because the pause kills the conversation (12-33).

<svg viewBox="0 0 360 66" role="img" aria-label="Overlapping streamed stages keep first-audio latency low" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <rect x="14" y="20" width="90" height="12" fill="#e8f4fd" stroke="#24405e"/><text x="59" y="29" text-anchor="middle">STT (streaming)</text>
  <rect x="70" y="34" width="90" height="12" fill="#24405e"/><text x="115" y="43" text-anchor="middle" fill="#fff">LLM (on partial)</text>
  <rect x="130" y="48" width="90" height="12" fill="#eaf6ea" stroke="#1a3a2a"/><text x="175" y="57" text-anchor="middle">TTS (streaming)</text>
  <text x="300" y="40" font-size="6" fill="#a03050">overlap → fast</text>
</svg>

- **Design for mishearing.** STT errs, especially on names, numbers, and noise. Confirm critical values ("that was four-two-seven, correct?"), allow easy correction, and never take an irreversible action on an unconfirmed transcript.
- **Keep replies short.** Long spoken monologues are hard to follow and block barge-in. Voice agents should say less and check in more — the opposite of a thorough text answer.
- **Handle the unhappy audio path:** silence (prompt gently), cross-talk, background noise, the user hanging up mid-task. These are the norm on real calls, not edge cases.

:::interview
"What makes voice agents harder than text agents?"

Latency and lossy, interruptible input. You have ~500 ms to first audio, so you stream and overlap every stage (STT on the fly, LLM on a partial transcript, streaming TTS) and often pick a faster-but-smaller model — a smooth quick reply beats a slow brilliant one. And speech is unreliable: STT mishears names and numbers, users interrupt (barge-in) and expect the agent to stop instantly, and calls have silence, noise, and cross-talk. So you confirm critical values, keep replies short, and engineer turn-taking as a first-class feature — the pipeline's UX matters as much as the agent's answers.
:::
