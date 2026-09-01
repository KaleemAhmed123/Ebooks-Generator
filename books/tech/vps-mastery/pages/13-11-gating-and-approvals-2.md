### Environments

- **Settings, Environments, New environment.** An environment carries its own secrets and its own rules

| Rule | Effect |
|---|---|
| Required reviewers | The job waits for a human to approve |
| Wait timer | A delay before the job starts, so a bad merge can be caught |
| Deployment branches | Only `main` may deploy to production |

```yaml
deploy:
  environment:
    name: production
    url: https://example.com
```

- The `url` appears in the pull request and in the deployments list, which is how anyone finds what shipped

### Staging first

```yaml
deploy-staging:
  environment: staging
deploy-production:
  needs: deploy-staging
  environment: production      # requires approval
```

- The same image promoted between environments. **Never rebuild between staging and production** or the thing tested is not the thing shipped

### Do not gate on flaky tests

- A test suite that fails one run in five trains everyone to click through the gate. Fix or delete the flaky test
