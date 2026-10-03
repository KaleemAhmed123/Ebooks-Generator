### The skeleton: memoised recursion

```ts
function f(i: number, cap: number): number {             // the arguments ARE the state
  if (i === n) return 0;                                 // base case
  const key = i + "," + cap; if (memo.has(key)) return memo.get(key)!; // seen
  let best = f(i + 1, cap);                              // skip
  if (w[i] <= cap) best = Math.max(best, v[i] + f(i + 1, cap - w[i])); // take
  memo.set(key, best); return best;
}
```

### The trap: greedy, regret, or DP?

- Intervals worth 1: earliest end (07-07). Durations and deadlines: drop the longest (15-06). Fixed times, different profits: a cheap job blocks two rich ones: DP (17-03)
