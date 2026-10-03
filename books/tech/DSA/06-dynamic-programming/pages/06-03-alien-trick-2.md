### The Penalty System

1. Instead of enforcing "Exactly K operations", we say "You can use as many operations as you want, but every operation costs you a **Penalty lambda**."
2. We run the O(N) 1D DP to find the maximum profit *minus penalties*.
3. At the end of the DP, we check how many operations the DP *naturally chose to use* to maximize profit under that penalty.
   - If it used > K operations, the penalty was too cheap. We need to raise lambda.
   - If it used < K operations, the penalty was too harsh. We lower lambda.
4. We **Binary Search** the value of the penalty lambda until the DP organically decides to use exactly K operations.

### The Complexity

- The standard DP is O(N times K).
- The Alien Trick DP is O(N log(text{Max Penalty})).
- If Max Penalty is 10⁹, log(10⁹) ≈ 30. The time complexity is O(30 N), which easily passes when K = 10⁵.

This technique is mathematically dense, but conceptually beautiful: using binary search to dynamically manipulate the constraints of a DP until the unconstrained optimal aligns perfectly with the constrained target.
