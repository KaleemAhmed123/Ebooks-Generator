## The DP Framework <span class="lv lv1"></span>

Every Dynamic Programming problem, from the simplest Fibonacci sequence to the most horrifying 4-dimensional string matching nightmare, is built on the exact same 3-step framework. 

If you memorize this framework, you will never get stuck blanking at a whiteboard again.

### 1. Define the State

- The **State** is a set of variables that uniquely describes a specific subproblem.
- In `Fib(n)`, the state is `n`.
- In a grid traversal, the state might be `(row, col)`.
- You must be able to state clearly, in plain English, exactly what the state represents. 
- *Example:* `dp(i)` = "The maximum profit we can make looking only at the days from `i` to the end."

### 2. Formulate the Transition (The Recurrence Relation)

- This is the mathematical formula that connects the current state to its smaller subproblems.
- How do we calculate the answer for `State X` assuming we already know the answers for `State X-1` and `State X-2`?
- *Example:* In the Climbing Stairs problem (you can take 1 or 2 steps), if you are on step `i`, you either came from step `i-1` or step `i-2`. Therefore, the number of ways to reach step `i` is exactly the number of ways to reach `i-1` plus the number of ways to reach `i-2`.
- `dp[i] = dp[i-1] + dp[i-2]`
