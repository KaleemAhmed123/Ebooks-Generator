### Why this works

| Without a spec | With one |
|---|---|
| ambiguity resolved by guessing | ambiguity surfaced as a question |
| the wrong approach found at review | found at the plan step |
| one large diff nobody can review | several small ones anybody can |
| scope drifts silently | the out-of-scope list is explicit |
| no record of why | the spec is the record |

### The single most valuable line in any spec

```markdown
## Out of scope
- Not changing the existing payout schema.
- Not touching the admin UI.
```

- **Scope creep is the most common failure of agent work**, and an explicit exclusion list is the only reliable defence
