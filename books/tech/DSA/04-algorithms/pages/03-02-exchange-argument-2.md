### The Proof

1. **Assume an Optimal Solution exists that is NOT our Greedy Solution.**
   - Since it is not sorted by deadline, there must exist at least one pair of adjacent tasks where Task B is scheduled *before* Task A, even though Task A has an *earlier* deadline (D_A < D_B).
   - This is called an "inversion".
2. **The Exchange:**
   - Swap Task B and Task A so they are now in the Greedy order.
3. **Analyze the Impact:**
   - The tasks finish at exactly the same combined time, so all tasks scheduled *after* them are completely unaffected.
   - Task B now finishes later than it used to. But its deadline D_B is *later* than D_A, so its lateness is less than or equal to Task A's original lateness.
   - We swapped them, and the maximum lateness of the schedule did *not* increase.
4. **Conclusion:**
   - We can repeatedly swap every inversion until the schedule is perfectly sorted by deadline (our Greedy solution), and the score never gets worse. Therefore, the Greedy solution is perfectly optimal.

### Why learn this?

You won't be asked to write formal mathematical proofs in a coding interview. However, mentally running the Exchange Argument in your head ("If I swap these two choices, does the total score get worse?") is the fastest way to verify if your greedy intuition is actually correct before you start coding.
