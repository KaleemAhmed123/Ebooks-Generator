### Where it appears

| Problem | What the opponent optimises |
|---|---|
| [Predict the Winner](https://leetcode.com/problems/predict-the-winner/) (LeetCode 486) | same total, opposite goals — lead ≥ 0 wins |
| [Stone Game](https://leetcode.com/problems/stone-game/) (LeetCode 877) | always true (odd count, distinct values) |
| [Stone Game II](https://leetcode.com/problems/stone-game-ii/) (LeetCode 1140) | add M to the state — take 1..2M piles |
| [Can I Win](https://leetcode.com/problems/can-i-win/) (LeetCode 464) | bitmask of used numbers |
| [Nim Game](https://leetcode.com/problems/nim-game/) (LeetCode 292) | `n % 4 !== 0` — pure math |

:::interview
"On `[1, 5, 233, 7]`, 'take the larger end' gives player 1 only 12. Why does greedy fail?"

Greedy looks one move ahead. Taking 7 (the larger end) forces the opponent to choose between 1 and 233 — they take 233, and you lose. Taking 1 instead exposes only 5 and 7 to the opponent, keeping 233 available for your next turn. The optimal play sacrifices a small immediate gain to control what the opponent sees. Only minimax DP considers the full game tree.
:::
