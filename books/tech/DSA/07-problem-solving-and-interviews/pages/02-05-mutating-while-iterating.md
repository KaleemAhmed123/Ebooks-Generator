## Mutating While Iterating

This is a devastating bug that destroys array integrity and is incredibly difficult to spot during a dry-run because the human brain assumes the array length is static.

### The Problem

If you add or remove elements from an array while iterating over it with a `for` loop, the indices shift underneath you.

```ts
// THE WRONG APPROACH: Remove all even numbers
const arr = [1, 2, 4, 5];
for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2 === 0) {
    arr.splice(i, 1);
  }
}
// Result: [1, 4, 5] -- Wait, why is 4 still there?!
```

**What happened:**
- `i = 1`. `arr[1]` is `2`. It is even. We splice it out.
- The array immediately shifts to `[1, 4, 5]`.
- The loop increments `i` to `2`. 
- `arr[2]` is now `5`. We completely skipped evaluating `4`!

### The Two Fixes

**Fix 1: Iterate Backwards**
If you iterate from right to left, removing an element only shifts the indices of the elements *to the right* of it, which you have already processed. The elements to the left (which you are about to process) remain perfectly anchored.

```ts
// THE FIX (In-place)
for (let i = arr.length - 1; i >= 0; i--) {
  if (arr[i] % 2 === 0) {
    arr.splice(i, 1);
  }
}
```

**Fix 2: Build a New Array**
Unless the interview strictly demands O(1) space, the safest, cleanest, and most professional approach is to just `filter` or build a new array. Splicing an array in a loop is O(N²) time anyway.

```ts
// THE FIX (Clean)
const newArr = arr.filter(x => x % 2 !== 0);
```

### The Hash Map Trap

The same trap applies to Maps and Sets. In most languages, inserting into a Hash Map while iterating over its keys will cause a `ConcurrentModificationException` or undefined behavior. 
If you need to iterate over a Map and add new keys based on the values, you must iterate over a snapshot of the keys (e.g., `Array.from(map.keys())`) or store the new items in a temporary buffer and merge them after the loop.
