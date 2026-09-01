### Handling the signal

```ts
const server = app.listen(env.PORT)

process.on("SIGTERM", async () => {
  server.close()                 // stop accepting new connections
  await queue.close()
  await db.$disconnect()
  process.exit(0)
})
```

- The full pattern, including the connection draining detail, is in Booklet 3

### When you do need an init

```bash
docker run --init myapp:1.4.2
```

- `--init` inserts a tiny init process that reaps zombies and forwards signals
- **Needed when your process spawns children**, such as a Playwright browser or an image conversion. Not needed for a plain HTTP server
