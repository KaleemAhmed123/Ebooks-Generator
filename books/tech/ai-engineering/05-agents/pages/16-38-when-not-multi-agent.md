## When NOT to use multi-agent

- The most valuable multi-agent skill in 2026 is restraint. Multi-agent systems are widely over-used — reached for because they seem sophisticated, when a single agent (or a workflow, 14-35) would be cheaper, faster, and more reliable. Here is the negative case, sharply.

- **Red flags you are over-using multi-agent:**
  - The task's steps are **sequential and dependent** — nothing to parallelize, so agents just pass a baton with overhead (16-02).
  - Your agents are **near-clones** — same model, same tools, barely different prompts. You are running one agent N times and paying N× (16-10).
  - A **single well-designed agent scores the same** on your evals (16-35) — the multi-agent complexity buys nothing.
  - Your reason is **"it feels more advanced"** — sophistication for its own sake is the classic trap (16-01).
- **The discipline:** start with **one agent plus good context engineering** (14-06). It solves more than people expect. Add agents *only* when you can name which of the four benefits (parallelism, specialization, robustness, isolation) you are buying, confirm it exceeds the coordination cost, and *prove it against a single-agent baseline*. "Could one agent do this?" should be answered honestly before building five.
- **The frequent right answer:** not multi-agent, and often not even an agent — a **workflow** (14-35). Much of what gets built as a multi-agent system is a fixed pipeline in disguise, better as prompt-chaining or routing.

:::interview
"When should you NOT build a multi-agent system?"

Most of the time, honestly. Don't when steps are sequential and dependent (nothing to parallelize), when your agents are near-clones (you're just running one agent N times at N× cost), when a single well-designed agent scores the same on your evals, or when the only reason is that multi-agent "feels advanced." Start with one agent plus good context engineering — it handles more than people expect — and add agents only when you can name the specific benefit (parallelism, specialization, robustness, or isolation), confirm it beats the coordination cost, and prove it against a single-agent baseline. Often the right answer isn't even an agent — it's a workflow. Restraint is the senior skill here.
:::
