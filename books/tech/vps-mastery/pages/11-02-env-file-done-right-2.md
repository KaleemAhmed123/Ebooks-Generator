### Where it leaks anyway

| Leak | Prevention |
|---|---|
| `docker compose config` prints values | Do not paste its output into an issue |
| `docker inspect` shows the environment | Anyone in the `docker` group can read every secret |
| A crash dump including `process.env` | Filter it in the error reporter |
| `.env` copied into the image | `.dockerignore`, page 05-16 |

### The one that is not fixable

- Any process able to run `docker inspect` can read every environment variable of every container. Docker secrets, on the next page, are the answer to that
