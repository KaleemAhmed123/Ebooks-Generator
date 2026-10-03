### Where it appears

| Problem | What each layer does |
|---|---|
| [Spiral Matrix](https://leetcode.com/problems/spiral-matrix/) (LeetCode 54) | read the ring, shrink the rectangle |
| [Spiral Matrix II](https://leetcode.com/problems/spiral-matrix-ii/) (LeetCode 59) | write `1, 2, 3, …` into the ring |
| [Rotate Image](https://leetcode.com/problems/rotate-image/) (LeetCode 48) | transpose + reverse each row (swap where `c > r`) |

:::interview
"What breaks if you forget the `if (top <= bottom)` guard before the bottom walk?"

On a single-row remnant (e.g., a 3×1 matrix), `top++` after the top walk pushes `top` past `bottom`. Without the guard, the bottom walk re-reads the same row in reverse, doubling its values in the output. The guard catches that the rectangle collapsed to zero height.
:::
