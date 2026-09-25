## Stay to Reuse, Restart to Revisit <span class="lv lv2"></span> - continued

```ts
// Combination Sum (LeetCode 39): reuse allowed, order ignored
function combinationSum(c: number[], target: number): number[][] {
  const out: number[][] = [], cur: number[] = [];
  const go = (start: number, rem: number) => {
    if (rem === 0) { out.push([...cur]); return; }
    for (let i = start; i < c.length; i++) {
      if (c[i] > rem) continue;
      cur.push(c[i]);
      // stay: c[i] may be used again
      go(i, rem - c[i]);
      cur.pop();
    }
  };
  go(0, target);
  return out;
}

// Combination Sum IV (LeetCode 377): count ordered sequences
function combinationSum4(nums: number[], target: number): number {
  const memo = new Map<number, number>();
  const ways = (rem: number): number => {
    if (rem === 0) return 1;
    if (memo.has(rem)) return memo.get(rem)!;
    let w = 0;
    // restart
    for (const x of nums) if (x <= rem) w += ways(rem - x);
    memo.set(rem, w);
    return w;
  };
  return ways(target);
}
```
