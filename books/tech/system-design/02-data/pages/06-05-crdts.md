## CRDTs at a high level

- A **CRDT** (conflict-free replicated data type) is a data type whose merge never conflicts: the 2018 survey's definition is that "when any two replicas have received the same set of updates, they reach the same state, deterministically", with no coordination needed to update
- The trick is choosing operations that commute: applying them in any order gives the same result, so replicas can apply them as they arrive

<svg viewBox="0 0 460 100" role="img" aria-label="A grow-only counter as one slot per replica. Replica 1 holds [3,0], replica 2 holds [0,2]. After merge both hold [3,2], value 5. Merge is element-wise max, so applying updates in either order gives the same state." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="120" height="26" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="80" y="37" text-anchor="middle" font-family="Consolas,monospace" font-size="8">r1: [3, 0]</text>
  <rect x="20" y="58" width="120" height="26" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="80" y="75" text-anchor="middle" font-family="Consolas,monospace" font-size="8">r2: [0, 2]</text>
  <path d="M140 33 L250 48" stroke="#1d4e89" fill="none"/><path d="M140 71 L250 56" stroke="#1d4e89" fill="none"/>
  <text x="195" y="34" text-anchor="middle" font-size="7">merge = max per slot</text>
  <rect x="250" y="38" width="190" height="28" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="345" y="56" text-anchor="middle" font-family="Consolas,monospace" font-size="8">both: [3, 2]  → value 5</text>
  <text x="345" y="88" text-anchor="middle" font-size="7">each replica only ever increments its own slot</text>
</svg>

- The useful family: counters (one slot per replica, merge by max, value is the sum); registers (LWW inside one type, or multi-value: keep all concurrent writes); sets (grow-only, or add/remove with tombstones so a remove can beat a concurrent add). Collaborative text editors are built on CRDTs for sequences

### The failure

- A bank balance is not a CRDT. A counter merges, but "never below zero" is an invariant across replicas, and no merge function can enforce a global invariant without coordination. Where an invariant matters, you are back to one leader or a consensus round (booklet 03)
- The metadata grows. Removed elements leave tombstones; per-replica slots outlive the replicas. A CRDT's size is a function of its history, not its value, unless something garbage-collects
