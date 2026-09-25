### The failure

- **Starting `lo` at 1 for shipping.** A capacity below the heaviest package can never fit it; the greedy check still puts the oversized package on a day of its own, so `[5, 1]` looks shippable in 3 days at capacity 3. Start at `max(weights)`, end at the total
- **A checker that is not monotonic.** If `feasible(x)` can be true, then false, then true again, the search returns an arbitrary boundary. Prove "x works ⇒ x + 1 works" before writing the loop

:::interview
"How do you spot binary search on the answer?" — The question asks for a minimum of a maximum (or the reverse), the answer lies in a known numeric range, and checking one candidate is easy even though computing the optimum directly is not. Then O(n log R): one linear check per halving of the range.
:::
