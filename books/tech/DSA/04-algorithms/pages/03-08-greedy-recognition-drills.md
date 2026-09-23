## Greedy Recognition Drills

Read the following scenarios. Should you use Greedy or DP? (Cover the answers on the right).

| Scenario | Concept |
| :--- | :--- |
| **1.** You have an array of coin values and must make change for X using the minimum coins. The coin values are `[1, 7, 9]`. | **DP.** The coins are non-standard. Greedy takes 9, then needs two 1s (total 3 coins for 11). Optimal takes 7 and a 4 (wait, 7 and what? Actually for 14, Greedy takes 9,1,1,1,1,1 (6). Optimal takes 7,7 (2)). Since a counter-example exists, use DP. |
| **2.** You have a schedule of trains arriving and departing. Find the minimum number of platforms required. | **Greedy.** Classic Line Sweep / Activity Selection. Sort the events chronologically and track the max overlap. |
| **3.** You want to buy stocks. You know the prices for the next N days. You can hold at most 1 stock at a time, but can trade infinitely. Maximize profit. | **Greedy.** Just add up every positive price difference between adjacent days. Every local increase is free money. |
| **4.** You want to buy stocks, but you are only allowed to make exactly K transactions. | **DP.** The global constraint of K transactions means taking a small profit today might consume a transaction you need for a massive profit tomorrow. |
| **5.** You have an array of strings. Concatenate them in an order that forms the lexicographically largest possible massive string. | **Greedy.** Sort them with a custom comparator: `(a, b) => (b+a).localeCompare(a+b)`. |
| **6.** You have a grid of numbers. Find a path from top-left to bottom-right maximizing the sum. You can only move right and down. | **DP.** The greedy path is blinded by local maximums. A small number might be the only gateway to a massive number. |
