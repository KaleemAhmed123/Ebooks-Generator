## Target Sum <span class="lv lv1"></span>

This is the final boss of standard Knapsack variations. It requires algebraic manipulation before you can write the DP.

- **The Setup:** Given an array of integers `nums` and a target integer `S`. You want to build an expression by placing `+` or `-` before each integer so that they evaluate to `S`. Return the total number of different valid expressions.
- **Example:** `nums = [1, 1, 1, 1, 1], S = 3`. Return `5`.

### The Naive DP (2D with Offsets)

You could use memoization: `dfs(index, currentSum)`. But `currentSum` can be negative, so in tabulation, you would have to shift the entire array to the right to avoid negative array indices. It's messy.

### The Algebraic Math Trick

Divide the numbers into two subsets:
- P: The numbers we put a `+` in front of.
- N: The numbers we put a `-` in front of.

We know two mathematical truths:
1. Sum(P) - Sum(N) = S (The problem requirement)
2. Sum(P) + Sum(N) = Sum(Total) (The sum of all numbers in the array)

Add those two equations together:
2 times Sum(P) = S + Sum(Total)
Sum(P) = S + Sum(Total)/2

**The Revelation:** We don't need to track negative numbers or offsets! The problem is simply asking: *"How many subsets exist in the array that sum to exactly Sum(P)?"*
