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
