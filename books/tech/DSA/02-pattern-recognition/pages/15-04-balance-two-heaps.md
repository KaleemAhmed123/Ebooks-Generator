## Balance Two Heaps <span class="lv lv2"></span>

- **What:** the smaller half in a **max-heap**, the larger half in a **min-heap**, sizes equal or the max-heap one larger. The two tops are the middle of the data
- **Spot it:** "median of a data stream", "running median", "median of every window". A window's max or min only → 10-10
- **Why:** the median depends only on the boundary between the halves, not on the order inside them, and each heap exposes one side of that boundary

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
    this.hi.push(this.lo.pop()!);      // largest of lower → upper
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

- **Watch out:** rebalance after every insert. Routing alone keeps the halves ordered but unequal: after 1, 2, 3 the tops give 1.5, not 2
### Where it appears

| Problem | What the two heaps partition |
|---|---|
| [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/) (LeetCode 295) | lower half (max-heap) and upper half (min-heap) |
| [Sliding Window Median](https://leetcode.com/problems/sliding-window-median/) (LeetCode 480) | same split — lazy deletion for outgoing values |
| [IPO](https://leetcode.com/problems/ipo/) (LeetCode 502) | affordable projects (min-heap on cost) and best profit (max-heap) |

:::interview
"Sliding Window Median removes elements from the middle of a heap. How does lazy deletion work?"

You don't actually remove from the heap — you mark the value as "gone" in a hash map. When the heap's top is marked, pop it silently. This keeps removal O(1) and cleanup amortised. The tricky part: maintain a balance counter (`lo.size − hi.size`) that counts *live* elements, not heap size, so rebalancing stays correct.
:::
