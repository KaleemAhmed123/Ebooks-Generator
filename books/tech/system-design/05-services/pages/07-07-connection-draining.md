## Draining and graceful shutdown

- Every deploy stops instances that are serving. Shutting down well is three ordered steps: stop being advertised, stop accepting, finish what is in flight. Doing them in the wrong order sends errors to users who did nothing but arrive during a release

```typescript
let ready = true;                                    // the readiness probe reads this, nothing else
app.get("/readyz", (_req, res) => res.status(ready ? 200 : 503).end());

process.on("SIGTERM", async () => {
  ready = false;                                     // 1. fail readiness; the balancer starts draining
  await sleep(15_000);                               // 2. outlast probe interval × failure threshold
  server.close(() => process.exit(0));               // 3. no new sockets; in-flight requests finish
  setTimeout(() => process.exit(1), 30_000).unref(); // 4. a floor under the slowest handler
});
```

<svg viewBox="0 0 460 74" role="img" aria-label="A drain timeline. At time zero the process receives SIGTERM and fails its readiness probe, but the balancer keeps sending new requests for about fifteen seconds until that failure propagates through its probe interval and failure threshold. In-flight requests continue until about twenty-five seconds, when the last handler returns and the process exits. The wait exists because the balancer learns about the shutdown by polling, not by being told." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="4" y="14" font-size="6.5">SIGTERM arrives at t = 0; readiness starts failing immediately</text>
  <text x="4" y="28" font-size="6.5">balancer still sends</text>
  <rect x="100" y="20" width="127" height="10" rx="2" fill="#fbe9e2" stroke="#bf4c28"/>
  <text x="231" y="28" font-size="6" fill="#bf4c28">the probe failure has not propagated yet</text>
  <text x="4" y="46" font-size="6.5">in-flight requests</text>
  <rect x="100" y="38" width="212" height="10" rx="2" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="316" y="46" font-size="6">last handler returns → exit 0</text>
  <line x1="100" y1="58" x2="440" y2="58" stroke="#333"/>
  <text x="100" y="68" text-anchor="middle" font-size="6">0 s</text>
  <text x="227" y="68" text-anchor="middle" font-size="6">15 s</text>
  <text x="312" y="68" text-anchor="middle" font-size="6">25 s</text>
</svg>

- Step 2 is the one deleted for looking pointless. The balancer learns of the shutdown by polling, so between `SIGTERM` and it noticing there is a window — probe interval times failure threshold — in which it still sends new requests. Closing the listener inside that window is the connection reset the drain existed to avoid
- Step 4 bounds the whole thing. Without it a single stuck handler keeps the process alive past the platform's patience and it is killed with `SIGKILL`, losing the in-flight work the drain existed to protect

### The failure

- Draining in the process while the balancer is not draining. The application stops accepting, the balancer still believes the instance is healthy because nothing told it otherwise, and every request it forwards is refused at the socket
- The balancer's own deregistration delay has to be at least as long as the application's drain, and the application's wait at least as long as the balancer takes to notice. Two timeouts owned by two teams, and the deploy is only safe when each is longer than the other's detection time
