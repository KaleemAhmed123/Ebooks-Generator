## Environment variables and their precedence

- Four places can set the same variable. Knowing which one wins prevents an hour of confusion

| Source | Priority |
|---|---|
| `docker compose run -e KEY=value` | 1, highest |
| `environment:` in the service | 2 |
| `env_file:` in the service | 3 |
| A shell variable exported before running Compose | 4 |
| The `.env` file beside the Compose file | 5, lowest |

### Two different jobs for `.env`

- **Substitution into the Compose file itself.** Compose reads `.env` in its own directory and expands `${VAR}` in the YAML
- **Variables inside the container.** That is `env_file:` or `environment:`

```yaml
services:
  postgres:
    image: postgres:${PG_VERSION}        # from .env beside the file
    env_file: [.env]                     # passed into the container
```

- The same file is often used for both, which hides the distinction until a variable is needed in only one place
