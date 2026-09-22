# Module 4 - Surviving a dependency

## Deadline propagation

- A **deadline** is the moment after which the answer is worthless; a timeout is a duration. The top caller has one deadline and every hop shares it: read what remains, subtract what was spent, pass the rest down. gRPC carries it natively; over HTTP it is a header

<svg viewBox="0 0 460 100" role="img" aria-label="A budget shrinking down a chain. The gateway receives a request with a 5-second deadline. It spends 100 milliseconds and calls orders with 4 900 remaining. Orders spends 400 in its own database and calls billing with 4 500. Billing spends 200 and calls the fraud service with 4 300. Each hop sets its local timeout to the remaining budget, never more. An orange cross marks billing with a fixed 30-second timeout on the fraud call: the user gave up at 5 seconds, the gateway returned an error, and the fraud check ran for 25 more seconds for nobody." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="14" width="80" height="34" rx="3" fill="#fff" stroke="#1d4e89"/><text x="46" y="27" text-anchor="middle">gateway</text><text x="46" y="40" text-anchor="middle" font-size="7">deadline = now + 5 s</text>
  <rect x="126" y="14" width="80" height="34" rx="3" fill="#fff" stroke="#1d4e89"/><text x="166" y="27" text-anchor="middle">orders</text><text x="166" y="40" text-anchor="middle" font-size="7">spends 400 (own DB)</text>
  <rect x="246" y="14" width="80" height="34" rx="3" fill="#fff" stroke="#1d4e89"/><text x="286" y="27" text-anchor="middle">billing</text><text x="286" y="40" text-anchor="middle" font-size="7">spends 200</text>
  <rect x="362" y="14" width="92" height="34" rx="3" fill="#fff" stroke="#1d4e89"/><text x="408" y="27" text-anchor="middle">fraud</text><text x="408" y="40" text-anchor="middle" font-size="7">timeout 4 300, not 30 000</text>
  <line x1="86" y1="31" x2="126" y2="31" stroke="#333" marker-end="url(#d)"/><text x="106" y="26" text-anchor="middle" font-size="7">4 900 left</text>
  <line x1="206" y1="31" x2="246" y2="31" stroke="#333" marker-end="url(#d)"/><text x="226" y="26" text-anchor="middle" font-size="7">4 500 left</text>
  <line x1="326" y1="31" x2="362" y2="31" stroke="#333" marker-end="url(#d)"/><text x="346" y="26" text-anchor="middle" font-size="7">4 300 left</text>
  <text x="6" y="66" font-size="7">each hop: remaining = deadline − now; local timeout = min(remaining, its own cap); remaining ≤ 0 → fail at once, do not call</text>
  <text x="6" y="90" font-size="7.5" fill="#bf4c28">✕ billing's fraud call has a fixed 30 s timeout: the user left at 5 s, the gateway already answered, and fraud runs 25 s more for nobody</text>
  <defs><marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

```typescript
// each hop: read the deadline, pass what is left, abort locally at the same moment
export async function callBilling(req: Request, body: unknown) {
  const deadline = Number(req.headers.get("x-deadline-ms"));      // absolute, epoch ms
  const remaining = deadline - Date.now();
  if (remaining <= 0) throw new DeadlineExceeded();               // do not even call
  return fetch("http://billing/charge", {
    method: "POST", body: JSON.stringify(body),
    headers: { "x-deadline-ms": String(deadline) },              // the same absolute value
    signal: AbortSignal.timeout(remaining),                       // local abort
  });
}
```

- The header carries an absolute time, so a slow hop cannot inflate the budget by forwarding a duration; a remaining budget of zero fails before the call; and a deep call's timeout is derived, never guessed

### The failure

- A 30-second inner timeout inside a 5-second outer one. The user is gone at five seconds; the inner hop holds its connection and CPU for twenty-five more for an answer nobody will read. Under load that dead work is most of the work; the deadline is how every hop knows when to stop
