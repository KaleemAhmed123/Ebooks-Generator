## Cancel Against the Top <span class="lv lv1"></span>

- **What:** a new item may destroy the one before it, and destruction cascades. Keep survivors on a stack; the newcomer fights the top in a `while` loop until it dies, wins, or has nothing to fight
- **Spot it:** items that destroy each other on contact, "remove adjacent duplicates", "backspace", "repeat until no more removals". A beaten item gets an *answer* instead → 10-05
- **Why:** only the latest survivor can touch the newcomer. Each item enters and leaves once: O(n)

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
      if (top < -a) st.pop();       // top explodes, keep fighting
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

- **Watch out:** the fight is a `while`, not an `if`. `[10, 2, −5]` must end as `[10]`; one pop leaves `[10, −5]`, still colliding.
