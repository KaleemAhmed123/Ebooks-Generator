## Outbox via CDC

- Debezium's **outbox event router** turns the outbox table into the transport instead of a thing to poll: the connector reads outbox rows straight off the WAL, unpacks `aggregatetype` into the topic and `aggregateid` into the Kafka key, and forwards `payload` as the message body — no relay process at all

<svg viewBox="0 0 460 110" role="img" aria-label="Outbox via CDC. An outbox row insert and its same-transaction delete both land in the WAL. The connector reads both and routes into a topic keyed by aggregateid." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="15" y="15" width="90" height="24" fill="none" stroke="#333"/>
  <text x="60" y="31" text-anchor="middle" font-size="7">INSERT row</text>
  <rect x="15" y="55" width="90" height="24" fill="none" stroke="#333" stroke-dasharray="3 2"/>
  <text x="60" y="71" text-anchor="middle" font-size="7">DELETE, same tx</text>
  <path d="M105 27 L150 45" stroke="#333" marker-end="url(#v8)"/>
  <path d="M105 67 L150 45" stroke="#333" stroke-dasharray="3 2" marker-end="url(#v8)"/>
  <rect x="150" y="30" width="60" height="30" fill="none" stroke="#333"/>
  <text x="180" y="49" text-anchor="middle" font-size="7">WAL</text>
  <path d="M210 45 L255 45" stroke="#333" marker-end="url(#v8)"/>
  <rect x="255" y="25" width="90" height="40" fill="none" stroke="#333"/>
  <text x="300" y="42" text-anchor="middle" font-size="7">connector</text>
  <text x="300" y="54" text-anchor="middle" font-size="6.5">+ router</text>
  <path d="M345 45 L390 45" stroke="#333" marker-end="url(#v8)"/>
  <rect x="390" y="28" width="55" height="34" fill="none" stroke="#bf4c28"/>
  <text x="417" y="43" text-anchor="middle" font-size="7" fill="#bf4c28">topic</text>
  <text x="417" y="54" text-anchor="middle" font-size="5.5">key: aggregateid</text>
  <text x="15" y="100" font-size="7.5" fill="#555">the DELETE ships nothing new — the WAL recorded the INSERT before the row was removed</text>
  <defs><marker id="v8" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- The table stays insert-only. Debezium's own description: "all changes in an outbox table are expected to be INSERT operations" — an `UPDATE` on an outbox row is not supported by the router and should not happen in this design
- Rows can be deleted right after insert, in the same transaction, and the event still ships: the WAL already recorded the `INSERT` before the `DELETE` runs, so the connector reads both in order — Debezium's own reasoning (Morling, 2019): "will create an INSERT and a DELETE entry in the log once the transaction commits." Deleting keeps the outbox table small without a separate cleanup job
- `aggregateid` as the Kafka key is what keeps one aggregate's events in one partition, in order (Module 4, page 2) — the row shape carries the partitioning decision, not a separate config

### The failure

- Updating an outbox row to "fix" a payload before it ships. The router assumes insert-only; the update either is missed the way an insert would be caught, or emitted as a second, unintended event. Fix a bad payload with a correcting row, never by editing the one already written
