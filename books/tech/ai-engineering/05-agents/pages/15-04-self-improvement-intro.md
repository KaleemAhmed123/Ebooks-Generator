## Self-improvement: the idea

- The most striking frontier of autonomy: agents that **improve themselves** — getting better at a task, or at improving, without a human writing the improvement. It is the oldest dream and deepest fear of AI ("recursive self-improvement"), and as of 2026 it has concrete, bounded, working instances worth understanding precisely. **[VERIFY frontier claims]**

<svg viewBox="0 0 360 92" role="img" aria-label="A self-improvement loop: the system generates an improvement, evaluates it, and keeps it if better" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="30" y="34" width="76" height="24" rx="3" fill="#24405e"/><text x="68" y="49" text-anchor="middle" fill="#fff" font-size="6">propose change</text>
  <rect x="142" y="34" width="76" height="24" rx="3" fill="#a03050"/><text x="180" y="46" text-anchor="middle" fill="#fff" font-size="6">evaluate</text><text x="180" y="55" text-anchor="middle" fill="#fc8" font-size="5.5">better?</text>
  <rect x="254" y="34" width="76" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="292" y="46" text-anchor="middle" font-size="6">keep if better</text><text x="292" y="55" text-anchor="middle" font-size="5.5" fill="#6b6b6b">else discard</text>
  <path d="M106 46 L140 46" stroke="#888" marker-end="url(#si)"/><path d="M218 46 L252 46" stroke="#888" marker-end="url(#si)"/><path d="M292 58 Q292 82 68 78 L68 60" stroke="#888" fill="none" marker-end="url(#si)"/>
  <defs><marker id="si" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The common engine** across every real system (next pages): **propose → evaluate → keep-if-better**, looped. An LLM proposes a change (to a solution, a program, itself); an **evaluator** scores whether it is actually better; improvements that pass are kept and built on. It is the evolutionary loop (14-17) and Reflexion (14-12), aimed at self-improvement.
- **The load-bearing part is the evaluator.** Self-improvement only works when "is this better?" can be *reliably measured* — a test suite, a benchmark, a formal check. Without a trustworthy evaluator, the loop optimizes noise or games the metric (14-104), and drifts *worse* while believing it improves. This is why the working systems are in domains with clean verification (math, code, algorithms).
- **What varies** across systems: *what* is improved (a solution, a heuristic, the agent's own code/prompts) and *how bounded* the loop is (a fixed task vs open-ended self-modification). The next pages walk the real ones — STaR, AlphaEvolve, the Darwin-Gödel Machine, the AI Scientist — from most bounded to most open.

:::note
Strip away the science-fiction and self-improvement is disciplined search: generate candidates, evaluate them against a ground-truth signal, keep the winners. That framing both demystifies it (it is not magic — it is search with an LLM as the mutation operator) and locates its limits (it is bounded by the quality of the evaluator and the search budget). Hold this: **self-improvement is only as good as its ability to verify improvement.** Everything that follows is a variation on that theme.
:::
