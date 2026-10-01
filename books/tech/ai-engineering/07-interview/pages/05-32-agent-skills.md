## What are agent "skills," and what is progressive disclosure?

- A **skill** packages a reusable capability for an agent — instructions, and optionally scripts/resources — that the agent can load **when relevant**, rather than carrying everything in its prompt at all times.
- **Progressive disclosure** is the key idea: don't dump every instruction into the context up front. Expose a short **index** of available skills; the agent loads a skill's full details **only when it decides to use it**. This keeps the working context small and relevant.
- Analogy: a reference library, not a textbook you read cover-to-cover each turn. Level 1: skill exists (name + one line). Level 2: load its instructions on demand. Level 3: load its scripts/assets if needed.
- Benefits: scales to many capabilities without blowing context, keeps attention focused, and makes capabilities portable/shareable across agents.
- It's the same scarce-context principle as memory and tool retrieval: **surface little, load on demand.**

:::interview
What's really being tested: that skills + progressive disclosure keep context lean by loading capability detail only when needed — the same surface-little-load-on-demand principle as tool retrieval and memory.
:::
