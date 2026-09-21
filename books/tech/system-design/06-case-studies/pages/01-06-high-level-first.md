## High-level design and buy-in

- The simplest design that serves every endpoint on the previous page. Client, load balancer, one service, one database. No cache, queue or CDN until a number from page 4 demands one; each of those is added later as the answer to a stated problem, never as decoration

<svg viewBox="0 0 460 150" role="img" aria-label="Client, load balancer, API service and database in a row. Two request paths are traced across them: POST /posts as a write in blue, GET /feed as a read in black, each labelled with the requirement it serves. A dashed region below holds cache, queue and CDN marked 'not yet: added when a number demands it'." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="14" y="30" width="60" height="30" rx="3" fill="#fff" stroke="#333"/><text x="44" y="49" text-anchor="middle">client</text>
  <rect x="120" y="30" width="60" height="30" rx="3" fill="#fff" stroke="#333"/><text x="150" y="45" text-anchor="middle">load</text><text x="150" y="55" text-anchor="middle">balancer</text>
  <rect x="226" y="30" width="80" height="30" rx="3" fill="#fff" stroke="#333"/><text x="266" y="45" text-anchor="middle">API service</text><text x="266" y="55" text-anchor="middle" font-size="7.5">stateless, N copies</text>
  <rect x="356" y="30" width="90" height="30" rx="3" fill="#e6f2ff" stroke="#333"/><text x="401" y="45" text-anchor="middle">database</text><text x="401" y="55" text-anchor="middle" font-size="7.5">posts, follows</text>
  <line x1="74" y1="38" x2="120" y2="38" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="180" y1="38" x2="226" y2="38" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="306" y1="38" x2="356" y2="38" stroke="#1d4e89" marker-end="url(#b)"/>
  <text x="97" y="24" text-anchor="middle" font-size="7.5" fill="#1d4e89">POST /posts</text>
  <text x="331" y="24" text-anchor="middle" font-size="7.5" fill="#1d4e89">INSERT post</text>
  <line x1="120" y1="52" x2="74" y2="52" stroke="#333" marker-end="url(#d)"/>
  <line x1="226" y1="52" x2="180" y2="52" stroke="#333" marker-end="url(#d)"/>
  <line x1="356" y1="52" x2="306" y2="52" stroke="#333" marker-end="url(#d)"/>
  <text x="97" y="74" text-anchor="middle" font-size="7.5">GET /feed?cursor=</text>
  <text x="331" y="74" text-anchor="middle" font-size="7.5">SELECT … WHERE author IN (follows)</text>
  <rect x="120" y="94" width="326" height="42" rx="3" fill="none" stroke="#999" stroke-dasharray="3 3"/>
  <text x="130" y="108" font-size="7.5" fill="#666">not yet: cache · queue · CDN · search index</text>
  <text x="130" y="122" font-size="7.5" fill="#666">each arrives as the answer to one number: 50 000 read QPS → cache; slow provider → queue</text>
  <text x="14" y="147" font-size="7.5">requirement 1 traced in blue, requirement 2 in black; requirement 3 (follow) is one more row, same shape</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker>
    <marker id="e" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#bf4c28"/></marker>
  </defs>
</svg>

- Trace one request per requirement, out loud, finger on the board: "the post goes to the balancer, to any API copy, one insert, 201 back". A path that cannot be traced is a requirement the design does not serve
- Then ask for buy-in: "this serves all three; the number that breaks it first is 50 000 reads a second on the feed query. Deep dive there, or somewhere you prefer?" The interviewer now steers, which is the communication competency being graded

### The failure

- Fifteen boxes, no path. Kafka, Redis, Elasticsearch and a CDN on the board by minute 15, and no request traced through any of them. There is no baseline to argue from, and every box is a question the candidate must now defend: "what happens when the consumer of that queue dies?"
