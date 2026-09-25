## Balance Two Heaps <span class="lv lv2"></span>

- **What it is:** Keep the smaller half of the data in a **max-heap** and the larger half in a **min-heap**, with sizes equal or the max-heap one larger. The two tops are the middle of the data, so the median is one or two peeks away after every insertion
- **Signal:** "median of a data stream", "running median", "median of every sliding window", "maximise capital with at most k projects" (two heaps with different keys), any query about the middle of changing data
- **Why it works:** The median only depends on the boundary between the lower and upper halves, not on the order inside each half. A heap keeps exactly one end of a set ready, so a max-heap exposes the top of the lower half and a min-heap the bottom of the upper half. Each insertion moves at most one element between them: O(log n)

:::mint
<svg viewBox="0 0 470 110" role="img" aria-label="Two heaps after inserting 5, 15, 1, 3, 8. The lower half 1, 3, 5 is a max-heap with top 5. The upper half 8, 15 is a min-heap with top 8. Sizes 3 and 2, so the median is the lower top, 5. After adding 7, sizes are 3 and 3 and the median is 5 plus 7 over 2, which is 6." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .lo { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
  </style>
  <text x="20" y="18" class="sm">lower half: max-heap</text>
  <rect class="lo" x="20" y="24" width="30" height="22"/><text x="35" y="39" class="lb" text-anchor="middle">1</text>
  <rect class="lo" x="54" y="24" width="30" height="22"/><text x="69" y="39" class="lb" text-anchor="middle">3</text>
  <rect class="lo" x="88" y="24" width="30" height="22" stroke-width="2"/><text x="103" y="39" class="lb" text-anchor="middle">5</text>
  <text x="103" y="60" class="sm" text-anchor="middle">top</text>
  <text x="150" y="18" class="sm">upper half: min-heap</text>
  <rect class="hi" x="150" y="24" width="30" height="22" stroke-width="2"/><text x="165" y="39" class="lb" text-anchor="middle">8</text>
  <rect class="hi" x="184" y="24" width="30" height="22"/><text x="199" y="39" class="lb" text-anchor="middle">15</text>
  <text x="165" y="60" class="sm" text-anchor="middle">top</text>
  <text x="20" y="84" class="lb">sizes 3 | 2 → median = lower top = 5</text>
  <text x="20" y="100" class="lb">add 7 → sizes 3 | 3 → median = (5 + 7) / 2 = 6</text>
  <text x="260" y="34" class="sm">invariant: every lower ≤ every upper,</text>
  <text x="260" y="46" class="sm">|lower| = |upper| or |upper| + 1</text>
</svg>
:::

```ts
// Heap: the binary heap class on 15-11
// Find Median from Data Stream (LeetCode 295)
class MedianFinder {
  private lo = new Heap<number>((a, b) => a > b);   // max-heap
  private hi = new Heap<number>((a, b) => a < b);   // min-heap
  addNum(x: number): void {
    this.lo.push(x);
    // largest of lower → upper
    this.hi.push(this.lo.pop()!);
    if (this.hi.size() > this.lo.size())
      this.lo.push(this.hi.pop()!);
  }
  findMedian(): number {
    return this.lo.size() > this.hi.size()
      ? this.lo.peek()!
      : (this.lo.peek()! + this.hi.peek()!) / 2;
  }
}
```

### Variations

- **Sliding Window Median (LeetCode 480):** the same two heaps plus *lazy deletion*: mark outgoing values in a map and discard them only when they reach a top, while keeping a count of valid elements per side for balancing
- **IPO (LeetCode 502):** two heaps with different keys: projects sorted by required capital feed a max-heap of profits as capital grows; take the best affordable project k times
- **Median in a stream (GFG):** the canonical problem with integers; print the median after each insertion
- **Static median:** if all data is known upfront, quickselect finds it in O(n) average; two heaps pay O(log n) per element only for the streaming promise

### The failure

- **Routing without rebalancing.** "If x < lower top, push lower, else upper" keeps the halves ordered but not equal in size. After 1, 2, 3 the lower heap holds `[1]` and the upper `[2, 3]`, and the tops give 1.5 instead of 2. Rebalance after every insertion; routing every value through the lower heap first, as the template does, also removes the empty-heap special case
- **Sorting on every query.** Insert then sort, then read the middle: O(n log n) per median. With 5 · 10⁴ calls that is far beyond what two heaps need

:::interview
"Why two heaps and not one sorted structure?" — The median needs only the two elements at the boundary between the halves. A max-heap and a min-heap each keep one of them at the top in O(log n) per insert, and nothing else in the data needs ordering. A balanced BST or sorted list works too, but TypeScript has neither built in, and heaps are a 30-line class.
:::
