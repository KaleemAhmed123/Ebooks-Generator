## Service mesh at a glance

- A **service mesh** puts a proxy beside every instance, a **sidecar**, and routes all traffic in and out through it. The application talks to `localhost`; the sidecar does discovery, mutual TLS, retries, timeouts, and emits the metrics and traces. One implementation of the hard parts (page 8), in every language at once, bought with two extra hops per call and a control plane to run

<svg viewBox="0 0 460 120" role="img" aria-label="A service mesh. Orders and billing each run beside a sidecar proxy. Orders calls localhost; its sidecar looks billing up, opens a mutual-TLS connection to billing's sidecar, applies the retry and timeout policy, records latency and the trace span, and forwards; billing's sidecar terminates TLS and hands the plain request to billing on localhost. A control plane pushes the policies and certificates to every sidecar. The path is now four hops instead of two. An orange cross marks the mesh retrying three times on top of an application that already retries three times: nine attempts per failure against a struggling dependency." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="30" width="60" height="34" rx="3" fill="#fff" stroke="#1d4e89"/><text x="36" y="45" text-anchor="middle">orders</text><text x="36" y="57" text-anchor="middle" font-size="7">calls localhost</text>
  <rect x="86" y="24" width="110" height="46" rx="3" fill="#e6f2ff" stroke="#333"/><text x="141" y="37" text-anchor="middle">sidecar</text><text x="141" y="48" text-anchor="middle" font-size="7">discovery · mTLS · retries</text><text x="141" y="58" text-anchor="middle" font-size="7">timeouts · metrics · trace span</text>
  <line x1="66" y1="47" x2="86" y2="47" stroke="#333" marker-end="url(#d)"/>
  <rect x="264" y="24" width="110" height="46" rx="3" fill="#e6f2ff" stroke="#333"/><text x="319" y="37" text-anchor="middle">sidecar</text><text x="319" y="48" text-anchor="middle" font-size="7">terminates mTLS, checks</text><text x="319" y="58" text-anchor="middle" font-size="7">policy, hands to localhost</text>
  <line x1="196" y1="47" x2="264" y2="47" stroke="#333" marker-end="url(#d)"/><text x="230" y="42" text-anchor="middle" font-size="7">mTLS</text>
  <rect x="394" y="30" width="60" height="34" rx="3" fill="#fff" stroke="#1d4e89"/><text x="424" y="45" text-anchor="middle">billing</text><text x="424" y="57" text-anchor="middle" font-size="7">plain, on localhost</text>
  <line x1="374" y1="47" x2="394" y2="47" stroke="#333" marker-end="url(#d)"/>
  <rect x="160" y="84" width="140" height="22" rx="3" fill="#fff" stroke="#1d4e89"/><text x="230" y="98" text-anchor="middle" font-size="7.5">control plane: policy + certificates → every sidecar</text>
  <line x1="141" y1="70" x2="180" y2="84" stroke="#333" stroke-dasharray="3 3"/><line x1="319" y1="70" x2="280" y2="84" stroke="#333" stroke-dasharray="3 3"/>
  <text x="6" y="80" font-size="7">four hops where there were two</text>
  <text x="6" y="116" font-size="7.5" fill="#bf4c28">✕ the mesh retries 3× on top of the app's 3×: nine attempts per failure at the dependency that is already struggling (Module 4, page 2)</text>
  <defs><marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- What it standardises: every call is encrypted and authenticated between services without any service holding a certificate; every call has the same retry and timeout policy, set centrally; every call appears in the same metrics with the same labels (Module 6). A fleet of a hundred services in six languages gets this uniformly, which no library rollout achieves
- What it costs: a proxy per instance to run and upgrade, a control plane that is itself a dependency, added latency per hop, and a second place where retries, timeouts and routing are configured, which is the failure below. At five services it solves nothing a shared library would not

### The failure

- The mesh retries on top of the application's retries. The app tries three times, the sidecar tries three times per attempt, and a dependency that is slow sees nine requests per user request, from every caller at once (Module 4, page 2). When the mesh owns retries, the application must not; a policy that lives in two places is two policies
