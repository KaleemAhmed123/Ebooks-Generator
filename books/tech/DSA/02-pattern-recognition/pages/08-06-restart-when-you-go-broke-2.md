### Where it appears

| Problem | What triggers the restart |
|---|---|
| [Gas Station](https://leetcode.com/problems/gas-station/) (LeetCode 134) | running tank < 0 |
| [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) (LeetCode 53) | Kadane: prefix sum < 0 (→ 03-06) |

:::interview
"Why does the total check guarantee the last restart works?"

If `total ≥ 0`, enough fuel exists for one full lap. Every restart discards a range whose net fuel is negative. The last restart's range absorbs all those losses — the remaining portion from `start` to the end plus the wrap-around through the failed ranges nets to `total ≥ 0`. If no restart point worked, `total` would be negative.
:::
