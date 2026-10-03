## The store-selection framework

- "Which database?" isn't a feature-grid question; it's a sequence of decisions driven by **your access pattern**, mapped onto the engine (Module 1) and replication model (Booklet 3) that fit. Walk these in order:

<svg viewBox="0 0 360 104" role="img" aria-label="A decision path: by access pattern — key lookup to KV, range/relational to Postgres, write-scaled wide-column to Cassandra, document to Mongo or JSONB, full-text or vector to search or pgvector — then check consistency, scale, and ops" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.6" fill="#1a1a1a">
  <rect x="120" y="6" width="120" height="16" rx="3" fill="#ece4f3" stroke="#6a4c93"/><text x="180" y="17" text-anchor="middle">what's the access pattern?</text>
  <rect x="6" y="40" width="80" height="26" rx="2" fill="#f1ecf6" stroke="#6a4c93"/><text x="46" y="50" text-anchor="middle">joins · range ·</text><text x="46" y="59" text-anchor="middle">ad-hoc → Postgres</text>
  <rect x="92" y="40" width="80" height="26" rx="2" fill="#f1ecf6" stroke="#6a4c93"/><text x="132" y="50" text-anchor="middle">pure key lookup</text><text x="132" y="59" text-anchor="middle">→ DynamoDB/KV</text>
  <rect x="178" y="40" width="80" height="26" rx="2" fill="#f1ecf6" stroke="#6a4c93"/><text x="218" y="50" text-anchor="middle">write-scaled</text><text x="218" y="59" text-anchor="middle">→ Cassandra</text>
  <rect x="264" y="40" width="90" height="26" rx="2" fill="#f1ecf6" stroke="#6a4c93"/><text x="309" y="50" text-anchor="middle">document unit</text><text x="309" y="59" text-anchor="middle">→ Mongo / JSONB</text>
  <path d="M160 22 L60 40" stroke="#999" marker-end="url(#ch)"/><path d="M172 22 L140 40" stroke="#999" marker-end="url(#ch)"/><path d="M196 22 L214 40" stroke="#999" marker-end="url(#ch)"/><path d="M208 22 L300 40" stroke="#999" marker-end="url(#ch)"/>
  <text x="180" y="82" text-anchor="middle" font-size="6.4" fill="#6a4c93">then check: consistency? · one-node write ceiling? · managed vs self-run?</text>
  <text x="180" y="96" text-anchor="middle" font-size="6" fill="#777">(full-text → search/pg_fts · vectors → pgvector · graph → graph DB)</text>
  <defs><marker id="ch" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- The ordered questions:
  1. **Access pattern** — key lookups, range scans, joins/ad-hoc, full-text, vector similarity, or graph traversal? This alone eliminates most options.
  2. **Consistency** — does this data need strong consistency (balances, inventory) or is eventual fine (feeds, metrics)? Sets the CP/AP and R+W knobs (Booklet 3).
  3. **Scale & ratio** — read-heavy or write-heavy, and does write volume exceed one node? Picks B-tree vs LSM, one-primary vs partitioned.
  4. **Data shape** — relational, document, wide-column, or plain KV?
  5. **Operational cost** — managed (DynamoDB, RDS, managed Cassandra) vs self-run; team expertise; failure modes you can actually operate.

### Module 3 — checkpoint
- **Key concepts:** DynamoDB (key-only, single-table, hot-partition) · Cassandra (leaderless, LSM, tunable consistency, query-first, tombstones) · Mongo (documents, embed-vs-reference, schema drift; JSONB alternative) · the 5-question selection framework.
- **Task + questions:** pick a store for (a) a shopping cart at scale, (b) an append-only audit log, (c) a product catalog read as a unit — and justify via the five questions.
- **Next:** Module 4 — caching.
