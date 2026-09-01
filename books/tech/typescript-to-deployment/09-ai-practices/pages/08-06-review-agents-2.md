### Making it useful rather than noisy

```markdown
Review this diff. Report only:
- correctness bugs, with the input that triggers them
- missing authorization or validation
- tests that would pass with a broken implementation

Do not comment on style, naming, or formatting. Do not suggest refactors.
If you find nothing, say so.
```

- **"If you find nothing, say so" is the important line.** Without it, it invents findings to be useful
- **A review bot that comments on everything is ignored within a week**, and then it is worse than nothing

### The rule

- **It runs before the human, not instead of them.** Its job is to make the human's read shorter, not to replace it
