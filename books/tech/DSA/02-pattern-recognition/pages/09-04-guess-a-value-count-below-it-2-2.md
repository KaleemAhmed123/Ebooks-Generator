### The failure

- **Stopping when `count(mid) === k`.** `mid` may not be in the matrix: with `[[1, 3], [5, 7]]` and k = 2, `count(4) = 2` but 4 is not an element. Keep searching for the *smallest* feasible value; that one is always an element
- **Using `lo <= hi` with `hi = mid`.** The loop never ends when `lo === hi === mid`. The "first true" template (page 18-12) uses `lo < hi` and `hi = mid`

:::interview
"Why does binary searching on values return an actual matrix element?" — `count(x)` only increases at values present in the matrix. The smallest `x` with `count(x) ≥ k` is therefore a point where the count just jumped, which is an element. So I never need the elements explicitly: log(max − min) guesses, each an O(n) staircase count.
:::
