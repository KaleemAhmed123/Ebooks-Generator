## Sticky Sessions

Routing a client's requests back to the same server instance. Required for
Socket.io's polling handshake, and a scaling constraint everywhere else.

Without them, the handshake lands on server A and the upgrade lands on server B,
which has never heard of that session. The connection fails in a way that looks
random, because it depends on which server the load balancer picked.

Two ways out, and they are not equivalent: pin the client with IP hashing or a
cookie, or remove the need entirely with a shared session store.

**Pinning is the quick fix and it is also a constraint you keep.** A pinned
client cannot be rebalanced, so a restarting pod drops its users rather than
handing them over.

## Streaming SSR

Sending HTML in chunks as it becomes ready, instead of waiting for the slowest
data source before sending anything.

The header and navigation flush at 80ms while a slow recommendations query
resolves at 1.4 seconds. Without streaming the user watches a blank page for the
whole 1.4 seconds.

<svg viewBox="0 0 460 62" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Blocking rendering sends nothing until the slowest query finishes, while streaming flushes the shell first and each section as it resolves">
  <text x="4" y="18" font-family="Consolas,monospace" font-size="8.5" fill="#b32d2b">blocking</text>
  <rect x="72" y="8" width="300" height="14" fill="none" stroke="#b32d2b" stroke-width="1.2"/>
  <text x="222" y="19" text-anchor="middle" font-family="Georgia,serif" font-size="8.5" fill="#b32d2b">nothing sent — waiting on the slowest query</text>
  <text x="378" y="19" font-family="Consolas,monospace" font-size="8.5" fill="#b32d2b">1.4s</text>
  <text x="4" y="48" font-family="Consolas,monospace" font-size="8.5" fill="#1f6f8b">streaming</text>
  <rect x="72" y="38" width="52" height="14" fill="#e2fcf3" stroke="#1f6f8b" stroke-width="1.2"/>
  <text x="98" y="49" text-anchor="middle" font-family="Consolas,monospace" font-size="7.5" fill="#1f6f8b">shell</text>
  <rect x="126" y="38" width="110" height="14" fill="none" stroke="#1f6f8b" stroke-width="1.1"/>
  <text x="181" y="49" text-anchor="middle" font-family="Consolas,monospace" font-size="7.5" fill="#1f6f8b">section 400ms</text>
  <rect x="238" y="38" width="134" height="14" fill="none" stroke="#1f6f8b" stroke-width="1.1"/>
  <text x="305" y="49" text-anchor="middle" font-family="Consolas,monospace" font-size="7.5" fill="#1f6f8b">recs 1.4s</text>
  <text x="378" y="49" font-family="Georgia,serif" font-size="8.5" fill="#1f6f8b">same total</text>
</svg>

The total time is identical. What changed is that first paint stopped being
gated by the slowest query on the page.
