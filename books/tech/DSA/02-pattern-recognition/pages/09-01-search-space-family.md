# Chapter 9 - Search Space

## The Search Space Family <span class="lv lv1"></span>

- **What it is:** The answer lies in a range too large to try point by point, but one probe rules out half of it. The range is either the indices of an array that is only partly sorted, or the possible values of the answer itself
- **Signal:** "O(log n)" on data that is not fully sorted; the smallest or largest value that passes a test ("minimum capacity", "maximum distance", "k-th smallest") where testing one candidate is easy and computing the optimum directly is not
- **Why it works:** A test that flips exactly once over the range, `F…FT…T` or `T…TF…F`, turns every probe into "the flip is left of here" or "right of here". log(range) probes find the flip, whatever each probe costs

| Pattern | Page | What is searched | The test at `mid` | Cost |
|---|---|---|---|---|
| **21 · Binary Search on the Answer** | **09-02** | a number in a known range | "can it be done with `mid`?" flips once (`F…FT…T` or `T…TF…F`) | log(range) checks, each O(n) |
| | **09-04 Guess a Value, Count Below It** | the k-th value of a set too big to list | `count(≤ mid) ≥ k` | log(range) counts, each O(n) or O(n log m) |
| **22 · Find the Sorted Half** | **09-03** | an index in a rotated or mountain array | which side of `mid` is sorted, or uphill | O(log n) |

Canonical problems: Capacity To Ship Packages Within D Days (LeetCode 1011) for 09-02, Kth Smallest Element in a Sorted Matrix (LeetCode 378) for 09-04, Search in Rotated Sorted Array (LeetCode 33) for 09-03. A matrix sorted by rows and by columns is searched by elimination, not halving (05-04).

### The trap

- **A test that is not monotone.** If `feasible(x)` can go true, false, true, halving returns an arbitrary boundary. Prove "x works ⇒ x + 1 works" (or the mirror for a maximum) before writing the loop
- **Halving when one pass will do.** When the input and the condition both move one way, two pointers find the boundary in O(n) with no log factor. Turning "find the optimum" into "is this value feasible?" is Module 07 (01-04)
