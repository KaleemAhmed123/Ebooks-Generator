### Variations

- **Next Greater Element II (LeetCode 503):** run the monotonic stack (Chapter 10) over `i = 0 .. 2n − 1` and push only during the first lap. The second lap only resolves elements still waiting
- **House Robber II (LeetCode 213):** here wrapping is a *constraint*, not a view: house 0 and house n − 1 cannot both be taken. Solve two linear problems, `[0 .. n−2]` and `[1 .. n−1]`, and take the better
- **Defuse the Bomb (LeetCode 1652):** a fixed window of k on a circle; the sum for `i` is a window starting at `i + 1` (or ending at `i − 1` when k < 0) read with `% n`
- **Gas Station / circular tour:** the wrap is handled by a single pass plus a reset rule (page 08-06), not by doubling

### The failure

- **Allocating the doubled array anyway.** `[...a, ...a]` works and is O(n) extra memory; with n = 10⁵ it is harmless, but interviewers asking "circular" often follow with "O(1) space". The modulo costs nothing
- **Running `2n` iterations for fixed windows.** For windows of length L, starts `0..n−1` need only `n + L − 1` steps. Running `2n` counts each wrapped window twice, which is harmless for a maximum and wrong for a count
- **Negative indices.** `(i − k) % n` is negative in JS when `i < k`. Use `((i − k) % n + n) % n`, or arrange the loop so the index never goes below zero, as the template does

:::interview
"How do you handle circular arrays without copying?" — Any run in the circle is a linear run in the array written twice, so I iterate a virtual doubled array with `i % n`. For fixed windows of length L I stop at `n + L − 1`, which is exactly one window per starting index.
:::
