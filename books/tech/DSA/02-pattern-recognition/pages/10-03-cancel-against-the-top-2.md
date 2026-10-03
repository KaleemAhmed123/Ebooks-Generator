### Where it appears

| Problem | What cancels what |
|---|---|
| [Asteroid Collision](https://leetcode.com/problems/asteroid-collision/) (LeetCode 735) | right-moving top vs left-moving newcomer |
| [Remove All Adjacent Duplicates In String](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/) (LeetCode 1047) | matching character pairs |
| [Remove All Adjacent Duplicates in String II](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/) (LeetCode 1209) | push `(char, runLength)`; pop at k |

:::interview
"Why is the fight a while loop, not an if?"

One newcomer can destroy multiple stack elements in a row. `[10, 2, −5]`: −5 beats 2 (pop), then fights 10 and dies. An `if` would pop 2 and stop, leaving `[10, −5]` still colliding — corrupted state for the next arrival.
:::
