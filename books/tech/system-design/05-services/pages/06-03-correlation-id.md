## Correlation and trace IDs

- One id, minted once at the edge, copied onto every hop and written on every log line. It is the cheapest thing in observability and the thing that makes the other two signals usable, because it is what joins them

<svg viewBox="0 0 460 134" role="img" aria-label="One trace id carried across four hops. The gateway mints the id, orders copies the header, the queue carries it as a message attribute rather than in the body, and the payment worker reads it back out. Log lines from the gateway and from the payment worker both carry the same trace value, so one query returns the whole request. The W3C traceparent header is version, then a sixteen-byte trace id, then an eight-byte parent span id, then flags. An orange cross marks the worker minting a fresh id instead: two disconnected traces, and the failure never joins the click that caused it." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="4" y="12" font-size="7.5">one id, minted once at the edge, carried on every hop</text>
  <text x="102" y="30" text-anchor="middle" font-size="6.5" fill="#1d4e89">traceparent</text>
  <text x="226" y="30" text-anchor="middle" font-size="6.5" fill="#1d4e89">traceparent</text>
  <text x="350" y="30" text-anchor="middle" font-size="6.5" fill="#1d4e89">msg attribute</text>
  <rect x="4" y="34" width="74" height="26" rx="3" fill="#fff" stroke="#1d4e89"/><text x="41" y="46" text-anchor="middle" font-size="7.5">gateway</text><text x="41" y="56" text-anchor="middle" font-size="6.5">mints the id</text>
  <rect x="128" y="34" width="74" height="26" rx="3" fill="#fff" stroke="#1d4e89"/><text x="165" y="46" text-anchor="middle" font-size="7.5">orders</text><text x="165" y="56" text-anchor="middle" font-size="6.5">copies it on</text>
  <rect x="252" y="34" width="74" height="26" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="289" y="46" text-anchor="middle" font-size="7.5">queue</text><text x="289" y="56" text-anchor="middle" font-size="6.5">not in the body</text>
  <rect x="376" y="34" width="74" height="26" rx="3" fill="#fff" stroke="#1d4e89"/><text x="413" y="46" text-anchor="middle" font-size="7.5">payment</text><text x="413" y="56" text-anchor="middle" font-size="6.5">reads it back</text>
  <line x1="78" y1="47" x2="126" y2="47" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="202" y1="47" x2="250" y2="47" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="326" y1="47" x2="374" y2="47" stroke="#1d4e89" marker-end="url(#b)"/>
  <rect x="4" y="66" width="446" height="28" rx="3" fill="#f3f3f3" stroke="#666"/>
  <text x="10" y="78" font-size="6.5">{"svc":"gateway","trace":"4bf92f35…4736","event":"checkout_started"}</text>
  <text x="10" y="89" font-size="6.5">{"svc":"payment","trace":"4bf92f35…4736","event":"charge_declined"}</text>
  <text x="444" y="84" text-anchor="end" font-size="7" fill="#1d4e89">one query, the whole request</text>
  <text x="4" y="108" font-size="6.5">traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01</text>
  <text x="4" y="117" font-size="6.5" fill="#666">version — trace-id, 16 B — parent span-id, 8 B — flags</text>
  <text x="4" y="127" font-size="7.5" fill="#bf4c28">✕ the worker mints a fresh id: two disconnected traces, and the failure never joins the click that caused it</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

```typescript
import { randomBytes } from "node:crypto";
// inbound: continue the caller's trace, or mint one if this is the edge
const incoming = req.headers.get("traceparent");
const traceId = incoming?.split("-")[1] ?? randomBytes(16).toString("hex");
const traceparent = `00-${traceId}-${randomBytes(8).toString("hex")}-01`;

await fetch("http://payments/charge", { headers: { traceparent } });   // sync hop
await queue.send({ body: { orderId }, attributes: { traceparent } });  // async hop
```

- W3C Trace Context has been a Recommendation since 23 November 2021, so the format is not a house convention: any two services, in any language, agree on it without coordinating
- The queue line is the one that gets forgotten. The id is transport metadata, so it belongs in the message attributes — putting it in the body makes it part of the domain event and every consumer's schema

### The failure

- The id regenerated after a queue. The trace ends where the request became a message and a new one begins in the worker, so the charge failure and the click that caused it are two unrelated traces with no field in common. The one hop where correlation matters most is the one where it is easiest to drop
