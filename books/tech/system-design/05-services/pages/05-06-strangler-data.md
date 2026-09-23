## Strangling the data

- Routing is the easy half. The new service cannot share the old database — that is the shared-database antipattern (Module 1, page 7) — so the data has to move while both systems are live
- The order is what makes it safe: replicate, move reads, move writes, and keep replication running backwards afterwards so the old store stays a valid rollback target

<svg viewBox="0 0 460 126" role="img" aria-label="Migrating a store in three phases. Phase one, follow: change data capture streams from the legacy database to the new database while reads and writes still go to legacy and the new store catches up. Phase two, move reads: capture still flows legacy to new, reads are served from the new store and writes still go to legacy. Phase three, move writes: writes go to the new store and capture now flows backwards into legacy, which stays warm. Rollback stays possible at every step because the store being left behind is never more than replication lag stale. Capture and the outbox pattern are booklet 04; this page is only the order the phases run in. An orange cross marks dual-writing from the application: one write lands, one fails, nothing reconciles, and the stores drift apart silently." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="78" y="13" text-anchor="middle" font-size="7.5" fill="#1d4e89">1 · follow</text>
  <rect x="14" y="22" width="52" height="26" rx="3" fill="#fff" stroke="#1d4e89"/><text x="40" y="38" text-anchor="middle" font-size="7">legacy DB</text>
  <rect x="90" y="22" width="52" height="26" rx="3" fill="#fff" stroke="#1d4e89"/><text x="116" y="38" text-anchor="middle" font-size="7">new DB</text>
  <line x1="68" y1="35" x2="88" y2="35" stroke="#1d4e89" marker-end="url(#b)"/><text x="78" y="31" text-anchor="middle" font-size="6.5">CDC</text>
  <text x="78" y="62" text-anchor="middle" font-size="7">reads + writes: legacy</text>
  <text x="78" y="72" text-anchor="middle" font-size="7">new DB catches up</text>
  <text x="230" y="13" text-anchor="middle" font-size="7.5" fill="#1d4e89">2 · move reads</text>
  <rect x="166" y="22" width="52" height="26" rx="3" fill="#fff" stroke="#1d4e89"/><text x="192" y="38" text-anchor="middle" font-size="7">legacy DB</text>
  <rect x="242" y="22" width="52" height="26" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="268" y="38" text-anchor="middle" font-size="7">new DB</text>
  <line x1="220" y1="35" x2="240" y2="35" stroke="#1d4e89" marker-end="url(#b)"/><text x="230" y="31" text-anchor="middle" font-size="6.5">CDC</text>
  <text x="230" y="62" text-anchor="middle" font-size="7">reads: new</text>
  <text x="230" y="72" text-anchor="middle" font-size="7">writes: legacy</text>
  <text x="382" y="13" text-anchor="middle" font-size="7.5" fill="#1d4e89">3 · move writes</text>
  <rect x="318" y="22" width="52" height="26" rx="3" fill="#fff" stroke="#1d4e89"/><text x="344" y="38" text-anchor="middle" font-size="7">legacy DB</text>
  <rect x="394" y="22" width="52" height="26" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="420" y="38" text-anchor="middle" font-size="7">new DB</text>
  <line x1="392" y1="35" x2="372" y2="35" stroke="#1d4e89" marker-end="url(#b)"/><text x="382" y="31" text-anchor="middle" font-size="6.5">back</text>
  <text x="382" y="62" text-anchor="middle" font-size="7">writes: new</text>
  <text x="382" y="72" text-anchor="middle" font-size="7">legacy stays warm</text>
  <text x="6" y="92" font-size="7">rollback stays possible at every step: the store being left behind is never more than replication lag stale</text>
  <text x="6" y="106" font-size="7">change data capture and the outbox are booklet 04; this page is only the order the phases run in</text>
  <text x="6" y="120" font-size="7.5" fill="#bf4c28">✕ dual-write from the app: one write lands, one fails, nothing reconciles, and the stores drift apart silently</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

- Phase 2 is where the comparison happens: serve reads from the new store, and for a period compare them against the old one on a sample of requests. A mismatch here is cheap; the same mismatch after phase 3 is a data loss incident
- Phase 3 reverses the stream rather than stopping it. Reversal is what makes rollback a routing change instead of a restore from backup

### The failure

- Cutting writes over and switching the capture off. Three hours later a bug surfaces and the old store is three hours behind — it has none of the orders taken since the cutover, so going back means losing them and going forward means shipping the bug
- Without the reverse stream there is no rollback, only a choice between two kinds of damage
