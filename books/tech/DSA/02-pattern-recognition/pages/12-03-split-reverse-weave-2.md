### Where it appears

| Problem | What the reversed back half enables |
|---|---|
| [Reorder List](https://leetcode.com/problems/reorder-list/) (LeetCode 143) | interleaving first and last, second and second-last |
| [Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/) (LeetCode 234) | comparing front half with reversed back half |
| [Maximum Twin Sum of a Linked List](https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/) (LeetCode 2130) | pairing node i with node n−1−i |

:::interview
"If the interviewer says you must not modify the input list, what changes?"

You can no longer reverse in place. Two options: copy the values into an array and use two pointers (O(n) space, trivial), or reverse the back half, do the comparison, then reverse it again to restore the list. The second option is O(1) space but tricky under pressure — mention both and let the interviewer pick.
:::
