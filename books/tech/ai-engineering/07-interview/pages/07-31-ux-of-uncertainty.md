## "How do you design the user experience for an AI feature that's sometimes wrong?"

- **What they're screening for:** product/UX thinking — a probabilistic model needs a UX built around uncertainty, which is as important as model quality.
- **A strong answer shows:**
  - **Design for the error, not just the success** — assume it will be wrong sometimes and make that cheap to catch and recover from.
  - **Keep the human in control** — AI suggests, the user confirms/edits/undoes, especially where mistakes cost something. Avoid silent autopilot on consequential actions.
  - **Make verification easy** — citations, sources, highlighting what the answer is based on, so users can check rather than blindly trust.
  - **Signal confidence** — hedge or defer when unsure; don't present every answer with the same false certainty. "I'm not sure, here's my best guess" is good UX.
  - **Set expectations up front** — tell users it's AI and can err, so a wrong answer doesn't destroy trust.
  - **Graceful failure** — a clear "I can't help with that" beats a confident wrong answer.
- The theme: **UX carries the uncertainty the model can't remove** — control, transparency, confidence signals, easy recovery.

:::warn
Weak: "Show the AI's answer as the final answer." Strong: suggest-and-confirm, citations to verify, confidence signalling, honest "I don't know", and easy undo — designing for the wrong answers that will happen.
:::

:::interview
What's really being tested: UX-of-uncertainty thinking — user control, verifiability, confidence signalling, and graceful failure — treating wrong answers as a design input, not an afterthought.
:::
