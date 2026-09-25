### Variations

- **Container With Most Water (LeetCode 11):** move the *shorter* wall; the area is capped by it, so every pair it could still form is already beaten
- **Valid Palindrome (LeetCode 125):** skip non-alphanumerics from both ends, compare lower-cased characters as the pointers meet
- **Squares of a Sorted Array (LeetCode 977):** the largest square sits at one of the two ends; fill the output from the back
- **3Sum, 3Sum Closest, 4Sum:** fix the outer index, collide on the rest (02-10)

### The failure

- **Colliding on unsorted input.** Two Sum (LeetCode 1) is unsorted and asks for the *original* indices. Sorting destroys them, and without sorting the row/column argument is false. Use a map from value to index there (03-05)

:::interview
"Why is it safe to move the shorter wall in Container With Most Water?" — The area is `min(h[l], h[r]) · (r − l)`. Every other pair using the shorter wall has a smaller width and the same or lower cap, so none can beat the current area. That wall is finished; drop it. O(n).
:::
