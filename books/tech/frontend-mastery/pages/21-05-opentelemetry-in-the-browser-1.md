## OpenTelemetry in the Browser

Every monitoring vendor ships a JavaScript agent. Each one has its own API, its
own data model, and its own idea of what a page view is. Instrument with one and
your telemetry is welded to that vendor: switching means ripping the
instrumentation out of the application and writing it again.

**OpenTelemetry** is the vendor-neutral answer. It is a specification plus a set
of SDKs, governed by the Cloud Native Computing Foundation, that defines what a
trace, a span, a metric and a log are. You instrument once against the standard,
and point the exporter at whichever backend you are paying this year.

It won on the backend years ago. The browser SDK is newer, and 2026 is the year
it became the expected answer for the frontend too. Elastic shipped
OpenTelemetry RUM support, though at the time of writing it is still technical
preview and not recommended for production, so treat this as the model to
understand rather than a stack to bet the quarter on.

### The vocabulary

- A **span** is one unit of work with a start, an end, and attributes. "Fetch
  `/api/cart`", "render the product grid", "the click handler ran".
- A **trace** is a tree of spans that share a trace id. One user action, all the
  way down.
- **Context propagation** is how the trace id travels. This is the part worth

:::mint
<svg viewBox="0 0 470 150" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .lbl { font: 10px Georgia, serif; fill: #1a1a1a; }
    .sm  { font: 8px Consolas, monospace; fill: #4a4a4a; }
    .tiny{ font: 7px Consolas, monospace; fill: #6a6a72; }
    .bx  { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .soft{ fill: #ffffff; stroke: #8fbfae; stroke-width: 1; stroke-dasharray: 3 2; }
    .ar  { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .hot { fill: #ef476e; font: bold 8px Consolas, monospace; }
    .hotbx { fill: #ffffff; stroke: #ef476e; stroke-width: 1.2; }
    .hotln { stroke: #ef476e; stroke-width: 1.1; fill: none; }
    .bar { fill: #d8ece4; stroke: #8fbfae; stroke-width: 0.8; }
    .barh{ fill: #fbdde5; stroke: #ef476e; stroke-width: 0.8; }
  </style>
  <defs>
    <marker id="a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
    <marker id="r" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#ef476e"/>
    </marker>
  </defs>

  <text x="6" y="12" class="sm">ONE TRACE ID, BOTH SIDES OF THE NETWORK</text>

  <rect class="bx" x="6" y="26" width="150" height="72" rx="4"/>
  <text x="81" y="42" class="lbl" text-anchor="middle">browser</text>
  <rect class="soft" x="16" y="50" width="130" height="18" rx="2"/>
  <text x="81" y="63" class="sm" text-anchor="middle">span: click</text>
  <rect class="soft" x="26" y="72" width="120" height="18" rx="2"/>
  <text x="86" y="85" class="sm" text-anchor="middle">span: fetch /orders</text>

  <rect class="bx" x="314" y="26" width="150" height="72" rx="4"/>
  <text x="389" y="42" class="lbl" text-anchor="middle">your API</text>
  <rect class="soft" x="324" y="50" width="130" height="18" rx="2"/>
  <text x="389" y="63" class="sm" text-anchor="middle">span: GET /orders</text>
  <rect class="barh" x="334" y="72" width="120" height="18" rx="2"/>
  <text x="394" y="85" class="hot" text-anchor="middle">span: SELECT  7.4s</text>

  <line class="ar" x1="160" y1="81" x2="310" y2="81" marker-end="url(#a)"/>
  <text x="235" y="74" class="sm" text-anchor="middle">traceparent: 00-4bf9...-01</text>
  <text x="235" y="96" class="tiny" text-anchor="middle">the server continues the trace</text>
  <text x="235" y="106" class="tiny" text-anchor="middle">instead of starting a new one</text>

  <text x="6" y="130" class="hot">without this the frontend says "the API was slow" and the backend says "our p99 is 80ms",</text>
  <text x="6" y="142" class="hot">and both are telling the truth about different things
</svg>
:::
  caring about.
