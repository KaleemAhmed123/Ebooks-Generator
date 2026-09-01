## Cheatsheet: GitHub Actions

### Triggers

```yaml
on:
  push: { branches: [main], paths: ['src/**', 'package.json'] }
  pull_request: { branches: [main] }
  workflow_dispatch: { inputs: { tag: { required: true } } }
  schedule: [{ cron: '0 3 * * *' }]      # UTC
```

### Context values worth knowing

| Expression | Is |
|---|---|
| `${{ github.sha }}` | Full commit hash |
| `${{ github.ref_name }}` | Branch or tag name |
| `${{ github.actor }}` | Who triggered it |
| `${{ github.event_name }}` | `push`, `pull_request`, `workflow_dispatch` |
| `${{ runner.os }}` | `Linux` |

### Conditions

```yaml
if: github.ref == 'refs/heads/main'
if: github.event_name != 'pull_request'
if: failure()
if: always()
```
