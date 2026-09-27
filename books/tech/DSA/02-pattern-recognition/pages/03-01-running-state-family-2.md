### Two patterns, six pages

| Pattern | Page | Summary carried | Answers |
|---|---|---|---|
| **4 · Prefix and Suffix** | 03-02 Prefix sums | `prefix[i]` | any range sum in O(1) |
| | 03-03 Equal prefixes | map: encoded prefix → first index / count | "a subarray with property P" becomes "two equal prefixes" |
| | 03-04 Two passes | best-from-left and best-from-right arrays | anything that depends on both sides of `i` |
| | 03-07 Difference array | pending boundary changes | many range updates, read once at the end |
| **5 · Running Best** | 03-05 Best partner so far | one best earlier value | the best pair `i < j` in one pass |
| | 03-06 Drop the baggage | best sum (and worst) ending here | best subarray; restart when the past only hurts |

### The trap

- **Answering after folding in.** Read the summary *before* adding `a[i]` to it. Fold first and `a[i]` pairs with itself: a two-sum returns `[i, i]`, a stock buys and sells on the same day. Every template in this chapter reads, then writes
