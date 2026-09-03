## Cursor vs Offset Pagination

`OFFSET` makes the database count and discard rows, so deep pages get slower and
results shift under the reader as data changes. A cursor seeks straight to a
position.

```sql
-- scans and throws away half a million rows
SELECT * FROM events ORDER BY created_at, id OFFSET 500000 LIMIT 20;

-- uses the index, constant time, stable under inserts
SELECT * FROM events WHERE (created_at, id) < (:ts, :id)
ORDER BY created_at DESC, id DESC LIMIT 20;
```

Offset has a second problem that is worse than the slowness: as rows are
inserted, pages shift, so a reader paging through sees one item twice and never
sees another at all. Cursors cost you random page access — no jumping to page 40
— which is almost always the right trade.

## DAG Orchestration

Modelling a pipeline as a directed acyclic graph of tasks with declared
dependencies, so independent branches run in parallel and a failure retries one
task rather than the whole run.

Forty sequential steps taking six hours become ninety minutes once the graph
makes the independence explicit. The larger gain is on failure: task 31 retries
alone instead of restarting from task 1.

<svg viewBox="0 0 460 84" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two extract tasks run in parallel, join, then transform and load in sequence">
  <rect x="4" y="30" width="52" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><text x="30" y="46" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">start</text>
  <path d="M58 42 H80 M80 18 V66 M80 18 H100 M80 66 H100" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <path d="M100 18 l-6 -3.5 v7 z M100 66 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="104" y="6" width="86" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><text x="147" y="22" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">extract_a</text>
  <rect x="104" y="54" width="86" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><text x="147" y="70" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">extract_b</text>
  <path d="M192 18 H214 M192 66 H214 M214 18 V66 M214 42 H236" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <path d="M236 42 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="240" y="30" width="92" height="24" fill="#e2fcf3" stroke="#2b5fa8" stroke-width="1.4"/><text x="286" y="46" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#2b5fa8">transform</text>
  <path d="M334 42 H356" stroke="#1a1a1a" stroke-width="1.2"/><path d="M356 42 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="360" y="30" width="96" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><text x="408" y="46" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">load</text>
</svg>
