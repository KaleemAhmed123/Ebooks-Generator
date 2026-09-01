## Cheatsheet: workflow YAML

### Triggers

```yaml
on:
  push: { branches: [main], paths: ['apps/api/**'] }
  pull_request: { types: [opened, synchronize, reopened] }
  schedule: [{ cron: '0 2 * * *' }]          # UTC, always
  workflow_dispatch:
    inputs:
      tag: { description: 'image tag', required: true }
  workflow_call:                              # a reusable workflow
  release: { types: [published] }
```

### Conditions

```yaml
if: github.ref == 'refs/heads/main'
if: github.event_name == 'pull_request'
if: contains(github.event.head_commit.message, '[skip ci]') == false
if: always()                                  # even after a failure
if: failure()                                 # only after a failure
if: startsWith(github.ref, 'refs/tags/v')
```

### Contexts worth knowing

| Expression | Is |
|---|---|
| `github.sha` | the commit |
| `github.ref_name` | the branch or tag name |
| `github.actor` | who triggered it |
| `github.run_number` | an incrementing build number |
| `secrets.NAME` | a repository or environment secret |
| `vars.NAME` | a non-secret variable |
| `needs.build.outputs.image` | an output from an earlier job |
| `runner.os` | `Linux`, `macOS`, `Windows` |
