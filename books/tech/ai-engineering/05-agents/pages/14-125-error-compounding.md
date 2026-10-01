## Error compounding

- The defining failure of long-horizon agents: **errors multiply across steps.** If each step is reliable with probability *p*, a task of *n* independent steps succeeds with probability *pⁿ* — which collapses fast.

<svg viewBox="0 0 360 92" role="img" aria-label="Success probability drops steeply as step count grows, for per-step reliability of 95 and 99 percent" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <line x1="30" y1="76" x2="345" y2="76" stroke="#888"/><line x1="30" y1="10" x2="30" y2="76" stroke="#888"/>
  <path d="M30 14 Q120 40 200 62 Q280 72 345 74" fill="none" stroke="#a03050" stroke-width="1.5"/><text x="250" y="70" font-size="6" fill="#a03050">p=0.95</text>
  <path d="M30 14 Q150 22 250 34 Q320 42 345 46" fill="none" stroke="#24405e" stroke-width="1.5"/><text x="300" y="40" font-size="6" fill="#24405e">p=0.99</text>
  <text x="185" y="88" text-anchor="middle" font-size="6" fill="#6b6b6b">steps →</text>
  <text x="20" y="44" font-size="6" fill="#6b6b6b" transform="rotate(-90 20 44)">success</text>
</svg>

- **Run the numbers:** at 95% per-step reliability, a 20-step task succeeds ~36% of the time (0.95²⁰); a 50-step task, ~8%. Even at 99%, 50 steps is ~61%. Long tasks demand *very* high per-step reliability or they almost never finish clean.
- **Why it compounds beyond simple multiplication:** a wrong step does not just fail — it pushes the agent into a **state it was never meant to be in**, so subsequent steps reason from a corrupted premise and get *worse*, not merely stuck. A mis-read value leads to a wrong query leads to a nonsense conclusion — the error snowballs.
- **The fixes all fight the exponent:**
  - **Raise per-step reliability** — better prompts, schemas, tools, models (each 9 of reliability matters enormously at depth).
  - **Shorten the horizon** — decompose into fewer, verified steps; use subagents (14-87) so each has a short chain.
  - **Verify and recover** — check each step's result (14-110) and correct early, before the error snowballs.
  - **Checkpoint** — so a failure resumes from a good state (14-50) rather than restarting.

:::interview
"Why do agents struggle with long, multi-step tasks?"

Error compounding. If each step is reliable with probability p, an n-step task succeeds with pⁿ — at 95% per step, 20 steps is only ~36%. Worse, a wrong step corrupts the state, so later steps reason from a bad premise and degrade further, not just stall. You fight it on every front: raise per-step reliability (the 9s matter more at depth), shorten the horizon (decompose, use subagents), verify and recover after each step before errors snowball, and checkpoint so failures resume from a good state rather than the start.
:::
