## Command reference: GitHub Actions

### The `gh` CLI

```bash
gh run list --limit 10
gh run list --workflow ci.yml --branch main
gh run view <run-id>
gh run view <run-id> --log-failed        # only the steps that failed
gh run watch <run-id>                    # follow a running one
gh run rerun <run-id> --failed           # retry just the failed jobs
gh run cancel <run-id>
gh workflow run deploy.yml -f version=1.4.2
gh workflow list
gh workflow disable deploy.yml
```

- **`gh run view --log-failed` is the one to remember.** It skips thousands of successful lines and prints only what broke

### Secrets and variables

```bash
gh secret set SENTRY_DSN --env production
gh secret list --env production
gh variable set NODE_VERSION --body 24
gh api repos/:owner/:repo/environments
```

### Running a workflow locally

```bash
act -l                                   # list what would run
act push -j test
act -j build --secret-file .secrets
```

- `act` runs workflows in Docker. It is close, not identical, so treat a pass as encouragement rather than proof
