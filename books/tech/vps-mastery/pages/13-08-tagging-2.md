### Retention

- GHCR keeps every version until deleted. Untagged images accumulate

```yaml
- uses: actions/delete-package-versions@v5
  with:
    package-name: orders
    package-type: container
    min-versions-to-keep: 20
    delete-only-untagged-versions: true
```

- Keep at least the last twenty. Those are the rollback targets
