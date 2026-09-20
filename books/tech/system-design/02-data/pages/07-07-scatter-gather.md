## Scatter-gather

- If you partition your database by `WorkspaceId`, a query for "all projects in Workspace 42" is incredibly fast. The router hashes `42`, finds the exact partition, and returns the result
- But what happens if the product team adds a feature: "Show me all projects created by User 99 across all workspaces"? 

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

- **The cross-shard query**: Because the query does not contain the `WorkspaceId`, the router has no idea which node holds the data. It is forced to execute a **scatter-gather**: it forwards the query to every single node in the cluster, waits for them all to respond, and merges the results

### The failure

- Treating a sharded database like a monolithic SQL database. In a monolith, adding a new `WHERE` clause is fine. In a sharded database, a query missing the shard key is catastrophic
- When Figma sharded their database, they noted that a scatter-gather query "contributes the same amount of load as it would if the database was unsharded." If you have 100 nodes, a single query consumes CPU time on all 100 nodes simultaneously, completely defeating the purpose of sharding. You must build Global Secondary Indexes to fix this
