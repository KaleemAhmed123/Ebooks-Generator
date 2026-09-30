## Branches and working with others

- A **branch** is a parallel line of work. You make one, change things freely, and the main line stays untouched until you are ready to merge.
- This lets you try an idea — a new model, a risky refactor — without endangering working code.

:::mint
```bash
git switch -c try-new-model    # create and move to a branch
# ... make commits ...
git switch main                # back to the safe line
git merge try-new-model        # fold the work in
```
:::

### The shared workflow

- **Remote** — a shared copy, usually on GitHub. `git push` sends your commits up; `git pull` brings others' down.
- **Pull request (PR)** — you propose your branch for review before it merges into main. It is where teammates (and increasingly AI reviewers) comment on the change.

<svg viewBox="0 0 360 66" role="img" aria-label="A feature branch diverging from main and merging back after review" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">
  <line x1="20" y1="45" x2="340" y2="45" stroke="#24405e" stroke-width="2"/><text x="30" y="60" fill="#24405e">main</text>
  <circle cx="80" cy="45" r="6" fill="#24405e"/><circle cx="320" cy="45" r="6" fill="#24405e"/>
  <path d="M80 45 Q140 15 180 15" fill="none" stroke="#1a3a2a" stroke-width="2"/><circle cx="180" cy="15" r="6" fill="#1a3a2a"/><circle cx="240" cy="15" r="6" fill="#1a3a2a"/>
  <path d="M240 15 Q300 15 320 39" fill="none" stroke="#1a3a2a" stroke-width="2"/>
  <text x="210" y="10" text-anchor="middle" fill="#1a3a2a">feature branch</text>
</svg>

:::note
Rule of thumb: main always works. New work happens on a branch and joins main only after it is reviewed and passes its checks. This is how teams of any size — and you working with an AI agent — avoid stepping on each other.
:::
