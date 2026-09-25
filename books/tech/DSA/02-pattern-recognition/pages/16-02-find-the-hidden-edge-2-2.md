### Variations

- **Number of Operations to Make Network Connected (LeetCode 1319):** with at least n − 1 cables, the answer is `components − 1`; fewer cables than n − 1 is impossible
- **Journey to the Moon (HackerRank):** astronauts from the same country are one component; pairs from different countries = total pairs minus pairs inside each component
- **Satisfiability of Equality Equations (LeetCode 990):** union every `a==b` first, then any `a!=b` inside one group is a contradiction
- **Detonate the Maximum Bombs (LeetCode 2101):** the edge is *directed*: A reaches B if B is within A's radius, not necessarily the reverse. Union–find is wrong here; BFS from every bomb, O(n³) for n ≤ 100
- **Evaluate Division (LeetCode 399):** a weighted edge `a → b` with weight `a / b` and its reverse with `b / a`; a query multiplies weights along any path found by DFS

### The failure

- **Union–find on a directed relation.** "Bomb A detonates bomb B" does not mean B detonates A. Merging them into one set claims both directions and over-counts; only symmetric relations (shared attribute, undirected cable) belong in a DSU
- **Comparing every pair to find shared attributes.** Checking each pair of accounts for a common email is O(n² · L). Index by the attribute (`email → first owner`) so each shared value creates one union

:::interview
"How do you merge accounts that share emails?" — Each email is a hidden edge between accounts. I map every email to the first account that used it; when another account uses it, I union the two accounts. Afterwards each root collects its emails. With path compression (and union by size) the whole thing is close to linear in the number of emails, plus the sort each group needs for output.
:::
