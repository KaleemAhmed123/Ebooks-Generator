### Variations

- **The Number of Weak Characters in the Game (LeetCode 1996):** sort attack descending and, within equal attack, defense *ascending*; a character is weak if its defense is below the best defense seen. This is a 2-D Pareto frontier collapsed to a running maximum
- **Russian Doll Envelopes (LeetCode 354):** sort by width ascending and height descending on ties; for each chain length keep only the smallest ending height; a larger tail of the same length is dominated (patience sorting)
- **Next Greater Element / Daily Temperatures:** the stack pops elements a newcomer dominates (10-05)
- **Sliding Window Maximum:** a newer, larger value dominates older smaller ones *and* outlives them (10-10)

### The failure

- **Counting equal arrival times as a new fleet.** A car that reaches the fleet exactly at the target still joins it. With `time >= slowest` as the test, target 10, positions `[0, 5]`, speeds `[2, 1]` report 2 fleets; both arrive at hour 5, so the answer is 1

:::interview
"Why is Car Fleet O(n log n) and not O(n²)?" — After sorting by position, a car is either slower than the fleet ahead, and leads a new one, or faster, and is absorbed: it can never matter to anyone behind it. So one pass with a single number, the slowest arrival ahead, replaces simulating every pair.
:::
