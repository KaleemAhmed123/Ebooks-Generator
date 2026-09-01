## Background work

- Some tasks are long, mechanical and not worth watching. **Sending them to the background and reading the result later is the pattern**

### What suits it

| Task | Why |
|---|---|
| **a research question** | "how does auth flow through this repo", answered while you work |
| **a mechanical migration** | rename across 200 files, one library to another |
| **a test audit** | "which of these tests assert nothing" |
| **a log or incident analysis** | reading more output than a person will |
| **a dependency upgrade** | bump, run tests, report what broke |

### What does not

- **Anything needing judgement partway.** It will make the decision itself and you will find out at the end
- **Anything touching a shared resource.** A background agent running migrations against a shared database is an incident
- **Anything you cannot review.** A background agent that produces an 80 file diff has produced work, not progress

### Making the output usable

```text
Work through this in the background. When you finish:
- write a summary to docs/tasks/<slug>.md
- commit in small, separately reviewable steps
- list anything you were unsure about, rather than deciding
```

- **"List rather than decide" is the instruction that makes background work reviewable.** Without it, every ambiguity is silently resolved

### The discipline

- **Start at most as many as you will actually read today.** Three finished branches you never opened is worse than one you merged
- **Review the same day.** A branch reviewed a week later has drifted from `main` and the context is gone from your head too
