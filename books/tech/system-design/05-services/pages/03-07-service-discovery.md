## Service discovery

- Instances come and go: autoscaling adds them, deploys replace them, crashes remove them. A caller cannot hold an address; it holds a name and asks something that knows the current set. A **registry** (Consul, etcd) is that something as a service; DNS is that something as a protocol. Kubernetes uses DNS: a Service named `billing` in namespace `shop` resolves as `billing.shop.svc.cluster.local`, backed by the EndpointSlices of the pods that are ready

<svg viewBox="0 0 460 134" role="img" aria-label="Service discovery. Three billing instances register themselves, or are registered by the platform, into a registry with a health status and a lease they must renew. A caller, orders, asks the registry where billing is, by name, and receives the current healthy addresses; it then calls one directly or through a proxy, page 8. Instance 2 crashes; its lease expires or its health check fails and the registry removes it. An orange cross marks the gap: for the lease interval, 30 seconds here, the registry still hands out instance 2's address and callers time out against a dead host; the fixes named are a shorter lease, an active health check from the registry, and callers that treat a connection failure as a signal to pick another instance." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="40" width="70" height="40" rx="3" fill="#fff" stroke="#1d4e89"/><text x="41" y="55" text-anchor="middle">orders</text><text x="41" y="68" text-anchor="middle" font-size="7">"where is billing?"</text>
  <rect x="150" y="30" width="140" height="60" rx="3" fill="#e6f2ff" stroke="#333"/><text x="220" y="44" text-anchor="middle">registry</text><text x="220" y="56" text-anchor="middle" font-size="7">name → [addresses, health, lease]</text><text x="220" y="67" text-anchor="middle" font-size="7">Consul / etcd, or Kubernetes DNS:</text><text x="220" y="78" text-anchor="middle" font-size="7">billing.shop.svc.cluster.local</text>
  <line x1="76" y1="55" x2="150" y2="55" stroke="#333" marker-end="url(#d)"/><text x="113" y="50" text-anchor="middle" font-size="7">lookup by name</text>
  <line x1="150" y1="68" x2="76" y2="68" stroke="#333" stroke-dasharray="3 3" marker-end="url(#d)"/><text x="113" y="80" text-anchor="middle" font-size="7">10.0.1.4, 10.0.1.9</text>
  <rect x="356" y="10" width="98" height="20" rx="3" fill="#fff" stroke="#333"/><text x="405" y="23" text-anchor="middle" font-size="7.5">billing #1  10.0.1.4</text>
  <rect x="356" y="52" width="98" height="20" rx="3" fill="#fbe9e2" stroke="#bf4c28"/><text x="405" y="65" text-anchor="middle" font-size="7.5" fill="#bf4c28">billing #2  10.0.1.7  ✕</text>
  <rect x="356" y="94" width="98" height="20" rx="3" fill="#fff" stroke="#333"/><text x="405" y="107" text-anchor="middle" font-size="7.5">billing #3  10.0.1.9</text>
  <line x1="356" y1="20" x2="290" y2="44" stroke="#333" marker-end="url(#d)"/><line x1="356" y1="104" x2="290" y2="80" stroke="#333" marker-end="url(#d)"/><text x="352" y="14" font-size="7" text-anchor="end">register + renew lease</text><text x="352" y="122" font-size="7" text-anchor="end">every few seconds</text>
  <line x1="356" y1="62" x2="290" y2="62" stroke="#bf4c28" stroke-dasharray="3 3"/><text x="323" y="58" text-anchor="middle" font-size="7" fill="#bf4c28">no renewal</text>
  <line x1="41" y1="80" x2="41" y2="112" stroke="#333"/><line x1="41" y1="112" x2="356" y2="112" stroke="#333" marker-end="url(#d)"/><text x="200" y="108" text-anchor="middle" font-size="7">then call an instance directly, or via a proxy (page 8)</text>
  <text x="6" y="130" font-size="7.5" fill="#bf4c28">✕ lease 30 s: for up to 30 s the registry still returns 10.0.1.7 and callers time out; shorten the lease, probe, retry elsewhere on connect failure</text>
  <defs><marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- Two things flow into the registry: registration, by the instance itself or by the platform that started it, and health, a renewed lease or a passed probe. An entry is only as fresh as the shorter of the two. Kubernetes does both by construction: the pod is in the EndpointSlice while it is running and its readiness probe passes (Module 4, page 9), and DNS answers from that
- The caller's side has a rule too: a connection refused or reset is a discovery signal, not just an error. Pick another instance, and refresh the list; a client that retries the same dead address for its full timeout has made the registry's staleness its own latency

### The failure

- A stale registry entry routed to for 30 seconds after a crash. The instance died between two lease renewals, the registry is honest to the last thing it heard, and every caller that draws that address waits a full timeout for nothing. Discovery is a cache of the truth with a TTL; the design decides how stale it may be, and the caller must survive the staleness it accepted
