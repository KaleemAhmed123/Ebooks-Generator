## What Dynamic Programming Actually Is <span class="lv lv1"></span>

DP is not a collection of algorithms. **DP is an optimisation technique.**

Every Dynamic Programming solution is a brute-force solution that has been optimised to not repeat work. If you can write a brute-force recursive function, you are most of the way to a DP solution.

### Why candidates struggle

Most people memorise transitions without understanding where they come from. The result: they solve the problems they have seen and freeze on everything else. This module teaches you to *derive* the transition from the problem structure.

### Overlapping Subproblems

Imagine calculating the Fibonacci sequence: `F(n) = F(n-1) + F(n-2)`.

If you ask a computer to calculate `F(5)` using pure recursion:
- To find `F(5)`, it calculates `F(4)` and `F(3)`.
- To find `F(4)`, it calculates `F(3)` and `F(2)`.
- Notice what just happened? The computer is calculating `F(3)` twice. 
- To calculate `F(3)` the second time, it recalculates `F(2)` and `F(1)`. 
- By the time you ask for `F(40)`, the computer calculates `F(2)` over 63 million times.

This is an **Overlapping Subproblem**. The exact same question is being asked, and answered, millions of times.
