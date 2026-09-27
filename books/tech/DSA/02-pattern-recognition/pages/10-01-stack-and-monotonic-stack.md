# Chapter 10 - Stacks & Queues

## Stack & Monotonic Stack <span class="lv lv1"></span>

- **What it is:** a stack holds *unfinished business*: nesting (opened must close), cancelling (a newcomer destroys old items) or waiting (items wait for the one that settles them)
- **Signal:** brackets, "remove adjacent", "collide", "next greater", "implement X using Y"
- **Mechanism:** each item is pushed and popped at most once, so `for` + inner `while (pop)` is O(n). Ask: *what does the top mean, and what makes it leave?*

### The moves

| Move | When to use | What it exploits |
|---|---|---|
| **10-02** | nested brackets with data | the top is the context |
| **10-04** | one bracket kind | a counter is the height |
| **10-03** | newcomer destroys old items | only the top touches it |
| **10-05** | next greater or smaller | the beaten get answers |
| **10-07** | smallest after k deletions | pop while budget lasts |
| **10-08** | sum of every subarray min | each rules `L · R` |
| **10-09** | largest rectangle of 1s | each row is a histogram |
| **10-10** | max of each window of k | front expires, back is beaten |
| **10-11** | build from simpler parts | add the missing invariant |

### The skeleton

```ts
for (let i = 0; i < a.length; i++) {      // st: indices still waiting
  while (st.length && beats(a[i], a[st.at(-1)!])) settle(st.pop()!, i);
  st.push(i);                              // settle: i answers the popped
}
```

### The trap

- **`shift()` as a queue.** `Array.prototype.shift()` is O(n) per call; keep a head index instead
