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
