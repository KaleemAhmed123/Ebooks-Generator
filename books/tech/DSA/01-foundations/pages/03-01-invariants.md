## Invariants

- An **invariant** is a condition that is true before every iteration of a loop, during every iteration, and after the loop ends. If you can prove the invariant holds at all three points, you have proved the loop does what you claim
- Most interview candidates cannot explain *why* their code is correct. They test it on examples and hope. Invariants let you prove correctness without testing every case

### Binary search invariant

- Consider binary search on a sorted array, looking for `target`:

```ts
function binarySearch(arr: number[], target: number): number {
  let lo = 0;
  let hi = arr.length - 1;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
```

- **The invariant:** If `target` exists in the array, it exists in `arr[lo..hi]`

:::mint
<svg viewBox="0 0 470 100" role="img" aria-label="Binary search invariant: target always lies within the lo..hi window. Each iteration shrinks the window while preserving this property." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .dead { fill: #f0f0f0; stroke: #c0c0c0; stroke-width: 0.8; }
  </style>

  <text x="10" y="14" class="sm">Before loop:</text>
  <rect class="hi" x="10" y="20" width="440" height="16" rx="2"/>
  <text x="12" y="32" class="lb">lo=0</text>
  <text x="425" y="32" class="lb">hi=n-1</text>
  <text x="230" y="32" class="lb" text-anchor="middle">target is somewhere in here</text>

  <text x="10" y="58" class="sm">After arr[mid] &lt; target → lo = mid+1:</text>
  <rect class="dead" x="10" y="64" width="160" height="16" rx="2"/>
  <rect class="hi" x="174" y="64" width="276" height="16" rx="2"/>
  <text x="85" y="76" class="lb" text-anchor="middle">eliminated</text>
  <text x="176" y="76" class="lb">lo</text>
  <text x="425" y="76" class="lb">hi</text>
  <text x="312" y="76" class="lb" text-anchor="middle">invariant still holds</text>
</svg>
:::

### The three checkpoints

1. **Initialisation:** Before the loop starts, is the invariant true? For binary search: `lo=0, hi=n-1` — the entire array is included. If target exists, it is in `arr[0..n-1]`. ✓
2. **Maintenance:** If the invariant is true before an iteration, is it true after? If `arr[mid] < target`, target cannot be at `mid` or to its left. Setting `lo = mid+1` excludes only elements that cannot be the target. Invariant preserved. ✓
3. **Termination:** When the loop ends, does the invariant give us the answer? If `lo > hi`, the window is empty — target does not exist. If `arr[mid] === target`, we found it. ✓

### Why this matters in interviews

- When your binary search has an off-by-one error, the invariant tells you exactly which line is wrong
- If you write `lo = mid` instead of `lo = mid + 1`, the invariant breaks: you are including `mid` in the next iteration even though you already checked it. The loop can get stuck

:::interview
"How do you know your binary search is correct?"

I maintain the invariant that the target, if it exists, is always within `arr[lo..hi]`. Each branch of the if-statement only excludes elements that provably cannot be the target. When the window becomes empty, the target does not exist.
:::
