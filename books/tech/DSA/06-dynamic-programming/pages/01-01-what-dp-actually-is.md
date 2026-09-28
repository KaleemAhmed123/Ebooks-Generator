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

### The Core Concept of DP

DP is the act of giving the computer a notepad.
1. When the computer calculates `F(3)` for the very first time, it writes the answer (`2`) in the notepad.
2. The next time it needs `F(3)`, instead of doing the math again, it just reads the answer from the notepad.

This single act drops the time complexity of Fibonacci from O(2^N) (which would take the age of the universe for N=100) down to O(N) (which takes a fraction of a millisecond).

### Optimal Substructure

For DP to work, the problem must also possess **Optimal Substructure**. 
This means the absolute best answer to a large problem can be constructed by combining the absolute best answers to its smaller subproblems. 
- Example: The shortest path from A to C via B is made of the shortest path from A to B, plus the shortest path from B to C.
- If finding a sub-optimal path to B somehow magically unlocked a teleportation portal to C, the problem would *lack* optimal substructure, and DP would fail.
