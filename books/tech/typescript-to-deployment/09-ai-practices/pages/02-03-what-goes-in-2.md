### Write rules as rules, not as prose

```markdown
Bad:  We generally prefer to use our shared logger where appropriate.
Good: Use `logger` from `packages/shared/log`. Never `console.log`.
```

- **Name the file, the export and the forbidden alternative.** Every hedge is a decision the agent will make for itself

### Length

- **Start at about thirty lines.** Add a section when an agent gets the same thing wrong twice. Delete one when the convention changes
- Every line is sent on every request, so a thousand-line rules file costs tokens on every turn and dilutes the rules that matter
