### Variations

- **Bulb Switcher (LeetCode 319):** bulb `i` is toggled once per divisor of `i`. Divisors come in pairs except for perfect squares, so the bulbs left on are the squares: `⌊√n⌋`, no simulation
- **Maximize Sum Of Array After K Negations (LeetCode 1005):** negate the most negative values first. If negations remain, their parity is all that matters: an even count cancels, an odd count lands once on the smallest absolute value
- **Bulbs with a switch that flips the suffix (GFG):** pressing a switch flips everything to its right. Scan left to right carrying the parity of presses so far; a bulb's *effective* state is `bulb XOR parity`, and every effective 0 costs one press
- **Minimum Replacements to Sort the Array (LeetCode 2366):** walk right to left keeping the allowed maximum `m`. A value `x > m` must split into `k = ⌈x / m⌉` parts (`k − 1` operations), and the new maximum is `⌊x / k⌋`, the largest equal split
- **Minimum Operations to Make the Array Increasing (LeetCode 1827):** each element must reach `prev + 1`; add the gap and move on. The invariant is "the previous value is already final"

### The failure

- **Simulating.** Incrementing n − 1 elements one step at a time is O(answer · n); with values up to 10⁹ the answer alone can reach ~2·10⁹ steps
- **Using leftover negations on the wrong element.** In 1005, spending an odd remainder on the element you last negated can lower the sum more than necessary. Spend it on the smallest absolute value in the whole array

:::interview
"How do you approach a 'minimum operations' problem you have not seen?" — I run the operation on a tiny input by hand and look for what it does *not* change: pairwise differences, parity, the sum, a count of divisors. Once I find that invariant, the answer is usually a formula or a single pass, and I can justify it without a search.
:::
