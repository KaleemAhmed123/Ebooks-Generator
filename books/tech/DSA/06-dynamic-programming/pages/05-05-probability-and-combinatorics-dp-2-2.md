### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Soup Servings](https://leetcode.com/problems/soup-servings/) (LeetCode 808) | Probability DP with four branching operations |
| [Knight Probability in Chessboard](https://leetcode.com/problems/knight-probability-in-chessboard/) (LeetCode 688) | Probability of staying on board after k moves |
| [New 21 Game](https://leetcode.com/problems/new-21-game/) (LeetCode 837) | Probability of reaching a score in a card game |
| [Dice Roll Simulation](https://leetcode.com/problems/dice-roll-simulation/) (LeetCode 1223) | Count sequences with consecutive-roll constraints |

### The Mathematical Insight

Probability DP is usually much easier to write than standard DP because there is no `Math.max()` or `Math.min()`. You literally just add all the branching paths together and multiply them by their respective mathematical probabilities (e.g., `0.25 * dfs()`). The recursion tree effortlessly simulates a massive probability branching diagram.
