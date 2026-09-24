## Proving correctness informally

- You do not need formal mathematical proofs in interviews. You need to explain *why* your algorithm cannot produce a wrong answer
- Three techniques cover nearly every case: invariant reasoning, exchange argument, and contradiction

### Technique 1: Invariant reasoning

- Covered in the previous page. Define a property that holds at every step. Show it holds at the start, is preserved by each step, and implies the correct answer at the end
- **Best for:** Loops, binary search, two pointers, sliding window — anything with an iterative structure

### Technique 2: Exchange argument

- Assume there exists a better solution than the one your algorithm produced. Show that swapping any element of the "better" solution for an element of your solution either makes it worse or keeps it the same
- If no swap can improve your answer, your answer is optimal

```
Claim: sorting jobs by deadline and processing greedily minimises lateness.

Suppose the optimal schedule has two adjacent jobs A and B where A's deadline 
is after B's deadline (i.e., they are out of order).

Swap A and B. B now finishes earlier (good — its deadline is sooner). 
A finishes later, but it was already going to be late. The maximum lateness 
does not increase.

Therefore, sorting by deadline is at least as good as any other order.
```

- **Best for:** Greedy algorithms. When someone challenges "how do you know greedy works here?", the exchange argument is your proof

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
