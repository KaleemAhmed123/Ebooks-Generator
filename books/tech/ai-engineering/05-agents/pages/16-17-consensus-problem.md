## The consensus problem

- When multiple agents must agree on *one* answer or decision — which plan to execute, whether a task is done, what the correct result is — you have a **consensus problem**. It is a deep, classical distributed-systems topic, and LLM agents inherit it whenever they must converge rather than just divide work.

<svg viewBox="0 0 360 88" role="img" aria-label="Several agents with different answers must converge on one agreed decision" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <circle cx="40" cy="30" r="13" fill="#24405e"/><text x="40" y="33" text-anchor="middle" fill="#fff" font-size="5.5">"A"</text>
  <circle cx="40" cy="66" r="13" fill="#24405e"/><text x="40" y="69" text-anchor="middle" fill="#fff" font-size="5.5">"B"</text>
  <circle cx="90" cy="48" r="13" fill="#24405e"/><text x="90" y="51" text-anchor="middle" fill="#fff" font-size="5.5">"A"</text>
  <rect x="180" y="34" width="90" height="28" rx="4" fill="#a03050"/><text x="225" y="44" text-anchor="middle" fill="#fff" font-size="6">consensus</text><text x="225" y="54" text-anchor="middle" fill="#fc8" font-size="5.5">agree on "A"</text>
  <rect x="300" y="36" width="50" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="325" y="51" text-anchor="middle" font-size="6">decision</text>
  <g stroke="#888"><path d="M53 30 L178 44" marker-end="url(#co2)"/><path d="M53 66 L178 54" marker-end="url(#co2)"/><path d="M103 48 L178 48" marker-end="url(#co2)"/><path d="M270 48 L298 48" marker-end="url(#co2)"/></g>
  <defs><marker id="co2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Why agreement is hard:** agents may reach *different* answers (different reasoning, different context, different models), some may be *wrong*, some may be *unreliable* or even *adversarial* (a compromised or malfunctioning agent), and messages between them can be *lost or delayed*. Getting a correct, agreed decision despite all this is the consensus challenge — the same one that underpins databases and blockchains.
- **The spectrum of solutions**, by how hostile the environment is:
  - **Trusting** — a supervisor just decides, or agents vote and take the majority (16-18). Fine when agents are cooperative and merely *diverse*.
  - **Fault-tolerant** — assume some agents are *faulty or malicious* and design to reach correct consensus anyway (Byzantine fault tolerance, 16-19). Needed when agents can fail arbitrarily.
- **When LLM agents need it:** any time several agents produce candidate answers and you must pick one trustworthy result — an ensemble deciding a diagnosis, redundant agents cross-checking a critical computation, a swarm agreeing on a plan. If you only *divide* work (map-reduce, 16-15), you avoid consensus; if agents must *agree*, you cannot.

:::note
Consensus is the price of *redundancy for reliability*. Running several agents on the same critical question (rather than dividing different questions) buys robustness — but only if you can correctly aggregate their possibly-conflicting, possibly-wrong answers into one trustworthy decision. The aggregation mechanism (voting, weighting, fault-tolerant consensus) *is* where that robustness lives; a naive "take the first answer" throws the redundancy away. The next pages give the mechanisms, from simple voting to Byzantine fault tolerance.
:::
