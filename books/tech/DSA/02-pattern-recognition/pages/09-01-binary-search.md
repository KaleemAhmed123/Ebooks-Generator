# Chapter 9 - Search Space

## Binary Search <span class="lv lv1"></span>

- **What it is:** the answer lies in a range too large to try point by point, but one probe rules out half of it. The range is the indices of a partly sorted array, or the possible values of the answer itself
- **Signal:** "O(log n)" on data that is not fully sorted; the smallest or largest value that passes a test ("minimum capacity", "maximum distance", "k-th smallest") when testing one candidate is easy
- **Mechanism:** a test that flips exactly once over the range, `F…FT…T` or `T…TF…F`, turns every probe into "the flip is left of here" or "right of here". log(range) probes find it

### The moves

| Move | What is searched | The test at `mid` |
|---|---|---|
| **09-02** | the answer, a number in a known range | "can it be done with `mid`?" |
| **09-04** | the k-th value of a set too big to list | `count(≤ mid) ≥ k` |
| **09-03** | an index in a rotated or mountain array | which side is sorted, or uphill |
| **09-05** | the k-th element of an unsorted array | partition; recurse the side with k |

### The skeleton

```ts
while (lo < hi) {                       // minimise: the first x that works
  const mid = lo + ((hi - lo) >> 1);
  if (works(mid)) hi = mid; else lo = mid + 1;
}
while (lo < hi) {                       // maximise: the last x that works
  const mid = lo + ((hi - lo + 1) >> 1); // round up, or lo = mid never moves
  if (works(mid)) lo = mid; else hi = mid - 1;
}
```

### The trap

- **A test that is not monotone.** If `works(x)` can go true, false, true, halving returns an arbitrary boundary. Prove "x works ⇒ x + 1 works" (or the mirror) first
