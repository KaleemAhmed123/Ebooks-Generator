## Anatomy of a workflow - continued

| Key | Does |
|---|---|
| `on` | The trigger. `workflow_dispatch` adds a manual button |
| `concurrency` | One deploy at a time. Page 13-12 |
| `permissions` | What the automatic token may do. Start at `read` |
| `needs` | This job waits for that one to pass |
| `environment` | Ties the job to protection rules and environment secrets |

### `cancel-in-progress` must be false for a deploy

- `true` is right for tests, where a superseded run is wasted work
- On a deploy it aborts mid-flight, which can leave the stack half-updated

### Pin actions to a major version

- `actions/checkout@v5` gets fixes. `@main` gets whatever landed this morning
