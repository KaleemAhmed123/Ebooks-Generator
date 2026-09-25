## Balance Two Heaps <span class="lv lv2"></span> - continued

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
