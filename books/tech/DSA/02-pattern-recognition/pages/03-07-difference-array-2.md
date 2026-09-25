### Variations

- **Car Pooling (LeetCode 1094):** `+passengers` at pick-up, `−passengers` at drop-off; fail as soon as the running sum exceeds capacity
- **Shifting Letters II (LeetCode 2381):** the update is a shift of ±1 per range; apply the running sum mod 26 per letter
- **Increment Submatrices by One (LeetCode 2536):** 2-D version: four corner writes per rectangle, then running sums along rows and then columns
- **Coordinates up to 10⁹:** too sparse for an array; sort the ±x events instead, which is the sweep line (07-06)

### The failure

- **Reading before the updates finish.** The array is only correct after the final running sum. If queries arrive *between* updates, rebuilding each time is O(n) per query; switch to a Fenwick or lazy segment tree (19-01)

:::interview
"Why is the difference array O(n + q) instead of O(n · q)?" — Each range update touches two cells, whatever its width, so q updates cost O(q). The single running sum at the end applies all of them at once in O(n). The price is that nothing can be read until that last pass.
:::
