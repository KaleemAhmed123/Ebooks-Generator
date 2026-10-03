### Where it appears

| Problem | What the difference array tracks |
|---|---|
| [Corporate Flight Bookings](https://leetcode.com/problems/corporate-flight-bookings/) (LeetCode 1109) | seat reservations per flight |
| [Car Pooling](https://leetcode.com/problems/car-pooling/) (LeetCode 1094) | passengers on board; fail if running sum > capacity |
| [Shifting Letters II](https://leetcode.com/problems/shifting-letters-ii/) (LeetCode 2381) | cumulative shift amount mod 26 |
| [Increment Submatrices by One](https://leetcode.com/problems/increment-submatrices-by-one/) (LeetCode 2536) | 2-D: four corners, then row and column prefix sums |

:::interview
"What if the coordinate range is huge — say up to 10⁹?"

You cannot allocate an array of a billion slots. Coordinate-compress first: collect every L and R + 1 into a sorted set, map them to consecutive indices, run the difference array on those indices, then expand back. This is the sweep-line approach (07-06).
:::
