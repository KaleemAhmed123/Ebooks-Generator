## Scatter-gather

- Sharded by `workspace_id`, "all projects in workspace 42" is one shard. "All projects created by user 99, across workspaces" has no `workspace_id` in it

<svg viewBox="0 0 460 140" role="img" aria-label="Scatter-gather penalty. A query without the shard key fans out to Node 1, Node 2, and Node 3. Node 3 is busy, delaying the entire response." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="55" width="60" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="50" y="70" text-anchor="middle">Find</text>
  <text x="50" y="80" text-anchor="middle" font-size="7">User 99</text>
  
  <rect x="130" y="45" width="100" height="50" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="180" y="65" text-anchor="middle" font-weight="bold">Router</text>
  <text x="180" y="80" text-anchor="middle" font-size="7">Wait for all</text>
  
  <rect x="300" y="10" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="340" y="29" text-anchor="middle">Node A (10ms)</text>
  
  <rect x="300" y="55" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="340" y="74" text-anchor="middle">Node B (12ms)</text>
  
  <rect x="300" y="100" width="80" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="340" y="119" text-anchor="middle">Node C (800ms)</text>
  
  <path d="M80 70 L130 70" stroke="#1a1a1a" fill="none"/><path d="M130 70 l-3 -3 v6 z" fill="#1a1a1a"/>
  
  <path d="M230 50 L300 25" stroke="#1d4e89" fill="none"/><path d="M300 25 l-6 -1 v6 z" fill="#1d4e89" transform="rotate(-20 300 25)"/>
  <path d="M230 70 L300 70" stroke="#1d4e89" fill="none"/><path d="M300 70 l-6 -3 v6 z" fill="#1d4e89"/>
  <path d="M230 90 L300 115" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M300 115 l-6 -3 v6 z" fill="#b8541a" transform="rotate(20 300 115)"/>
  
  <text x="400" y="70" font-weight="bold" fill="#b8541a">Total: 800ms</text>
</svg>

- Without the shard key the router cannot narrow the search, so it sends the query to every shard and merges the answers: **scatter-gather**. Sorting, `LIMIT` and aggregation are re-done on the merged result, in the router. A cross-shard *write* is worse: it is a distributed transaction, booklet 03

### The failure

- The query nobody thought about. On one database a new `WHERE` clause is free; sharded, a query without the shard key costs every shard. Figma measured it: a scatter-gather "contributes the same amount of load as it would if the database was unsharded". Enough of them and the sharding bought nothing
- The options, in order: rewrite the query to include the key; a global index (page 13) or a second copy of the data sharded the other way (Module 1, page 8); or accept the fan-out for a query that is rare and not latency-sensitive, and say so in the design
