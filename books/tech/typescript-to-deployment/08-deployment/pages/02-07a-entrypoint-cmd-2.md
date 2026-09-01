### The entrypoint script pattern

```bash
#!/bin/sh
set -e

# work that must happen before the app starts
if [ "$RUN_MIGRATIONS" = "true" ]; then
  npx prisma migrate deploy
fi

exec "$@"          # replace this shell with the real command
```

```dockerfile
COPY entrypoint.sh /usr/local/bin/
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["node", "dist/index.js"]
```

- **`exec "$@"` is the whole trick.** It replaces the shell with your process, so the application becomes PID 1 and receives signals
- Without `exec`, the shell stays as PID 1, the application is its child, and `SIGTERM` goes nowhere
- **Migrations in an entrypoint race between replicas.** Module 10 covers running them as their own step instead
