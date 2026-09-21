# Module 5 - Delivery semantics

## Delivery semantics on a broker

- Kafka's design document defines the three terms. At most once: messages may be lost but are never redelivered. At least once: never lost but may be redelivered. Exactly once: each message is processed once and only once. Booklet 01 has the argument for why the third cannot be delivered by a network; this module is where each one comes from on a broker
- Kafka's default is at-least-once. Every guarantee in the module is a choice of where to put the crash

<svg viewBox="0 0 460 150" role="img" aria-label="Where duplicates come from. Producer, broker and consumer in a row. Three crash points: the ack from broker to producer is lost so the producer resends; the consumer crashes after writing to the database but before committing its offset; the broker redelivers after a timeout or rebalance." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="22" width="90" height="34" rx="3" fill="#fff" stroke="#333"/>
  <text x="65" y="43" text-anchor="middle">Producer</text>
  <rect x="185" y="22" width="90" height="34" rx="3" fill="#fff" stroke="#333"/>
  <text x="230" y="43" text-anchor="middle">Broker</text>
  <rect x="350" y="22" width="90" height="34" rx="3" fill="#fff" stroke="#333"/>
  <text x="395" y="43" text-anchor="middle">Consumer</text>
  <line x1="110" y1="32" x2="185" y2="32" stroke="#333" marker-end="url(#a)"/>
  <text x="147" y="28" text-anchor="middle" font-size="7.5">send</text>
  <line x1="185" y1="47" x2="110" y2="47" stroke="#333" stroke-dasharray="3 2" marker-end="url(#a)"/>
  <text x="147" y="58" text-anchor="middle" font-size="7.5">ack</text>
  <line x1="275" y1="32" x2="350" y2="32" stroke="#333" marker-end="url(#a)"/>
  <text x="312" y="28" text-anchor="middle" font-size="7.5">deliver</text>
  <line x1="350" y1="47" x2="275" y2="47" stroke="#333" stroke-dasharray="3 2" marker-end="url(#a)"/>
  <text x="312" y="58" text-anchor="middle" font-size="7.5">commit / ack</text>
  <defs><marker id="a" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
  <text x="140" y="49" text-anchor="middle" fill="#bf4c28" font-weight="bold" font-size="11">×</text>
  <text x="305" y="49" text-anchor="middle" fill="#bf4c28" font-weight="bold" font-size="11">×</text>
  <text x="395" y="64" text-anchor="middle" fill="#bf4c28" font-weight="bold" font-size="11">×</text>
  <text x="20" y="90" fill="#bf4c28" font-weight="bold">1</text>
  <text x="32" y="90">ack lost: the producer's retry writes the record a second time</text>
  <text x="20" y="108" fill="#bf4c28" font-weight="bold">2</text>
  <text x="32" y="108">commit lost: the effect is in the database, the offset is not; restart replays it</text>
  <text x="20" y="126" fill="#bf4c28" font-weight="bold">3</text>
  <text x="32" y="126">consumer declared dead (timeout, rebalance): the broker hands the record to another</text>
  <text x="20" y="144" font-size="7.5" fill="#555">Every "reliable" setting closes a loss path by opening one of these.</text>
</svg>

- Each path is a crash between two steps that cannot be made one step: send and ack, effect and commit, deliver and acknowledge. A setting that removes loss (retries, commit-after-effect, redelivery) leaves the second step to repeat
- So "reliable" means duplicates, by construction. The rest of the module is what removes them and where: the producer (page 3), Kafka to Kafka (pages 4 and 5), a database (page 6), the consumer (page 7)

### The failure

- Four teams saying "exactly once" and meaning four things: the producer will not double-write (page 3); a Kafka Streams job will not double-count (page 5); a consumer stores its offset with its output (page 6); the handler is an upsert (page 7). Each is true of one boundary. None is true of the system until every boundary has one
