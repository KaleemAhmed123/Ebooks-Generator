# Chapter 17 - DP & Games

## Repeated State? See Dynamic Programming <span class="lv lv1"></span>

- The chapters before this one focus on patterns that can be solved by manipulating data structures (stacks, queues, heaps) or traversing boundaries (binary search, two pointers)
- But what happens when the problem requires you to make a choice, and that choice leads to a state you have already evaluated?

### The DP Boundary

- If you draw the decision tree for a problem and notice that you are solving the **exact same subproblem** multiple times, you have crossed the boundary from Pattern Recognition into Dynamic Programming
- **Example:** "Find the number of ways to climb stairs." 
  - Choice 1: take 1 step. You are now at stair N − 1
  - Choice 2: take 2 steps. You are now at stair N − 2
  - If you take a 1-step then a 1-step, you are at N − 2. You have arrived at the same state via a different path
- When states repeat, you must cache the results to avoid exponential blowup. This is memoization (or tabulation)

### Where to go next

- If your problem involves **repeated overlapping subproblems** or finding the optimal substructure, jump to **Module 06: Dynamic Programming**
- Module 06 works the common families in full: linear, knapsack, two-string, grid, tree, bitmask and digit DP

### This chapter

- **17-02 Name the DP shape:** your recursion's arguments name the problem family
- **17-03 to 17-06:** four shapes Module 06 does not work in full: pick then jump, track what you hold, try every split, assume the opponent is perfect
- **17-07 Drills:** 59 named problems, each reduced to a signature and a transition
