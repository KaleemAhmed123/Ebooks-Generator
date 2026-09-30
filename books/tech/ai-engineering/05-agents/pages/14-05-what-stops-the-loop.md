## What stops the loop

- An agent that never stops is a runaway bill or an infinite crash. Termination is not automatic — you engineer it. There are good stops and bad stops.

<svg viewBox="0 0 360 100" role="img" aria-label="Good stops: final answer or task complete. Bad stops: max steps, budget, or a loop guard" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="90" y="14" text-anchor="middle" font-size="6.5" fill="#1a3a2a">graceful (the model decides)</text>
  <rect x="14" y="20" width="150" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="89" y="32" text-anchor="middle" font-size="6">model emits text, no tool</text>
  <rect x="14" y="42" width="150" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="89" y="54" text-anchor="middle" font-size="6">calls a "done"/submit tool</text>
  <text x="270" y="14" text-anchor="middle" font-size="6.5" fill="#a03050">hard limits (you enforce)</text>
  <rect x="196" y="20" width="150" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="271" y="32" text-anchor="middle" font-size="6">max steps (e.g. 25)</text>
  <rect x="196" y="42" width="150" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="271" y="54" text-anchor="middle" font-size="6">token/$ budget exceeded</text>
  <rect x="196" y="64" width="150" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="271" y="76" text-anchor="middle" font-size="6">loop guard: repeated action</text>
</svg>

- **Graceful stops** — the model signals completion, either by answering with plain text (no tool call, the natural brake) or by calling an explicit `submit_answer` / `done` tool. Design the prompt so the model *knows* how to declare it is finished.
- **Hard limits — always required as a backstop:**
  - **Max steps.** Cap the loop (e.g. 25 iterations). Without it, a confused agent loops forever.
  - **Budget.** Track tokens/cost per run; abort past a ceiling.
  - **Loop guard.** Detect the same action repeated (calling `search("X")` three times) and break — a classic stuck pattern.
  - **Timeout.** Wall-clock cap on the whole run.
- The graceful stop is how it *should* end; the hard limits are how you guarantee it *does* end. Ship both.

:::warn
The most expensive agent bug is the silent infinite loop: an agent that keeps calling a tool that never satisfies it, burning tokens until someone notices the bill. It rarely errors — it just spins. Every production agent needs a hard max-step cap and a repeated-action guard, no exceptions. Treat "what stops this loop?" as a required design question, answered before launch, not after the invoice.
:::
