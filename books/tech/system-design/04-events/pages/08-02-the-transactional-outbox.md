## The transactional outbox

- The **outbox pattern**: write the business row and an outbox row in the same local database transaction. The business change and the fact that it happened commit together, or neither does — no dual write

<svg viewBox="0 0 460 110" role="img" aria-label="The transactional outbox. One local transaction writes both an orders row and an outbox row. A separate relay reads the outbox and publishes to the broker." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="15" width="180" height="60" fill="none" stroke="#bf4c28" stroke-dasharray="3 2"/>
  <text x="110" y="10" text-anchor="middle" font-size="7" fill="#bf4c28">one local transaction</text>
  <rect x="35" y="30" width="70" height="26" fill="none" stroke="#333"/>
  <text x="70" y="47" text-anchor="middle" font-size="7">orders row</text>
  <rect x="115" y="30" width="70" height="26" fill="none" stroke="#333"/>
  <text x="150" y="47" text-anchor="middle" font-size="7">outbox row</text>
  <path d="M200 55 L260 55" stroke="#333" marker-end="url(#o8)"/>
  <rect x="260" y="35" width="70" height="40" fill="none" stroke="#333"/>
  <text x="295" y="58" text-anchor="middle" font-size="7.5">relay</text>
  <path d="M330 55 L400 55" stroke="#333" marker-end="url(#o8)"/>
  <rect x="400" y="40" width="45" height="30" fill="none" stroke="#333"/>
  <text x="422" y="58" text-anchor="middle" font-size="7">broker</text>
  <text x="20" y="100" font-size="7.5" fill="#555">the relay is a different process; it can crash and retry without touching business data again</text>
  <defs><marker id="o8" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- A separate **relay** reads the outbox table and publishes each row, then marks it sent. The relay is at-least-once by construction: it can publish a row and crash before marking it sent, and publish it again on restart — microservices.io's own description says only "messages are guaranteed to be sent if and only if the database transaction commits," nothing about exactly once. Every consumer must be idempotent (booklet 01)
- Two ways to build the relay: poll the table (page 3) or tail the database's own change log (page 4). Polling is simpler to run; tailing removes the poll and reads events sooner
- The outbox row's shape (id, aggregate type, aggregate id, type, payload) is standard enough that CDC tools ship a transform for exactly it (page 6)

:::interview
"How do you get an event out without a dual write?" — Write the event as a row in the same local transaction as the business change: an outbox table. A separate relay publishes outbox rows to the broker and marks them sent. The relay itself is at-least-once, so consumers still need to be idempotent — the outbox removes the dual write, not the duplicate.
:::

### The failure

- Publishing straight to the broker from inside the same transaction, "since we're already in one". A network call inside a database transaction can hold it open, and if the transaction rolls back afterward, the message already left. The outbox row is a database write like any other; the broker call happens later, outside the transaction, from the relay
