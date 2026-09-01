### Preventing the next one

```bash
pip install pre-commit detect-secrets
detect-secrets scan > .secrets.baseline
```

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.5.0
    hooks:
      - id: detect-secrets
        args: ["--baseline", ".secrets.baseline"]
```

- Turn on GitHub secret scanning and push protection at the repository level. It blocks a push containing a recognized provider key before it reaches the remote, which is the only intervention that happens early enough to matter
