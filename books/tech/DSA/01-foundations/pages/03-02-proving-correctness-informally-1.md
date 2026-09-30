## Proving correctness informally <span class="lv lv1"></span>

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
