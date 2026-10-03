```ts
// Uses the Fenwick class on 19-01. Count Smaller Numbers After Self (LeetCode 315).
function countSmaller(nums: number[]): number[] {
  const sorted = [...new Set(nums)].sort((a, b) => a - b);      // compress → 19-02
  const rank = new Map(sorted.map((v, i) => [v, i + 1]));       // 1-indexed for Fenwick
  const bit = new Fenwick(sorted.length);
  const res = new Array(nums.length).fill(0);
  for (let i = nums.length - 1; i >= 0; i--) {                  // right → left
    const r = rank.get(nums[i])!;
    res[i] = bit.sum(r - 1);                                    // already-seen values below
    bit.add(r, 1);                                              // mark this value present
  }
  return res;
}
```

- **Watch out:** a Fenwick is **1-indexed** — slot 0 is the walk's stop, so shift ranks by +1. For "count inversions" the same code over the whole array sums `bit.sum(maxRank) − bit.sum(r)` instead, i.e. the already-seen values *above* the current one
### Where it appears

| Problem | What each insert counts |
|---|---|
| [Count of Smaller Numbers After Self](https://leetcode.com/problems/count-of-smaller-numbers-after-self/) (LeetCode 315) | seen values below the current, scanning right→left |
| [Reverse Pairs](https://leetcode.com/problems/reverse-pairs/) (LeetCode 493) | seen values greater than `2·current` |
| [Range Sum Query - Mutable](https://leetcode.com/problems/range-sum-query-mutable/) (LeetCode 307) | running sum with point updates |

:::interview
"Count inversions can be done with merge sort too. Why pick a Fenwick?"

Both are O(n log n). Merge sort counts inversions as a side effect of the merge step and needs no value compression, so it wins when inversions are the *only* question. A Fenwick wins when the problem keeps asking *online* count queries as values arrive or change — "after each insert, how many below x" — because the structure stays live between queries, whereas merge sort computes its answer once and is done. The Fenwick also generalises to arbitrary range counts after compression; merge sort does not.
:::
