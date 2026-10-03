## Digit DP: Counting Specific Digits <span class="lv lv2"></span>

Apply the Digit DP template to a concrete problem.

- **The Problem:** Given an integer n, count the total number of times the digit `1` appears in all non-negative integers less than or equal to n.
- **Example:** n = 13. The numbers containing `1` are 1, 10, 11, 12, 13.
  - Notice that 11 contains two `1`s. The total count of the *digit* `1` is 6.

### Expanding the State

Our standard state was `dfs(index, isTight)`.
Because we need to count how many `1`s we have accumulated in our currently constructed number, we must add that to our state.
New State: `dfs(index, isTight, countOfOnes)`.

### The Transition

When we are at `index`, and we choose a `digit` from `0` to `limit`:
- If `digit === 1`, the new count for the next recursive call is `countOfOnes + 1`.
- Otherwise, the count remains `countOfOnes`.
