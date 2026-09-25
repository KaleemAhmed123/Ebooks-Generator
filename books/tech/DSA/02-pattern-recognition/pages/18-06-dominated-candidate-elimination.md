## Dominated Candidate Elimination 🟡

- **What it is:** Proving that a candidate can *never* become optimal, and permanently discarding it. The remaining candidates form a compressed set that is faster to search
- **Why nobody named it:** Monotonic stacks "maintain order." Convex hull trick "optimises DP transitions." Skyline problems "track buildings." Nobody noticed they all do the same thing: throw away candidates that are dominated by a better one

### The core idea

- A candidate X is **dominated** by candidate Y if Y is at least as good as X in *every* dimension that matters. If Y exists, X can never win — not now, not in the future
- When you can prove domination, you can safely discard X. The set of remaining candidates (the *anti-chain*) is often dramatically smaller

### The abstract mechanism

```
candidates = initial set

for each new candidate:
    while the worst existing candidate is dominated by the new one:
        discard the dominated candidate
    add the new candidate
```

- This looks exactly like the monotonic stack's push/pop loop. That's not a coincidence. The monotonic stack *is* dominated candidate elimination applied to "next greater element" problems

### Where it appears

| Algorithm | What's being eliminated | Why it's dominated |
|---|---|---|
| **Monotonic Stack** | Elements that found their "next greater" | A larger element to the right makes them irrelevant |
| **Convex Hull Trick** | Linear functions that can never be minimum | A new line makes older lines permanently suboptimal |
| **Pareto Pruning / Skyline** | Points dominated in both x and y dimensions | A point better in both dimensions makes them useless |
| **Deque optimisation (Li Chao)** | DP candidates outside the relevant range | Monotonicity ensures they cannot re-enter the window |

### The key invariant

- After elimination, the surviving candidates form a structure with a useful property:
  - In monotonic stack: a strictly decreasing (or increasing) sequence
  - In convex hull: a convex envelope
  - In skyline: a Pareto-optimal front
- This compressed structure allows O(1) or O(log n) lookups instead of O(n) scans

:::interview
"Why does the monotonic stack work in O(n)?"

Each element is pushed once and popped at most once. The popping isn't wasted work — it's proving that the popped element is permanently dominated by the incoming element. Once dominated, it can never be the answer for any future query. That's why we discard it.
:::
