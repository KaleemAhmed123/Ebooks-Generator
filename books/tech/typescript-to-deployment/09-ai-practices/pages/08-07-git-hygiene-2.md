### The commands that matter during review

```bash
git diff --stat main...HEAD          # shape, before content
git log --oneline main...HEAD        # was it committed in steps
git diff main...HEAD -- package.json # new dependencies, first
git diff main...HEAD -- '*test*'     # test changes, second
```

- **Dependencies and tests before anything else.** Those are the two places a diff hides something a reviewer will not notice later

### Attribution

- **Whatever your team decides, do it consistently.** Module 9 covers the decision itself
