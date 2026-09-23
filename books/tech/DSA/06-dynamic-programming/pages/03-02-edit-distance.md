## Edit Distance

This is arguably the most famous 2D String DP problem. It powers spellcheckers and DNA sequence alignment (Levenshtein Distance).

- **The Setup:** Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`. You have 3 allowed operations: Insert a character, Delete a character, Replace a character.
- **Example:** `horse` -> `ros`. 
  - `horse` -> `rorse` (replace h with r)
  - `rorse` -> `rose` (remove r)
  - `rose` -> `ros` (remove e)
  - Minimum operations: 3.
- **The State:** `dp[i][j]` = the minimum operations to convert `word1` up to length `i` into `word2` up to length `j`.

### The Transition

Like LCS, we look at the last characters `word1[i-1]` and `word2[j-1]`.

1. **They Match:** `"cat"` and `"bat"`. 
   - The `'t'` matches. It costs 0 operations. The total cost is just the cost to convert `"ca"` to `"ba"`.
   - `dp[i][j] = dp[i-1][j-1]`

2. **They Do Not Match:** `"cat"` and `"car"`. We must spend 1 operation. We take the minimum of the three possible operations:
   - **Replace:** We replace `'t'` with `'r'`. Now they match. The remaining cost is converting `"ca"` to `"ca"`. -> `dp[i-1][j-1]`
   - **Delete:** We delete `'t'`. Now we must convert `"ca"` to `"car"`. -> `dp[i-1][j]`
   - **Insert:** We insert an `'r'` at the end of `"cat"`. The new `'r'` matches the target `'r'`. The remaining cost is converting `"cat"` to `"ca"`. -> `dp[i][j-1]`

`dp[i][j] = 1 + Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])`

### Base Cases

- If `word1` is empty (length 0), the only way to make `word2` of length `j` is to **insert** `j` characters. `dp[0][j] = j`.
- If `word2` is empty (length 0), the only way to convert `word1` of length `i` is to **delete** `i` characters. `dp[i][0] = i`.

### Implementation (Tabulation)

```ts
function minDistance(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  // Base Cases
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  // Transition
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j - 1], // Replace
          dp[i - 1][j],     // Delete
          dp[i][j - 1]      // Insert
        );
      }
    }
  }
  return dp[m][n];
}
```
