### The skeleton: k largest

```ts
const h = new Heap<number>((x, y) => x < y);    // a MIN-heap for the k largest
for (const x of nums) {
  h.push(x);
  if (h.size() > k) h.pop();                     // drop the smallest survivor
}
return h.peek();                                 // the k-th largest
```

### The trap

- **Stale entries.** A heap cannot update an element in place. Push the improved entry and, on every pop, skip one that no longer matches the current state
- **k most frequent:** a count never exceeds n, so buckets indexed by count give O(n), no heap
