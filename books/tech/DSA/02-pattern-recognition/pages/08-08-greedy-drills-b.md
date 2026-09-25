## Recognition drills: Greedy Moves <span class="lv lv1"></span> - continued

| Problem | Move & why it is safe |
|---|---|
| 12. Bulbs where a switch flips every bulb to its right (GFG) | **Invariant:** carry the parity of presses |
| 13. Maximize Sum Of Array After K Negations (LeetCode 1005) | **Invariant:** negatives first, leftover parity hits the smallest `|x|` |
| 14. Minimum Replacements to Sort the Array (LeetCode 2366) | **Right to left,** split into `⌈x/m⌉` equal parts |
| 15. Fractional Knapsack (GFG) | **Sort by value / weight;** splitting items makes greedy exact |
| 16. 0/1 Knapsack (GFG) | **Trap: not greedy.** Items cannot be split; ratio order fails. DP (Chapter 17) |
| 17. Minimum number of coins (GFG), Indian currency | **Largest coin first** works for this *canonical* coin system only; `{1, 3, 4}` breaks it |
| 18. Largest Permutation with at most K swaps (GFG) | **Front first:** put the largest remaining value at the next position, using an index map for O(1) swaps |
| 19. Choose and Swap (GFG) | **First improvable character:** in first-occurrence order, the first `c` for which some smaller character first appears later; swap every `c` with the *smallest* such character |
| 20. Minimum Cost to cut a board into squares (GFG) | **Most expensive cut first;** its cost multiplies by the pieces in the other direction |
