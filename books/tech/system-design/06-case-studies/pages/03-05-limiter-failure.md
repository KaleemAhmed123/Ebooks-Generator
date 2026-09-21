## When the limiter store is down

- The store on page 4 is one more dependency on the hot path, and it will be unreachable some minutes a year. What the gateway does in those minutes is a decision made now, in config, not by whichever exception handler runs first

<svg viewBox="0 0 460 150" role="img" aria-label="A gateway whose counter store is marked down with an orange cross. Three branches: fail-closed, every request gets 429, marked as a self-inflicted outage; fail-open, every request passes and the backend takes the unshed load; local fallback, each gateway runs its own token bucket at the limit divided by the gateway count, approximate but bounded. Timeout on the store call is 5 ms so the decision cannot stall the request." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="8" y="56" width="80" height="34" rx="3" fill="#fff" stroke="#333"/><text x="48" y="70" text-anchor="middle">gateway</text><text x="48" y="82" text-anchor="middle" font-size="7.5">store call: 5 ms timeout</text>
  <rect x="8" y="108" width="80" height="24" rx="3" fill="#fbe9e2" stroke="#bf4c28"/><text x="48" y="123" text-anchor="middle" fill="#bf4c28">✕ counter store</text>
  <line x1="48" y1="90" x2="48" y2="108" stroke="#bf4c28" stroke-dasharray="3 3"/>
  <line x1="88" y1="64" x2="150" y2="26" stroke="#333" marker-end="url(#d)"/>
  <line x1="88" y1="73" x2="150" y2="73" stroke="#333" marker-end="url(#d)"/>
  <line x1="88" y1="82" x2="150" y2="120" stroke="#1d4e89" marker-end="url(#b)"/>
  <rect x="152" y="10" width="96" height="30" rx="3" fill="#fbe9e2" stroke="#bf4c28"/><text x="200" y="23" text-anchor="middle" fill="#bf4c28">fail-closed</text><text x="200" y="34" text-anchor="middle" font-size="7.5">every request → 429</text>
  <text x="256" y="20" font-size="7.5" fill="#bf4c28">✕ a limiter outage is now a full outage</text>
  <text x="256" y="31" font-size="7.5">right only where over-admitting costs money</text>
  <rect x="152" y="58" width="96" height="30" rx="3" fill="#fff" stroke="#333"/><text x="200" y="71" text-anchor="middle">fail-open</text><text x="200" y="82" text-anchor="middle" font-size="7.5">every request passes</text>
  <text x="256" y="68" font-size="7.5">backend takes the unshed load;</text>
  <text x="256" y="79" font-size="7.5">safe while it has headroom, blind to abuse</text>
  <rect x="152" y="106" width="96" height="30" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="200" y="119" text-anchor="middle" fill="#1d4e89">local fallback</text><text x="200" y="130" text-anchor="middle" font-size="7.5">in-process token bucket</text>
  <text x="256" y="116" font-size="7.5" fill="#1d4e89">limit ÷ N gateways per key, per process</text>
  <text x="256" y="127" font-size="7.5">approximate, bounded, no dependency</text>
  <text x="8" y="146" font-size="7.5">while the store is down, an alert fires and a metric counts fallback decisions; the choice is logged, not silent</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker>
  </defs>
</svg>

- **Fail-open** admits everything when the store cannot answer. It is the default for a public API, because the limiter exists to protect availability and must not be the thing that removes it. The backend's own overload protection, shedding at the edge (booklet 05), is the second line
- **Fail-closed** refuses everything. It is right where an over-admitted request costs real money, an SMS gateway or a paid third-party call, and wrong nearly everywhere else
- The **local fallback** is the answer that shows the design was thought through: each gateway keeps a token bucket per key in memory, sized to the limit divided by the gateway count. Uneven traffic makes it strict for some clients and loose for others; both errors are bounded, which neither open nor closed can say
- The store call has a short timeout of its own. A limiter that waits 30 s for a dead store has turned every request into a 30 s request, which is the outage arriving by another door

### The failure

- Not deciding. The store goes away, the client library throws, the exception propagates, and every request returns 500. Fail-closed was chosen by accident and nobody can say so on the incident call
