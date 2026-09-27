# Chapter 13 - Recursion & Backtracking

## Recursion & Backtracking <span class="lv lv1"></span>

- **What it is:** a recursive function is three statements: a hypothesis (what `f(n)` does), a base case, and an induction step that trusts a smaller call. Backtracking is recursion over choices: choose, recurse, undo
- **Signal:** "all subsets / combinations / permutations", "every path", "split into valid pieces", "place n queens", n ≤ 20
- **Mechanism:** the start index of the next call encodes the rules: `i + 1` uses each item once, `i` lets it repeat, `0` lets an earlier item follow a later one, so order counts

### The moves

| Move | When to use | What it exploits |
|---|---|---|
| **13-01** | a smaller copy of itself | induction replaces tracing |
| **13-02** | forward or reverse order | before or after the call |
| **13-05** | all subsets, distinct items | one take-or-leave per item |
| **13-06** | duplicates in, none out | skip equal siblings |
| **13-07** | reuse allowed, or order counts | start at `i`, or at `0` |
| **13-08** | all arrangements | fill slot k from the unused |
| **13-09** | split into valid pieces | fix the first piece |
| **13-04** | paths through grid cells | mark, move, unmark |
| **13-10** | a rule links the choices | O(1) checks, exact undo |
