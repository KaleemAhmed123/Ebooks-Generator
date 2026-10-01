## Flagship 5: autonomous research agent — spec

- **Goal:** build an agent that runs a *research loop* end to end — generate a hypothesis, gather evidence, run an experiment, evaluate the result, write it up, and critique its own work — iterating until a stopping condition. It is the long-horizon autonomy of Booklet 5 applied to knowledge work.

<svg viewBox="0 0 360 96" role="img" aria-label="Research loop: hypothesis, retrieve literature, run experiment, evaluate, write up, critic, loop back" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="40" width="52" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="36" y="51" text-anchor="middle">hypothesis</text>
  <rect x="74" y="40" width="52" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="100" y="51" text-anchor="middle">retrieve</text>
  <rect x="138" y="40" width="52" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="164" y="51" text-anchor="middle">experiment</text>
  <rect x="202" y="40" width="52" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="228" y="51" text-anchor="middle">evaluate</text>
  <rect x="266" y="40" width="44" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="288" y="51" text-anchor="middle">write</text>
  <rect x="322" y="40" width="30" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="337" y="51" text-anchor="middle">critic</text>
  <path d="M62 49 L72 49" stroke="#888" marker-end="url(#ra)"/><path d="M126 49 L136 49" stroke="#888" marker-end="url(#ra)"/><path d="M190 49 L200 49" stroke="#888" marker-end="url(#ra)"/><path d="M254 49 L264 49" stroke="#888" marker-end="url(#ra)"/><path d="M310 49 L320 49" stroke="#888" marker-end="url(#ra)"/>
  <path d="M337 40 Q337 20 180 20 Q36 20 36 38" fill="none" stroke="#a03050" stroke-dasharray="3 2" marker-end="url(#ra)"/><text x="180" y="16" text-anchor="middle" font-size="5.5" fill="#a03050">critic feeds the next hypothesis</text>
  <defs><marker id="ra" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **Each stage is a specialised sub-agent or tool** (Booklet 5's orchestration): a *hypothesis generator*, a *literature retriever* (RAG over papers, Flagship 3), an *experiment runner* (executes code in a sandbox, Flagship 4), an *evaluator* (scores the result), a *writer*, and a *critic* that decides whether to iterate.
- **This is the "AI Scientist" pattern** from Booklet 5's self-improvement frontier — bounded and made concrete. The value and the danger are the same: real autonomy over a multi-step knowledge task.

:::note
The research agent is the clearest case of *why the critic loop matters* (next pages): each stage compounds errors — a bad hypothesis wastes the whole loop, a misread result produces a confident-but-wrong write-up. Without a critic that can reject and redirect, a long autonomous chain drifts far from anything useful. This flagship is really a study in *bounding* long-horizon autonomy with verification, the theme that runs from Booklet 5 through Module 18's AI control.
:::
