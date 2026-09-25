## Cancel Against the Top 🟢

- **What it is:** Each new item may destroy the item just before it, and the destruction can cascade. Keep survivors on a stack; a newcomer fights the top in a `while` loop until it dies, the top wins, or nothing it can fight is left
- **Signal:** "asteroids collide", "remove adjacent duplicates", "remove k equal adjacent characters", "backspace", "adjacent pair that cancels", results that must be stable ("repeat until no more removals")
- **Why it works:** Only the most recent survivor can touch the newcomer; everything below it is shielded until it disappears. So the stack holds exactly the set of items that are still "in play", and each item enters and leaves it once: O(n) instead of repeated rescans

:::mint
<svg viewBox="0 0 470 104" role="img" aria-label="Asteroid collision on 5, 10, minus 5. Push 5, push 10. Minus 5 moves left and meets 10 moving right; 10 is larger, minus 5 explodes. Result 5, 10. Second example 8, minus 8: equal sizes, both explode, result empty. Third: 10, 2, minus 5: minus 5 destroys 2, then loses to 10." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
  </style>
  <text x="20" y="20" class="lb">[5, 10, −5]  : −5 vs 10 → −5 explodes      → [5, 10]</text>
  <text x="20" y="40" class="lb">[8, −8]      : equal   → both explode      → []</text>
  <text x="20" y="60" class="lb">[10, 2, −5]  : −5 vs 2 → 2 explodes, keep fighting</text>
  <text x="20" y="74" class="lb">               −5 vs 10 → −5 explodes      → [10]</text>
  <text x="20" y="96" class="sm">a collision needs top moving right (&gt; 0) and newcomer moving left (&lt; 0); nothing else ever meets</text>
</svg>
:::

```ts
// Asteroid Collision (LeetCode 735)
function asteroidCollision(asteroids: number[]): number[] {
  const st: number[] = [];
  for (const a of asteroids) {
    let alive = true;
    while (alive && a < 0 && st.length && st[st.length - 1] > 0) {
      const top = st[st.length - 1];
      // top explodes, keep fighting
      if (top < -a) st.pop();
      else {
        if (top === -a) st.pop();           // both explode
        alive = false;                      // newcomer explodes
      }
    }
    if (alive) st.push(a);
  }
  return st;
}
```

### Variations

- **Remove All Adjacent Duplicates In String (LeetCode 1047):** push a character; if it equals the top, pop instead. The stack *is* the answer, read bottom to top
- **Remove All Adjacent Duplicates in String II (LeetCode 1209) / Restrictive Candy Crush (GFG):** push `(char, runLength)`; when a run reaches k, pop it. Removing k equal characters is one pop, however long the cascade
- **Backspace String Compare (LeetCode 844):** `#` pops. For O(1) space, walk both strings from the end and skip characters owed to pending backspaces
- **Make The String Great (LeetCode 1544):** a letter cancels the top when they are the same letter in opposite case
- **Recursively remove all adjacent duplicates (GFG) — the trap:** here removal happens in *rounds*: every run of length ≥ 2 disappears at once, then the result is scanned again. That is not the stack's cascade. On `"babbaa"` rounds give `"ba"` (both runs vanish together), while a stack that deletes each run and lets its neighbours merge at once gives `"b"`. Read the statement for "at the same time" before reaching for a stack; rounds need a linear pass per round

### The failure

- **Repeating `replace` until nothing changes.** `while (s.includes("aa")) s = s.replace(...)` rescans the whole string after every removal: O(n²), and slower still in languages that copy strings on every edit
- **Pushing the newcomer before it has finished fighting.** In the asteroid loop, `[10, 2, −5]` must end as `[10]`; checking only one pop leaves `[10, −5]`, a pair that is still colliding

:::interview
"Why is the asteroid loop O(n) with a `while` inside a `for`?" — Every asteroid is pushed at most once and popped at most once. The inner loop only runs while it pops, or once more to end the fight. So the total work across the whole array is at most 2n pushes and pops plus n loop exits.
:::
