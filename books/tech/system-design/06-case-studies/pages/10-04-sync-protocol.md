## The sync protocol

- Blocks first, metadata last. The client hashes, asks which blocks the server lacks, uploads only those, and commits the new blocklist once every block is durable. Other devices learn of the commit and fetch only the blocks they lack. The order is the whole protocol: a blocklist that names a block nobody has is a broken file

<svg viewBox="0 0 460 192" role="img" aria-label="Sequence diagram with four lanes: device A, the block API and store, the metadata API, device B. 1: A hashes the file into blocks a, x, c. 2: A asks the block API which of a, x, c it lacks; the reply is x. 3: A PUTs x by presigned URL; the ack means durable. Streaming sync: as x lands, B may prefetch it before the commit. 4: A commits the path with base version v1 to v2 and blocklist a, x, c to the metadata API. 5: the metadata API tells B over its held-open connection that the path changed to v2. 6: B fetches the v2 blocklist. 7: B fetches only x, having a and c. Dropbox 2014: streaming sync up to 2 times faster in theory, about 25 percent measured on a 1.2 up, 5 megabit down link. An orange cross marks committing step 4 before step 3's ack: B's blocklist names x, the GET returns 404, the file is unreadable on B." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <g fill="#fff" stroke="#333"><rect x="20" y="6" width="60" height="18" rx="3"/><rect x="150" y="6" width="80" height="18" rx="3"/><rect x="280" y="6" width="80" height="18" rx="3"/><rect x="392" y="6" width="60" height="18" rx="3"/></g>
  <g text-anchor="middle" font-size="7.5"><text x="50" y="18">device A</text><text x="190" y="18">block API · store</text><text x="320" y="18">metadata API</text><text x="422" y="18">device B</text></g>
  <g stroke="#999" stroke-dasharray="2 3"><line x1="50" y1="24" x2="50" y2="160"/><line x1="190" y1="24" x2="190" y2="160"/><line x1="320" y1="24" x2="320" y2="160"/><line x1="422" y1="24" x2="422" y2="160"/></g>
  <text x="56" y="36" font-size="7">1. hash the file → [a, x, c]</text>
  <line x1="50" y1="48" x2="190" y2="48" stroke="#333" marker-end="url(#d)"/><text x="120" y="45" text-anchor="middle" font-size="7">2. have? [a, x, c]</text>
  <line x1="190" y1="60" x2="50" y2="60" stroke="#333" stroke-dasharray="3 3" marker-end="url(#d)"/><text x="120" y="69" text-anchor="middle" font-size="7">lack x</text>
  <line x1="50" y1="82" x2="190" y2="82" stroke="#333" marker-end="url(#d)"/><text x="120" y="79" text-anchor="middle" font-size="7">3. PUT x by presigned URL; ack = durable</text>
  <line x1="190" y1="94" x2="422" y2="94" stroke="#1d4e89" stroke-dasharray="3 3" marker-end="url(#b)"/><text x="306" y="103" text-anchor="middle" font-size="7" fill="#1d4e89">streaming sync: x has landed, B may prefetch it before the commit</text>
  <line x1="50" y1="116" x2="320" y2="116" stroke="#333" marker-end="url(#d)"/><text x="185" y="113" text-anchor="middle" font-size="7">4. commit path, base v1 → v2, blocklist [a, x, c]  (page 5 checks the base)</text>
  <line x1="320" y1="128" x2="422" y2="128" stroke="#333" marker-end="url(#d)"/><text x="371" y="125" text-anchor="middle" font-size="7">5. changed: path, v2</text>
  <line x1="422" y1="140" x2="320" y2="140" stroke="#333" stroke-dasharray="3 3" marker-end="url(#d)"/><text x="371" y="149" text-anchor="middle" font-size="7">6. GET blocklist v2</text>
  <line x1="422" y1="158" x2="190" y2="158" stroke="#333" marker-end="url(#d)"/><text x="306" y="167" text-anchor="middle" font-size="7">7. GET x only; a and c are already on B</text>
  <text x="6" y="181" font-size="7.5">Dropbox 2014: streaming sync up to 2× in theory, ≈ 25 % faster measured at 1.2 up / 5 Mbit/s down</text>
  <text x="6" y="190" font-size="7.5" fill="#bf4c28">✕ 4 before 3's ack: B's blocklist names x, GET x → 404, the file is unreadable on B</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker>
  </defs>
</svg>

- Steps 2 and 3 are where dedupe and resume live: a block the server has is never sent, a block already sent before a crash is answered "have it" on the retry. The client keeps no upload session; the block names are the session
- Streaming sync, from Dropbox's 2014 post, overlaps the download on B with the upload from A: B is told about blocks as they land and prefetches them, then applies the blocklist when the commit arrives. Up to 2× in theory, about 25 % measured on a 1.2 Mbit/s up, 5 Mbit/s down link

### The failure

- The commit before the blocks are durable. The blocklist names `x`, B fetches it, the store has not got it, and the user on B opens a file that cannot be assembled. The block store's ack is the precondition for the commit, and the commit is the only thing that makes the version visible
