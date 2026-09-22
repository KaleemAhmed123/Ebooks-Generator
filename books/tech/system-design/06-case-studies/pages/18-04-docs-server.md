## One authority per document

- Every operation for a document goes through one server process, which holds the document in memory, assigns each operation its version, transforms it (page 2), appends it to a journal, and broadcasts it to every other client on the document. Figma runs one server process per document; the shape is the same whatever the merge algorithm, because the journal and the fan-out need an owner

<svg viewBox="0 0 460 170" role="img" aria-label="Collaborative editing, whole design. Clients hold a WebSocket each. A gateway looks the document id up in a registry, Module 6 page 2, that maps each open document to the one server that owns it, and routes the connection there; a document nobody has open is assigned on first open. The document server keeps the document state in memory, sequences operations, 500 a second on a busy document, transforms each against what the client had not seen, appends it to an append-only journal, durable before anything is broadcast, booklet 03, then broadcasts to the other clients, about 50 000 messages a second for 100 editors. A snapshot store holds the document every N operations, page 5. If the server dies, the registry assigns the document to another server, which loads the last snapshot and replays the journal after it; clients reconnect through the gateway and resend pending operations with their base version. An orange cross marks two servers accepting operations for the same document: two version sequences, two journals, and no transform that can reconcile them." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="40" width="58" height="40" rx="3" fill="#fff" stroke="#333"/><text x="35" y="53" text-anchor="middle">clients</text><text x="35" y="64" text-anchor="middle" font-size="7">WebSocket each;</text><text x="35" y="74" text-anchor="middle" font-size="7">pending ops kept</text>
  <rect x="92" y="40" width="74" height="40" rx="3" fill="#fff" stroke="#1d4e89"/><text x="129" y="53" text-anchor="middle">gateway</text><text x="129" y="64" text-anchor="middle" font-size="7">doc id → owner,</text><text x="129" y="74" text-anchor="middle" font-size="7">from the registry</text>
  <line x1="64" y1="60" x2="92" y2="60" stroke="#333" marker-end="url(#d)"/>
  <rect x="76" y="98" width="110" height="30" rx="3" fill="#e6f2ff" stroke="#333"/><text x="131" y="110" text-anchor="middle">registry</text><text x="131" y="121" text-anchor="middle" font-size="7">doc → server (Module 6, page 2)</text>
  <line x1="129" y1="80" x2="129" y2="98" stroke="#333" stroke-dasharray="3 3" marker-end="url(#d)"/>
  <rect x="196" y="24" width="140" height="72" rx="3" fill="#fff" stroke="#1d4e89"/><text x="266" y="37" text-anchor="middle">document server, one per doc</text><text x="266" y="48" text-anchor="middle" font-size="7">state in memory; sequences ops, 500/s</text><text x="266" y="58" text-anchor="middle" font-size="7">transform against the unseen (page 2)</text><text x="266" y="68" text-anchor="middle" font-size="7">append to journal, then broadcast</text><text x="266" y="79" text-anchor="middle" font-size="7">to the other 99: ≈ 50 000 msgs/s</text><text x="266" y="90" text-anchor="middle" font-size="7">(Figma: one server process per doc)</text>
  <line x1="166" y1="60" x2="196" y2="60" stroke="#333" marker-end="url(#d)"/><text x="181" y="55" text-anchor="middle" font-size="7">ops</text>
  <line x1="196" y1="72" x2="166" y2="72" stroke="#1d4e89" marker-end="url(#b)"/><text x="176" y="91" text-anchor="middle" font-size="6.5" fill="#1d4e89">broadcast</text>
  <rect x="366" y="24" width="88" height="34" rx="3" fill="#e6f2ff" stroke="#333"/><text x="410" y="37" text-anchor="middle">journal</text><text x="410" y="48" text-anchor="middle" font-size="7">append-only; durable first</text>
  <line x1="336" y1="41" x2="366" y2="41" stroke="#333" marker-end="url(#d)"/><text x="351" y="36" text-anchor="middle" font-size="7">1</text>
  <rect x="366" y="70" width="88" height="34" rx="3" fill="#e6f2ff" stroke="#333"/><text x="410" y="83" text-anchor="middle">snapshots</text><text x="410" y="94" text-anchor="middle" font-size="7">every N ops (page 5)</text>
  <line x1="336" y1="87" x2="366" y2="87" stroke="#333" stroke-dasharray="3 3" marker-end="url(#d)"/>
  <rect x="196" y="112" width="258" height="34" rx="3" fill="#fff" stroke="#333"/><text x="325" y="125" text-anchor="middle">on crash: the registry reassigns the document</text><text x="325" y="137" text-anchor="middle" font-size="7">new owner loads snapshot + journal tail; clients resend pending ops</text>
  <line x1="266" y1="96" x2="266" y2="112" stroke="#333" stroke-dasharray="3 3" marker-end="url(#d)"/>
  <line x1="410" y1="104" x2="410" y2="112" stroke="#333" stroke-dasharray="3 3" marker-end="url(#d)"/>
  <text x="6" y="160" font-size="7.5" fill="#bf4c28">✕ two servers accepting ops for one document: two version sequences, two journals, and no transform can reconcile them afterwards</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker>
  </defs>
</svg>

- The journal is written before the broadcast, so a crash after the ack loses nothing: the next owner replays it. The registry's mapping is the lock that makes "one owner" true; it must be a single consistent record (booklet 03), with a lease the owner renews, so a server that lost the lease stops accepting operations before another is given the document
- The document's fan-out stays on its one server: 50 000 messages a second for a busy document is a socket loop, not a cluster problem, and a million quiet documents spread across the fleet by id

### The failure

- Two servers accepting operations for the same document. Round-robin puts Alice on one, Bob on another, each assigns version 7 to a different operation, and the two journals diverge with no way to merge them, because OT assumes one history. The registry with a lease is what makes the failover safe, and a stale owner that keeps accepting is the split brain booklet 03 describes
