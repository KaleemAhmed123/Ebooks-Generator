## What the interviewer probes

| Probe | The answer that holds |
| :--- | :--- |
| cursors and presence | ephemeral: each client sends its cursor and selection a few times a second, the document server broadcasts them on the same socket, nothing is journaled. A cursor is positioned by version, so a client applies it after the operations it refers to. Presence is the socket being open |
| permissions | checked at the server per operation, not at connection time: a user demoted to viewer mid-session has their next operation rejected and their client told to reload read-only. The check reads a permission cache; a change to it is an event the server receives (Module 5's shape) |
| a very large document | one server holds it in memory (page 4), so a 500-page document is split into sections, each its own document with its own journal and owner; the client loads the section in view. Cross-section operations are two operations, not one |
| OT or CRDT | "do you have a server?" (page 3). A centralised product uses the server as the sequencer and pays no per-character metadata; a peer-to-peer or offline-first one needs a CRDT and pays for it in history size. Figma had a server and chose last-writer-wins per property |
| history storage | the journal in an append-only table keyed by (doc, version), snapshots in blob storage (booklet 05); the journal is compacted only past the oldest snapshot anyone can still ask for |
| rich text | an operation on attributes, "bold from 10 to 20", transforms like an insert or delete over the same indices; the set of operation types is what grows, and every new pair needs a transform case (page 2) |

- The metric: propagation latency from one client's keystroke to another's screen, p99, and the count of failovers per day, each of which is a replay (page 5) that the users saw as a pause
- Cross-references the design leans on: the journal's durability, leases and split brain (booklet 03); the connection registry (Module 6, page 2); blob storage for snapshots (booklet 05); the event that carries a permission change (Module 5); file sync for files that are opaque bytes (Module 10)

### The failure

- Picking a CRDT for a centralised product. There is a server, it sees every operation, and it could order them; instead every character carries an id and a tombstone forever, the document grows with its history, and the metadata bill is paid for a decentralisation the product never has. The choice is made by the deployment, not by which paper is newer
