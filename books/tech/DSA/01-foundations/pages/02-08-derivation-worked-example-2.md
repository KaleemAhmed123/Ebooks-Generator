### The Derivation

- You did not memorise the Hash Map trick. You wrote the brute force, saw that the inner loop was just a slow lookup, and replaced the slow lookup with a fast one. The structure forced the solution

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Two Sum](https://leetcode.com/problems/two-sum/) (LeetCode 1) | The problem this derivation solves — hash map replaces inner scan |
| [Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) (LeetCode 167) | Sorted variant uses two pointers instead of hash map |
| [3Sum](https://leetcode.com/problems/3sum/) (LeetCode 15) | Fix one element, run two pointers on the rest |
| [4Sum](https://leetcode.com/problems/4sum/) (LeetCode 18) | Same derivation extended one more level with an outer loop |
