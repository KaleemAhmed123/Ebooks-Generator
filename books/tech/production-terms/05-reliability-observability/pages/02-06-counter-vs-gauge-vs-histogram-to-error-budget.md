## Counter vs Gauge vs Histogram

Three metric types answering three different questions. The wrong choice produces
a graph that is confidently meaningless.

| Type | Example | How it is read |
|---|---|---|
| counter | `requests_total` | `rate(...[5m])`, never the raw value |
| gauge | `queue_depth` | the current value |
| histogram | `request_duration` | quantiles across the window |
| summary | client-side quantiles | cannot be aggregated across instances |

A gauge used for latency records whichever request happened to finish last. It
will look perfectly stable throughout an incident.

## Distributed Tracing

Following one request across every service it touches, so the time is attributed
rather than guessed at.

<svg viewBox="0 0 460 92" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A nine-second search trace broken into spans, showing reranking taking six of the nine seconds">
  <text x="4" y="12" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">trace 9f2c — 9.0s total</text>
  <text x="4" y="27" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">auth</text>
  <rect x="110" y="20" width="8" height="8" fill="#1a1a1a"/>
  <text x="440" y="27" text-anchor="end" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">0.2s</text>
  <text x="4" y="43" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">retrieval</text>
  <rect x="118" y="36" width="38" height="8" fill="#1a1a1a"/>
  <text x="440" y="43" text-anchor="end" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">1.0s</text>
  <text x="14" y="59" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">vector search</text>
  <rect x="122" y="52" width="30" height="8" fill="#6b6b6b"/>
  <text x="440" y="59" text-anchor="end" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">0.8s</text>
  <text x="4" y="75" font-family="Consolas,monospace" font-size="8.5" fill="#d0212f">rerank</text>
  <rect x="156" y="68" width="227" height="8" fill="#d0212f"/>
  <text x="440" y="75" text-anchor="end" font-family="Consolas,monospace" font-size="8.5" fill="#d0212f">6.0s</text>
  <text x="4" y="91" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">model</text>
  <rect x="383" y="84" width="57" height="8" fill="#1a1a1a"/>
</svg>

The logs said "slow". The trace named reranking in one screen, and the
indentation showed the vector search was a child of retrieval rather than a
fourth independent cost.

## Error Budget

The amount of failure the SLO allows, treated as something the team gets to
spend.

A 99.9% monthly objective permits 43 minutes of downtime. A week-one incident
burns 20. With 23 left, risky deploys stop until the window resets.

The budget only functions if spending it has an agreed consequence. Without one
it is a number on a dashboard, and reliability loses every argument it has with a
launch date.
