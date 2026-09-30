## Evolutionary and population methods

- A final family borrows from **evolution**: instead of refining one solution, keep a **population** of candidate solutions, and iteratively **mutate, combine, and select** the best — the LLM acting as the mutation operator.

<svg viewBox="0 0 360 98" role="img" aria-label="A population of solutions is evaluated, the best selected, then varied to form the next generation" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <g fill="#e8f4fd" stroke="#24405e"><rect x="14" y="30" width="20" height="14" rx="2"/><rect x="14" y="48" width="20" height="14" rx="2"/><rect x="14" y="66" width="20" height="14" rx="2"/></g><text x="24" y="24" text-anchor="middle" font-size="5.5">pop.</text>
  <rect x="60" y="40" width="54" height="24" rx="3" fill="#f4f4f4" stroke="#888"/><text x="87" y="55" text-anchor="middle" font-size="6">evaluate</text>
  <rect x="140" y="40" width="54" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="167" y="55" text-anchor="middle" font-size="6">select best</text>
  <rect x="220" y="40" width="70" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="255" y="52" text-anchor="middle" font-size="6">mutate/mix</text><text x="255" y="61" text-anchor="middle" font-size="5" fill="#6b6b6b">(LLM)</text>
  <rect x="312" y="40" width="40" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="332" y="55" text-anchor="middle" font-size="6">next gen</text>
  <path d="M34 55 L58 55" stroke="#888" marker-end="url(#ev2)"/><path d="M114 52 L138 52" stroke="#888" marker-end="url(#ev2)"/><path d="M194 52 L218 52" stroke="#888" marker-end="url(#ev2)"/><path d="M290 52 L310 52" stroke="#888" marker-end="url(#ev2)"/><path d="M332 64 Q332 88 24 84 L24 82" stroke="#888" fill="none" marker-end="url(#ev2)"/>
  <defs><marker id="ev2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The loop:** start with several candidate solutions → evaluate each (a fitness score: test pass rate, benchmark result) → keep the best → use the LLM to **mutate** them (small changes) and **recombine** them (blend two good ideas) into a new generation → repeat. Over generations, quality climbs.
- **Where it wins:** open-ended search for a *best* artifact where you can score candidates — evolving prompts, code, or heuristics. It escapes local optima that single-path refinement (self-refine) gets stuck in, because a diverse population explores widely.
- This is the engine behind the frontier **self-improvement** systems of Module 15 (AlphaEvolve, the Darwin-Gödel Machine): an LLM proposing variations, an evaluator scoring them, selection keeping the winners — evolution with a language model as the source of mutations.

:::note
The through-line of this whole cluster: **reasoning patterns trade compute for quality by structuring the search.** Left (ReAct) explores one path cheaply; right (LATS, evolutionary) explores many paths expensively. Self-improvement (Reflexion, self-refine) adds learning across attempts; population methods add diversity. Pick the least structure that clears the task's difficulty bar — and know the whole ladder for when the bar is high.
:::
