### Where it appears

| Problem | What "pick" and "skip" mean |
|---|---|
| [Subsets](https://leetcode.com/problems/subsets/) (LeetCode 78) | include or exclude each element |
| [Letter Case Permutation](https://leetcode.com/problems/letter-case-permutation/) (LeetCode 784) | uppercase or lowercase each letter |
| [Maximum Length of Concatenated String with Unique Characters](https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/) (LeetCode 1239) | take or skip each string |
| [Target Sum](https://leetcode.com/problems/target-sum/) (LeetCode 494) | add or subtract — memoise `(i, remaining)` (17-01) |

:::interview
"Subsets pushes `cur.slice()`. What goes wrong with `out.push(cur)`?"

`cur` is a single shared array that every branch mutates. By the time you read `out`, every entry points to the same empty array (the final state after all pops). `.slice()` snapshots the current state into a new array, so each subset is frozen at the moment it was recorded.
:::
