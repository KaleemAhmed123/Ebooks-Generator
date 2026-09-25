## Find the Hidden Edge 🟡

- **What it is:** Module 05 teaches the translation "states are nodes, moves are edges". Three more edge types hide in interview statements: two items share **something in common** (an email, a letter, a value), one item **reaches** another within a range (a blast radius, a jump length), or one item is **related by a ratio** to another. Name the edge, and the problem becomes a standard connectivity or traversal question
- **Signal:** "accounts that share an email belong to the same person", "a bomb detonates every bomb within its radius", "a / b = 2.0, b / c = 3.0, what is a / c", "items numbered 0 to n − 1 with pairs", "minimum cables to connect all computers"
- **Why it works:** Connectivity is transitive: if A shares an email with B and B with C, then A and C are one person even though they share nothing directly. A union–find structure (Module 03) merges such groups in near-constant time per edge, and each group's members can then be collected in one pass

:::mint
<svg viewBox="0 0 470 118" role="img" aria-label="Accounts merge. Account 1 has emails a and b, account 2 has b and c, account 3 has d. Account 1 and 2 share email b, so they are unioned; the group holds a, b and c. Account 3 is its own group. Emails are the hidden edges between accounts." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .acc { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .em { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .e { stroke: #6b6b6b; stroke-width: 1; }
    .grp { fill: none; stroke: #2d6a4f; stroke-width: 1.3; stroke-dasharray: 4 3; }
  </style>
  <rect class="grp" x="12" y="8" width="210" height="96" rx="8"/>
  <rect class="acc" x="24" y="18" width="60" height="22"/><text x="54" y="33" class="lb" text-anchor="middle">acct 1</text>
  <rect class="acc" x="24" y="72" width="60" height="22"/><text x="54" y="87" class="lb" text-anchor="middle">acct 2</text>
  <rect class="em" x="140" y="14" width="30" height="18"/><text x="155" y="27" class="lb" text-anchor="middle">a</text>
  <rect class="em" x="140" y="46" width="30" height="18"/><text x="155" y="59" class="lb" text-anchor="middle">b</text>
  <rect class="em" x="140" y="78" width="30" height="18"/><text x="155" y="91" class="lb" text-anchor="middle">c</text>
  <line class="e" x1="84" y1="29" x2="140" y2="23"/><line class="e" x1="84" y1="29" x2="140" y2="55"/>
  <line class="e" x1="84" y1="83" x2="140" y2="55"/><line class="e" x1="84" y1="83" x2="140" y2="87"/>
  <rect class="acc" x="250" y="40" width="60" height="22"/><text x="280" y="55" class="lb" text-anchor="middle">acct 3</text>
  <rect class="em" x="330" y="42" width="30" height="18"/><text x="345" y="55" class="lb" text-anchor="middle">d</text>
  <line class="e" x1="310" y1="51" x2="330" y2="51"/>
  <text x="20" y="116" class="sm">shared email b = hidden edge between acct 1 and acct 2</text>
  <text x="250" y="90" class="lb">groups: {a, b, c}, {d}</text>
</svg>
:::

```ts
// Accounts Merge (LeetCode 721): accounts[i] = [name, ...emails]
function accountsMerge(accounts: string[][]): string[][] {
  const parent = accounts.map((_, i) => i);
  const find = (x: number): number =>
    // path compression
    parent[x] === x ? x : (parent[x] = find(parent[x]));
  // email → first account
  const owner = new Map<string, number>();
  accounts.forEach((acc, i) => {
    for (const email of acc.slice(1)) {
      // edge
      if (owner.has(email))
        parent[find(i)] = find(owner.get(email)!);
      else owner.set(email, i);
    }
  });
  const groups = new Map<number, string[]>();
  for (const [email, i] of owner) {
    const r = find(i);
    if (!groups.has(r)) groups.set(r, []);
    groups.get(r)!.push(email);
  }
  return [...groups].map(([r, emails]) =>
    [accounts[r][0], ...emails.sort()]);
}
```

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
"How do you merge accounts that share emails?" — Each email is a hidden edge between accounts. I map every email to the first account that used it; when another account uses it, I union the two accounts. Afterwards each root collects its emails. With path compression the whole thing is close to linear in the number of emails, plus the sort each group needs for output.
:::
