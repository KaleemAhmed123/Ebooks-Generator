## What to do when one leaks

- Secrets leak through committed files, log output, error messages, screenshots and old images. **Assume it will happen and know the sequence**

### The order, and it matters

1. **Rotate first.** Not investigate, not remove the commit. The credential must stop working
2. **Check what was done with it.** CloudTrail for AWS credentials, provider logs for third-party keys
3. **Then clean up the history**, knowing the exposed value is already useless
4. **Write down how it got there**, and add the check that would have caught it

- **Removing a commit does not rotate a key.** Every fork, every clone and every CI cache still has it

### Catching it before it ships

```bash
gitleaks detect --source . --verbose
trufflehog filesystem . --only-verified
git secrets --scan-history
```

- **Run one of these in CI, on every pull request.** GitHub push protection blocks known credential formats at push time and is free
