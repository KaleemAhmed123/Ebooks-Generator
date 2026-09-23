## Write-behind

- Write-behind acknowledges from the cache and flushes to the database later. Writes get memory latency instead of disk latency, and repeated updates to one key collapse into a single database write

<svg viewBox="0 0 460 94" role="img" aria-label="Write-behind. The application writes to the cache and is acknowledged in about a millisecond. The cache flushes to the database later, in batches, so ten updates to one key become one database write. The acknowledgement happens before durability, so everything between the acknowledgement and the flush exists only in one process's memory. An orange cross marks the node dying inside that window: the user was told the data was saved, and it was never written anywhere." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="4" y="28" width="60" height="26" rx="3" fill="#fff" stroke="#1d4e89"/><text x="34" y="45" text-anchor="middle" font-size="7.5">app</text>
  <rect x="140" y="28" width="80" height="26" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="180" y="45" text-anchor="middle" font-size="7.5">cache</text>
  <rect x="320" y="28" width="80" height="26" rx="3" fill="#fff" stroke="#1d4e89"/><text x="360" y="45" text-anchor="middle" font-size="7.5">database</text>
  <line x1="64" y1="36" x2="138" y2="36" stroke="#1d4e89" marker-end="url(#b)"/><text x="101" y="32" text-anchor="middle" font-size="6.5">write</text>
  <line x1="138" y1="48" x2="66" y2="48" stroke="#1d4e89" marker-end="url(#b)"/><text x="102" y="58" text-anchor="middle" font-size="6.5">ack in ~1 ms</text>
  <line x1="220" y1="41" x2="318" y2="41" stroke="#1d4e89" stroke-dasharray="3 2" marker-end="url(#b)"/><text x="269" y="36" text-anchor="middle" font-size="6.5">flushed later, in batches</text>
  <text x="269" y="53" text-anchor="middle" font-size="6" fill="#bf4c28">10 updates → 1 write</text>
  <text x="4" y="74" font-size="7">the ack precedes durability; everything between the ack and the flush exists in one process's memory only</text>
  <text x="4" y="88" font-size="7.5" fill="#bf4c28">✕ the node dies inside that window: the user was told "saved", and the record was never written anywhere</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

- The batching is often the real reason to reach for it. A counter updated a thousand times a second becomes one database write per flush interval, which turns a write-rate problem into a memory problem — a much easier one
- The flush window is the design parameter and it should be stated as a number, because it is the exact quantity of data being risked: a five-second window on a node handling 2 000 writes per second is up to 10 000 acknowledged writes that do not exist anywhere durable

### The failure

- Acknowledged, then lost. The user saw "saved", the API returned `200`, and the process died before the flush — so the write has no trace in any log, and the reconciliation job has nothing to reconcile against because the record was never anywhere but RAM
- This rules the pattern out for anything a person will notice the absence of: orders, payments, messages, anything with an audit obligation. It suits view counters, presence, positions in a game — data where the current value matters and its history does not. That judgement has to be made per field, not per service
