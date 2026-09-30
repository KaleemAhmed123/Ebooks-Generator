## Reward modeling

- RL needs a reward number. For "was this a good answer to a human?" there is no formula. The fix: **train a model to predict the reward** — a **reward model (RM)**.
- You cannot ask humans to score answers 0–10 reliably; people disagree on absolute scores. But they are consistent at **comparisons**. So you collect **preference pairs**: same prompt, two answers, a human marks which is better.

<svg viewBox="0 0 318 64" role="img" aria-label="One prompt yields two answers; a human picks the winner; the reward model learns to score the winner higher" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="8" y="26" width="52" height="16" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="34" y="37" text-anchor="middle">prompt</text>
  <rect x="90" y="10" width="56" height="16" rx="3" fill="#1a3a2a"/><text x="118" y="21" text-anchor="middle" fill="#fff">answer A ✓</text>
  <rect x="90" y="40" width="56" height="16" rx="3" fill="#ddd"/><text x="118" y="51" text-anchor="middle">answer B</text>
  <path d="M60 32 L88 20" stroke="#1a1a1a" marker-end="url(#rm)"/><path d="M60 36 L88 46" stroke="#1a1a1a" marker-end="url(#rm)"/>
  <rect x="196" y="24" width="60" height="20" rx="3" fill="#24405e"/><text x="226" y="37" text-anchor="middle" fill="#fff">reward model</text>
  <text x="288" y="30" text-anchor="middle" fill="#c0392b" font-size="7">score A</text><text x="288" y="42" text-anchor="middle" fill="#6b6b6b" font-size="7">> score B</text>
  <path d="M146 24 L194 32" stroke="#1a1a1a" marker-end="url(#rm)"/><path d="M146 48 L194 38" stroke="#1a1a1a" marker-end="url(#rm)"/>
  <defs><marker id="rm" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::mint
```
loss = − log σ( r(prompt, chosen) − r(prompt, rejected) )
```
The **Bradley-Terry** model: train the RM so the chosen answer scores higher than the rejected one. σ is the sigmoid. That gap is all the signal you need.
:::

- The RM is usually the LLM itself with the final layer swapped for a single number output. Once trained, it scores *any* answer, giving RL the dense reward signal it was missing.

:::warn
The RM is a **proxy**, not the real goal. Optimise against it hard enough and the policy finds answers the RM loves but humans don't — **reward hacking** (e.g. long, confident, wrong answers the RM rated as thorough). This is why RLHF keeps a **KL leash** to the original model — the next page.
:::
