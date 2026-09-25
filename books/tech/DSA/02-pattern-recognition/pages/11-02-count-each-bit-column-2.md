### Variations

- **Total Hamming Distance (LeetCode 477):** for each column, `ones · (n − ones)` pairs differ there. Sum over 32 columns: O(32 · n) instead of O(n²) pairs
- **Minimum Flips to Make a OR b Equal to c (LeetCode 1318):** column by column: if c's bit is 1 and both a and b are 0, one flip; if c's bit is 0, flip every 1 in a and b
- **Bit Difference (GFG):** bits to flip to turn A into B = number of 1s in `A ^ B`
- **Count total set bits in all numbers from 1 to n (GFG):** column b repeats a block of `2^b` zeros then `2^b` ones. Full blocks give `⌊(n+1) / 2^(b+1)⌋ · 2^b` ones, the partial block adds `max(0, (n+1) mod 2^(b+1) − 2^b)`
- **Constant-space state machine:** 137 also has a two-variable solution (`ones`, `twos`) that counts mod 3 in every column at once. It is the same idea, compressed

### The failure

- **Losing the sign.** A negative single value has bit 31 set. Build the answer with bitwise `|=`, which stays in signed 32-bit; accumulate with `result += 2 ** b` instead and `[−2, −2, 1, 1, −3, 1, −3, −3, −4, −2]` returns 4294967292 instead of −4
- **Using `>>` to read a column.** `(x >> 31) & 1` happens to work, but `x >> b` on negative numbers fills with 1s from the left, which matters as soon as you compare or count shifted values themselves. `>>>` is the unambiguous choice

:::interview
"How do you find the one number that appears once when the rest appear three times, in O(1) space?" — Count the 1s in each of the 32 bit positions. Values that appear three times add a multiple of 3 to every position they touch, so `count % 3` is exactly the single number's bit. 32 passes of O(n), constant memory, and it generalises to any repeat count k.
:::
