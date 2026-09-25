### Variations

- **Coin Change II (LeetCode 518):** combinations with reuse, as counts: "stay" with memo on `(index, amount)` (tabulated loop order: Module 06, 02-06)
- **Count All Possible Routes (LeetCode 1575):** from any city you may go to *any other* city, including ones seen before. The loop over next cities restarts from 0 every call; the state `(city, fuel)` repeats, so memoise it
- **Unbounded knapsack (GFG, knapsack with duplicate items):** "stay" on pick, `i + 1` on skip; memoise `(i, capacity)`
- **Climbing Stairs with steps 1..k:** a restart-at-0 count over step sizes, i.e. Combination Sum IV with `nums = [1..k]`

### The failure

- **Mixing up 518 and 377.** Same inputs, different answers: coins `[1, 2]`, amount 3 gives 2 combinations and 3 sequences. Read "different sequences are counted as different" as "restart from 0"
- **Restart without memo.** Restarting multiplies the branches: Combination Sum IV with `nums = [1, 2, 3]` and target 30 makes about 1.2 · 10⁸ calls unmemoised, and the count grows exponentially with the target

:::interview
"What is the difference between Coin Change II and Combination Sum IV?" — Both reuse coins; the first counts combinations, the second counts ordered sequences. In recursion that is `go(i)` versus restarting at `0`. In a table it is the loop order (Module 06, 02-06). Getting that one choice right is the whole problem.
:::
