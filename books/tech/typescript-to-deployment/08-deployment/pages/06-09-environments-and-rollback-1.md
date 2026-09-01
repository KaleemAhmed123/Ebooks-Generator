## Environments, secrets and rollback

### Environments

```yaml
jobs:
  deploy:
    environment:
      name: production
      url: https://api.example.com
```

- A GitHub **environment** carries its own secrets, its own variables, and its own protection rules
- **Required reviewers** turn a deploy into an approval gate. **A wait timer** gives a window to cancel
- **Deployment branch rules** stop a feature branch reaching production even if someone edits the workflow

### Where secrets belong

| Kind | Store in |
|---|---|
| an AWS identity | **nothing**. Use OIDC |
| a runtime secret the app needs | Secrets Manager, read at boot. See Module 13 |
| a token only CI uses | a GitHub environment secret |
| a non-secret value | a repository or environment **variable** |

- **A secret printed in a log is a leaked secret.** GitHub masks known values, and it cannot mask one you built by concatenation
