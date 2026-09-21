## Log compaction

- Time retention keeps the last seven days. **Compaction** keeps the last value per key, forever: a topic with `cleanup.policy=compact` is a changelog where superseded records are removed and the newest record for each key stays

<svg viewBox="0 0 460 130" role="img" aria-label="Log compaction. Before: a partition with records for keys A, B, A, C, B with a null value for key B (a tombstone), then A again. After compaction: only the latest record per key survives: C, then the tombstone for B, then the last A. After delete.retention.ms the tombstone for B is removed as well, so a reader from offset 0 never learns B was deleted." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="20" y="18">before</text>
  <g stroke="#333" fill="#fff">
    <rect x="70" y="6" width="44" height="20"/><rect x="118" y="6" width="44" height="20"/><rect x="166" y="6" width="44" height="20"/><rect x="214" y="6" width="44" height="20"/><rect x="262" y="6" width="44" height="20" fill="#fbe9e2"/><rect x="310" y="6" width="44" height="20"/>
  </g>
  <g text-anchor="middle" font-size="7.5">
    <text x="92" y="19">A=1</text><text x="140" y="19">B=1</text><text x="188" y="19">A=2</text><text x="236" y="19">C=1</text><text x="284" y="19">B=null</text><text x="332" y="19">A=3</text>
  </g>
  <text x="20" y="54">after</text>
  <g stroke="#333" fill="#fff">
    <rect x="214" y="42" width="44" height="20"/><rect x="262" y="42" width="44" height="20" fill="#fbe9e2"/><rect x="310" y="42" width="44" height="20"/>
  </g>
  <g text-anchor="middle" font-size="7.5">
    <text x="236" y="55">C=1</text><text x="284" y="55">B=null</text><text x="332" y="55">A=3</text>
  </g>
  <text x="70" y="55" font-size="7.5" fill="#555">A=1, B=1, A=2 removed: superseded</text>
  <text x="20" y="90">later</text>
  <g stroke="#333" fill="#fff">
    <rect x="214" y="78" width="44" height="20"/><rect x="310" y="78" width="44" height="20"/>
  </g>
  <g text-anchor="middle" font-size="7.5">
    <text x="236" y="91">C=1</text><text x="332" y="91">A=3</text>
  </g>
  <text x="70" y="91" font-size="7.5" fill="#bf4c28">tombstone gone after delete.retention.ms</text>
  <text x="20" y="120" font-size="7.5" fill="#555">Offsets are kept; compaction leaves gaps, it does not renumber. A reader from 0 that starts now never sees B at all.</text>
</svg>

- A record with a key and a null value is a **tombstone**: Kafka's design document says it is treated as a delete from the log. Compaction keeps the tombstone long enough for readers to see the delete, then removes it too, after `delete.retention.ms` (24 hours by default)
- Compaction runs on closed segments, in the background, when the ratio of dirty to clean data crosses a threshold. The head of the log is always uncompacted, so a reader always sees every recent write; only the tail is thinned
- Offsets are preserved, with gaps. A consumer at offset 500 whose record was compacted away moves to the next surviving one

### The failure

- A slow scan from zero misses deletes. A rebuild starts reading the topic from offset 0 on Monday; it takes two days; on Tuesday key B is deleted, tombstone written, and on Wednesday, past the 24 hours, the tombstone is compacted away before the scan reaches it. The rebuilt table has B; the source does not. Raise `delete.retention.ms` above the longest rebuild, or rebuild faster
