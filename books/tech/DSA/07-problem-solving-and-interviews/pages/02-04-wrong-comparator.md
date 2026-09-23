## The Wrong Comparator

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

### Multi-level Sorting

Many problems require secondary sorting: "Sort by profit descending. If tied, sort by cost ascending."

```ts
// THE WRONG APPROACH
arr.sort((a, b) => {
  if (b.profit > a.profit) return 1;
  if (b.profit < a.profit) return -1;
  // What about cost?
});
```

The clean, professional way to write multi-level comparators uses subtraction chaining:

```ts
// THE FIX
arr.sort((a, b) => {
  // Primary sort: Profit DESCENDING
  if (a.profit !== b.profit) {
    return b.profit - a.profit; 
  }
  // Secondary sort: Cost ASCENDING
  return a.cost - b.cost;
});
```

### The Subtraction Overflow Trap

The `a - b` trick is mathematically elegant, but it is dangerous if the numbers are massive.
If `a = 2,000,000,000` and `b = -2,000,000,000`, `a - b` equals `4,000,000,000`, which overflows a 32-bit signed integer. 
In C++ or Java, returning this overflowed value will break the sort and potentially cause a Segfault.

If numbers can be massive and you are not in JavaScript (which uses floats), you must explicitly use comparative operators:
```cpp
// Safe C++ Comparator
if (a < b) return -1;
if (a > b) return 1;
return 0;
```
