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
