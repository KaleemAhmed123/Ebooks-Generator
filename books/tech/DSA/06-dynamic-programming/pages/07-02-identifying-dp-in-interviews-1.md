## Identifying DP in Interviews <span class="lv lv1"></span>

The hardest part of DP is knowing that you need to use DP. Interviewers will never say "Use dynamic programming."

### The 3 Core Clues

If an interview problem contains **Clue 1** PLUS either **Clue 2** or **Clue 3**, it is almost certainly Dynamic Programming.

**Clue 1: The Return Type**
The problem asks for an optimal value, not the specific configuration.
- "Find the **minimum** cost..."
- "Find the **maximum** profit..."
- "Return the **longest** length..."
- "Return the **number of ways** to..."
- *(If the problem asks you to "Return ALL possible combinations", it is Backtracking, not DP).*

**Clue 2: The Decisions Affect the Future**
- If you make Choice A, it limits or changes what Choice B can do.
- "You cannot rob adjacent houses."
- "You have exactly K transactions."
- "The array must be strictly increasing."

**Clue 3: Overlapping Subproblems (The Smell Test)**
- Can you solve a small part of the array, and use that answer if that exact same subarray appears again later?
- If yes, it has overlapping subproblems.
