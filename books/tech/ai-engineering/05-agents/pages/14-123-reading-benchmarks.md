## Reading benchmarks critically

- Benchmarks guide the field and mislead the careless. Knowing how to read them — and their traps — is what separates informed judgment from leaderboard-chasing.

<svg viewBox="0 0 360 80" role="img" aria-label="Benchmark pitfalls: contamination, overfitting, scaffold differences, and gap to your task" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="64" y="31" text-anchor="middle">contamination</text>
  <rect x="126" y="16" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="180" y="31" text-anchor="middle">overfitting to it</text>
  <rect x="242" y="16" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="296" y="31" text-anchor="middle">scaffold matters</text>
  <rect x="68" y="48" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="122" y="63" text-anchor="middle">≠ your task</text>
  <rect x="184" y="48" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="238" y="63" text-anchor="middle">single number hides</text>
</svg>

- **Contamination.** If a benchmark's tasks leaked into a model's training data, its score is inflated — it memorized, not reasoned. Prefer benchmarks with held-out or freshly-collected tasks, and be skeptical of near-perfect scores on old benchmarks.
- **Overfitting to the benchmark.** When a benchmark becomes the target, labs optimize *for it*, and the score stops reflecting general ability (Goodhart's law). A model tuned to ace SWE-bench may not generalize to your codebase.
- **Scaffold matters.** An agent's score depends heavily on its **scaffold** — the prompts, tools, and loop around the model — not just the model. The same model scores very differently with a good vs bad harness, so "model X gets Y%" is really "model X *with this scaffold* gets Y%."
- **The benchmark is not your task.** A high SWE-bench score does not guarantee good performance on *your* domain. Benchmarks measure general progress; your own eval set (14-116) measures what you actually ship.

:::interview
**"How much should you trust agent benchmark scores?"** As a directional signal, not a guarantee. Watch for contamination (leaked test data inflating scores), overfitting (labs optimizing for the benchmark until it stops measuring general ability), and scaffold effects (the same model scores very differently with a better harness — the number is really model-plus-scaffold). And a benchmark is never your task: a top SWE-bench score doesn't promise results on your codebase. Use benchmarks to track the field and shortlist models, then decide with *your own* eval set on *your* workload. The senior move is respecting benchmarks without worshipping them.
:::
