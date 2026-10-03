## The Exchange Argument <span class="lv lv2"></span>

- This is the most formal and bulletproof way to prove that your greedy algorithm is correct. It is a mathematical proof technique.
- **The Core Idea:** You assume there exists some hypothetical "Optimal" solution that is *different* from your "Greedy" solution. You then prove that you can swap (exchange) elements in the Optimal solution to make it look exactly like your Greedy solution, *without making the solution any worse*.
- If you can transform the Optimal solution into the Greedy solution without losing value, then the Greedy solution must also be Optimal.

### Example: Minimizing Lateness

- **Problem:** You have N tasks, each with a duration T_i and a deadline D_i. You can only do one task at a time. Order them to minimize the maximum lateness (how far past the deadline a task finishes).
- **Greedy Strategy:** Sort the tasks strictly by their deadline D_i (earliest deadline first).
