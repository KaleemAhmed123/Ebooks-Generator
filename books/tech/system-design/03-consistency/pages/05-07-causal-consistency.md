## Causal consistency

- **Causally consistent**: if operation A could have influenced operation B, every client sees A before B. Operations with no such link are **concurrent**, and different clients may see them in different orders
- "Could have influenced" means: same client, or B read something A wrote. That is the happens-before relation Module 9 turns into Lamport clocks

<svg viewBox="0 0 460 130" role="img" aria-label="A chat. Alice posts a question. Bob reads it and posts an answer, so the answer causally depends on the question. Carol's replica delivers the answer first and the question second: forbidden under causal consistency. A concurrent unrelated post from Dave may appear anywhere." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="10" y="14" width="130" height="22" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="75" y="28" text-anchor="middle">Alice: "deploy done?"</text>
  <path d="M140 25 H196" stroke="#1d4e89" fill="none"/><path d="M196 25 l-5 -2.5 v5 z" fill="#1d4e89"/>
  <text x="168" y="20" text-anchor="middle" font-size="7">Bob reads it</text>
  <rect x="200" y="14" width="120" height="22" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="260" y="28" text-anchor="middle">Bob: "yes, 14:02"</text>
  <rect x="10" y="50" width="130" height="22" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="3 2"/>
  <text x="75" y="64" text-anchor="middle">Dave: "lunch?"</text>
  <text x="150" y="64" font-size="7">concurrent: no one read it before writing; may land anywhere</text>
  <text x="10" y="98" font-weight="bold">Carol's replica, allowed</text>
  <text x="10" y="112" font-size="7.5">deploy done? → yes, 14:02 → lunch?   or   lunch? → deploy done? → yes, 14:02</text>
  <text x="290" y="98" font-weight="bold" fill="#b8541a">forbidden</text>
  <text x="290" y="112" font-size="7.5" fill="#b8541a">yes, 14:02 → deploy done?</text>
</svg>

- Cheaper than sequential: no total order to agree on, so writes on both sides of a partition can proceed and merge. Causal is **sticky available**: a client keeps working through a partition as long as it stays on the same replica
- Implementation cost is metadata: each write carries what it depended on (a version vector, booklet 02) and a replica holds it back until those dependencies have arrived

### The failure

- A comment that shows before the post it replies to. The replica received the reply first, applied it, and served it. The store was eventually consistent; the reader needed causal. Most "eventually consistent" complaints from users are missing causality, not missing freshness
