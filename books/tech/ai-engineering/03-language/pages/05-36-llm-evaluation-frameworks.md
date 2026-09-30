## Evaluating language models

- You cannot improve what you cannot measure, and language output resists a single number. Modern LLM evaluation stacks three layers, each answering a different question.

### The three layers

- **Static benchmarks** — fixed test sets with known answers. **MMLU-Pro** (multi-domain multiple-choice, harder and more reasoning-heavy than the original MMLU) and **GPQA-Diamond** (PhD-level science questions non-experts can't google) are standard as of September 2026; **SWE-bench** measures real code fixes. Cheap, comparable, automatable.
- **Human preference** — show people two answers, ask which is better. **Chatbot Arena** aggregates millions of these pairwise votes into a ranking. The gold standard for "which model do people actually prefer," but slow and costly.
- **LLM-as-a-judge** — use a strong LLM to score another model's output against a rubric (Zheng et al., 2023). Scales like a benchmark, judges open-ended quality like a human. Now the default for evaluating chat and RAG systems.

<svg viewBox="0 0 360 66" role="img" aria-label="Three evaluation layers: benchmarks, human preference, and LLM-as-judge, trading cost against realism" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="12" y="24" width="100" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="62" y="38" text-anchor="middle">benchmarks</text>
  <rect x="128" y="24" width="100" height="22" rx="3" fill="#6a9bd0"/><text x="178" y="38" text-anchor="middle" fill="#fff">LLM-as-judge</text>
  <rect x="244" y="24" width="104" height="22" rx="3" fill="#24405e"/><text x="296" y="38" text-anchor="middle" fill="#fff">human preference</text>
  <text x="62" y="58" text-anchor="middle" font-size="7" fill="#6b6b6b">cheap, narrow</text><text x="296" y="58" text-anchor="middle" font-size="7" fill="#6b6b6b">costly, realistic</text>
</svg>

:::warn
Two traps. **Benchmark contamination** — a benchmark's answers leak into training data, so a high score measures memorization, not skill; this is why benchmarks are constantly refreshed. **Judge bias** — LLM judges favor longer answers, their own model family, and the option shown first; they can be gamed. Never rely on one layer. Build a **task-specific eval set** from your own data and treat public scores as a rough prior, not proof.
:::
