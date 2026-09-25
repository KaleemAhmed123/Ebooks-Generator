### Variations

- **Pow(x, n) (LeetCode 50):** hypothesis `pow(x, n)` returns xⁿ. Induction: `h = pow(x, ⌊n/2⌋)`; return `h · h`, times `x` if n is odd. Handle negative n with `1 / pow(x, −n)`. O(log n) calls
- **Insert at the bottom of a stack (GFG):** hypothesis `insertBottom(st, x)` puts x under everything. Pop the top, trust the call for the smaller stack, push the top back
- **Reverse a stack using recursion (GFG):** hypothesis `reverse(st)` reverses it. Pop the top, trust `reverse` on the rest, then `insertBottom` the popped value
- **Sort a stack (GFG):** pop the top, trust `sort` on the rest, then insert the top into its sorted position with the same pop-trust-push shape
- **Binary search, merge sort:** the same three statements with a halving instead of `n − 1`

### The failure

- **Tracing instead of trusting.** Following every call of Hanoi for n = 4 means 15 moves across 31 calls; nobody debugs that in an interview. Check the base case and one induction step on paper; that is the whole proof
- **A base case the recursion can skip.** `pow(x, n)` with base `n === 1` never terminates for n = 0, and with base `n === 0` alone but a step of `n − 2` it overshoots odd n into negatives. Make sure every chain of calls reaches the base

:::interview
"How do you design a recursive solution you can't picture?" — I write the hypothesis in one sentence, pick the smallest input as the base case, and then only ask: if the smaller call does exactly what the hypothesis says, can I finish the job in O(1) or O(n) extra work? That is an induction proof, and it replaces tracing the call tree.
:::
