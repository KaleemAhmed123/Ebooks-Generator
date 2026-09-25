### Variations

- **Circular tour (GFG):** the same problem with `petrol` and `distance`; return the first pump index or −1
- **Minimum Number of Refueling Stops (LeetCode 871):** the route is a line and you choose where to stop. Restarting does not apply; take fuel "retroactively" from a max-heap of passed stations (page 15-06)
- **The same reset in another form:** Kadane's algorithm (page 03-06) drops a prefix whose sum is negative for exactly this reason: a prefix that only hurts cannot be part of the best continuation

### The failure

- **Trying every start.** Simulating a full lap from each station is O(n²): 10¹⁰ steps at n = 10⁵, LeetCode 134's limit
- **Skipping the total check.** The single pass never wraps around. Without `total ≥ 0`, gas `[2, 3, 4]` and cost `[3, 4, 3]` return start 2, but the total is −1 and no start completes the lap

:::interview
"Why don't you need to go around the circle twice?" — Two facts. If the total gas covers the total cost, a valid start exists. And if a start fails at station `i`, every start between it and `i` fails too, so the only surviving candidate is the station after the last failure. One pass computes both: O(n) time, O(1) space.
:::
