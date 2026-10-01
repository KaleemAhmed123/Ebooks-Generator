## DSPy: the optimizers

- The payoff is the **optimizer** (historically "teleprompter"): given your program, a **metric**, and some training examples, it automatically searches for the prompts — wording and few-shot examples — that maximize the metric. This is the "compile" step that makes DSPy more than a wrapper. **[VERIFY current API]**

<svg viewBox="0 0 360 92" role="img" aria-label="The optimizer takes the program, examples, and a metric, and searches prompts to maximize the metric" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="16" width="80" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="50" y="28" text-anchor="middle" font-size="6">program</text>
  <rect x="10" y="40" width="80" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="50" y="52" text-anchor="middle" font-size="6">examples</text>
  <rect x="10" y="64" width="80" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="50" y="76" text-anchor="middle" font-size="6">metric</text>
  <rect x="130" y="34" width="100" height="30" rx="4" fill="#a03050"/><text x="180" y="48" text-anchor="middle" fill="#fff" font-size="6.5">optimizer</text><text x="180" y="58" text-anchor="middle" fill="#fc8" font-size="5.5">search prompts</text>
  <rect x="266" y="36" width="84" height="26" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="308" y="48" text-anchor="middle" font-size="6">compiled program</text><text x="308" y="57" text-anchor="middle" font-size="5.5" fill="#6b6b6b">best prompts baked in</text>
  <path d="M90 25 L128 40" stroke="#888" marker-end="url(#do)"/><path d="M90 49 L128 49" stroke="#888" marker-end="url(#do)"/><path d="M90 73 L128 58" stroke="#888" marker-end="url(#do)"/><path d="M230 49 L264 49" stroke="#888" marker-end="url(#do)"/>
  <defs><marker id="do" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Three inputs, one compiled output:** your **program** (signatures + modules), a set of **examples** (inputs, ideally with expected outputs), and a **metric** (a function scoring an output — accuracy, a rubric, an LLM-judge). The optimizer runs the program on examples, scores them, and iteratively improves the prompts to raise the score.
- **What it optimizes:** which **few-shot examples** to include (it can bootstrap good demonstrations from your data), the **instructions** wording, and for some optimizers, more. The result is a program with tuned prompts baked in — often beating hand-written prompts, and reproducibly.
- **Optimizer families** (names evolve): bootstrapping few-shot demonstrations, instruction-search methods, and heavier joint optimizers — you pick based on data size and budget. **[VERIFY names]**

:::interview
"What does DSPy actually optimize, and how?"

Given your program (signatures + modules), a set of examples, and a metric, the optimizer searches the *prompts* — primarily which few-shot demonstrations to include and how instructions are worded — to maximize the metric on your data. It runs the program, scores outputs, and iterates, baking the best prompts into a compiled program. The point is that prompt engineering becomes an automated, metric-driven optimization instead of manual trial-and-error, and it re-runs when you change models — reproducible, portable prompt tuning.
:::
