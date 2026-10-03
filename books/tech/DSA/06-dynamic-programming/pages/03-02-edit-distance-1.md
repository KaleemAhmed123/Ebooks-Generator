## Edit Distance <span class="lv lv1"></span>

Edit distance (Levenshtein distance) measures the minimum number of single-character operations to turn one string into another. It powers spellcheckers and DNA sequence alignment.

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
