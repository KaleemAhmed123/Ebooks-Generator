# Module 8 - Outbox, CDC, dual writes

## The dual-write problem

- A **dual write** is committing to two systems that do not share a transaction — most often a database and a broker. `INSERT` the order, then publish `OrderPlaced`. Either step can fail after the other already succeeded, and nothing rolls the other back

<svg viewBox="0 0 460 120" role="img" aria-label="The dual write problem. A service writes to a database and publishes to a broker as two separate steps. A crash between them leaves one side done and the other not." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="180" y="15" width="100" height="26" fill="none" stroke="#333"/>
  <text x="230" y="32" text-anchor="middle" font-size="7.5">order service</text>
  <path d="M200 41 L120 75" stroke="#333" marker-end="url(#d8)"/>
  <text x="130" y="60" font-size="7">1. commit</text>
  <rect x="40" y="75" width="80" height="26" fill="none" stroke="#333"/>
  <text x="80" y="92" text-anchor="middle" font-size="7.5">database</text>
  <path d="M260 41 L340 75" stroke="#333" marker-end="url(#d8)"/>
  <text x="290" y="60" font-size="7">2. publish</text>
  <rect x="340" y="75" width="80" height="26" fill="none" stroke="#333"/>
  <text x="380" y="92" text-anchor="middle" font-size="7.5">broker</text>
  <text x="230" y="58" text-anchor="middle" font-size="10" fill="#bf4c28">✕</text>
  <text x="20" y="115" font-size="7" fill="#555">commit ok, publish fails: the order exists, no one is told</text>
  <defs><marker id="d8" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- Two-phase commit does not rescue this pairing: most brokers do not implement the database's XA protocol, and being available depends on both sides being up at the same moment (booklet 03 owns why the protocol itself is expensive). The fix in this module skips coordination entirely and makes the database the only source of truth
- The rest of this module is how: write the event where the row already commits (page 2), or read it from the row after the fact (page 4)

### The failure

- Publish-then-commit "for freshness". A payment-succeeded event fires, a downstream service marks the order shipped, and then the local commit fails on a constraint violation. The event cannot be unpublished; the shipped order was never paid
