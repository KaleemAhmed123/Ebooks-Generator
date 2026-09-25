## Balance Two Heaps 🟡 - continued

```ts
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
