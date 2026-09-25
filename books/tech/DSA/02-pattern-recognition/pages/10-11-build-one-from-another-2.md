### Variations

- **Min Stack (LeetCode 155):** push `[value, min(value, previous min)]`. Each entry remembers the minimum of everything below it, so popping restores the old minimum for free
- **LRU Cache (LeetCode 146):** hash map from key to a node of a doubly linked list ordered by recency. Get moves the node to the front; put evicts from the back. In TS, a `Map` keeps insertion order, so `delete` + `set` on access and `map.keys().next()` for the oldest key give the same O(1) behaviour
- **Insert Delete GetRandom O(1) (LeetCode 380):** an array for random access plus a map value → index. To delete, move the *last* element into the hole, update its index, then pop
- **Implement Stack using Queues (LeetCode 225):** after each push, rotate the older elements behind the new one (`size − 1` dequeue-enqueue moves). Push is O(n), pop O(1)
- **Two stacks in one array (GFG):** one grows from the left, one from the right; overflow when the tops meet
- **Find the middle of a stack in O(1) (GFG):** a doubly linked list with a pointer to the middle that moves one step on every push or pop, depending on parity

### The failure

- **Pouring back after every pop.** Moving everything from `out` back to `in` after each operation makes every pop O(n). Pour only when `out` is empty; that is what makes each element move at most once
- **LRU with an array.** Moving an accessed key to the front of an array is O(n). The list must be linked, so a node can be unlinked in O(1) from anywhere, and the map must point at the node, not store the value alone

:::interview
"Why is the two-stack queue amortised O(1)?" — Follow one element: it is pushed onto `in` once, moved to `out` at most once, and popped from `out` once. Three operations per element, whatever the order of calls. A single pop can cost O(n), but only after n cheap pushes paid for it.
:::
