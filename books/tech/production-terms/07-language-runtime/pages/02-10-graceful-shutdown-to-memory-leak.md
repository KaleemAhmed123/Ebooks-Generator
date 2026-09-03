## Graceful Shutdown

On `SIGTERM`: stop accepting new connections, finish what is in flight, close
database pools and message consumers, then exit. Kubernetes gives you about
thirty seconds before `SIGKILL`.

Without it, every rolling deploy kills pods mid-request and a slice of users
sees connection resets.

<svg viewBox="0 0 460 62" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="On SIGTERM the server stops accepting connections, finishes in-flight requests, closes pools and consumers, then exits, with a hard-kill timer as a backstop">
  <text x="4" y="16" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">SIGTERM</text>
  <path d="M58 12 H88" stroke="#1a1a1a" stroke-width="1.2"/><path d="M88 12 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="92" y="2" width="112" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
  <text x="148" y="16" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">server.close()</text>
  <path d="M208 12 H238" stroke="#1a1a1a" stroke-width="1.2"/><path d="M238 12 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="242" y="2" width="130" height="20" fill="#e2fcf3" stroke="#5b2fa8" stroke-width="1.4"/>
  <text x="307" y="16" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#5b2fa8">finish in-flight</text>
  <path d="M148 22 V32 H92" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <rect x="4" y="38" width="200" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
  <text x="104" y="52" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">close DB pool, broker, consumers</text>
  <path d="M208 48 H238" stroke="#1a1a1a" stroke-width="1.2"/><path d="M238 48 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="242" y="38" width="130" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
  <text x="307" y="52" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">process.exit(0)</text>
  <text x="380" y="46" font-family="Georgia,serif" font-size="8.5" fill="#6b6b6b">hard-kill</text>
  <text x="380" y="56" font-family="Georgia,serif" font-size="8.5" fill="#6b6b6b">timer backstop</text>
</svg>

Fail the readiness probe a few seconds before you stop listening — the load
balancer has to notice you are leaving before you start refusing it.

## Memory Leak

*in JS*

Objects nothing needs but something still references, so the collector cannot
touch them. In a long-lived Node process the end state is an OOM kill, usually
at peak traffic, usually nightly once it starts.

An in-memory `Map` cache keyed by `userId` with no eviction reaches 3GB in a
week. Nothing looks wrong until the container limit does.

| Cause | Fix |
|---|---|
| unbounded `Map` or array cache | TTL, or an LRU with a size bound |
| timers and listeners never cleared | `clearInterval`, `off()` on teardown |
| closures capturing large objects | narrow what the closure captures |

Heap growth that never returns to its floor across restarts of load — not peak
heap — is the signal. Peak heap alone just means the process was busy.
