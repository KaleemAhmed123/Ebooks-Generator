## Listen-to-yourself

- **Listen-to-yourself**: a service publishes an event first, then applies the change to its own database only when it consumes that same event back — its own write path becomes "publish, then react to my own message like anyone else's." No outbox, no CDC connector, no replication slot

<svg viewBox="0 0 460 100" role="img" aria-label="Listen to yourself. A service publishes to a topic, then its own consumer reads that same message back and applies it to its own database." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="30" y="35" width="90" height="30" fill="none" stroke="#333"/>
  <text x="75" y="54" text-anchor="middle" font-size="7.5">service</text>
  <path d="M120 45 L220 45" stroke="#333" marker-end="url(#l8)"/>
  <rect x="220" y="30" width="60" height="30" fill="none" stroke="#bf4c28"/>
  <text x="250" y="49" text-anchor="middle" font-size="7" fill="#bf4c28">topic</text>
  <path d="M220 60 L120 60" stroke="#333" marker-end="url(#l8)"/>
  <text x="170" y="75" text-anchor="middle" font-size="6.5">own consumer reads it back</text>
  <path d="M75 65 L75 85" stroke="#333" marker-end="url(#l8)"/>
  <text x="75" y="98" text-anchor="middle" font-size="7">its own DB</text>
  <defs><marker id="l8" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- It fits where CDC is unavailable — no logical decoding on the database in use, or no ops budget to run a connector — at the cost of what it drops: **read-your-writes**. The API can return `201 Created` before the row exists, because the write only happens after the round trip through the broker
- The gap is the same shape as any at-least-once broker: the service's own consumer can be seconds behind its own producer under load, and a client that reads right after writing sees nothing

### The failure

- Returning `201` with the new resource's id, then a `GET` on that id 50 ms later from the same request flow. The consumer has not applied the event yet; the resource is not there. Either return the full state in the write response, or read from the write path directly for that one immediate case
