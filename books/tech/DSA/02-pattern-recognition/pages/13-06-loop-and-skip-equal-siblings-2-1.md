## Loop and Skip Equal Siblings 🟡 - continued

```ts
// Combination Sum II (LeetCode 40)
// each candidate may be used at most once
function combinationSum2(c: number[], target: number): number[][] {
  c.sort((a, b) => a - b);
  const out: number[][] = [], cur: number[] = [];
  const go = (start: number, rem: number) => {
    if (rem === 0) { out.push([...cur]); return; }
    for (let i = start; i < c.length; i++) {
      // equal sibling
      if (i > start && c[i] === c[i - 1]) continue;
      // sorted: rest too big
      if (c[i] > rem) break;
      cur.push(c[i]);
      // i + 1: use once
      go(i + 1, rem - c[i]);
      cur.pop();
    }
  };
  go(0, target);
  return out;
}
```

### Variations

- **Subsets II (LeetCode 90):** every node of the loop tree is a subset, not only the leaves. Record `cur` on entry, then the same loop with the same skip rule
- **Combination Sum III (LeetCode 216):** candidates are 1..9, no duplicates, so no skip; add a size limit k as a second base case
- **Permutations II (LeetCode 47):** the duplicate rule is different, because order matters; see page 13-08
- **The same idea without recursion:** 3Sum's "skip equal first values" (page 02-10) is this rule at depth one
