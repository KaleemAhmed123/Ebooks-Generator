## Operational transformation

- An edit is an **operation**, insert or delete at an index, sent against the document version the client had. Two clients on the same version send operations whose indices assume the other's did not happen. **Operational transformation (OT)** rewrites the second operation against the first so that applying them in either order gives the same text. One server sequences all operations, so every transform is against a known history

<svg viewBox="0 0 460 150" role="img" aria-label="OT with a central sequencer. The document is Cat at version 0. Alice sends insert s at index 3, based on version 0, giving Cats on her screen. Bob sends insert y at index 0, based on version 0, giving yCat on his. The server receives Bob's first: it becomes version 1, yCat, and is broadcast. Alice's op arrives based on version 0; the server transforms it against Bob's: an insert at 0 before it shifts index 3 to 4, so Alice's op becomes insert s at 4, version 2, yCats. Bob receives it and applies it. Alice receives Bob's op transformed against her own already-applied op: insert y at 0, unchanged, giving yCats. Both converge. An orange cross marks OT without a single authority: each peer transforms against the others in its own order, and the transform must be correct for every pair and every order, which is where the case count explodes." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="8" width="70" height="20" rx="3" fill="#fff" stroke="#333"/><text x="41" y="21" text-anchor="middle">Alice</text>
  <rect x="195" y="8" width="70" height="20" rx="3" fill="#fff" stroke="#1d4e89"/><text x="230" y="21" text-anchor="middle">server</text>
  <rect x="384" y="8" width="70" height="20" rx="3" fill="#fff" stroke="#333"/><text x="419" y="21" text-anchor="middle">Bob</text>
  <line x1="41" y1="28" x2="41" y2="130" stroke="#333" stroke-dasharray="3 3"/><line x1="230" y1="28" x2="230" y2="130" stroke="#1d4e89" stroke-dasharray="3 3"/><line x1="419" y1="28" x2="419" y2="130" stroke="#333" stroke-dasharray="3 3"/>
  <text x="48" y="40" font-size="7">v0 "Cat" → local "Cats"</text><text x="412" y="40" text-anchor="end" font-size="7">v0 "Cat" → local "yCat"</text>
  <line x1="412" y1="50" x2="237" y2="56" stroke="#333" marker-end="url(#d)"/><text x="325" y="48" text-anchor="middle" font-size="7">ins('y', 0) @v0</text>
  <line x1="48" y1="50" x2="223" y2="72" stroke="#333" marker-end="url(#d)"/><text x="135" y="55" text-anchor="middle" font-size="7">ins('s', 3) @v0</text>
  <text x="236" y="64" font-size="7" fill="#1d4e89">v1 = "yCat"; broadcast</text>
  <text x="236" y="82" font-size="7" fill="#1d4e89">Alice's op is @v0: transform against v1's insert at 0</text>
  <text x="236" y="92" font-size="7" fill="#1d4e89">→ ins('s', 4); v2 = "yCats"</text>
  <line x1="237" y1="98" x2="412" y2="104" stroke="#1d4e89" marker-end="url(#b)"/><text x="325" y="112" text-anchor="middle" font-size="7">ins('s', 4) @v1</text>
  <line x1="223" y1="98" x2="48" y2="104" stroke="#1d4e89" marker-end="url(#b)"/><text x="135" y="112" text-anchor="middle" font-size="7">ins('y', 0), transformed against hers</text>
  <text x="48" y="126" font-size="7">"yCats"</text><text x="412" y="126" text-anchor="end" font-size="7">"yCats"</text>
  <text x="6" y="146" font-size="7.5" fill="#bf4c28">✕ OT without one authority: each peer transforms against every other in its own order, and every pair and order must hold</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker>
  </defs>
</svg>

- The sequencer is the design: with one server assigning versions, a client's operation is transformed against exactly the operations it did not see, in one known order, and the transform function needs to be right for insert-insert, insert-delete and delete-delete against a single history. This is the classic model for a centralised editor, and the one Figma's engineers considered and rejected for their problem as unnecessarily complex, choosing something simpler with the server as the authority (page 3)
- The client applies its own operation immediately and keeps it pending until the server's version comes back; an operation that arrives meanwhile is transformed against the pending ones locally. That is why typing never waits for the network

### The failure

- OT without a central authority. Peer to peer, every pair of peers must transform against each other's history in whatever order messages arrive, and the transform must give the same result for every order of every pair. The cases multiply with the number of operation types and the correctness proofs are famously hard; with one sequencer the cases collapse to one order, which is the whole reason the server exists
