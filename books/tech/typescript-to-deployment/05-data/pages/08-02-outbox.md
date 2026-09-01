## The outbox pattern

- Write the event into the **same database, in the same transaction** as the business change
- A separate process reads that table and publishes, marking rows as sent

:::mint
<svg viewBox="0 0 470 158" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .l { font: 8.5px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7px Consolas, monospace; fill: #4a4a4a; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .tx { fill: none; stroke: #ef476e; stroke-width: 1.2; stroke-dasharray: 4 3; }
    .t { font: bold 7px Consolas, monospace; fill: #ef476e; }
  </style>
  <defs>
    <marker id="o1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <rect class="tx" x="78" y="16" width="180" height="72" rx="5"/>
  <text x="168" y="12" class="t" text-anchor="middle">one transaction</text>

  <rect class="b" x="6" y="40" width="62" height="26" rx="4"/>
  <text x="37" y="57" class="s" text-anchor="middle">handler</text>

  <rect class="b" x="92" y="24" width="152" height="24" rx="4"/>
  <text x="168" y="40" class="s" text-anchor="middle">orders  status = paid</text>

  <rect class="b" x="92" y="56" width="152" height="24" rx="4"/>
  <text x="168" y="72" class="s" text-anchor="middle">outbox  order.paid</text>

  <rect class="b" x="288" y="40" width="78" height="26" rx="4"/>
  <text x="327" y="57" class="s" text-anchor="middle">relay</text>

  <rect class="b" x="392" y="40" width="70" height="26" rx="4"/>
  <text x="427" y="57" class="s" text-anchor="middle">broker</text>

  <line class="a" x1="70" y1="48" x2="88" y2="36" marker-end="url(#o1)"/>
  <line class="a" x1="70" y1="58" x2="88" y2="68" marker-end="url(#o1)"/>
  <line class="a" x1="246" y1="68" x2="284" y2="56" marker-end="url(#o1)"/>
  <line class="a" x1="368" y1="53" x2="388" y2="53" marker-end="url(#o1)"/>

  <text x="235" y="108" class="s" text-anchor="middle">both rows commit together, or neither does</text>
  <text x="235" y="122" class="s" text-anchor="middle">the relay retries forever, because the event is durable</text>
  <text x="235" y="140" class="t" text-anchor="middle">the broker being down delays delivery, it does not lose it</text>
</svg>
:::

```sql
CREATE TABLE outbox (
  id           TEXT PRIMARY KEY,
  topic        TEXT NOT NULL,
  payload      JSONB NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at TIMESTAMPTZ
);

CREATE INDEX idx_outbox_unpublished ON outbox (created_at)
  WHERE published_at IS NULL;
```

- The partial index keeps the scan small no matter how large the table grows
