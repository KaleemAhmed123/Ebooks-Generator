## Change data capture

- **Change data capture (CDC)** reads a database's own write-ahead log instead of polling a table. Postgres calls this logical decoding: a **replication slot** subscribes to the WAL and receives every committed change, in commit order, without querying application tables at all
- Debezium is the common example: its Postgres connector uses the `pgoutput` plugin, takes a snapshot of existing rows first, then streams from the slot; delivery is at-least-once, resuming from the last offset it recorded

<svg viewBox="0 0 460 100" role="img" aria-label="Change data capture. The write-ahead log feeds a replication slot, which feeds a connector, which publishes to a topic." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="30" width="70" height="30" fill="none" stroke="#333"/>
  <text x="55" y="49" text-anchor="middle" font-size="7.5">WAL</text>
  <path d="M90 45 L140 45" stroke="#333" marker-end="url(#c8)"/>
  <rect x="140" y="25" width="90" height="40" fill="none" stroke="#333"/>
  <text x="185" y="44" text-anchor="middle" font-size="7">replication</text>
  <text x="185" y="55" text-anchor="middle" font-size="7">slot</text>
  <text x="185" y="18" text-anchor="middle" font-size="6" fill="#bf4c28">holds WAL until read</text>
  <path d="M230 45 L280 45" stroke="#333" marker-end="url(#c8)"/>
  <rect x="280" y="30" width="80" height="30" fill="none" stroke="#333"/>
  <text x="320" y="49" text-anchor="middle" font-size="7.5">connector</text>
  <path d="M360 45 L410 45" stroke="#333" marker-end="url(#c8)"/>
  <rect x="410" y="30" width="35" height="30" fill="none" stroke="#333"/>
  <text x="427" y="49" text-anchor="middle" font-size="7">topic</text>
  <defs><marker id="c8" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- A slot is a promise, not a subscription — Postgres keeps every WAL segment the slot has not yet consumed, for as long as the slot exists, whether or not anything is reading it. Postgres's own docs: this "will prevent removal of required resources even when there is no connection using them," and in the extreme "could cause the database to shut down to prevent transaction ID wraparound." `max_slot_wal_keep_size` defaults to −1 — unlimited — so a stopped connector does not get capped automatically; it fills the disk
- CDC removes the poll and the extra table. It costs a slot to monitor and a connector to run and keep running

### The failure

- A Debezium connector taken down for a deploy and forgotten. The slot keeps every WAL segment since the last checkpoint it sent; a week later the disk alarms, not the connector. Alert on slot lag in bytes, not on the connector's own uptime
