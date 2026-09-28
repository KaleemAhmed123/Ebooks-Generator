## The Backtracking Template <span class="lv lv1"></span>

- **Backtracking** is recursion with a specific structure: at each level of the call tree, you make a choice, recurse into a smaller problem, then **undo** the choice before trying the next option
- It explores a **state-space tree** — every node is a partial solution, every branch is a decision, and every leaf is a complete candidate. The algorithm walks the tree depth-first, pruning branches that cannot lead to valid answers

### The choose → recurse → undo pattern

```ts
function backtrack(state: State, choices: Choice[]): void {
  if (isComplete(state)) {
    results.push(copy(state));
    return;
  }
  for (const choice of choices) {
    if (!isValid(state, choice)) continue;  // prune
    apply(state, choice);                    // choose
    backtrack(state, remainingChoices);       // recurse
    remove(state, choice);                   // undo
  }
}
```

- **Choose:** mutate `state` to include the current decision
- **Recurse:** solve the smaller subproblem with the updated state
- **Undo:** reverse the mutation so the next sibling branch starts clean

:::mint
<svg viewBox="0 0 470 150" role="img" aria-label="State-space tree for generating subsets of {1,2,3}: root branches into include/exclude at each level" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 7.5px Georgia, serif; fill: #6b6b6b; }
    .nd { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .lf { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 0.8; fill: none; }
  </style>

  <circle class="nd" cx="235" cy="20" r="12"/>
  <text x="235" y="24" class="lb" text-anchor="middle">{}</text>

  <line class="a" x1="223" y1="28" x2="130" y2="52"/>
  <line class="a" x1="247" y1="28" x2="340" y2="52"/>
  <text x="170" y="40" class="sm">+1</text>
  <text x="290" y="40" class="sm">skip 1</text>

  <circle class="nd" cx="130" cy="60" r="12"/>
  <text x="130" y="64" class="lb" text-anchor="middle">{1}</text>
  <circle class="nd" cx="340" cy="60" r="12"/>
  <text x="340" y="64" class="lb" text-anchor="middle">{}</text>

  <line class="a" x1="120" y1="70" x2="70" y2="92"/>
  <line class="a" x1="140" y1="70" x2="190" y2="92"/>
  <text x="85" y="82" class="sm">+2</text>
  <text x="165" y="82" class="sm">skip</text>

  <circle class="lf" cx="70" cy="100" r="12"/>
  <text x="70" y="104" class="lb" text-anchor="middle">{1,2}</text>
  <circle class="lf" cx="190" cy="100" r="12"/>
  <text x="190" y="104" class="lb" text-anchor="middle">{1}</text>

  <text x="70" y="130" class="sm" text-anchor="middle">+3 / skip →</text>
  <text x="70" y="142" class="sm" text-anchor="middle">{1,2,3}, {1,2}</text>

  <text x="380" y="130" class="sm">2^n leaves</text>
</svg>
:::

### Why undo matters

- Without undoing, the state from one branch leaks into the next. If you push `2` onto the path for the left branch and forget to pop it, the right branch starts with a stale `2` already in the path
- In JavaScript, this is where bugs hide: pushing to an array but forgetting to pop, or adding to a Set but forgetting to delete. If you use an **immutable slice** (`[...path, choice]`) instead of mutation, the undo is free — but you pay O(n) per call to copy the array

### When backtracking is the right tool

- The problem asks for **all** valid configurations (permutations, combinations, subsets, placements)
- The constraint space is small: n ≤ 15–20 (exponential search is feasible)
- A greedy approach fails because choices interact — picking one element affects which others are valid

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Subsets](https://leetcode.com/problems/subsets/) (LeetCode 78) | Enumerate all subsets via include/exclude |
| [Permutations](https://leetcode.com/problems/permutations/) (LeetCode 46) | Generate all orderings with choose-recurse-undo |
| [Combinations](https://leetcode.com/problems/combinations/) (LeetCode 77) | Pick k items from n using backtracking |
| [Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) (LeetCode 17) | Branch on each digit's letter options |

:::interview
"How do you decide between backtracking and DP?"

If every decision is independent of the path you took to get there (only the current state matters), use DP — it caches repeated states. If the path itself matters (the same state reached via different paths gives different answers), you need backtracking. Permutations need backtracking; shortest paths need DP.
:::
