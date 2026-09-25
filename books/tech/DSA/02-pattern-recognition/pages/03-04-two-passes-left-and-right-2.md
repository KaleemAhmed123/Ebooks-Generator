### Variations

- **Product of Array Except Self (LeetCode 238):** left pass writes the product of everything before `i`; right pass multiplies in everything after `i`. No division, so zeros need no special case
- **Candy (LeetCode 135):** left pass: `c[i] = c[i−1] + 1` if rating rises. Right pass: `c[i] = max(c[i], c[i+1] + 1)` if rating falls. The `max` keeps the left rule satisfied while fixing the right one
- **Maximum Length Bitonic Subarray (GFG):** `inc[i]` = rising run ending at `i` (left pass), `dec[i]` = falling run starting at `i` (right pass). Answer = `max(inc[i] + dec[i] − 1)`
- **Equilibrium Point (GFG):** left pass is a running sum; the right side is `total − left − a[i]`. Two passes, no second array

### The failure

- **Recomputing max per index.** `Math.max(...h.slice(0, i))` inside the loop reads the same prefix again and again: O(n²), and it fails on 10⁵ bars
- **One pass for a two-sided rule.** Candy with only a left pass breaks the rule on falling runs: ratings `[1, 3, 2, 1]` need candies `1, 3, 2, 1`, but a left-only pass gives `1, 2, 1, 1`, and the child rated 2 gets no more than the child rated 1

:::interview
"What does the O(1)-space two-pointer version rely on?" — At each step I advance the side whose running max is smaller. That side's water is `itsMax − h`, because the other side already has a bar at least as tall somewhere, so the true right-or-left max can only be larger and the minimum is already known. The two arrays become two variables.
:::
