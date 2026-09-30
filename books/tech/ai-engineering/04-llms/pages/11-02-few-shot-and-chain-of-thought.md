## Few-shot and chain-of-thought

- Two prompting moves punch far above their weight. Both change *nothing* in the model — they only change the input.
- **Few-shot** — put a handful of worked examples in the prompt. The model infers the pattern and continues it (in-context learning, page 10-06). Zero-shot = no examples; few-shot = 2–5.

:::mint
```
Review: "loved it"      → positive
Review: "waste of money" → negative
Review: "not bad at all" → ?        ← model completes: positive
```
:::

- **Chain-of-thought (CoT)** — ask the model to reason step by step *before* answering. On math and logic, writing the intermediate steps dramatically raises accuracy, because each step conditions the next (autoregression, page 08-03).

<svg viewBox="0 0 316 52" role="img" aria-label="Direct answering guesses and often errs; chain-of-thought works through steps to a correct answer" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="10" y="14" width="120" height="26" rx="3" fill="#fbeaea" stroke="#c0392b"/><text x="70" y="25" text-anchor="middle" fill="#c0392b" font-size="7">"the answer is 27"</text><text x="70" y="35" text-anchor="middle" font-size="6.5" fill="#6b6b6b">direct → often wrong</text>
  <rect x="176" y="14" width="130" height="26" rx="3" fill="#eafaf0" stroke="#1a3a2a"/><text x="241" y="25" text-anchor="middle" fill="#1a3a2a" font-size="7">"first… then… so 24"</text><text x="241" y="35" text-anchor="middle" font-size="6.5" fill="#6b6b6b">CoT → shows work, right</text>
</svg>

- Modern **reasoning models** (page 09-13) do CoT natively — they were trained with RL to think in long chains, so you often need not ask. For ordinary models, "think step by step" still helps.

:::warn
CoT costs tokens (you pay for the reasoning) and latency (the user waits for it). It also does not guarantee *faithful* reasoning — the written steps can be a plausible story that does not match how the answer was actually reached. Use CoT where correctness beats speed; skip it for simple lookups where it just burns money.
:::
