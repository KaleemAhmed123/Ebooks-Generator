## Dominated Candidate Elimination <span class="lv lv2"></span>

- **What it is:** Proving that a candidate can *never* become optimal, and permanently discarding it. The remaining candidates form a compressed set that is faster to search
- **Why nobody named it:** Monotonic stacks "maintain order." Convex hull trick "optimises DP transitions." Skyline problems "track buildings." Nobody noticed they all do the same thing: throw away candidates that are dominated by a better one

### The core idea

- A candidate X is **dominated** by candidate Y if Y is at least as good as X in *every* dimension that matters. If Y exists, X can never win — not now, not in the future
- When you can prove domination, you can safely discard X. The set of remaining candidates (the *anti-chain*) is often far smaller

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
| **Monotonic deque optimisation** | DP candidates outside the relevant range | Monotonicity ensures they cannot re-enter the window |
