## Limiting the blast radius

- An agent asked to fix one thing will change five, because it noticed four other things on the way. **Each of those is unrequested and unreviewed**
- The defence is stating the boundary in advance, every time

```text
Only edit apps/api/routes/payouts.ts and its test file.
If the fix requires touching anything else, stop and tell me why.
```

### The boundaries worth stating

| Boundary | Prevents |
|---|---|
| **which files** | edits spreading across the repo |
| **no new dependencies** | the most common unwanted change |
| **no new files** | an abstraction you did not ask for |
| **do not change the interface** | callers being rewritten |
| **do not touch tests** | tests weakened to pass |
| **do not reformat** | a diff you cannot read |

### The reformatting one matters more than it sounds

- A change that also reformats a file produces a 400 line diff containing 6 real lines
- **A diff you cannot read is a diff you will approve without reading.** That is how unreviewed code enters a codebase
- Run the formatter as its own commit, always
