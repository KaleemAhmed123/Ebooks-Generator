## Distributed tracing

- A **trace** is one request's whole journey; a **span** is one unit of work inside it, with a start, a duration and a parent. The parent links are what turn a pile of timings into a tree, and the tree is what shows where the time went

<svg viewBox="0 0 460 120" role="img" aria-label="A trace drawn as a waterfall. The gateway span for POST slash checkout runs the full 240 milliseconds. Inside it, orders.create takes 225 milliseconds. Inside that, inventory.reserve takes 30 milliseconds and payments.charge takes 180. Inside payments.charge, a third-party call to Stripe takes 170 milliseconds and is highlighted in orange as the span holding the time. The waterfall answers one question: which span holds the time. An orange cross marks head sampling at one per cent, where the keep-or-drop decision is made before the request is known to be slow, so slow requests are kept only by luck." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <line x1="100" y1="20" x2="412" y2="20" stroke="#999"/>
  <text x="100" y="15" text-anchor="middle" font-size="6">0</text>
  <text x="256" y="15" text-anchor="middle" font-size="6">120 ms</text>
  <text x="412" y="15" text-anchor="middle" font-size="6">240 ms</text>
  <text x="4" y="33" font-size="6.5">gateway POST /checkout</text>
  <rect x="100" y="26" width="312" height="9" rx="1" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <text x="416" y="33" font-size="6.5">240 ms</text>
  <text x="10" y="47" font-size="6.5">orders.create</text>
  <rect x="113" y="40" width="293" height="9" rx="1" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <text x="410" y="47" font-size="6.5">225 ms</text>
  <text x="16" y="61" font-size="6.5">inventory.reserve</text>
  <rect x="120" y="54" width="39" height="9" rx="1" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <text x="163" y="61" font-size="6.5">30 ms</text>
  <text x="16" y="75" font-size="6.5">payments.charge</text>
  <rect x="165" y="68" width="234" height="9" rx="1" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <text x="403" y="75" font-size="6.5">180 ms</text>
  <text x="22" y="89" font-size="6.5">stripe POST /charges</text>
  <rect x="172" y="82" width="221" height="9" rx="1" fill="#fbe9e2" stroke="#bf4c28" stroke-width="0.5"/>
  <text x="397" y="89" font-size="6.5" fill="#bf4c28">170 ms</text>
  <text x="4" y="105" font-size="7">the waterfall answers one question — which span holds the time. Here 170 of 240 ms is one third-party call</text>
  <text x="4" y="117" font-size="7.5" fill="#bf4c28">✕ head sampling at 1 %: the keep decision is made before the request is slow, so slow ones are kept by luck</text>
</svg>

- Tracing everything does not scale: 10 000 requests per second at 50 spans each is 500 000 spans per second, and the observability bill passes the application's. So requests are sampled, and the only real decision is when
- **Head sampling** decides at the edge and stamps the choice into the flags byte of `traceparent` (page 3), so every service downstream agrees for free. It is cheap, stateless, and blind — the decision is made before anything is known about the request
- **Tail sampling** buffers spans until the trace finishes, then keeps it on what it turned out to be: every error, everything over 500 ms, 1 % of the rest. It keeps exactly the traces worth having and costs memory at the collector, plus a wait for slow traces to end

### The failure

- Head sampling at 1 % on a service whose problem is a rare slow path. The traces that survive are a uniform sample of normal requests, so the investigation has a hundred examples of the thing that works and none of the thing that broke — and the sampling rate looks adequate right up until it is needed
