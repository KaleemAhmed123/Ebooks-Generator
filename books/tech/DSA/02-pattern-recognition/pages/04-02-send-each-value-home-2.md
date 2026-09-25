### Variations

- **Find Missing and Repeating (GFG):** place values home; the one index `i` with `a[i] ≠ i + 1` holds the repeated value, and `i + 1` is the missing one
- **Find All Numbers Disappeared in an Array (LeetCode 448):** the sign-flag version. For each `v`, make `a[|v| − 1]` negative. Indices still positive at the end are the missing values
- **Minimum Swaps to Sort (GFG), distinct values:** map each value to its sorted position, then follow cycles. A cycle of length L needs L − 1 swaps, so the answer is `n − (number of cycles)`
- **Find the Duplicate Number (LeetCode 287):** the array must *not* be modified. Swapping is banned; follow `i → a[i]` as a linked list instead and find the cycle entry (Chapter 12)

### The failure

- **Looping forever on duplicates.** Guard the swap with `a[i] !== i + 1` instead of `a[a[i] − 1] !== a[i]` and `[1, 1]` never terminates: at `i = 1` the 1 is not home, its home already holds a 1, and the swap exchanges a 1 for a 1 forever. Ask "does the *home* already hold this value?", not "is this slot correct?"
- **Advancing `i` after one swap.** An `if` instead of a `while` moves on while `a[i]` still holds a stranger that needed its own trip home, and the final scan reports the wrong missing value

:::interview
"The nested loop looks O(n²) — why is it O(n)?" — Each swap sends one value to its home, and a value at home is never moved again because the guard skips it. So the inner `while` runs at most n times across the whole outer loop. It is the same amortised argument as a monotonic stack.
:::
