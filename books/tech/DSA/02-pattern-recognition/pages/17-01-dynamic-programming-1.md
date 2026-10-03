# Chapter 17 - DP & Games

## Dynamic Programming <span class="lv lv1"></span>

- **What it is:** a choice at each step, an optimum or a count to report, and a brute-force recursion whose calls repeat the same arguments. Cache the calls and it is DP
- **Signal:** "maximum / minimum / number of ways", and a choice whose effect reaches later steps
- **Mechanism:** the recursion's arguments are the state, each solved once; the table is only the memo. This chapter names each shape and gives a worked template; Module 06 goes deeper (state invention, optimisation, digit/probability DP)

### The moves

| Move | Signature | Typical ask |
|---|---|---|
| **17-02** | name the shape first | which DP is this? |
| **17-03** | `f(i)`, a pick jumps ahead | weighted intervals |
| **17-08** | `f(r, c)`, right / down | grid path min/max/count |
| **17-09** | `f(i, budget)`, take or skip | knapsack, subset sum |
| **17-10** | `f(i, j)` on one range | palindromic subsequence |
| **17-11** | tails + binary search | longest increasing subseq |
| **17-12** | `f(i, j)`, one index per string | LCS, edit distance |
| **17-04** | `f(i, holding, k)` | stocks with rules |
| **17-05** | `f(i, j)`, loop the split | cut, merge, burst |
| **17-06** | `f(i, j)` = the mover's lead | two perfect players |
| **17-13** | `dp[mask]`, n ≤ 20 | assign / visit-all subsets |
