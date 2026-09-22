## Database per service

- The rule: a service is the only writer of its data, and the only reader of its tables. Everyone else reads through its API, for a fresh answer now, or through its events, for a copy they keep (page 5). The database may be a schema in a shared cluster or its own server; what matters is that no other service holds credentials to it

<svg viewBox="0 0 460 136" role="img" aria-label="Two services, orders and identity, each with its own database that only it connects to. Orders reads a user through identity's API, GET user by id, or keeps a copy fed by identity's UserUpdated events through a broker, booklet 04. A third box, reporting, is shown with the correct path: a change-data-capture stream from each database into a warehouse, so it never queries production tables. An orange cross marks the shortcut: reporting holding read-only credentials to both production databases and running a nightly join; its queries lock tables, and the day identity drops a column the report breaks and the schema is coupled again." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="10" width="100" height="34" rx="3" fill="#fff" stroke="#1d4e89"/><text x="56" y="24" text-anchor="middle">orders</text><text x="56" y="36" text-anchor="middle" font-size="7">only writer of orders DB</text>
  <rect x="6" y="54" width="100" height="22" rx="3" fill="#e6f2ff" stroke="#333"/><text x="56" y="68" text-anchor="middle" font-size="7.5">orders DB</text>
  <line x1="56" y1="44" x2="56" y2="54" stroke="#333" marker-end="url(#d)"/>
  <rect x="180" y="10" width="100" height="34" rx="3" fill="#fff" stroke="#1d4e89"/><text x="230" y="24" text-anchor="middle">identity</text><text x="230" y="36" text-anchor="middle" font-size="7">only writer of users DB</text>
  <rect x="180" y="54" width="100" height="22" rx="3" fill="#e6f2ff" stroke="#333"/><text x="230" y="68" text-anchor="middle" font-size="7.5">users DB</text>
  <line x1="230" y1="44" x2="230" y2="54" stroke="#333" marker-end="url(#d)"/>
  <line x1="106" y1="22" x2="180" y2="22" stroke="#333" marker-end="url(#d)"/><text x="143" y="18" text-anchor="middle" font-size="7">GET /users/{id}</text>
  <line x1="180" y1="36" x2="106" y2="36" stroke="#1d4e89" stroke-dasharray="3 3" marker-end="url(#b)"/><text x="143" y="49" text-anchor="middle" font-size="6.5" fill="#1d4e89">UserUpdated events (booklet 04)</text>
  <rect x="354" y="10" width="100" height="34" rx="3" fill="#fff" stroke="#1d4e89"/><text x="404" y="24" text-anchor="middle">reporting</text><text x="404" y="36" text-anchor="middle" font-size="7">reads the warehouse only</text>
  <rect x="354" y="54" width="100" height="22" rx="3" fill="#e6f2ff" stroke="#333"/><text x="404" y="68" text-anchor="middle" font-size="7.5">warehouse</text>
  <line x1="404" y1="44" x2="404" y2="54" stroke="#333" marker-end="url(#d)"/>
  <line x1="56" y1="76" x2="56" y2="88" stroke="#333" stroke-dasharray="3 3"/><line x1="230" y1="76" x2="230" y2="88" stroke="#333" stroke-dasharray="3 3"/><line x1="56" y1="88" x2="404" y2="88" stroke="#333" stroke-dasharray="3 3"/><line x1="404" y1="88" x2="404" y2="77" stroke="#333" stroke-dasharray="3 3" marker-end="url(#d)"/><text x="230" y="100" text-anchor="middle" font-size="7">CDC from each database into the warehouse (booklet 04): a copy, no lock on live tables, no coupling to the live schema</text>
  <text x="6" y="118" font-size="7.5" fill="#bf4c28">✕ reporting with read-only credentials to both production databases: nightly joins lock live tables, and the day identity drops a column</text>
  <text x="6" y="128" font-size="7.5" fill="#bf4c28">the report breaks, so the column stays forever; "read-only" couples the schema exactly as a writer would</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker>
  </defs>
</svg>

- What the rule buys: identity can rename a column, add an index, or move from Postgres to another store without asking anyone, because every consumer sees its API and its events, both of which are contracts it controls (Module 5). What it costs: no join across the line and no transaction across it; pages 5 and 7 are the two costs paid
- The credentials are the enforcement. A service that cannot connect cannot cheat; a service that can will, on the day of a deadline. Reporting is the case that always asks for an exception, and the answer is a copy: change data capture from each database into a warehouse (booklet 04), which reporting may join however it likes

### The failure

- The reporting team's read-only credentials to every production database. Read-only is not harmless: the nightly join locks live tables (Module 1, page 7), and every column the report touches is frozen, because dropping it breaks a query the owning team cannot see. The schema is coupled again, by a reader, with no call between the two services to show it
