## Circuit breaker

- A **circuit breaker** wraps a call and counts outcomes. Closed: calls pass. Too many fail: open, and calls fail at once without touching the network, so the caller's threads stay free and the dependency gets a breather. After a wait, half-open: a few trials decide

<svg viewBox="0 0 460 104" role="img" aria-label="Circuit breaker state machine with Resilience4j's defaults. Closed: calls pass and are recorded in a sliding window of the last 100 calls. When at least 100 calls have been recorded and 50 percent or more failed, or 100 percent were slower than 60 seconds, it transitions to open. Open: every call is rejected immediately with CallNotPermittedException for 60 seconds. Then half-open: 10 calls are permitted; if their failure rate is below the threshold, closed; otherwise open again for another 60 seconds. An orange cross marks one breaker per host: a broken slow endpoint trips it and takes the host's fast healthy endpoints with it." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="26" width="120" height="48" rx="24" fill="#fff" stroke="#1d4e89" stroke-width="1.5"/><text x="66" y="44" text-anchor="middle">CLOSED</text><text x="66" y="56" text-anchor="middle" font-size="7">calls pass; window of</text><text x="66" y="66" text-anchor="middle" font-size="7">the last 100 outcomes</text>
  <rect x="170" y="26" width="120" height="48" rx="24" fill="#fbe9e2" stroke="#bf4c28" stroke-width="1.5"/><text x="230" y="44" text-anchor="middle">OPEN</text><text x="230" y="56" text-anchor="middle" font-size="7">reject at once, no network</text><text x="230" y="66" text-anchor="middle" font-size="7">for 60 s (CallNotPermitted)</text>
  <rect x="334" y="26" width="120" height="48" rx="24" fill="#fff" stroke="#1d4e89" stroke-width="1.5"/><text x="394" y="44" text-anchor="middle">HALF-OPEN</text><text x="394" y="56" text-anchor="middle" font-size="7">10 trial calls permitted</text><text x="394" y="66" text-anchor="middle" font-size="7">measure them alone</text>
  <line x1="126" y1="42" x2="170" y2="42" stroke="#333" marker-end="url(#d)"/><text x="148" y="20" text-anchor="middle" font-size="7">≥ 100 calls and</text><text x="148" y="30" text-anchor="middle" font-size="7">≥ 50 % failed</text>
  <line x1="290" y1="50" x2="334" y2="50" stroke="#333" marker-end="url(#d)"/><text x="312" y="45" text-anchor="middle" font-size="7">60 s elapsed</text>
  <line x1="394" y1="74" x2="394" y2="92" stroke="#333"/><line x1="394" y1="92" x2="66" y2="92" stroke="#333"/><line x1="66" y1="92" x2="66" y2="74" stroke="#333" marker-end="url(#d)"/><text x="230" y="102" text-anchor="middle" font-size="7">trials below the threshold → closed</text>
  <line x1="334" y1="60" x2="290" y2="60" stroke="#bf4c28" stroke-dasharray="3 3" marker-end="url(#e)"/><text x="312" y="70" text-anchor="middle" font-size="7" fill="#bf4c28">trials fail → open</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="e" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#bf4c28"/></marker>
  </defs>
</svg>

```typescript
class Breaker {             // one per endpoint; the numbers are Resilience4j's defaults
  state = "closed"; win: boolean[] = []; at = 0; rej = new Error("open");
  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === "open" && Date.now() - this.at < 60_000) throw this.rej;
    if (this.state === "open") { this.state = "half"; this.win = []; }   // trial period
    try { const r = await fn(); this.record(true); return r; }
    catch (e) { this.record(false); throw e; }
  }
  record(ok: boolean) {     // judge a rate only after 100 calls (10 while half-open)
    this.win.push(ok); if (this.win.length < (this.state === "half" ? 10 : 100)) return;
    const rate = this.win.filter((x) => !x).length / this.win.length;
    this.state = rate < 0.5 ? "closed" : "open"; this.at = Date.now();
    this.win = this.win.slice(-100);
  }
}
```

- Resilience4j's defaults: failure rate 50 %, window 100 calls, minimum 100 before judging, 60 s open, 10 half-open calls, calls over 60 s counted slow. The minimum is what stops one failure at low traffic reading as 100 %

### The failure

- One breaker per host. `/generate-pdf` is broken and slow, trips it, and `/prices`, fast and healthy on the same host, is rejected with it. Scope a breaker to what fails together: an endpoint
