## Mutating While Iterating <span class="lv lv1"></span>

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
