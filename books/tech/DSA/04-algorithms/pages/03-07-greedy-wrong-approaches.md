## The Wrong Approach (Greedy)

The defining characteristic of a bad greedy solution is that it passes the sample test cases and fails on test case 4 out of 100 on the hidden server.

### The "It Looks Right" Trap

- **Naive idea:** The candidate reads a problem about finding the maximum path sum in a triangle of numbers. They write a loop that starts at the top and always picks the largest adjacent number on the row below.
- **Why it breaks:** They failed the Litmus Test. If the triangle is `[[2], [3, 4], [6, 5, 99]]`. The greedy choice goes `2 -> 4 -> 5` (sum = 11). The optimal choice goes `2 -> 3 -> 99` (sum = 104). The greedy choice was blinded by local maximums and missed the delayed payoff.
- **The fix:** Always try to construct a counter-example where taking a small immediate loss unlocks a massive future gain. If you can build one, delete your greedy code immediately and start writing a DP matrix.

### The Fractional vs Discrete Trap

- **Naive idea:** The 0/1 Knapsack problem. You have items with weights and values, and a backpack with a maximum capacity. The candidate sorts the items by their `value/weight` ratio and greedily stuffs the backpack until it's full.
- **Why it breaks:** The math breaks because you cannot take *fractions* of items. If you have an item weighing 5kg with high ratio, and your backpack has 4kg of space left, the greedy algorithm skips it and leaves 4kg of dead space. A less optimal ratio that perfectly filled the 4kg would have yielded a higher total score.
- **The fix:** Greedy only works on the *Fractional* Knapsack problem (where you can slice items like gold dust). Discrete items require DP.

### The Local Optimum Loop

- **Naive idea:** The candidate is given an array of jump lengths (Jump Game) and tries to greedily jump to the absolute furthest index possible at every step.
- **Why it breaks:** Jumping to the furthest index might land you on a `0`, killing your momentum, whereas a shorter jump might have landed you on a `100`.
- **The fix:** Instead of greedily choosing the furthest *landing* spot, greedily choose the spot that *maximizes the next available reach*. 

:::interview
"I noticed you initially started writing a greedy solution but then switched to DP. Walk me through that decision."

"I was trying to use the Exchange Argument in my head. I realized that if I made the greedy choice to take the largest element now, it permanently blocked access to two smaller elements that sum to a higher total. Because a counter-example exists, the problem lacks Optimal Substructure for a greedy approach, so I pivoted to DP."
:::
