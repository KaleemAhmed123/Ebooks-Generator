## Secrets in GitHub Actions

- Set at **Settings, Secrets and variables, Actions**. Write-only once saved

| Kind | Scope |
|---|---|
| Repository secret | One repository |
| Environment secret | One environment, and can require an approval before use |
| Organization secret | Many repositories, with a selection list |
| Variable | Not a secret. Visible in logs. For non-sensitive configuration |

```yaml
- name: Deploy
  env:
    SSH_KEY: ${{ secrets.DEPLOY_SSH_KEY }}
    REGISTRY_TOKEN: ${{ secrets.GHCR_TOKEN }}
  run: ./scripts/deploy.sh
```

### Masking is not containment

- Actions redacts exact matches of a secret in log output. It does not catch a base64 encoding of it, or a value split across lines

```yaml
- run: echo "${{ secrets.API_KEY }}" | base64      # prints the key, unmasked
```

### Secrets are not available to forked pull requests

- A workflow triggered by `pull_request` from a fork gets no secrets. This is deliberate, and it means a deploy job must not run on that trigger

```yaml
on:
  push:
    branches: [main]        # secrets available
  pull_request:             # tests only. No deploy
```
