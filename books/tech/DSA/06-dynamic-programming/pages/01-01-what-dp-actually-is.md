## What Dynamic Programming Actually Is

Dynamic Programming (DP) is arguably the most feared topic in algorithm interviews. Candidates often treat it as a collection of magical, disconnected formulas they must memorize. 

This is the wrong approach. DP is not a collection of algorithms. **DP is an optimization technique.**

### The Brutal Truth

Every single Dynamic Programming solution in existence is just a Brute Force solution that has been optimized to not repeat itself. That is it. If you can write a Brute Force recursive function, you are 95% of the way to a DP solution.

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

Dynamic Programming is simply the act of giving the computer a notepad.
1. When the computer calculates `F(3)` for the very first time, it writes the answer (`2`) in the notepad.
2. The next time it needs `F(3)`, instead of doing the math again, it just reads the answer from the notepad.

This single act drops the time complexity of Fibonacci from O(2^N) (which would take the age of the universe for N=100) down to O(N) (which takes a fraction of a millisecond).

### Optimal Substructure

For DP to work, the problem must also possess **Optimal Substructure**. 
This means the absolute best answer to a large problem can be constructed by combining the absolute best answers to its smaller subproblems. 
- Example: The shortest path from A to C via B is made of the shortest path from A to B, plus the shortest path from B to C.
- If finding a sub-optimal path to B somehow magically unlocked a teleportation portal to C, the problem would *lack* optimal substructure, and DP would fail.
