## How to Invent a State

The hardest part of DP is not the transition. It is Step 1: Inventing the State.

If you pick the wrong state, no transition will ever work. If you pick the right state, the transition practically writes itself.

> "What information about the past is necessary to make the future independent of everything else?" 
> — That question is the entire skill of DP.

### The Memory Wipe Test

To invent a state, imagine a computer executing your Brute Force recursion. It processes elements 0, 1, 2, 3, and is currently looking at element 4. 
Suddenly, someone unplugs the computer. Its RAM is wiped. 
You reboot it and want to resume the calculation exactly at element 4. 

**What is the absolute minimum amount of information you must feed the computer so it can finish the problem without ever looking at elements 0-3 again?**

- **Scenario A (House Robber):** You want to rob houses. You cannot rob adjacent houses.
  - You are at house 4. What do you need to know?
  - Do you need to know if you robbed house 0? No. 
  - Do you need to know if you robbed house 1? No.
  - Do you need to know if you robbed house 3? **YES.** If you robbed 3, you cannot rob 4.
  - *The State:* We just need our current index `i`. (The fact that we are evaluating `i` inherently assumes we made valid choices in the past. We only need `i` because the transition `max(rob(i-2) + val, rob(i-1))` handles the adjacency rule organically). 
  - *State = 1D `(index)`*.

- **Scenario B (Knapsack):** You have a backpack with capacity `C`. You are evaluating item `i`.
  - Do you need to know if you took item 0? Not specifically.
  - But do you need to know how much *weight* those past decisions consumed? **YES.**
  - If the computer only knows it is at item 4, it might try to put a 5kg item into a backpack that only has 2kg of space left.
  - *The State:* We need our current index `i`, AND the `remaining_capacity`.
  - *State = 2D `(index, capacity)`*.

- **Scenario C (Stock Trading with Cooldown):** You can buy, sell, or cooldown. You cannot buy on the day immediately following a sell.
  - You are at day `i`. What do you need to know?
  - You need to know your *status*. Are you currently holding a stock? Are you in a cooldown period? Are you free to buy?
  - *The State:* We need `i`, AND `status` (0=holding, 1=cooldown, 2=free).
  - *State = 2D `(index, status)`*.

### The Rule of Thumb

Start with the simplest state possible: just the `index`. 
Write the transition. If you realize "Wait, I can't make this choice because I don't know if X happened", then add `X` to your state.
Every variable you add to your state multiplies the time and space complexity. A 1D state is O(N). A 2D state is O(N times M). Be stingy with your state variables.
