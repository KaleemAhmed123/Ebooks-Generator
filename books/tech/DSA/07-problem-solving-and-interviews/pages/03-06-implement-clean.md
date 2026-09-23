## Phase 5: Implement Cleanly

This is where you write the code. 
A brilliant algorithm written like garbage will fail the interview. The interviewer wants to know if they can maintain your code in production.

### The 3 Rules of Interview Code

**1. Variable Naming:**
Never use `a`, `b`, `c`, `arr1`, `arr2`.
Use `left`, `right`, `maxProfit`, `validPaths`, `wordList`.
In DP, use `dp` (it's universally understood).
In Graphs, use `adj` (adjacency list) and `visited`.

**2. Modularization:**
If a piece of logic is conceptually separate, put it in a helper function.
- Do not write a 40-line `while` loop that handles BFS queue popping *and* checking if a coordinate is valid *and* calculating distances.
- Write a 1-line helper: `const isValid = (r, c) => r >= 0 && r < m && c >= 0 && c < n;`
- Call it: `if (!isValid(nx, ny)) continue;`
This makes your main loop read like English.

**3. Talk While You Type:**
Silence is deadly. You do not need to narrate every character, but you should announce your blocks.
- *"First, I'll initialize the base cases for the DP table..."* [Types for 15 seconds]
- *"Now I'll write the nested loops to fill the grid. The outer loop is rows, inner is columns..."* [Types]
- *"Inside the loop, the transition takes the minimum of the top and left cell..."*

If you make a typo while talking, the interviewer will often gently correct you ("I think you meant `n` there instead of `m`"). If you are silent, they will let you fail.
