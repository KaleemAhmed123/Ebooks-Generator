### Prefer no long-lived secret at all

- The `GITHUB_TOKEN` is generated per run and expires when the job ends. It can push to GHCR with the right permission:

```yaml
permissions:
  contents: read
  packages: write
```

- Page 11-06 removes the remaining long-lived credentials using OIDC
