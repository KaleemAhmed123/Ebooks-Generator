## The outbox pattern

- Sagas and event-driven systems all hit the same trap: a service must **change its database** *and* **publish an event** ("order created"), and those are **two different systems**. Do them as two separate steps and there's no atomicity between them — a crash in the gap corrupts the world in one of two ways:

:::warn
The **dual-write problem**. Commit the DB *then* publish — the publish fails → the order exists but **no event is sent**; downstream never ships it. Publish *then* commit — the commit fails → a **phantom event** for an order that doesn't exist. There is **no ordering of two independent writes** that is safe: either can fail after the other succeeds.
:::

- The **outbox pattern** removes the second system from the critical path. You write the event into an **`outbox` table in the same local database transaction** as the state change. One transaction, one database — so it's atomic: either both the order row **and** the outbox row commit, or neither does. A separate **relay** then reads the outbox and publishes to the broker, marking rows sent.

<svg viewBox="0 0 360 84" role="img" aria-label="In one local transaction the service writes the order row and an outbox row; a relay or CDC process later reads the outbox and publishes to the broker at least once" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="20" width="120" height="44" rx="4" fill="#eef2f8" stroke="#1f487e"/><text x="70" y="15" text-anchor="middle" font-size="6" fill="#1f487e">one DB transaction</text><text x="70" y="38" text-anchor="middle" font-size="6">INSERT order</text><text x="70" y="52" text-anchor="middle" font-size="6">INSERT outbox row</text>
  <rect x="160" y="30" width="80" height="24" rx="3" fill="#e6edf5" stroke="#1f487e"/><text x="200" y="45" text-anchor="middle" font-size="6">relay / CDC</text>
  <rect x="270" y="30" width="80" height="24" rx="3" fill="#dfe9d9" stroke="#2f7d4f"/><text x="310" y="45" text-anchor="middle" font-size="6">broker</text>
  <path d="M130 42 L160 42" stroke="#1a1a1a" marker-end="url(#ob)"/><text x="145" y="38" text-anchor="middle" font-size="5" fill="#777">poll/tail</text>
  <path d="M240 42 L270 42" stroke="#1a1a1a" marker-end="url(#ob)"/><text x="255" y="38" text-anchor="middle" font-size="5" fill="#777">publish</text>
  <defs><marker id="ob" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- The relay is a poller (`SELECT … WHERE sent=false`) or, better, **Change Data Capture (CDC)** tailing the DB's replication log (e.g. Debezium on the WAL, Booklet 4). It publishes **at-least-once**, so consumers dedupe with an **idempotency key**. Net guarantee: **the event is published if and only if the state change committed** — no lost events, no phantoms. This is the standard way production saga and event-sourcing systems bridge a database and a broker.

### Module 7 — checkpoint
- **Key concepts:** ACID + isolation & write skew · 2PC (atomic but **blocking**) · sagas (local txns + compensations) · exactly-once *delivery* impossible, exactly-once *effect* = at-least-once + idempotent · idempotency keys · dual-write → **outbox + CDC**.
- **Task + questions:** why is commit-then-publish unsafe, and how does the outbox make it atomic? Give one idempotent and one non-idempotent operation.
- **Next:** Module 8 — resilience and tail latency.
