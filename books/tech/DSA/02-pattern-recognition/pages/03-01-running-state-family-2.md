### The techniques in this chapter

| Page | Summary carried | Answers |
|---|---|---|
| **03-02 Prefix Sums** | `prefix[i]` | Any range sum in O(1) |
| **03-03 Equal Prefixes** | map: encoded prefix → first index / count | "a subarray with property P" becomes "two equal prefixes" |
| **03-04 Two Passes** | best-from-left and best-from-right arrays | anything that depends on both sides of `i` |
| **03-05 Best Partner So Far** | one best earlier value | the best pair `i < j` in one pass |
| **03-06 Drop the Baggage** | best sum (and worst) ending here | best subarray; restart when the past only hurts |
| **03-07 Difference Array** | pending boundary changes | many range updates, read once at the end |

### The trap

- **Answering after folding in.** Read the summary *before* adding `a[i]` to it. Fold first and `a[i]` pairs with itself: a two-sum returns `[i, i]`, a stock buys and sells on the same day. Every template in this chapter reads, then writes
