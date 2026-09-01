### Why liveness must not check the database

- A database blip fails readiness, traffic drains, the service recovers when the database does
- If liveness checked it too, every instance would restart at once and turn a blip into an outage

### Keep them cheap and out of the logs

```js
app.use(pinoHttp({
  autoLogging: { ignore: (req) => req.url === "/healthz" },
}))
```

- A probe every five seconds across ten instances is 172,800 log lines a day saying nothing
