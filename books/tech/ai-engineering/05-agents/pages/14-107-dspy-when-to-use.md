## DSPy: failure modes and when to use

- DSPy's power — automated optimization — comes with its own costs and failure modes.

<svg viewBox="0 0 360 84" role="img" aria-label="DSPy fits optimizable high-volume pipelines; it's overkill for one-off prompts" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="165" height="58" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="92" y="30" text-anchor="middle" font-size="6.5" fill="#1a3a2a">reach for DSPy</text><text x="92" y="44" text-anchor="middle" font-size="6">high-volume, repeated task</text><text x="92" y="55" text-anchor="middle" font-size="6">have examples + a metric</text><text x="92" y="66" text-anchor="middle" font-size="6">need model portability</text>
  <rect x="185" y="16" width="165" height="58" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="267" y="30" text-anchor="middle" font-size="6.5" fill="#a03050">skip DSPy when</text><text x="267" y="44" text-anchor="middle" font-size="6">one-off / low-volume</text><text x="267" y="55" text-anchor="middle" font-size="6">no examples or metric</text><text x="267" y="66" text-anchor="middle" font-size="6">need orchestration/state</text>
</svg>

- **Failure modes:**
  - **No good metric → no benefit.** DSPy's value is optimization against a metric; without a faithful metric and examples, it is just a verbose prompting wrapper (14-104).
  - **Optimization cost.** Compiling runs the program many times over examples — real compute and time. For a rarely-run task, that cost never pays back.
  - **Learning curve and abstraction.** Signatures, modules, optimizers are a new mental model; the generated prompts are less directly inspectable/editable than a hand-written string, which some teams dislike.
  - **Not orchestration.** It does not give you graphs, persistence, or multi-agent coordination — pair it with a framework for those.
- **Choose DSPy when:** the task is **high-volume and repeated**, you have (or can build) **examples and a metric**, and you value **portability** across models (re-compile instead of re-tune). Extraction, classification, RAG answering at scale.
- **Skip it when:** one-off or low-volume work, no examples/metric, or when your real need is orchestration and state (use a framework, optionally with DSPy inside).

:::interview
**"When is DSPy the right tool, and when is it overkill?"** Right when you have a high-volume, repeated LLM task, examples, and a faithful metric — DSPy compiles and optimizes the prompts against that metric and re-optimizes when you swap models, turning prompt engineering into reproducible training. Overkill for one-off or low-volume prompts (the optimization compute never pays back) or when you have no metric to optimize against. And it's not an orchestration layer — for loops, state, and multi-agent flow you still need a framework, ideally with DSPy-optimized modules inside it.
:::
