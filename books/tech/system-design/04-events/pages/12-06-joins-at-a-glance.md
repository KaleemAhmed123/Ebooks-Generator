## Joins at a glance

- Three join shapes: **stream-table** — enrich each event with the latest value from a table (a user id joined against a users table kept current by CDC, Module 8); **stream-stream** — join two streams within a time window, because neither side is ever "done"; **table-table** — join two derived tables, recomputing on either side's update

<svg viewBox="0 0 460 100" role="img" aria-label="Three join shapes. Stream joined with table produces an enriched stream. Stream joined with stream within a window produces a joined stream. Table joined with table produces a joined table." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8">
  <text x="65" y="12" text-anchor="middle" font-weight="bold">stream-table</text>
  <rect x="15" y="20" width="45" height="18" fill="none" stroke="#333"/><text x="37" y="32" text-anchor="middle" font-size="6.5">stream</text>
  <rect x="65" y="20" width="45" height="18" fill="none" stroke="#333"/><text x="87" y="32" text-anchor="middle" font-size="6.5">table</text>
  <path d="M65 46 L110 46" stroke="#bf4c28" marker-end="url(#j12)"/>
  <text x="90" y="43" text-anchor="middle" font-size="6" fill="#bf4c28">enriched</text>
  <text x="230" y="12" text-anchor="middle" font-weight="bold">stream-stream</text>
  <rect x="190" y="20" width="45" height="18" fill="none" stroke="#333"/><text x="212" y="32" text-anchor="middle" font-size="6.5">stream</text>
  <rect x="240" y="20" width="45" height="18" fill="none" stroke="#333"/><text x="262" y="32" text-anchor="middle" font-size="6.5">stream</text>
  <text x="237" y="50" text-anchor="middle" font-size="6" fill="#1d4e89">windowed join</text>
  <text x="390" y="12" text-anchor="middle" font-weight="bold">table-table</text>
  <rect x="365" y="20" width="45" height="18" fill="none" stroke="#333"/><text x="387" y="32" text-anchor="middle" font-size="6.5">table</text>
  <rect x="415" y="20" width="40" height="18" fill="none" stroke="#333"/><text x="435" y="32" text-anchor="middle" font-size="6.5">table</text>
  <text x="400" y="50" text-anchor="middle" font-size="6">recomputes on update</text>
</svg>

- A stream-stream join with no window is unbounded state by construction: every record on either side must be kept forever in case a matching record on the other side shows up eventually, which is exactly the state a real system cannot afford to keep. The window is not a tuning knob here, it is what makes the join possible to run at all
- A key salted for hot-key relief (booklet 02) still has to land on the same partition as its match for a stream-stream join to see both sides — salting a join key needs to happen on both streams identically, or the join stops finding matches it used to find

### The failure

- A stream-stream join with no window, "to be safe and not miss anything." State grows without bound because a match that never arrives is never expired, and the job runs out of memory long before it runs out of traffic
