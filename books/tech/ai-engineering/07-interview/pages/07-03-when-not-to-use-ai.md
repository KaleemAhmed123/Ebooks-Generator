## "How do you decide whether to use AI for a problem at all?"

- **What they're screening for:** judgment — strong AI engineers reach for the *simplest* thing that works and don't force AI where it doesn't belong.
- **A strong answer shows:**
  - **Start from the problem, not the tech** — what outcome, what constraints, what does "good" mean?
  - **Prefer simpler solutions first** — rules, deterministic code, or classic ML often beat an LLM on cost, latency, and reliability for well-defined tasks.
  - **AI fits when** the task needs language/perception understanding, tolerates some error, has no clean rule-based solution, and the value justifies the cost and non-determinism.
  - **AI is wrong when** you need guaranteed correctness/determinism, the task is a simple rule, latency/cost is critical and a cheaper method works, or you can't evaluate quality.
- Mention that even "use AI" splits into prompting vs RAG vs fine-tune vs agent — pick the least complex rung.

:::warn
Weak: "AI can do anything, so I'd use an LLM." Strong: "A regex/lookup solves 80% here; I'd reserve the LLM for the fuzzy 20%, because determinism and cost matter for this path."
:::

:::interview
What's really being tested: that you don't over-apply AI — you justify it against simpler alternatives on cost, reliability, and whether the problem actually needs it.
:::
