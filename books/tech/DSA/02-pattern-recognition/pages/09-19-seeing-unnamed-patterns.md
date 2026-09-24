## Seeing Unnamed Patterns

- By now you have seen the four unnamed patterns: Frontier Maintenance, Dominated Candidate Elimination, Boundary Finding, and Precompute
- The goal of this chapter is not to replace the techniques (BFS, Monotonic Stack, Binary Search). The goal is to change **how you search your brain** when you are stuck

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
   - Follow-up: Is the operation invertible? (Sum/XOR = Prefix Array). Is it idempotent? (Min/Max = Sparse Table). Do I need updates? (Fenwick/Segment Tree)

### The synthesis

- The most difficult problems in competitive programming and interviews don't use one pattern. They combine them
- **Example:** "Find the shortest path in a graph where you can skip at most K edges."
  - This is Frontier Maintenance (Dijkstra) combined with State Precompute (the state is `(node, skipsUsed)`). 
- **Example:** "Answer range minimum queries, but the array is updated."
  - This is Precompute (you can't use Sparse Table because it doesn't support updates, so you must use a Segment Tree).
- When you see the abstract structures, you stop trying to memorize templates and start assembling solutions from fundamental building blocks

:::interview
"I understand the solutions when I read them, but I can't come up with them."

You are trying to retrieve full solutions from memory. Expert problem solvers retrieve abstract structures (like boundaries or frontiers) and derive the solution on the spot. Ask the 4 diagnostic questions to force your brain out of keyword-matching mode.
:::
