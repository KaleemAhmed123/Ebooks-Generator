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
