## The Wrong Approach (Greedy) <span class="lv lv1"></span>

The defining characteristic of a bad greedy solution is that it passes the sample test cases and fails on test case 4 out of 100 on the hidden server.

### The "It Looks Right" Trap

- **Naive idea:** The candidate reads a problem about finding the maximum path sum in a triangle of numbers. They write a loop that starts at the top and always picks the largest adjacent number on the row below.
- **Why it breaks:** They failed the Litmus Test. If the triangle is `[[2], [3, 4], [6, 5, 99]]`. The greedy choice goes `2 -> 4 -> 5` (sum = 11). The optimal choice goes `2 -> 3 -> 99` (sum = 104). The greedy choice was blinded by local maximums and missed the delayed payoff.
- **The fix:** Always try to construct a counter-example where taking a small immediate loss unlocks a massive future gain. If you can build one, delete your greedy code immediately and start writing a DP matrix.

### The Fractional vs Discrete Trap

- **Naive idea:** The 0/1 Knapsack problem. You have items with weights and values, and a backpack with a maximum capacity. The candidate sorts the items by their `value/weight` ratio and greedily stuffs the backpack until it's full.
- **Why it breaks:** The math breaks because you cannot take *fractions* of items. If you have an item weighing 5kg with high ratio, and your backpack has 4kg of space left, the greedy algorithm skips it and leaves 4kg of dead space. A less optimal ratio that perfectly filled the 4kg would have yielded a higher total score.
- **The fix:** Greedy only works on the *Fractional* Knapsack problem (where you can slice items like gold dust). Discrete items require DP.
