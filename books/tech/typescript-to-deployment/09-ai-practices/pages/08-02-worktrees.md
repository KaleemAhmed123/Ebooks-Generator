## Parallel work with worktrees

- Two agents in one working directory edit the same files and destroy each other's work. **A git worktree gives each one its own directory on its own branch, sharing one repository**

```bash
git worktree add ../app-payouts -b feat/payout-retries
git worktree add ../app-search  -b feat/search-filters
git worktree list
git worktree remove ../app-payouts
git worktree prune
```

:::mint
<svg viewBox="0 0 470 150" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 8.5px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .c { fill: #d9f2e6; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
  </style>
  <defs>
    <marker id="y1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <rect class="b" x="8" y="52" width="100" height="30" rx="4"/>
  <text x="58" y="66" class="l" text-anchor="middle">one .git</text>
  <text x="58" y="77" class="s" text-anchor="middle">shared history</text>

  <rect class="c" x="170" y="12" width="140" height="28" rx="4"/>
  <text x="240" y="30" class="l" text-anchor="middle">../app-payouts</text>
  <rect class="c" x="170" y="52" width="140" height="28" rx="4"/>
  <text x="240" y="70" class="l" text-anchor="middle">../app-search</text>
  <rect class="c" x="170" y="92" width="140" height="28" rx="4"/>
  <text x="240" y="110" class="l" text-anchor="middle">./app (you)</text>

  <line class="a" x1="108" y1="60" x2="166" y2="26" marker-end="url(#y1)"/>
  <line class="a" x1="108" y1="67" x2="166" y2="66" marker-end="url(#y1)"/>
  <line class="a" x1="108" y1="74" x2="166" y2="106" marker-end="url(#y1)"/>

  <text x="326" y="30" class="s">agent A</text>
  <text x="326" y="70" class="s">agent B</text>
  <text x="326" y="110" class="s">you, uninterrupted</text>

  <text x="235" y="140" class="s" text-anchor="middle">separate directories, separate branches, no context switching, one repository</text>
</svg>
:::

### The practical details

- **Each worktree needs its own `node_modules` and its own `.env`.** A setup script that copies the env file and installs is worth writing once
- **Ports collide.** Give each worktree a different `PORT`, and a different database name if it runs one
- **Pick tasks that do not overlap.** Two agents editing the same module produces two conflicting branches and a merge you have to referee
- **Remove worktrees when done.** Stale ones accumulate and each holds a full `node_modules`
