## The graph model

- **Relationships are the data**. A relational database finds a relationship at read time by matching IDs (a join). A property graph (Neo4j, Memgraph) stores the relationship itself, with its own type and properties
- A **property graph** has nodes (with labels and properties) and relationships (typed, directed source → target, with properties)

<svg viewBox="0 0 460 140" role="img" aria-label="A property graph. A User node connected to a City node via a LIVES_IN relationship, and to a Product node via a BOUGHT relationship. Edges have properties like date_bought." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <circle cx="100" cy="70" r="25" fill="#fcfcfc" stroke="#1d4e89"/>
  <text x="100" y="73" text-anchor="middle" font-weight="bold" fill="#1d4e89">User</text>
  
  <circle cx="280" cy="30" r="25" fill="#fcfcfc" stroke="#b8541a"/>
  <text x="280" y="33" text-anchor="middle" font-weight="bold" fill="#b8541a">City</text>
  
  <circle cx="280" cy="110" r="25" fill="#fcfcfc" stroke="#b8541a"/>
  <text x="280" y="113" text-anchor="middle" font-weight="bold" fill="#b8541a">Product</text>
  
  <path d="M123 60 L257 37" stroke="#1a1a1a" fill="none"/>
  <path d="M257 37 l-6 -3 v6 z" fill="#1a1a1a"/>
  <rect x="150" y="34" width="70" height="16" rx="3" fill="#fff" stroke="#6b6b6b"/>
  <text x="185" y="45" text-anchor="middle" font-size="7">LIVES_IN</text>
  
  <path d="M123 80 L257 103" stroke="#1a1a1a" fill="none"/>
  <path d="M257 103 l-4 -6 h6 z" fill="#1a1a1a" transform="rotate(-10 257 103)"/>
  <rect x="150" y="90" width="70" height="24" rx="3" fill="#fff" stroke="#6b6b6b"/>
  <text x="185" y="100" text-anchor="middle" font-size="7">BOUGHT</text>
  <text x="185" y="109" text-anchor="middle" font-size="6" fill="#6b6b6b">{date: "2026-09"}</text>
</svg>

- "Friends of friends of friends" is three hops from one starting node. In SQL it is a three-level self-join over the whole friendship table
- Fits: fraud rings, recommendations, knowledge graphs, anything where the connections matter more than the entities

### The failure

- A graph store for data that is really a tree (a document) or a table (relational)
- Multi-hop traversal through a hot node. Start from a node with ten million edges and every hop visits every neighbour; the query's cost is the degree of the busiest node on the path
