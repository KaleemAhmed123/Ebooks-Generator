## Gateways and backends for frontends

- Once there are several services, every client needs to know where each one lives, and every service needs its own auth, rate limiting and TLS
- An **API gateway** is one entry point that handles those concerns once and routes to the right service behind it
- A **BFF**, backend for frontend, is different. It is one service per client type that composes calls and returns exactly what that client needs

:::mint
<svg viewBox="0 0 470 168" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .l { font: 8px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7px Consolas, monospace; fill: #4a4a4a; }
    .a { stroke: #1a1a1a; stroke-width: 1; fill: none; }
    .t { font: bold 7px Consolas, monospace; fill: #ef476e; }
  </style>
  <defs>
    <marker id="g1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <rect class="b" x="6" y="18" width="62" height="22" rx="3"/>
  <text x="37" y="33" class="s" text-anchor="middle">web</text>
  <rect class="b" x="6" y="58" width="62" height="22" rx="3"/>
  <text x="37" y="73" class="s" text-anchor="middle">mobile</text>
  <rect class="b" x="6" y="98" width="62" height="22" rx="3"/>
  <text x="37" y="113" class="s" text-anchor="middle">partner</text>

  <rect class="b" x="118" y="48" width="84" height="44" rx="4"/>
  <text x="160" y="66" class="l" text-anchor="middle">gateway</text>
  <text x="160" y="80" class="s" text-anchor="middle">auth, limits, TLS</text>

  <rect class="b" x="252" y="12" width="82" height="24" rx="3"/>
  <text x="293" y="28" class="s" text-anchor="middle">orders</text>
  <rect class="b" x="252" y="46" width="82" height="24" rx="3"/>
  <text x="293" y="62" class="s" text-anchor="middle">payments</text>
  <rect class="b" x="252" y="80" width="82" height="24" rx="3"/>
  <text x="293" y="96" class="s" text-anchor="middle">shipping</text>
  <rect class="b" x="252" y="114" width="82" height="24" rx="3"/>
  <text x="293" y="130" class="s" text-anchor="middle">catalog</text>

  <line class="a" x1="70" y1="29" x2="114" y2="58" marker-end="url(#g1)"/>
  <line class="a" x1="70" y1="69" x2="114" y2="69" marker-end="url(#g1)"/>
  <line class="a" x1="70" y1="109" x2="114" y2="82" marker-end="url(#g1)"/>
  <line class="a" x1="204" y1="58" x2="248" y2="24" marker-end="url(#g1)"/>
  <line class="a" x1="204" y1="64" x2="248" y2="58" marker-end="url(#g1)"/>
  <line class="a" x1="204" y1="76" x2="248" y2="92" marker-end="url(#g1)"/>
  <line class="a" x1="204" y1="82" x2="248" y2="126" marker-end="url(#g1)"/>

  <text x="235" y="158" class="t" text-anchor="middle">put cross-cutting concerns here, never business logic</text>
</svg>
:::

- **Belongs in a gateway:** TLS termination, authentication, rate limiting, routing, correlation ids, CORS
- **Never in a gateway:** business rules. A gateway holding domain logic becomes a monolith nobody can deploy safely
