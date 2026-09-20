# Module 7 - The unreliable network

## Not a function call

- A local function call either returns or throws. A network call has a third outcome: **silence**. The caller sends a request and hears nothing back

<svg viewBox="0 0 460 78" role="img" aria-label="A message travels from A through five arrows (send, network, queue, network, receive to B) and a reply back; any arrow can fail, delay, duplicate or reorder; the caller sees only silence" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <rect x="4" y="18" width="36" height="24" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="22" y="34" text-anchor="middle">A</text>
  <path d="M40 30 L74 30" stroke="#1a1a1a"/><path d="M74 30 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="78" y="22" width="56" height="16" rx="3" fill="none" stroke="#6b6b6b"/><text x="106" y="34" text-anchor="middle" font-size="8" fill="#6b6b6b">network</text>
  <path d="M134 30 L168 30" stroke="#1a1a1a"/><path d="M168 30 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="172" y="22" width="46" height="16" rx="3" fill="none" stroke="#6b6b6b"/><text x="195" y="34" text-anchor="middle" font-size="8" fill="#6b6b6b">queue</text>
  <path d="M218 30 L252 30" stroke="#1a1a1a"/><path d="M252 30 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="256" y="22" width="56" height="16" rx="3" fill="none" stroke="#6b6b6b"/><text x="284" y="34" text-anchor="middle" font-size="8" fill="#6b6b6b">network</text>
  <path d="M312 30 L346 30" stroke="#1a1a1a"/><path d="M346 30 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="350" y="18" width="36" height="24" rx="3" fill="none" stroke="#1a1a1a"/><text x="368" y="34" text-anchor="middle">B</text>
  <text x="195" y="14" text-anchor="middle" font-size="8" fill="#6b6b6b">each arrow can fail, delay, duplicate, reorder</text>
  <path d="M350 42 L40 58" stroke="#6b6b6b" stroke-dasharray="3 2"/><path d="M40 58 l7 -4 v6 z" fill="#6b6b6b"/>
  <text x="195" y="66" text-anchor="middle" font-size="8" fill="#6b6b6b">reply path has the same five failure modes</text>
  <text x="195" y="78" text-anchor="middle" font-size="8" fill="#b8541a">A sees only: answer, or silence</text>
</svg>

- The request may have been lost. The request may have arrived, been processed, and the reply lost. The request may arrive later, after the caller gave up and retried. The caller cannot tell which one happened
- Every RPC, HTTP call, and message send is this diagram. Writing it as `await fetch()` hides it

### The failure

- Writing a service call as if it were a local function. No timeout, no retry, no fallback. When the remote side dies, the caller hangs until the OS gives up — minutes later
