## Name the DP Shape <span class="lv lv1"></span>

- **What it is:** Every DP problem is named by the arguments of its recursion. Before writing a transition, write the signature: `f(i)`, `f(i, cap)`, `f(i, j)` over two strings, `f(i, j)` over one range, `f(i, holding)`, `f(mask)`. The signature decides the table, the loop order and the pages to reread
- **Signal:** "maximum / minimum / number of ways" plus a choice at each step, and a brute-force recursion whose calls repeat
- **Why it works:** The arguments are exactly what the future needs to know about the past (Module 06, 01-03). Problems with the same signature share a loop skeleton; only the transition line changes
