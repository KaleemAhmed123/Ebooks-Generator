## Capstone: a multi-agent research system (design)

- Design a production multi-agent system that answers a complex research question with a cited report — pulling together this module's patterns, and justifying multi-agent honestly (16-38).

<svg viewBox="0 0 360 108" role="img" aria-label="Lead agent decomposes, parallel researchers work in isolated contexts, a critic checks, and a writer synthesizes" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <rect x="130" y="8" width="100" height="18" rx="4" fill="#a03050"/><text x="180" y="20" text-anchor="middle" fill="#fff">lead (supervisor)</text>
  <g fill="#6a9bd0"><rect x="20" y="40" width="66" height="16" rx="2"/><rect x="100" y="40" width="66" height="16" rx="2"/><rect x="180" y="40" width="66" height="16" rx="2"/></g>
  <text x="53" y="51" text-anchor="middle" fill="#fff" font-size="5">researcher</text><text x="133" y="51" text-anchor="middle" fill="#fff" font-size="5">researcher</text><text x="213" y="51" text-anchor="middle" fill="#fff" font-size="5">researcher</text>
  <rect x="264" y="40" width="80" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="304" y="51" text-anchor="middle" font-size="5">shared notes (blackboard)</text>
  <rect x="70" y="72" width="90" height="16" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="115" y="83" text-anchor="middle">critic (verify)</text>
  <rect x="200" y="72" width="90" height="16" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="245" y="83" text-anchor="middle">writer (synthesize)</text>
  <rect x="120" y="94" width="120" height="14" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="180" y="104" text-anchor="middle">cited report → human review</text>
  <g stroke="#888"><path d="M155 26 L53 38" marker-end="url(#cd)"/><path d="M175 26 L133 38" marker-end="url(#cd)"/><path d="M195 26 L213 38" marker-end="url(#cd)"/></g>
  <defs><marker id="cd" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

1. **Justify it first (16-38).** Research is natively parallel, context-heavy, and breadth-rewarding — it hits all four multi-agent benefits (16-36). A single agent would search serially, flood its context with raw sources, and cover less. Multi-agent is *warranted* here — and we will prove it against a single-agent baseline (16-35).
2. **Topology — supervisor + parallel workers (16-07, 16-15).** A **lead** agent decomposes the question into sub-questions and spawns a **researcher per sub-question**, running concurrently. Controllable, debuggable, and parallel.
3. **Roles, non-overlapping (16-10).** Lead (decompose + synthesize), researchers (search + read + distill one sub-topic), a **critic** (verify claims against sources — the verifier, 14-135, and dissent against groupthink, 16-32), a **writer** (compose the cited report).
4. **Communication — isolated contexts + a blackboard (16-06, 16-04).** Each researcher works in its *own* context (isolation, 14-87) and writes distilled findings to a shared notes store; the lead reads the notes, not the raw pages.
5. **Coordination guards (16-33).** Global step/agent budget, per-researcher timeouts, and an explicit termination condition ("all sub-questions answered and critic-approved").

:::note
Notice how the design *earns* each agent: the researchers earn parallelism and context isolation, the critic earns robustness (independent verification), the writer earns specialization. Remove any and the system is worse in a *specific, nameable* way — the test of a justified multi-agent design (16-02). This is the difference between a system that is multi-agent *because the task demands it* and one that is multi-agent for show. The next page builds and stress-tests it.
:::
