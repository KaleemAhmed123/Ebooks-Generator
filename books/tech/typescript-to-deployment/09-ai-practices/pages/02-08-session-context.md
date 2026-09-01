## The session itself

- A long agent session fills its context window with file contents, command output and its own earlier reasoning
- **Quality falls as it fills.** This is the context rot from Booklet 7, met in a place where it is easy to see: the agent starts forgetting what you told it an hour ago

### The signs it has gone stale

- It re-reads a file it already read
- It contradicts a decision made earlier in the same session
- It reintroduces a bug you had it fix
- It stops following the rules file

### What to do

| Move | When |
|---|---|
| **compact the session** | mid-task, when it is still going the right way |
| **start a fresh session** | the task changed, or it has drifted |
| **write state to a file first** | before either, so nothing is lost |

- **Writing the state down is the important half.** A plan file, a progress log or a scratch document survives a compaction and a restart, where the transcript does not

```markdown
## Progress
- [x] Zod schema for the payout body
- [x] Route handler + tests
- [ ] Worker consumer (in progress, see apps/worker/payout.ts)
- [ ] Backfill script

## Decisions
- Idempotency key is client-generated, stored on the payout row.
```

### The habit

- **One session per task, and end it when the task ends.** A session that has been running all day is carrying everything from this morning
- **Short tasks are better tasks**, for exactly this reason as much as for review
