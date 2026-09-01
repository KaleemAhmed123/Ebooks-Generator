### Validating the file

```bash
docker compose config
```

- Prints the fully resolved file with variables substituted and defaults filled in. It is the fastest way to see what Compose actually thinks the stack is

```bash
docker compose config --services
# orders
# postgres
```
