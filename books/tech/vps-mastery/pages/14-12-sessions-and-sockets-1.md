## Sessions, sockets and other sticky state

### Sessions must not live in the process

- In-memory sessions are lost when the old color stops. Every user is logged out by the deploy
- Sessions belong in Redis, which is in the shared data project and never restarts

```ts
app.use(session({
  store: new RedisStore({ client: redis }),
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
}));
```

### WebSockets are dropped, and that is acceptable

- A socket connected to blue ends when blue stops. There is no way to move a live TCP connection between processes
- **The requirement is that the client reconnects cleanly**, not that the connection survives

```ts
const socket = io("https://example.com", {
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionDelayMax: 5000,
});

socket.on("connect", () => resubscribe());
```

- `resubscribe()` is the part that gets forgotten. A reconnected socket is in no rooms and receives nothing
