## The Off-By-One Error

The defining characteristic of a junior programmer is fixing an off-by-one error by randomly adding `+1` or `-1` until the tests pass. 
The defining characteristic of a senior programmer is proving the bounds mathematically before writing the loop.

### The Inclusive vs Exclusive Paradigm

You must adopt a strict, consistent paradigm for defining intervals. The industry standard, used by C++, Python, and Rust, is **Half-Open Intervals**: `[start, end)`.

- The interval **includes** `start`.
- The interval **excludes** `end`.

### Why Half-Open is Superior

1. **Length Calculation:** The length of `[A, B)` is exactly `B - A`. 
   - *Example:* `[2, 5)` contains 2, 3, 4. Length is `5 - 2 = 3`. 
   - If you use closed intervals `[A, B]`, the length is `B - A + 1`. That `+1` is the source of millions of bugs.
2. **Splitting Intervals:** `[A, C)` splits perfectly into `[A, B)` and `[B, C)`.
   - *Example:* `[0, 10)` splits into `[0, 5)` and `[5, 10)`. No overlap. No missing elements.
   - Closed intervals split into `[0, 4]` and `[5, 9]`. You have to remember the `-1` and `+1`.
3. **Empty Intervals:** An empty interval is simply `[A, A)`.
   - Closed intervals require `[A, A-1]`, which mathematically implies moving backwards.

### Standard Loop Structure

Because array length acts as the exclusive bound, a standard loop perfectly aligns with the half-open paradigm.

```ts
// Iterating over an array of length N is iterating over [0, N)
for (let i = 0; i < arr.length; i++) {
  // i will reach arr.length - 1. It will never touch arr.length.
}
```

### The String Splitting Trap

If you need to extract a substring from index `i` of length `L`, what is the end index?
Using half-open intervals, the answer is trivial: `end = i + L`.

```ts
// Extract a substring of length 3 starting at index 2
const str = "hello world";
const sub = str.slice(2, 2 + 3); // "llo"
```

If you try to calculate the inclusive end index, you will inevitably write `i + L` when you meant `i + L - 1`, causing an off-by-one error. 
**Memorize this rule:** Always think in `[start, end)`.
