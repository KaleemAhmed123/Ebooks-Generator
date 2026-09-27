# Chapter 17 - DP & Games

## Dynamic Programming <span class="lv lv1"></span>

- **What it is:** a choice at each step, an optimum or a count to report, and a brute-force recursion whose calls repeat the same arguments. Cache the calls and it is DP (Module 06 builds the method)
- **Signal:** "maximum / minimum / number of ways", and a choice whose effect reaches later steps
- **Mechanism:** the recursion's arguments are the state, each solved once; the table is only the memo

### The moves

| Move | Signature | Typical ask |
|---|---|---|
| **17-02** | name the shape first | which DP is this? |
| **17-03** | `f(i)`, a pick jumps ahead | weighted intervals |
| **17-04** | `f(i, holding, k)` | stocks with rules |
| **17-05** | `f(i, j)`, loop the split | cut, merge, burst |
| **17-06** | `f(i, j)` = the mover's lead | two perfect players |

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
