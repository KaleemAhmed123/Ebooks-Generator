# Chapter 17 - DP & Games

## Repeated State? See Dynamic Programming <span class="lv lv1"></span>

- **What it is:** A choice at each step, an optimum or a count to report, and a brute-force recursion whose calls repeat the same arguments. Cache the calls and it becomes DP (Module 06, 01-01)
- **Signal:** "maximum / minimum / number of ways", and a choice whose effect reaches later steps: an item taken now blocks, shrinks or reprices what comes after
- **Why it works:** The same scheduling statement can need three different tools. The question that separates them is how far a wrong choice reaches

:::mint
<svg viewBox="0 0 470 150" role="img" aria-label="Decision chart: greedy, regret heap or DP. First question: is every item worth the same, and can the greedy pick be swapped into any optimal answer without loss? Yes leads to greedy, page 08-01, Maximum Length of Pair Chain, LeetCode 646. No leads to the second question: can a bad early pick be repaired later by one swap? Yes leads to a regret heap, page 15-06, Course Schedule III, LeetCode 630. No leads to the third case: choices interact through a small state, so write the DP signature, page 17-02, Maximum Profit in Job Scheduling, LeetCode 1235." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 8.5px Consolas, monospace; fill: #1a1a1a; }
    .q { font: 8.5px Georgia, serif; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .ex { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1; fill: none; }
  </style>
  <defs><marker id="m1701" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1a1a1a"/></marker></defs>
  <rect class="bx" x="8" y="6" width="226" height="34" rx="3"/>
  <text x="16" y="20" class="q">Every item worth the same, and the greedy pick</text>
  <text x="16" y="32" class="q">swaps into any optimum without loss?</text>
  <rect class="bx" x="8" y="58" width="226" height="34" rx="3"/>
  <text x="16" y="72" class="q">A bad early pick can be repaired later</text>
  <text x="16" y="84" class="q">by undoing one choice?</text>
  <rect class="bx" x="8" y="110" width="226" height="34" rx="3"/>
  <text x="16" y="124" class="q">Choices interact through a small state</text>
  <text x="16" y="136" class="q">(an index, a budget, what you hold)</text>
  <path class="a" d="M 121 40 L 121 57" marker-end="url(#m1701)"/><text x="127" y="52" class="sm">no</text>
  <path class="a" d="M 121 92 L 121 109" marker-end="url(#m1701)"/><text x="127" y="104" class="sm">no</text>
  <path class="a" d="M 234 23 L 267 23" marker-end="url(#m1701)"/><text x="240" y="19" class="sm">yes</text>
  <path class="a" d="M 234 75 L 267 75" marker-end="url(#m1701)"/><text x="240" y="71" class="sm">yes</text>
  <path class="a" d="M 234 127 L 267 127" marker-end="url(#m1701)"/>
  <rect class="ex" x="268" y="6" width="196" height="34" rx="3"/>
  <text x="275" y="20" class="lb">greedy · 08-01 · LeetCode 646</text>
  <text x="275" y="32" class="sm">Maximum Length of Pair Chain</text>
  <rect class="ex" x="268" y="58" width="196" height="34" rx="3"/>
  <text x="275" y="72" class="lb">regret heap · 15-06 · LeetCode 630</text>
  <text x="275" y="84" class="sm">Course Schedule III</text>
  <rect class="ex" x="268" y="110" width="196" height="34" rx="3"/>
  <text x="275" y="124" class="lb">DP · 17-02 · LeetCode 1235</text>
  <text x="275" y="136" class="sm">Maximum Profit in Job Scheduling</text>
</svg>
:::

- **The three canonicals are one story.** Intervals worth 1 each: earliest end first is safe. Courses with durations and deadlines: take each, drop the longest when a deadline breaks. Jobs with fixed times and different profits: a cheap early job can block two rich ones, and no single swap repairs that, so the state is the next free index

### This chapter

- **17-02 Name the DP shape:** the recursion's arguments name the family, and n picks the signature
- **Pattern 48 · Pick, then Jump (17-03)**, **Pattern 49 · Track What You Hold (17-04)**, **Pattern 50 · Try Every Split (17-05)**, **Pattern 51 · Assume a Perfect Opponent (17-06):** four shapes Module 06 does not work in full
- Module 06 works the common families: linear, knapsack, two-string, grid, tree, bitmask and digit DP
- **17-07 Drills:** 12 disguised statements
