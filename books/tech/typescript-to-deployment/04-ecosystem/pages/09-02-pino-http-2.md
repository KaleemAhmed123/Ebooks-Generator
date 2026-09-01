### Sending logs somewhere

```ts
const transport = pino.transport({
  target: "pino/file",
  options: { destination: "/var/log/app.log" },
})
```

- A transport runs in a worker thread, so serialization never touches the event loop
- In a container, writing JSON to stdout and letting Promtail or the platform collect it is simpler and harder to break

### winston 3.19.0

- More transports, more formatting options, and measurably slower
- Still everywhere in existing code. If you are choosing today, pino
