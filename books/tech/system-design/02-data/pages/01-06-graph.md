## The graph model

- **Relationships are the data**. In a relational database, you find relationships at read time by matching IDs across tables (a JOIN). In a property graph (Neo4j, Memgraph), the relationships are physically stored as pointers on the disk
- A graph consists of **nodes** (entities), **relationships** (edges between them), and **properties** (key-value data on both nodes and edges)

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

- **Strengths**: Deep traversal. Asking "who are the friends of the friends of my friends?" is just three pointer hops. In SQL, this is a three-level recursive JOIN that might scan millions of rows
- **Use for**: Fraud detection networks, recommendation engines, knowledge graphs, and anything where the connections matter more than the entities themselves

### The failure

- Using a graph database for data that is naturally a tree (use a document store) or a grid (use a relational store)
- Graph traversals over "super-nodes". If you try to traverse the graph starting from a node with ten million edges (e.g., the root "User" label), the query will explode in latency as it visits every neighbor
