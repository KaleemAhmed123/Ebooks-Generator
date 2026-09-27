# Chapter 3 - Prefix & Running State

## Prefix Sum <span class="lv lv1"></span>

- **What it is:** one pass that stores a summary of the prefix (a total, a map of totals, the best from each side), so a range or pair question is answered in O(1)
- **Signal:** "subarray sum", "range queries", "divisible by k", "equal number of…", "product of all the others", "add x from L to R"
- **Mechanism:** a range is the difference of two prefixes. If the property survives subtraction (a sum, a remainder, a parity), two stored prefixes answer it; nothing re-reads the past

### The moves

| Move | When to use | What it exploits |
|---|---|---|
| **03-02** | range sums, static data | `P[R + 1] − P[L]` |
| **03-03** | sum = K with negatives, mod k | equal codes bracket a run |
| **03-04** | the answer needs both sides | each side grows by one |
| **03-07** | many range adds, one read | a change runs until cancelled |

Running Best keeps one best value instead → 03-05, 03-06.

### The skeleton

```ts
const seen = new Map([[0, 1]]);        // the empty prefix
let p = 0, count = 0;
for (const x of a) {
  p += x;                              // extend the prefix
  count += seen.get(p - k) ?? 0;       // read …
  seen.set(p, (seen.get(p) ?? 0) + 1); // … then write
}
```

### The trap

- **Answering after folding in.** Read *before* adding `a[i]`, or `a[i]` pairs with itself: a two-sum returns `[i, i]`
- **No empty prefix.** Without `{0: 1}` (or `{0: −1}` for a first index), subarrays that start at 0 are missed
