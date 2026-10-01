## Driving the 45 minutes

- The framework is the *content*; this is the *delivery*. A rough clock keeps you from the classic failure — 30 minutes on a beautiful architecture, zero on eval, cost, and failure.

<svg viewBox="0 0 360 66" role="img" aria-label="A time budget across the 45 minutes: clarify, high-level design, deep dive, then eval cost and failure" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="20" y="24" width="60" height="18" fill="#24405e"/><text x="50" y="36" text-anchor="middle" font-size="6" fill="#fff">clarify 5–8m</text>
  <rect x="80" y="24" width="80" height="18" fill="#e8f4fd" stroke="#24405e"/><text x="120" y="36" text-anchor="middle" font-size="6">high-level 10m</text>
  <rect x="160" y="24" width="90" height="18" fill="#e8f4fd" stroke="#24405e"/><text x="205" y="36" text-anchor="middle" font-size="6">deep dive 12m</text>
  <rect x="250" y="24" width="90" height="18" fill="#24405e"/><text x="295" y="36" text-anchor="middle" font-size="6" fill="#fff">eval/cost/fail 12m</text>
  <text x="20" y="18" font-size="5.5" fill="#6b6b6b">0 min</text><text x="330" y="18" font-size="5.5" fill="#6b6b6b">45 min</text>
</svg>

- **Think out loud, always.** The interviewer scores your reasoning, not your silence. Narrate the framework: "requirements first… I'll assume these numbers… here's the spine… the binding constraint is TTFT… now eval and cost… and here's what breaks."
- **Quantify as you go.** Drop the QPS, the GPU count, the $/1M-token estimate *while* designing. Numbers are the difference between "we'd add caching" and "caching the 1,500-token prefix at 10% cuts ~$30k/month."
- **Manage the clock yourself.** At the midpoint, say "let me make sure I cover eval, cost, and failure modes" and move — do not let the interviewer have to drag you off the architecture.

- **The five mistakes that cap a level:** (1) architecting before requirements; (2) no numbers; (3) skipping eval — "how do you know it works?" has no answer; (4) ignoring cost; (5) claiming zero hallucination / perfect reliability instead of *bounding* them.

:::interview
The 30-second frame to open with, every time:

*"Let me clarify requirements and scale, sketch the high-level design, deep-dive the hardest component, then cover eval, cost, and failure modes — stopping me anywhere you want more depth."* Saying this first shows the interviewer you have a process, sets the agenda, and buys you permission to run the framework. It is the single highest-leverage sentence in the round.
:::
