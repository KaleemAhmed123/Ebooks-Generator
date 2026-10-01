## Flagship 16: the eval harness — spec

- Eval is the thread through this whole booklet — every mock and flagship ended on "how do you know it works?" This capstone builds the **eval harness** itself: the system that runs a model against tasks, scores it, and aggregates the results. It is the most reused piece of infrastructure an AI team owns.
- **The anatomy:** a task spec → a runner → metrics → aggregation → a report.

<svg viewBox="0 0 360 70" role="img" aria-label="Eval harness: task specs feed a runner that calls the model, scored by metrics, aggregated into a leaderboard report" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <rect x="8" y="26" width="52" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="34" y="37" text-anchor="middle">task specs</text>
  <rect x="70" y="26" width="46" height="16" rx="2" fill="#24405e"/><text x="93" y="37" text-anchor="middle" fill="#fff">runner</text>
  <rect x="126" y="26" width="46" height="16" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="149" y="37" text-anchor="middle">metrics</text>
  <rect x="182" y="26" width="56" height="16" rx="2" fill="#eef3ee" stroke="#3b7a57"/><text x="210" y="37" text-anchor="middle">aggregate</text>
  <rect x="248" y="26" width="46" height="16" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="271" y="37" text-anchor="middle">report</text>
  <path d="M60 34 L68 34 M116 34 L124 34 M172 34 L180 34 M238 34 L246 34" stroke="#888" marker-end="url(#eh)"/>
  <defs><marker id="eh" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **The task spec is the contract.** A structured format — input, expected output (or a checker), the metric to use, metadata — so tasks are data, not code. This lets non-engineers add cases and lets the same harness run any eval.

:::mint
```python
# a task spec is data, not code — anyone can add one
{"id": "sql_001", "input": "top 5 customers by revenue",
 "checker": "execution_match", "gold": "SELECT ... LIMIT 5", "tags": ["sql","easy"]}
```
:::

- **Why build rather than only use public benchmarks:** public benchmarks measure generic capability; *your* harness measures *your* tasks, and it is what gates every model/prompt change in CI (17-46a). Public benchmarks tell you which model to start with; your harness tells you whether a change shipped a regression.

:::note
The eval harness is the single highest-ROI thing an AI team builds, because *every* other decision routes through it: which model, whether a prompt change helped, whether a fine-tune regressed, whether the quantised model is good enough, whether the RAG pipeline improved. A team without a real eval harness is flying on vibes and demos — which is exactly how silent quality regressions ship. Building it as reusable infrastructure (task-specs-as-data, pluggable metrics) is why this is the capstone the whole booklet was pointing at.
:::
