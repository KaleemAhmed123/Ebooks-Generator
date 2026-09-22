## Exactly-once, really

- The log delivers at least once: a consumer that crashes after updating its counts and before committing its offset re-reads those events on restart. Exactly-once is two disciplines in the aggregator: window state and offset checkpointed together, and every click id checked against the window's seen set

<svg viewBox="0 0 460 156" role="img" aria-label="Exactly-once in the aggregator. Timeline for one partition. The aggregator reads offsets 100 to 130, updating the counts for the open windows and adding each click id to that window's seen set; a client retry, click id K appearing at offsets 112 and 127, is dropped the second time. It writes a checkpoint at offset 130: the offset, the window counts and the seen sets, in one atomic write to a state store, and only then commits the offset. It reads 131 to 160 and crashes before the next checkpoint. On restart it restores the checkpoint at 130 and re-reads from 131: every count is rebuilt from the same events, so the result is the same as if there had been no crash. An orange cross marks the offset committed separately from the state: the counts include 131 to 160, the offset is still 130, and the replay adds them again." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <line x1="30" y1="30" x2="450" y2="30" stroke="#333" marker-end="url(#d)"/><text x="10" y="33" font-size="7">offset</text>
  <text x="60" y="22" text-anchor="middle" font-size="7">100</text><text x="200" y="22" text-anchor="middle" font-size="7">130</text><text x="330" y="22" text-anchor="middle" font-size="7">160</text>
  <line x1="60" y1="26" x2="60" y2="34" stroke="#333"/><line x1="200" y1="26" x2="200" y2="34" stroke="#333"/><line x1="330" y1="26" x2="330" y2="34" stroke="#333"/>
  <rect x="60" y="44" width="140" height="30" rx="3" fill="#fff" stroke="#1d4e89"/><text x="130" y="56" text-anchor="middle" font-size="7">read 100–130: count into windows,</text><text x="130" y="67" text-anchor="middle" font-size="7">add each click id to its window's seen set</text>
  <text x="6" y="136" font-size="7">click id K at 112 and again at 127 (a client retry): the second is dropped by the seen set</text>
  <rect x="176" y="96" width="112" height="30" rx="3" fill="#e6f2ff" stroke="#333"/><text x="232" y="108" text-anchor="middle" font-size="7">checkpoint @130, one atomic write:</text><text x="232" y="119" text-anchor="middle" font-size="7">offset + window counts + seen sets</text>
  <line x1="200" y1="74" x2="200" y2="96" stroke="#333" marker-end="url(#d)"/><text x="204" y="88" font-size="7">then commit the offset</text>
  <rect x="204" y="44" width="126" height="30" rx="3" fill="#fff" stroke="#1d4e89"/><text x="267" y="56" text-anchor="middle" font-size="7">read 131–160, counting on</text><text x="267" y="67" text-anchor="middle" font-size="7">…crash before the next checkpoint</text>
  <text x="330" y="44" font-size="9" fill="#bf4c28">✕</text>
  <rect x="344" y="44" width="110" height="42" rx="3" fill="#fff" stroke="#1d4e89"/><text x="399" y="56" text-anchor="middle" font-size="7">restart: restore checkpoint</text><text x="399" y="67" text-anchor="middle" font-size="7">@130, re-read from 131:</text><text x="399" y="78" text-anchor="middle" font-size="7">same events, same counts</text>
  <line x1="288" y1="111" x2="344" y2="80" stroke="#333" stroke-dasharray="3 3" marker-end="url(#d)"/><text x="330" y="106" font-size="7">restore</text>
  <text x="6" y="150" font-size="7.5" fill="#bf4c28">✕ offset committed apart from the state: counts hold 131–160, the offset says 130, and the replay adds 131–160 a second time</text>
  <defs><marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- Two duplicates, two mechanisms: a client retry puts one click id in the log twice and the seen set drops the second; a restart replays a range and the checkpoint restores the state it was built on. Booklet 04 owns the broker's transactions; the OLAP write is a value per (ad, minute), never an increment

:::interview
"The aggregator restarts and re-reads thirty seconds of clicks. How do you not double-count?" — The offset and the window state are one checkpoint, written atomically, so a restart resumes from a state that has seen exactly the events up to that offset and replays only what came after. Inside a window, a click id already in its seen set is dropped, which also covers client retries. The write to the store is idempotent, a value per (ad, minute), not an increment. Kafka's exactly-once covers producer to topic; the counts end in a database, so the dedupe is ours.
:::

### The failure

- A restart double-counting a partition. State written, offset committed a moment later, crash in between: the replay adds thirty seconds of clicks to counts that already hold them. Nothing in the totals reveals it; only the batch (page 5) does, a day later
