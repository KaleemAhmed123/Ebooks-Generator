## Recur on the Index 🟡

- **What it is:** Some recursions never build anything; they only translate an *index* in a big problem into an index in a smaller one. Find how position `i` of size `n` maps to a position of size `n − 1` (or `n / 2`), and the answer is a short recurrence, often O(n) or O(log n) with O(1) memory
- **Signal:** "n people in a circle, every k-th is eliminated", "the k-th symbol of row n", "how many ways to reach stair n with jumps of 1..k", a simulation that would be O(n²) or exponential in size
- **Why it works:** After one step the smaller problem is the same problem, only *renumbered*. In the Josephus circle, once person `k − 1` (0-based) leaves, the survivors restart counting from the person after them, so every index shifts by k. Undoing that shift is the whole recurrence: `J(n) = (J(n − 1) + k) mod n`

:::mint
<svg viewBox="0 0 470 110" role="img" aria-label="Josephus with n equals 5 and k equals 2, zero based. J of 1 is 0. J of 2 is 0 plus 2 mod 2 equals 0. J of 3 is 0 plus 2 mod 3 equals 2. J of 4 is 2 plus 2 mod 4 equals 0. J of 5 is 0 plus 2 mod 5 equals 2. The survivor is index 2, person 3." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
  </style>
  <text x="20" y="20" class="sm">k = 2, positions 0-based</text>
  <text x="20" y="40" class="lb">J(1) = 0</text>
  <text x="20" y="56" class="lb">J(2) = (0 + 2) % 2 = 0</text>
  <text x="20" y="72" class="lb">J(3) = (0 + 2) % 3 = 2</text>
  <text x="20" y="88" class="lb">J(4) = (2 + 2) % 4 = 0</text>
  <text x="20" y="104" class="lb" fill="#1d4e89">J(5) = (0 + 2) % 5 = 2  → person 3</text>
  <text x="270" y="40" class="sm">after one removal the circle of n</text>
  <text x="270" y="52" class="sm">becomes a circle of n − 1 whose</text>
  <text x="270" y="64" class="sm">index 0 is old index k mod n:</text>
  <text x="270" y="82" class="lb">old = (new + k) mod n</text>
</svg>
:::

```ts
// Find the Winner of the Circular Game (LeetCode 1823), people 1..n
function findTheWinner(n: number, k: number): number {
  let pos = 0;                            // J(1) = 0
  for (let size = 2; size <= n; size++) {
    // map back to the larger circle
    pos = (pos + k) % size;
  }
  return pos + 1;                         // 1-based person
}
```

### Variations

- **K-th Symbol in Grammar (LeetCode 779):** row n is built from row n − 1 by `0 → 01`, `1 → 10`. Symbol `k` comes from parent `⌈k/2⌉` in the row above, and equals the parent if `k` is odd, its flip if `k` is even. O(n) steps, no row is ever built
- **Get stair paths / Climbing Stairs (LeetCode 70):** ways(n) = ways(n − 1) + ways(n − 2). "Ladders with at most K steps" is `Σ ways(n − i)` for `i = 1..k`. The recurrence is the easy part; memoising it turns exponential calls into O(n · k) (Chapter 17)
- **Josephus with a queue or array:** simulating the circle is O(n · k) with a queue or O(n²) with array splicing. Fine for n ≤ 500 (LeetCode 1823), hopeless for 10⁶
- **Elimination Game (LeetCode 390) 🔴:** remove every other number alternately from the left and the right. Track only the head, the step and the remaining count; each round halves the count, so O(log n)

### The failure

- **Off by one between 0-based and 1-based.** The recurrence is clean only on 0-based positions. Convert once, at the very end; mixing in `+1` inside the loop shifts every later step
- **Building the rows.** K-th Symbol by constructing row n has length 2ⁿ⁻¹; at n = 30 that is about 5 · 10⁸ characters. The parent-index recursion needs only 30 steps

:::interview
"Can you do Josephus faster than simulating?" — Yes. After the first elimination the remaining circle is the same problem of size n − 1, renumbered so the next person is index 0. Undoing that renumbering gives `J(n) = (J(n − 1) + k) mod n` with `J(1) = 0`. One loop, O(n) time, O(1) space.
:::
