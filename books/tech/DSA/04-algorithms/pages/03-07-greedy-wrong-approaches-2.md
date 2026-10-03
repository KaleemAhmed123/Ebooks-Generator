### The Local Optimum Loop

- **Naive idea:** The candidate is given an array of jump lengths (Jump Game) and tries to greedily jump to the absolute furthest index possible at every step.
- **Why it breaks:** Jumping to the furthest index might land you on a `0`, killing your momentum, whereas a shorter jump might have landed you on a `100`.
- **The fix:** Instead of greedily choosing the furthest *landing* spot, greedily choose the spot that *maximizes the next available reach*. 

:::interview
"I noticed you initially started writing a greedy solution but then switched to DP. Walk me through that decision."

"I was trying to use the Exchange Argument in my head. I realized that if I made the greedy choice to take the largest element now, it permanently blocked access to two smaller elements that sum to a higher total. Because a counter-example exists, the problem lacks Optimal Substructure for a greedy approach, so I pivoted to DP."
:::
