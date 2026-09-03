## Exchange / Binding / Routing Key

Publishers send to an exchange, never to a queue. Bindings and routing keys
decide which queues receive a copy.

<svg viewBox="0 0 460 80" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A publisher sends to an exchange, which routes by binding pattern to two queues, while messages matching no binding are dropped">
  <rect x="4" y="28" width="76" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="42" y="43" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">publisher</text>
  <path d="M82 39 H108" stroke="#1a1a1a" stroke-width="1.2"/><path d="M108 39 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="112" y="28" width="80" height="22" fill="#e2fcf3" stroke="#2a5673" stroke-width="1.4"/>
  <text x="152" y="43" text-anchor="middle" font-family="Consolas,monospace" font-size="9" fill="#2a5673">exchange</text>
  <path d="M194 39 H216 M216 14 V64 M216 14 H244 M216 39 H244 M216 64 H244" stroke="#1a1a1a" stroke-width="1.1" fill="none"/>
  <path d="M244 14 l-6 -3.5 v7 z M244 39 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <text x="250" y="18" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">"invoice.*"    → queue A</text>
  <text x="250" y="43" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">"invoice.paid" → queue B</text>
  <text x="250" y="68" font-family="Georgia,serif" font-size="8.5" fill="#b32d2b">no binding matches → dropped, silently</text>
</svg>

The last line is the one that costs an afternoon. A message routed nowhere is
not an error — the publisher gets a success and the message ceases to exist.

Four exchange types: `direct` matches the key exactly, `topic` matches patterns,
`fanout` copies to everything bound, `headers` matches on attributes.

## EXPLAIN ANALYZE

Runs the query and reports the real plan with actual row counts and timings. The
only honest way to find out why something is slow.

```
Seq Scan on orders
  (cost=0..91k rows=12 width=64)
  (actual time=0.1..38942 rows=480123)
```

The planner expected twelve rows and got four hundred and eighty thousand. That
gap is the finding — it means the statistics are stale, which is why the planner
chose a nested loop that takes forty seconds.

Read the estimate against the actual before reading anything else. A plan that
looks wrong is usually a plan built on wrong numbers.
