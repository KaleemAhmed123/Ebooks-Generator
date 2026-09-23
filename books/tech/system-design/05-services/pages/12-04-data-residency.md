## Data residency

- A legal requirement that certain data stays inside a jurisdiction. It is not a latency optimisation and cannot be satisfied by a replica: the constraint is on where bytes may **exist**, so replicating for availability into the wrong region is the violation

<svg viewBox="0 0 460 110" role="img" aria-label="Routing users to a home region for residency. EU users and US users both reach a router that sends each request to that user's home region. The EU region holds EU personal data and the US region holds US personal data; neither replicates personal data to the other. A global index holds only identifiers and which region is home, never personal data itself, so any service can find a user without moving them. An orange cross marks the data leaving through a backup, a log line or an error report — the paths nobody lists when drawing the diagram." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="4" y="14" font-size="7.5">route each user to their home region; keep the global layer metadata-only</text>
  <rect x="4" y="30" width="64" height="20" rx="3" fill="#fff" stroke="#1d4e89"/><text x="36" y="44" text-anchor="middle" font-size="7">EU user</text>
  <rect x="4" y="66" width="64" height="20" rx="3" fill="#fff" stroke="#1d4e89"/><text x="36" y="80" text-anchor="middle" font-size="7">US user</text>
  <rect x="96" y="44" width="70" height="28" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="131" y="62" text-anchor="middle" font-size="7">route home</text>
  <line x1="68" y1="42" x2="94" y2="52" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="68" y1="76" x2="94" y2="66" stroke="#1d4e89" marker-end="url(#b)"/>
  <rect x="210" y="24" width="110" height="30" rx="3" fill="#fff" stroke="#1d4e89"/><text x="265" y="37" text-anchor="middle" font-size="7">EU region</text><text x="265" y="48" text-anchor="middle" font-size="6">EU personal data</text>
  <rect x="210" y="66" width="110" height="30" rx="3" fill="#fff" stroke="#1d4e89"/><text x="265" y="79" text-anchor="middle" font-size="7">US region</text><text x="265" y="90" text-anchor="middle" font-size="6">US personal data</text>
  <line x1="166" y1="52" x2="208" y2="40" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="166" y1="66" x2="208" y2="80" stroke="#1d4e89" marker-end="url(#b)"/>
  <rect x="352" y="42" width="100" height="32" rx="3" fill="#f3f3f3" stroke="#666"/><text x="402" y="55" text-anchor="middle" font-size="7">global index</text><text x="402" y="66" text-anchor="middle" font-size="6">ids + home region only</text>
  <line x1="320" y1="44" x2="350" y2="52" stroke="#666" stroke-dasharray="2 2"/>
  <line x1="320" y1="78" x2="350" y2="66" stroke="#666" stroke-dasharray="2 2"/>
  <text x="4" y="106" font-size="7.5" fill="#bf4c28">✕ it leaves in a backup, a log line or an error report — the paths nobody draws on the diagram</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

- The global index is what makes the rest workable, and it survives only by holding nothing regulated: a user identifier and the name of their home region. Any service anywhere can then find where a user lives without any personal data leaving that region
- Sharding by home region is not sharding for scale, and the difference matters when the two want opposite things. Placement here is fixed by law rather than by load, so a hot region cannot be rebalanced by moving users out of it

### The failure

- The exfiltration nobody designed: the copies. A nightly backup written to a bucket in another region, an error report including a request body, a log line with an email address shipped to a central aggregator, a third-party analytics call from the browser
- The application's own data flows are usually correct, because those are the ones drawn on the diagram and reviewed. The violation comes from the operational plumbing added for good reasons at different times, each of which quietly copies a subset of production somewhere convenient. Residency is a property of every path data takes, which means the audit has to cover backups, logs, metrics, crash reports and support tooling — not the request path
