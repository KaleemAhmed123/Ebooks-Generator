## The anatomy of a workflow - continued

| Key | Does |
|---|---|
| `on` | what starts it |
| `concurrency` | cancels a superseded run on the same branch |
| `permissions` | scopes the automatic token. **Default to `contents: read`** |
| `runs-on` | the runner image |
| `timeout-minutes` | stops a hung job billing for six hours |
| `uses` | a reusable action |
| `run` | a shell command |

### The three habits

- **Pin actions to a major tag** at minimum, or to a commit SHA for anything touching credentials
- **`concurrency` with `cancel-in-progress`** saves most of a CI bill on an active repository
- **Set `permissions` explicitly.** The default token is broader than any single workflow needs
