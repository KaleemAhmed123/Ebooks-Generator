## The Wrong Comparator <span class="lv lv1"></span>

When sorting complex objects, or setting up a Priority Queue (Heap), passing the wrong comparator is a silent killer. It will not throw an error; it will just subtly sort the array incorrectly.

### The JavaScript `.sort()` Trap

If you call `.sort()` on an array of numbers in JavaScript or TypeScript, it converts the numbers to strings and sorts them alphabetically.
`[10, 2, 1].sort()` results in `[1, 10, 2]`.
**You must always provide a comparator for numbers.**

```ts
// THE FIX
arr.sort((a, b) => a - b); // Ascending
```

### The Math Behind the Comparator

A comparator function `(a, b)` must return a number:
- **Negative:** `a` should come *before* `b`.
- **Zero:** `a` and `b` are tied.
- **Positive:** `a` should come *after* `b`.

The `a - b` trick perfectly satisfies this for ascending order. 
If `a = 2` and `b = 10`, `a - b` is `-8`. Negative means `a` (2) comes before `b` (10). Perfect.
