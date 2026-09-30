## Long video and temporal grounding

- Sampling handles a one-minute clip. An hour-long lecture or a full film is another regime — even 1 fps is 3,600 frames. Two extra tools handle **long video**, and one task, **temporal grounding**, is what production actually needs.

### Reaching hours
- **Memory tokens / hierarchical pooling.** Summarize each chunk of video into a few "memory" tokens, then reason over the summaries — the video equivalent of chunking a long document. Some models keep a running memory as they stream through (like the agent memory of Module 14).
- **Million-token context.** Frontier long-context models (Booklet 3's context-length page) can hold enough pooled frames to cover long video directly, at high cost.

### Temporal grounding
- The valuable skill is not "describe the video" but **"at what timestamp does X happen?"** — locating an event in time. A support agent finds the moment a user's screen recording errors; a sports tool finds the goal.

<svg viewBox="0 0 360 74" role="img" aria-label="A timeline where the model localizes the moment an event occurs" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="20" y1="40" x2="340" y2="40" stroke="#888"/>
  <g font-size="5.5" fill="#6b6b6b"><text x="20" y="54">0:00</text><text x="160" y="54">1:00</text><text x="320" y="54">2:00</text></g>
  <rect x="196" y="30" width="30" height="20" rx="2" fill="#a03050"/><text x="211" y="26" text-anchor="middle" font-size="6" fill="#a03050">event</text>
  <text x="211" y="66" text-anchor="middle" font-size="6" fill="#1a3a2a">"the goal is at 1:12"</text>
</svg>

- Temporal grounding needs reliable frame timing (M-RoPE time axis) and dense-enough sampling around the moment — a tension with the aggressive subsampling long video forces. Miss the frame, miss the event.

:::warn
Long-video VLMs quietly fail on anything **between** sampled frames. If you sample 1 fps and the event lasts 300 ms, the model may never see it and will confidently answer as if it did not happen. For fast events (a fault flashing, a ball crossing a line), sampling rate is a correctness parameter, not a cost knob — raise it where the task demands.
:::
