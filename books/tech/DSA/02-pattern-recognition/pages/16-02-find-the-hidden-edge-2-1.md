## Find the Hidden Edge <span class="lv lv2"></span> - continued

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
