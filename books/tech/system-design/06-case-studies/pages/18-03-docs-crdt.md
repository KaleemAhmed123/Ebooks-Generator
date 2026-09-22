## CRDTs

- A **CRDT** (conflict-free replicated data type) is a structure whose operations commute: apply them in any order and every replica ends the same, so no sequencer is needed. For text, every character gets a unique id at insertion, (site, counter), and a position relative to its neighbours' ids rather than an index; a delete leaves a **tombstone**, the character marked dead but kept, so a concurrent insert next to it still has its anchor

<svg viewBox="0 0 460 138" role="img" aria-label="A text CRDT. The document Cat is three characters with ids: C is A1, a is A2, t is A3, each holding a reference to its left neighbour. Alice, site A, inserts s after A3 as A4. Bob, site B, inserts y before A1 as B1. Alice's replica applies A4 then B1; Bob's applies B1 then A4; both produce y C a t s, because each insert names its anchor by id, not by index, and ties between two inserts at the same anchor are broken by site id. Bob deletes a: A2 becomes a tombstone, still present, still an anchor, not shown. Below, the cost: every character carries an id and a neighbour reference, tens of bytes of metadata per character in a naive encoding, and tombstones accumulate; a document whose text is 10 kilobytes after a year of editing can carry megabytes of history. Figma's approach is drawn beside it: not a text CRDT but last-writer-wins per object property, with the server as the authority that orders the writes. An orange cross marks the metadata growing with every character ever typed." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="6" y="12" font-size="7.5" fill="#1d4e89">"Cat" as a CRDT: each character has an id (site, counter) and anchors to its left neighbour's id</text>
  <g font-size="7" text-anchor="middle">
    <rect x="6" y="20" width="50" height="26" rx="3" fill="#fff" stroke="#333"/><text x="31" y="31">C</text><text x="31" y="41">id A1</text>
    <rect x="66" y="20" width="50" height="26" rx="3" fill="#fff" stroke="#333"/><text x="91" y="31">a</text><text x="91" y="41">id A2 ← A1</text>
    <rect x="126" y="20" width="50" height="26" rx="3" fill="#fff" stroke="#333"/><text x="151" y="31">t</text><text x="151" y="41">id A3 ← A2</text>
    <rect x="186" y="20" width="50" height="26" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="211" y="31">s (Alice)</text><text x="211" y="41">id A4 ← A3</text>
    <rect x="246" y="20" width="56" height="26" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="274" y="31">y (Bob)</text><text x="274" y="41">id B1 ← start</text>
  </g>
  <text x="6" y="60" font-size="7">Alice applies A4 then B1; Bob applies B1 then A4; both read "yCats"</text>
  <text x="6" y="70" font-size="7">an insert names its anchor by id, not index, so arrival order does not matter</text>
  <text x="6" y="80" font-size="7">two inserts at one anchor sort by (counter, site); a delete leaves A2 as a tombstone anchor</text>
  <rect x="318" y="20" width="136" height="50" rx="3" fill="#fff" stroke="#b8541a"/><text x="386" y="32" text-anchor="middle" font-size="7.5">Figma: not a text CRDT</text><text x="386" y="43" text-anchor="middle" font-size="7">last-writer-wins per object property,</text><text x="386" y="53" text-anchor="middle" font-size="7">the server orders the writes; rejected OT</text><text x="386" y="63" text-anchor="middle" font-size="7">as unnecessarily complex for its problem</text>
  <text x="6" y="98" font-size="7">cost: an id and an anchor per character, tens of bytes per character in a naive encoding, and tombstones that never leave without coordination</text>
  <text x="6" y="108" font-size="7">a document whose text is 10 KB after a year of editing can carry megabytes of history; compaction needs every replica to agree the history is closed</text>
  <text x="6" y="130" font-size="7.5" fill="#bf4c28">✕ metadata that grows with every character ever typed: the document's size is its history, not its text, and a replica loads all of it</text>
</svg>

- Commutativity is bought with metadata: the id and anchor per character and the tombstones let two replicas agree without talking, and stay until every replica agrees to compact. The right price for peer-to-peer and offline-first products; paid for nothing when a server orders every write anyway

:::interview
"OT or CRDT?" — Ask whether there is a server. With a central authority, OT or Figma's last-writer-wins per property is simpler, carries no per-character metadata, and the server's order makes conflicts a single-case problem. Without one, peer to peer, offline-first, or many writers with no round trip to a sequencer, a CRDT is the only structure that converges, and its metadata growth is the cost, managed by snapshots and compaction. Figma had a server and rejected OT for something simpler than either.
:::

### The failure

- CRDT metadata growing with every character ever typed. Each keystroke leaves an id, an anchor and, after deletion, a tombstone, forever; a year-old document is megabytes of dead structure around kilobytes of text, and every client loads it before showing a word. Compaction is a coordination problem, which is the problem the CRDT was chosen to avoid
