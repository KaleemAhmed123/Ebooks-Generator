## The shared database

- Services split at the application tier and left joined at the database tier are one system with a network in the middle. The schema is a contract nobody wrote down: every table is an API, every column rename is a breaking change for callers nobody can list, and every heavy query competes for the same CPU and locks as live traffic

<svg viewBox="0 0 460 150" role="img" aria-label="Three services, orders, billing and reporting, each its own process with its own deploy, all connected to one database. The visible edges are each service reading and writing its own tables. The hidden edges, drawn dashed in orange: billing writes a status column on the orders table; reporting runs a nightly join across all tables; a migration of orders' schema has no owner because two services read it. An orange cross marks reporting rebuilding an index on the orders table at 09:00: the table is locked, orders' API times out, and orders' team is paged for a query they did not write." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="10" width="90" height="34" rx="3" fill="#fff" stroke="#1d4e89"/><text x="51" y="24" text-anchor="middle">orders</text><text x="51" y="36" text-anchor="middle" font-size="7">own deploy, live traffic</text>
  <rect x="185" y="10" width="90" height="34" rx="3" fill="#fff" stroke="#1d4e89"/><text x="230" y="24" text-anchor="middle">billing</text><text x="230" y="36" text-anchor="middle" font-size="7">own deploy</text>
  <rect x="364" y="10" width="90" height="34" rx="3" fill="#fff" stroke="#1d4e89"/><text x="409" y="24" text-anchor="middle">reporting</text><text x="409" y="36" text-anchor="middle" font-size="7">own deploy, nightly jobs</text>
  <rect x="60" y="86" width="340" height="44" rx="4" fill="#e6f2ff" stroke="#333"/><text x="230" y="100" text-anchor="middle">one database</text>
  <rect x="72" y="106" width="90" height="18" rx="2" fill="#fff" stroke="#333"/><text x="117" y="118" text-anchor="middle" font-size="7">orders, order_items</text>
  <rect x="185" y="106" width="90" height="18" rx="2" fill="#fff" stroke="#333"/><text x="230" y="118" text-anchor="middle" font-size="7">invoices, payments</text>
  <rect x="298" y="106" width="90" height="18" rx="2" fill="#fff" stroke="#333"/><text x="343" y="118" text-anchor="middle" font-size="7">report_snapshots</text>
  <line x1="51" y1="44" x2="110" y2="106" stroke="#333" marker-end="url(#d)"/><line x1="230" y1="44" x2="230" y2="106" stroke="#333" marker-end="url(#d)"/><line x1="409" y1="44" x2="350" y2="106" stroke="#333" marker-end="url(#d)"/>
  <line x1="220" y1="44" x2="130" y2="106" stroke="#bf4c28" stroke-dasharray="3 3" marker-end="url(#e)"/><text x="150" y="70" font-size="7" fill="#bf4c28">billing writes orders.status</text>
  <line x1="390" y1="44" x2="150" y2="108" stroke="#bf4c28" stroke-dasharray="3 3" marker-end="url(#e)"/><text x="300" y="66" font-size="7" fill="#bf4c28">reporting joins every table nightly</text>
  <text x="6" y="60" font-size="7" fill="#bf4c28">who owns a migration</text><text x="6" y="70" font-size="7" fill="#bf4c28">of orders? nobody: two</text><text x="6" y="80" font-size="7" fill="#bf4c28">other services read it</text>
  <text x="6" y="146" font-size="7.5" fill="#bf4c28">✕ 09:00, reporting rebuilds an index on orders: the table locks, orders' API times out, orders' team is paged for a query it did not write</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="e" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#bf4c28"/></marker>
  </defs>
</svg>

- The visible edges are fine; the hidden ones are the coupling. A second writer to a table means two services must deploy together for any change to it (page 3, lost). A reader of a table means its shape is frozen by a consumer the owner cannot see. A migration with two readers has no owner, so it does not happen, and the schema ossifies around the first design
- Performance is shared too: locks, CPU, connections, the buffer pool. One service's batch job is another service's outage, and the incident review finds the cause in a repository the paged team has never opened

### The failure

- Service B's index rebuild takes down service A. Nothing in A changed, A's dashboards are green until they are not, and the fix is in B's cron schedule. The database-per-service rule (Module 2, page 3) exists so that a service's failures come from its own code; a shared database makes every service a dependency of every other without a single call between them
