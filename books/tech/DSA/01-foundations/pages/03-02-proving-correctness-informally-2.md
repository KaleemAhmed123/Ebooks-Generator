### Technique 3: Contradiction

- Assume your algorithm's output is wrong. Follow the logical consequences. Show they lead to a contradiction with one of the problem's constraints or with the algorithm's behaviour
- **Best for:** Quick proofs that a specific property holds. "If the two-pointer algorithm missed a valid pair, that pair would have been seen when the pointers crossed — but the algorithm checks every crossing point. Contradiction."

### The trap

- **Proof by example is not proof.** "It works on `[1, 2, 3]` and `[5, 3, 1]` and `[1]`" — you have tested three inputs out of infinity. A wrong algorithm can pass millions of tests and fail on one adversarial input
- Testing builds confidence. Invariants and exchange arguments build certainty

### When to use which

| Technique | Use when | Classic example |
|---|---|---|
| Invariant | Loop-based algorithm, need to show every step is safe | Binary search boundary correctness |
| Exchange | Greedy algorithm, need to show no reordering improves | Interval scheduling, job sequencing |
| Contradiction | Need to show a property must hold, quickly | Two-pointer completeness, cycle detection |

:::interview
"How do you know your greedy solution is optimal?"

I use the exchange argument. Assume there is a better schedule. I show that swapping any pair of out-of-order jobs does not improve the result. Since no swap helps, the greedy order is at least as good as any other.
:::
