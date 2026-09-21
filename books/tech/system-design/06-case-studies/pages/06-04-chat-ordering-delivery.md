## Ordering and delivery receipts

- Order is per conversation, and it is decided at one place: the id the chat service assigns when it persists the message. Every device sorts by that id and shows the same order. Two conversations have no order between them, and no device needs one

<svg viewBox="0 0 460 140" role="img" aria-label="Timeline of one message across three parties. Bob's client sends with a client-generated temp id; the chat service assigns message id 7 and persists it, then acknowledges sent. Gateway pushes to Alice's client, which acknowledges; the service records delivered and pushes a delivered receipt to Bob. Alice opens the conversation; her client posts read; a read receipt reaches Bob. Each receipt is its own small event, not an update to the message row. An orange cross marks a retry after a lost ack producing message 7 twice on Alice's screen, fixed by the client deduplicating on id." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="8" y="22">Bob</text><line x1="40" y1="18" x2="452" y2="18" stroke="#333"/>
  <text x="8" y="66">service</text><line x1="40" y1="62" x2="452" y2="62" stroke="#333"/>
  <text x="8" y="110">Alice</text><line x1="40" y1="106" x2="452" y2="106" stroke="#333"/>
  <line x1="70" y1="18" x2="90" y2="62" stroke="#333" marker-end="url(#d)"/><text x="8" y="44" font-size="7">send (temp id t1)</text>
  <rect x="92" y="52" width="70" height="20" fill="#e6f2ff" stroke="#1d4e89"/><text x="127" y="65" text-anchor="middle" font-size="7.5">persist as id 7</text>
  <line x1="166" y1="62" x2="186" y2="18" stroke="#1d4e89" marker-end="url(#b)"/><text x="184" y="36" font-size="7" fill="#1d4e89">sent: t1 = 7</text>
  <line x1="200" y1="62" x2="220" y2="106" stroke="#333" marker-end="url(#d)"/><text x="180" y="90" font-size="7">push 7</text>
  <line x1="240" y1="106" x2="260" y2="62" stroke="#333" marker-end="url(#d)"/><text x="252" y="90" font-size="7">ack 7</text>
  <line x1="270" y1="62" x2="290" y2="18" stroke="#1d4e89" marker-end="url(#b)"/><text x="290" y="36" font-size="7" fill="#1d4e89">delivered 7</text>
  <line x1="322" y1="106" x2="342" y2="62" stroke="#333" marker-end="url(#d)"/><text x="300" y="120" font-size="7">read up to 7</text>
  <line x1="352" y1="62" x2="372" y2="18" stroke="#1d4e89" marker-end="url(#b)"/><text x="372" y="36" font-size="7" fill="#1d4e89">read 7</text>
  <text x="384" y="76" font-size="7">receipts: a receipts</text><text x="384" y="86" font-size="7">table, or the latest id</text><text x="384" y="96" font-size="7">per (user, channel)</text>
  <text x="8" y="134" font-size="7.5" fill="#bf4c28">✕ ack 7 lost → gateway re-pushes 7 → Alice sees 7 twice unless her client dedupes on id</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker>
  </defs>
</svg>

- Three receipts, three events. **Sent**: the service persisted it and returned the id. **Delivered**: the recipient's client acknowledged the push. **Read**: the recipient's client reported the conversation open at that id. Each is a small append, not an update to the message row (page 3), and "read up to id 7" is one row per user per conversation, not one per message
- Delivery is at-least-once (booklet 04): a push whose ack was lost is pushed again, so the client keeps the ids it has shown and drops repeats. The client's temporary id, echoed back in "sent", lets it replace its optimistic bubble with the real one instead of showing both

:::interview
"How do you guarantee message ordering?" — Per conversation, by the id assigned at persist time; every device sorts by it. Not globally, because nothing needs it and nothing could provide it across millions of independent conversations. Then the edge: two people typing at once may see their own message first before the ids settle the order, and that reorder is accepted as the cost of showing a message before the round trip completes.
:::

### The failure

- A global sequence. One counter for every message in the system, so that "message 4 000 000 001 comes after 4 000 000 000" is true across all conversations. It is a single writer at 60 000 increments a second for a property nobody reads
