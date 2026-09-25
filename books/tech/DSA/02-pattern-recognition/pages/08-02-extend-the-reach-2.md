### Variations

- **Jump Game (LeetCode 55):** only `far` is needed. If `i > far` at any point, index `i` is unreachable; return false
- **Minimum Number of Taps to Open to Water a Garden (LeetCode 1326):** tap `i` covers `[i − r, i + r]`. Convert to `reach[left] = max(reach[left], right)` for each tap, then run the level loop over `reach`; if `far` stops growing before `n`, return −1
- **Video Stitching (LeetCode 1024):** clips are intervals over `[0, time]`; the same reach conversion, the same loop
- **Minimum number of jumps (GFG):** Jump Game II without the reachability promise. Return −1 when `i === end` and `far === end` (no progress possible)

### The failure

- **Looping to the last index.** Running `i` up to `n − 1` counts one extra jump whenever `end` lands exactly on the last index, because the loop then "jumps" from the destination
- **Missing the stuck case.** Without the guarantee, `[1, 0, 2]` sets `end = far = 1` and never grows. Check for `far === end` at a forced jump, or the loop reports a jump count for an unreachable end

:::interview
"Why is greedy optimal for Jump Game II?" — It is breadth-first search where every level is an interval. After k jumps the reachable set is `[0, end]`, and the next set is `[0, far]`, where `far` is the best reach from anything in the current level. Greedy computes exactly those levels, so the first level containing the last index is the minimum. O(n) time, O(1) space.
:::
