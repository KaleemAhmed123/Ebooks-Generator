### Variations

- **Maximum Tip Calculator (GFG):** waiter A can take X orders, B can take Y, with `X + Y ≥ n`. Sort orders by `|a − b|` descending; give each to the waiter with the larger tip unless that waiter is full. The big gaps are where a wrong choice costs most
- **Minimum Initial Energy to Finish Tasks (LeetCode 1665):** task `[actual, minimum]`. Sort by `minimum − actual` descending: the tasks that need the most headroom beyond what they spend go first, while energy is highest
- **"Pairwise" disguised as a key:** when an exchange of two neighbours depends only on a quantity computed from each item alone, collapse the comparator into that quantity. It is page 07-09's idea in its simplest form

### The failure

- **Cheapest option first.** Sending each person to their cheaper city until it fills ignores *how much* cheaper. On `[[40, 30], [80, 40], [80, 40], [40, 40]]` the first two people take B's seats to save 10 and 40, and the third then pays 80 in A instead of 40 in B: total 190. Sorted by `costA − costB`, A gets `[40, 40]` and `[40, 30]`, total 160
- **Sorting by absolute difference for fixed quotas.** `|costA − costB|` says how strongly someone cares, not *which way*. With a strict 50/50 split you need the signed key, or two people with strong opposite preferences look identical

:::interview
"Why does sorting by `costA − costB` work?" — Start from everyone going to B. Moving a person to A changes the total by exactly `costA − costB`, independently of anyone else. So choosing which n people move is choosing the n smallest of those numbers: one sort, O(n log n), and the proof is one line of algebra rather than an exchange argument.
:::
