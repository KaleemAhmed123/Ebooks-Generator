## Digit DP Framework <span class="lv lv2"></span>

Digit DP is a highly specialized, formulaic sub-genre of DP.
- **The Core Problem:** "Find the number of integers between A and B (where A, B ≤ 10¹⁸) that satisfy some specific mathematical property."
- 10¹⁸ means a standard `for` loop from A to B will take years to finish. 
- You must construct the numbers **digit by digit** from left to right.

### The Trick: F(B) - F(A-1)

Instead of finding numbers strictly between A and B, we write a function `F(X)` that finds the count between 0 and X.
The answer is then simply `F(B) - F(A-1)`. This halves the complexity of our state management.

### The State

To build a number left to right without exceeding X, we need a state:
`dp(index, isTight, ...customState)`

1. **`index`**: Which digit of X are we currently placing? (0 to length-1).
2. **`isTight`**: A boolean flag. 
   - If X = 314, and the first digit we placed was a `2`, we are free to place `9` as our next digit (e.g., `299 < 314`). `isTight` is False.
   - If the first digit we placed was a `3`, we are strictly bounded. We cannot place a `9`. We can only place up to `1`. `isTight` is True.
   - If `isTight` is true, the `limit` for the current digit is X[index]. If `isTight` is false, the `limit` is 9.
