## There is no cross-service transaction

- A transaction is a database's promise about its own rows. Two services have two databases and there is no `BEGIN` that spans an HTTP call, so "update both or neither" is not available. What is available: redraw the boundary so both rows are in one database; or accept two transactions with a mechanism between them, an outbox or a saga, and the eventual consistency that comes with it

<svg viewBox="0 0 460 124" role="img" aria-label="Three answers to a write that must change orders and stock. Left: a wider boundary, one service, checkout, owning both tables in one database, one transaction, commit or roll back together; the cost is a bigger service. Middle: an outbox, orders commits its row and an event in the same local transaction, a relay publishes the event, inventory applies it in its own transaction; the two are consistent after the event lands, seconds typically. Right: a saga, a sequence of local transactions with a compensation for each, reserve stock then charge, and if the charge fails, release the stock; consistent eventually, with a visible intermediate state. An orange cross marks two-phase commit over HTTP: prepare on both, hold locks, commit; a lost commit message leaves inventory locked with nobody to release it." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="6" y="12" font-size="7.5" fill="#1d4e89">1. wider boundary</text>
  <rect x="6" y="18" width="134" height="54" rx="4" fill="#fff" stroke="#1d4e89" stroke-width="1.5"/><text x="73" y="31" text-anchor="middle">checkout</text>
  <rect x="14" y="38" width="56" height="26" rx="2" fill="#e6f2ff" stroke="#333"/><text x="42" y="54" text-anchor="middle" font-size="7">orders</text>
  <rect x="76" y="38" width="56" height="26" rx="2" fill="#e6f2ff" stroke="#333"/><text x="104" y="54" text-anchor="middle" font-size="7">stock</text>
  <text x="73" y="84" text-anchor="middle" font-size="7">one DB, one transaction</text><text x="73" y="94" text-anchor="middle" font-size="7">cost: a bigger service (page 8)</text>
  <text x="160" y="12" font-size="7.5" fill="#1d4e89">2. outbox (booklet 04)</text>
  <rect x="160" y="18" width="62" height="34" rx="3" fill="#fff" stroke="#333"/><text x="191" y="31" text-anchor="middle" font-size="7.5">orders</text><text x="191" y="43" text-anchor="middle" font-size="7">row + event, 1 tx</text>
  <rect x="238" y="18" width="62" height="34" rx="3" fill="#fff" stroke="#333"/><text x="269" y="31" text-anchor="middle" font-size="7.5">inventory</text><text x="269" y="43" text-anchor="middle" font-size="7">applies, own tx</text>
  <line x1="222" y1="35" x2="238" y2="35" stroke="#333" marker-end="url(#d)"/>
  <text x="230" y="66" text-anchor="middle" font-size="7">relay publishes; consistent</text><text x="230" y="76" text-anchor="middle" font-size="7">once the event lands (seconds)</text>
  <text x="320" y="12" font-size="7.5" fill="#1d4e89">3. saga (booklet 04)</text>
  <rect x="320" y="18" width="62" height="34" rx="3" fill="#fff" stroke="#333"/><text x="351" y="31" text-anchor="middle" font-size="7.5">reserve stock</text><text x="351" y="43" text-anchor="middle" font-size="7">undo: release</text>
  <rect x="392" y="18" width="62" height="34" rx="3" fill="#fff" stroke="#333"/><text x="423" y="31" text-anchor="middle" font-size="7.5">charge</text><text x="423" y="43" text-anchor="middle" font-size="7">fail → compensate</text>
  <line x1="382" y1="35" x2="392" y2="35" stroke="#333" marker-end="url(#d)"/>
  <text x="387" y="66" text-anchor="middle" font-size="7">local txs + compensations;</text><text x="387" y="76" text-anchor="middle" font-size="7">an intermediate state is visible</text>
  <text x="6" y="116" font-size="7.5" fill="#bf4c28">✕ 2PC over HTTP: prepare on both, hold locks, commit; the commit message is lost and inventory holds its lock with nobody to release it (booklet 03)</text>
  <defs><marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- The decision is page 2's seam test in reverse: writes that must be atomic are one boundary and belong in one service. Writes that may be eventually consistent get an outbox for the fact and a saga for the workflow; booklet 04 owns both, booklet 03 owns why 2PC is what it is

:::interview
"An order must reserve stock and charge the card. How do you keep them consistent across two services?" — First ask whether they must be atomic. If yes, they are one boundary: one service owns both rows and one transaction commits them. If eventual is acceptable, which it usually is, the order service commits the order and an event in one local transaction, an outbox, and inventory applies the event in its own; a failure after that is a compensation, release the stock, which is a saga. Never 2PC over HTTP: a lost commit leaves a lock nobody owns.
:::

### The failure

- Two-phase commit across HTTP services. The coordinator dies or the commit message is lost, and the prepared participant holds its lock until someone intervenes by hand. It combines the network's failure modes with a database's locks; "atomic across services" is answered by a wider boundary, not a protocol
