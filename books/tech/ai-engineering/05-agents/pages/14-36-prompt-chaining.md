## Pattern: prompt chaining

- **Prompt chaining** decomposes a task into a fixed sequence of LLM calls, each working on the previous one's output. It is the simplest workflow — a pipeline where every stage is a model call you wrote.

<svg viewBox="0 0 360 82" role="img" aria-label="Three chained LLM calls with an optional gate check between the first two" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="30" width="72" height="24" rx="3" fill="#24405e"/><text x="50" y="45" text-anchor="middle" fill="#fff" font-size="6.5">outline</text>
  <rect x="118" y="30" width="72" height="24" rx="3" fill="#24405e"/><text x="154" y="45" text-anchor="middle" fill="#fff" font-size="6.5">draft</text>
  <rect x="222" y="30" width="72" height="24" rx="3" fill="#24405e"/><text x="258" y="45" text-anchor="middle" fill="#fff" font-size="6.5">polish</text>
  <rect x="308" y="30" width="44" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="330" y="45" text-anchor="middle" font-size="6">done</text>
  <path d="M86 42 L116 42" stroke="#888" marker-end="url(#pc)"/><path d="M190 42 L220 42" stroke="#888" marker-end="url(#pc)"/><path d="M294 42 L306 42" stroke="#888" marker-end="url(#pc)"/>
  <text x="103" y="24" text-anchor="middle" font-size="5.5" fill="#a03050">gate: outline OK?</text>
  <defs><marker id="pc" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Example:** write a blog post → (1) generate an outline, (2) draft from the outline, (3) polish the draft. Each step is a focused prompt doing one thing well.
- **Why chain instead of one big prompt:** each call is simpler and more reliable than asking for everything at once. A focused "make an outline" prompt beats "write a great post" because you decomposed the cognitive load — the same reason you break a function into smaller functions.
- **Gates.** You can insert a programmatic check between steps ("does the outline have 5 sections? if not, retry") — a cheap way to catch errors early before they propagate down the chain.
- **When to use:** the task has a **clear, fixed sequence** of subtasks. Predictable, easy to test each stage, no model-driven control flow needed.

:::interview
**"Why break a task into chained prompts instead of one prompt?"** Reliability through decomposition. Each call handles one focused subtask, which the model does far better than a single "do everything" prompt — the same reason you split a big function. You can also gate between steps to catch errors before they cascade, and test each stage in isolation. Use chaining whenever the task has a known fixed sequence; it's the simplest, most predictable workflow and often all you need.
:::
