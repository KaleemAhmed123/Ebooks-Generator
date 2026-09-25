### The failure

- **Starting at the top-left.** From `(0, 0)` both moves (right and down) *increase* the value, so a comparison never tells you which way to go. Only the top-right and bottom-left corners have one smaller and one larger neighbour

:::interview
"Why is staircase search O(R + C) and not O(R · C)?" — Every comparison removes a whole row (when the corner value is too small) or a whole column (when it is too large). There are only R rows and C columns to remove, so at most R + C steps happen before the pointer leaves the matrix.
:::
