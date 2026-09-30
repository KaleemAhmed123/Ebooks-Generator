## The agent workbench: why models fail

- The rest of this module is *architecture and tools*. This cluster is **craft** — the hard-won practices for getting real work out of agents, which matter as much as any framework. It starts with a mindset: **understand why the model fails on your task before you try to fix it.**

<svg viewBox="0 0 360 96" role="img" aria-label="Five root causes of agent failure: unclear goal, missing context, no verification, too much scope, weak feedback" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="64" y="31" text-anchor="middle">unclear goal/spec</text>
  <rect x="126" y="16" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="180" y="31" text-anchor="middle">missing context</text>
  <rect x="242" y="16" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="296" y="31" text-anchor="middle">no way to verify</text>
  <rect x="68" y="46" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="122" y="61" text-anchor="middle">scope too big</text>
  <rect x="184" y="46" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="238" y="61" text-anchor="middle">weak feedback loop</text>
  <rect x="90" y="76" width="180" height="16" rx="3" fill="#eef6fb" stroke="#24405e"/><text x="180" y="88" text-anchor="middle" font-size="6.5">diagnose the cause, then fix that</text>
</svg>

- **The failures are rarely "the model is dumb."** When an agent underperforms, the cause is almost always one of a few *fixable* things:
  - **The goal was underspecified** — the model guessed at ambiguity and guessed wrong (fix: a sharper spec, 14-139).
  - **It lacked context** — the information it needed was not in front of it (fix: retrieval, memory, better context engineering).
  - **It could not verify** — no feedback told it whether a step worked (fix: verification gates, 14-135).
  - **The scope was too large** — one leap where several steps were needed (fix: smallest testable slice, 14-138).
  - **The feedback loop was weak** — errors were not surfaced back to it usefully (fix: actionable tool results, 13-10).
- **The workbench mindset:** treat a failing agent like a failing employee you are *managing*, not a broken machine. What did it not know? What was unclear? What could it not check? Fix the *conditions*, and the same model succeeds.

:::note
This reframes agent engineering as **designing the conditions for the model to succeed**, not squeezing a smarter model. The model is a capable but context-blind, feedback-hungry worker; your job is to give it clear goals, the right information, ways to check its work, and appropriately-sized tasks. Most "the agent doesn't work" problems are workbench problems — the model can do it, but you have not set it up to. The next pages are the specific tools of that setup.
:::
