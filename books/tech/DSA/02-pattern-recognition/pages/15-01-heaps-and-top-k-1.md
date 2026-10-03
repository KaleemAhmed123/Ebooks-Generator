# Chapter 15 - Heaps & Ordered Sets

## Heap & Top-K <span class="lv lv1"></span>

- **What it is:** the best element (largest, smallest, cheapest) is needed again and again while the set changes: items arrive, leave or are combined
- **Signal:** "k largest", "k-th smallest so far", "merge k sorted", "median after each insertion", "combine the two cheapest", "take the largest and put something back". The next larger per element → 10-05; a window's max → 10-10. Floor/ceil, k-th by rank, or delete-any → the ordered set, 15-07
- **Mechanism:** a rescan costs O(n) per query. A heap keeps one end of the set ready: O(1) to read, O(log n) to change. JS has no heap: paste the class on 15-11

### The moves

| Move | What sits on top | Typical ask |
|---|---|---|
| **15-03** | the smallest head of k sources | merge k sorted lists |
| **15-04** | the two middle elements | median of a stream |
| **15-05** | the two items to combine next | min cost to connect ropes |
| **15-06** | the worst choice accepted so far | fewest refuelling stops |
| **15-07** | any value by rank (ordered set) | nearest value, k-th, window median with deletes |
