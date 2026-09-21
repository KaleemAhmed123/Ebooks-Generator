## The partitioned log

- A queue deletes what it delivers. A **log** is an append-only file: the producer writes at the end, readers keep a position, and reading deletes nothing. Kafka, Pulsar, Kinesis and Redis Streams are logs; Module 4 is why it is split into partitions

<svg viewBox="0 0 460 140" role="img" aria-label="The partitioned log. A continuous log of messages on disk. Consumer A's offset points to message 4. Consumer B's offset points to message 2. Nothing is deleted." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="60" width="60" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="50" y="84" text-anchor="middle" font-weight="bold">Producer</text>
  
  <rect x="130" y="50" width="180" height="60" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  
  <rect x="140" y="65" width="20" height="30" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="150" y="84" text-anchor="middle" font-weight="bold">1</text>
  <rect x="165" y="65" width="20" height="30" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="175" y="84" text-anchor="middle" font-weight="bold">2</text>
  <rect x="190" y="65" width="20" height="30" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="200" y="84" text-anchor="middle" font-weight="bold">3</text>
  <rect x="215" y="65" width="20" height="30" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="225" y="84" text-anchor="middle" font-weight="bold">4</text>
  <rect x="240" y="65" width="20" height="30" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="250" y="84" text-anchor="middle" font-weight="bold">5</text>
  <rect x="265" y="65" width="20" height="30" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="275" y="84" text-anchor="middle" font-weight="bold">6</text>
  
  <path d="M225 30 L225 60" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M225 60 l-3 -6 h6 z" fill="#b8541a"/>
  <text x="225" y="20" text-anchor="middle" font-weight="bold" fill="#b8541a">Offset 4 (Consumer A)</text>
  
  <path d="M175 130 L175 100" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M175 100 l-3 6 h6 z" fill="#1d4e89"/>
  <text x="175" y="140" text-anchor="middle" font-weight="bold" fill="#1d4e89">Offset 2 (Consumer B)</text>
  
  <path d="M80 80 L130 80" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M130 80 l-6 -3 v6 z" fill="#1d4e89"/>
</svg>

- The design decision that separates the two models is who tracks "consumed". A queue broker keeps per-message state: acknowledged or not, for every message in flight. A log keeps one integer per reader per partition, the **offset** of the next record to read. Kafka's design document calls that out as the reason: the state is small, cheap to commit, and a reader can rewind it on purpose
- Two consequences follow. **Replay** is a rewind of the integer. And many independent readers cost the broker nothing extra: consumer A at offset 4 and consumer B at offset 2 share the same bytes on disk
- Readers **pull**: a fetch request asks for records from an offset, and the broker holds the request open until data arrives or a wait expires, so an idle consumer is not a busy loop. Backpressure is built in; a slow consumer simply asks less often (Module 6, page 5)

### The failure

- Reading is cheap, so people forget retention deletes underneath them. Nothing is removed on read, so something must remove by age or size: Kafka's default keeps 7 days. A consumer down for 8 days comes back to an offset that points at deleted data. It does not get an error; it gets `auto.offset.reset` (Module 7, page 1)
