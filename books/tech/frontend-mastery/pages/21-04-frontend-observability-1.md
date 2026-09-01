## Frontend Observability

A backend that breaks writes to a log file on a machine you own. A frontend that
breaks fails silently on a phone in another country, on a browser version you
have never tested, on a network you cannot simulate, and then the person closes
the tab.

**Frontend Observability** is now a named skill in senior job postings, and
Grafana, Honeycomb and Observe all ship products under that exact name. The
reason is that the old answer, an error tracker plus a Lighthouse score, answers
neither of the two questions that matter during an incident: *how many users are
affected*, and *what were they doing*.

### Three kinds of data, three different jobs

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

  <text x="6" y="12" class="sm">WHAT EACH ONE ANSWERS</text>

  <rect class="bx" x="6" y="24" width="148" height="72" rx="4"/>
  <text x="80" y="40" class="lbl" text-anchor="middle">errors</text>
  <text x="16" y="56" class="sm">"something threw"</text>
  <text x="16" y="70" class="tiny">stack, release, browser</text>
  <text x="16" y="84" class="hot">blind to silent failure</text>

  <rect class="bx" x="162" y="24" width="148" height="72" rx="4"/>
  <text x="236" y="40" class="lbl" text-anchor="middle">metrics</text>
  <text x="172" y="56" class="sm">"how is everyone doing"</text>
  <text x="172" y="70" class="tiny">vitals at p75, by segment</text>
  <text x="172" y="84" class="tiny">this is what you alert on</text>

  <rect class="bx" x="318" y="24" width="146" height="72" rx="4"/>
  <text x="391" y="40" class="lbl" text-anchor="middle">traces</text>
  <text x="328" y="56" class="sm">"what happened, in order"</text>
  <text x="328" y="70" class="tiny">one session, end to end</text>
  <text x="328" y="84" class="tiny">crosses into the backend</text>

  <text x="6" y="118" class="hot">the worst frontend failures throw nothing: a click handler that never attached</text>
  <text x="6" y="130" class="hot">because hydration failed is silent in the left box and invisible in the middle one</text>
  <text x="6" y="146" class="sm">which is why the funnel is an alert, not a dashboard
</svg>
:::

**Errors** tell you something threw. This is Sentry territory: the exception, the
stack trace, the release, the browser. Necessary, and the narrowest of the three,
because the worst frontend failures throw nothing at all. A button whose click
handler was never attached because hydration failed is silent.

**Metrics** tell you how the population is doing. Core Web Vitals from real
sessions, error rate, API latency as the browser measured it. Aggregated,
cheap, and the thing you alert on.

**Traces** tell you what happened in one session, in order. The user clicked, a
route transition started, three fetches went out, one took 4 seconds, the render
blocked. This is the piece frontend teams have historically not had.
