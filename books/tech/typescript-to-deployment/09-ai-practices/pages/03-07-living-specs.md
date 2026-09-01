## Keeping the spec true

- A spec is written before the work and describes an intention. **The code that ships is different, always**, because building teaches you things
- A spec left as written is a lie within a week, and a lie in the repository is worse than nothing

### The living spec pattern

- **The agent updates the spec as it works**, so the file records what was built rather than what was planned
- It is the current answer to staleness, and it is why several tools now treat the spec as an output as well as an input

```markdown
## Updates

### 2026-08-28
Requirement 3 changed. The provider does not accept a client idempotency key,
so duplicate suppression is a unique index on (payout_id, attempt) plus a
check of provider status before retrying. Requirement 3 as written is not
achievable; this is the agreed replacement.
```

- **Append, never rewrite.** The history of why the plan changed is the most valuable part of the document six months later

### The rules

- **The spec update is part of the pull request.** Merging code that contradicts the spec, without touching the spec, is how the practice dies
- **A generated update still gets reviewed.** An auto-updated document nobody reads is stale in a new and more confident way
- **Record the decision, not the diff.** Git already has the diff

### Where it lives

- **In the repository, beside the code**, so it is reviewed with the change and found by anyone reading it
- A specification in a separate wiki is a specification nobody updates
