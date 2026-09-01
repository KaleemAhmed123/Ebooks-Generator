### Draining sockets deliberately

- Rather than cutting them at `down`, tell them to leave first

```ts
process.on("SIGTERM", () => {
  io.emit("server:draining");
  setTimeout(() => io.close(), 5000);
});
```

### Background jobs and scheduled tasks

- Two colors running means **two copies of every scheduled job**. A nightly report is generated twice, an email is sent twice
- Either take a lock in Redis before running, or run schedulers only in the active color:

```yaml
scheduler:
  profiles: ["active"]
```

```bash
COMPOSE_PROFILES=active docker compose -p "app-${NEXT}" up -d   # only after the flip
```
