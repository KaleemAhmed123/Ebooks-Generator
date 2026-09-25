### The failure

- **Greedy without regret.** "Stop at every station you reach while fuel is low" or "always refuel at the first station" commits too early: in the diagram, refuelling at 60 is right only because 40 is the biggest option passed, which is known only once you are stuck at 70
- **DP when greedy with regret suffices.** `dp[i][stops]` = farthest reach is correct but O(n²); the heap version is O(n log n) and is the intended follow-up

:::interview
"Why is it safe to decide where to refuel only after running out?" — Stopping at a station is only useful for the distance it adds, and the order of refuels does not change the total fuel. So when I cannot reach the next point, the best repair is to have stopped at the largest station I already passed. Keeping passed stations in a max-heap makes that repair O(log n), and each station is used at most once.
:::
