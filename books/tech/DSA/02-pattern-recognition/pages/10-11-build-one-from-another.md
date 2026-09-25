## Build One from Another 🟢

- **What it is:** Design questions that ask for a structure with a new guarantee, built only from simpler ones: a queue from two stacks, a stack that knows its minimum, a cache that evicts the least recently used key in O(1). The trick is always to pair each structure with the one invariant it cannot keep by itself
- **Signal:** "implement a queue using stacks", "min stack", "LRU cache", "insert, delete and getRandom in O(1)", "two stacks in one array", "circular queue"
- **Why it works:** Each simple structure is fast at one thing. Two stacks reverse the order twice, so the oldest element surfaces; a hash map gives O(1) *finding* while a list gives O(1) *ordering*. Costs that look O(n) per call are paid once per element across all calls: amortised O(1)

:::mint
<svg viewBox="0 0 470 112" role="img" aria-label="Queue from two stacks. Push always goes onto the in stack. Pop takes from the out stack; only when out is empty is in poured into out, which reverses the order so the oldest element is on top. Each element is moved at most once." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .ot { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .a { stroke: #1d4e89; stroke-width: 1.2; fill: none; }
  </style>
  <defs><marker id="m1011" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1d4e89"/></marker></defs>
  <text x="40" y="16" class="sm">in (push here)</text>
  <rect class="bx" x="40" y="22" width="60" height="20"/><text x="70" y="36" class="lb" text-anchor="middle">3 (top)</text>
  <rect class="bx" x="40" y="42" width="60" height="20"/><text x="70" y="56" class="lb" text-anchor="middle">2</text>
  <rect class="bx" x="40" y="62" width="60" height="20"/><text x="70" y="76" class="lb" text-anchor="middle">1</text>
  <path class="a" d="M 108 52 L 176 52" marker-end="url(#m1011)"/><text x="112" y="46" class="sm">pour only if out is empty</text>
  <text x="184" y="16" class="sm">out (pop here)</text>
  <rect class="ot" x="184" y="22" width="60" height="20"/><text x="214" y="36" class="lb" text-anchor="middle">1 (top)</text>
  <rect class="ot" x="184" y="42" width="60" height="20"/><text x="214" y="56" class="lb" text-anchor="middle">2</text>
  <rect class="ot" x="184" y="62" width="60" height="20"/><text x="214" y="76" class="lb" text-anchor="middle">3</text>
  <text x="270" y="36" class="sm">reversed twice = original order</text>
  <text x="270" y="52" class="sm">each element: 1 push to in,</text>
  <text x="270" y="64" class="sm">≤ 1 move to out, 1 pop from out</text>
  <text x="40" y="104" class="lb">amortised O(1) per operation</text>
</svg>
:::

```ts
// Implement Queue using Stacks (LeetCode 232)
class MyQueue {
  private inbox: number[] = [];
  private outbox: number[] = [];
  push(x: number): void { this.inbox.push(x); }
  pop(): number { this.shift(); return this.outbox.pop()!; }
  peek(): number {
    this.shift();
    return this.outbox[this.outbox.length - 1];
  }
  empty(): boolean {
    return !this.inbox.length && !this.outbox.length;
  }
  // pour only when out is empty
  private shift(): void {
    if (this.outbox.length) return;
    while (this.inbox.length) this.outbox.push(this.inbox.pop()!);
  }
}
```

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
