## Seeing Unnamed Patterns <span class="lv lv2"></span>

- By now you have seen the four unnamed patterns: Frontier Maintenance, Dominated Candidate Elimination, Boundary Finding, and Precompute
- These patterns do not replace the techniques (BFS, Monotonic Stack, Binary Search). They change **how you search your brain** when you are stuck

### The standard approach vs The pattern approach

When you read a novel problem, the standard approach is to mentally scroll through a list of techniques:
- "Is this Sliding Window?"
- "Is it Dynamic Programming?"
- "Is it a Segment Tree?"

This fails because it relies on surface-level keyword matching. The pattern approach asks structural questions instead:

### The 4 diagnostic questions

1. **"Am I expanding from a known set into an unknown set?"**
   - If yes: **Frontier Maintenance**
   - Follow-up: What is the selection rule? (FIFO = BFS, Min-Cost = Dijkstra, Heuristic = A*, Earliest End Time = Greedy)

2. **"Am I forced to track a bunch of candidates, but some are strictly worse than others?"**
   - If yes: **Dominated Candidate Elimination**
   - Follow-up: What proves a candidate is useless? (A larger number = Monotonic Stack, A steeper line = Convex Hull, Worse in both dimensions = Pareto Pruning)

3. **"Is this an optimization problem asking for a min/max value?"**
   - If yes: **Boundary Finding**
   - Follow-up: Can I write a monotonic `isPossible(x)` function? Does the sequence look like `[F,F,T,T,T]` or `[T,T,T,F,F]`?

4. **"Am I answering the same type of query repeatedly on static data?"**
   - If yes: **Precompute**
   - Follow-up: Is the operation invertible? (Sum/XOR = Prefix Array). Is it idempotent? (Min/Max = Sparse Table). Do I need updates? The decision table is 19-01
