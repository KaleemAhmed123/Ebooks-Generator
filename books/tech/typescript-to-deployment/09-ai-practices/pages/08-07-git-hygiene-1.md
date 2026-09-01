## Git discipline

- Volume makes sloppy git practice expensive. **The habits that were merely good are now load-bearing**

### Commit before you delegate

```bash
git status                  # must be clean
git diff                    # afterwards, this is exactly what it did
git checkout .              # and this undoes all of it
```

- **A clean tree is the undo button.** Starting an agent on a dirty tree means its work and yours are indistinguishable

### Small commits, one concern

```bash
git add -p                  # stage the parts that belong together
git commit -m 'feat(payouts): record an attempt row per provider call'
```

- **A pull request of six small commits is reviewable. The same change as one commit is not**
- Ask for it explicitly: "commit after each step, one concern per commit"

### Branch per task

- One branch, one task, one pull request. **The worktree pattern enforces this naturally**
- A branch carrying three tasks cannot be partially rejected, so all of it merges or none of it does
