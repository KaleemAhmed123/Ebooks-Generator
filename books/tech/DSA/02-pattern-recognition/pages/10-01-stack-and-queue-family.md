# Chapter 10 - Stacks & Queues

## The Stack & Queue Family 🟢

- **What it is:** A stack remembers *unfinished business* in last-opened, first-closed order. A queue remembers it in arrival order. Almost every stack problem is one of three things: nesting (something opened must be closed), cancellation (a new item destroys old ones), or waiting (old items wait for a future item that settles them)
- **The signal:** brackets, nested encodings (`3[a2[c]]`), paths with `..`, "remove adjacent", "collide", "next greater / smaller", "previous smaller", "span", "sum over all subarrays of the minimum", "implement X using Y"
- **The mechanism:** Each item is pushed once and popped at most once, so a loop with an inner `while (pop)` is O(n) amortised. The design question is always: *what does the top of the stack mean, and what makes it leave?*

:::mint
<svg viewBox="0 0 470 118" role="img" aria-label="Three reasons to use a stack. Nesting: an opening item waits for its matching close, as in brackets and decode string. Cancellation: a new item destroys the top, as in asteroid collision and removing adjacent duplicates. Waiting: items wait for a future item that settles them, as in next greater element and histograms." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hd { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
  </style>
  <rect class="hd" x="14" y="10" width="140" height="22" rx="3"/><text x="84" y="25" class="lb" text-anchor="middle">nesting</text>
  <rect class="hd" x="164" y="10" width="140" height="22" rx="3"/><text x="234" y="25" class="lb" text-anchor="middle">cancellation</text>
  <rect class="hd" x="314" y="10" width="140" height="22" rx="3"/><text x="384" y="25" class="lb" text-anchor="middle">waiting</text>
  <rect class="bx" x="14" y="38" width="140" height="70" rx="3"/>
  <text x="22" y="54" class="sm">open → push context</text><text x="22" y="66" class="sm">close → pop and combine</text>
  <text x="22" y="84" class="lb">( [ { } ] ), 3[a2[c]]</text><text x="22" y="100" class="sm">pages 10-02, 10-04</text>
  <rect class="bx" x="164" y="38" width="140" height="70" rx="3"/>
  <text x="172" y="54" class="sm">new item vs the top:</text><text x="172" y="66" class="sm">one or both disappear</text>
  <text x="172" y="84" class="lb">→ ← asteroids, "abbaca"</text><text x="172" y="100" class="sm">page 10-03</text>
  <rect class="bx" x="314" y="38" width="140" height="70" rx="3"/>
  <text x="322" y="54" class="sm">items wait for the first</text><text x="322" y="66" class="sm">future item that beats them</text>
  <text x="322" y="84" class="lb">next greater, spans</text><text x="322" y="100" class="sm">pages 10-05 to 10-09</text>
</svg>
:::

### The pages in this chapter

| Page | Pattern | Canonical problem |
|---|---|---|
| **10-02 Push the Context** | save the state before `[`, restore after `]` | Decode String (LeetCode 394) |
| **10-03 Cancel Against the Top** | the newcomer fights the top until one side stops | Asteroid Collision (LeetCode 735) |
| **10-04 Count the Balance** | a counter replaces the stack when only one bracket type exists | Minimum Add to Make Parentheses Valid (LeetCode 921) |
| **10-05 / 10-06 Monotonic Stack** | pop everything the newcomer beats | Next Greater Element |
| **10-07 Pop While It Pays** | monotonic stack with a budget of removals | Remove K Digits (LeetCode 402) |
| **10-08 Count Each Element's Reach** | previous/next smaller → contribution of each element | Sum of Subarray Minimums (LeetCode 907) |
| **10-09 Stack the Rows** | each matrix row becomes a histogram | Maximal Rectangle (LeetCode 85) |
| **10-10 Monotonic Deque** | a monotonic stack whose front can expire | Sliding Window Maximum (LeetCode 239) |
| **10-11 Build One from Another** | queue from stacks, min-stack, LRU | Implement Queue using Stacks (LeetCode 232) |

### The trap

- **Using `Array.prototype.shift()` as a queue.** `shift` can cost O(n) per call, because the remaining elements move down, so a BFS or queue simulation can silently become O(n²). Keep a head index (`q[head++]`) or a proper deque; page 10-10 shows the same trap for deques
