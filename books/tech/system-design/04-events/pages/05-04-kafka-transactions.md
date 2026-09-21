## Kafka transactions

- A **Kafka transaction** makes a set of writes to several partitions, plus the consumer's offset commit, one atomic unit: readers see all of them or none. The producer is the transactional party; Kafka's docs are explicit that the consumer is not

<svg viewBox="0 0 460 150" role="img" aria-label="A Kafka transaction. A consumer reads offset 41 from the input partition. Inside one transaction the producer writes to output partition A, writes to output partition B, and commits offset 42 for the input. A dashed box encloses all three writes; the transaction ends with commit or abort as one unit. A reader with isolation level read committed sees the outputs only after the commit." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="24" width="110" height="26" fill="#fff" stroke="#333"/>
  <text x="75" y="41" text-anchor="middle">input, offset 41</text>
  <line x1="130" y1="37" x2="170" y2="37" stroke="#333" marker-end="url(#c)"/>
  <rect x="170" y="14" width="150" height="122" rx="4" fill="none" stroke="#bf4c28" stroke-dasharray="5 3"/>
  <text x="245" y="28" text-anchor="middle" fill="#bf4c28">one transaction</text>
  <rect x="182" y="38" width="126" height="22" fill="#fff" stroke="#333"/>
  <text x="245" y="53" text-anchor="middle">process</text>
  <rect x="182" y="68" width="126" height="18" fill="#fff" stroke="#333"/>
  <text x="245" y="80" text-anchor="middle" font-size="7.5">write → output A</text>
  <rect x="182" y="90" width="126" height="18" fill="#fff" stroke="#333"/>
  <text x="245" y="102" text-anchor="middle" font-size="7.5">write → output B</text>
  <rect x="182" y="112" width="126" height="18" fill="#fff" stroke="#333"/>
  <text x="245" y="124" text-anchor="middle" font-size="7.5">commit input offset 42</text>
  <line x1="320" y1="77" x2="350" y2="77" stroke="#333" marker-end="url(#c)"/>
  <line x1="320" y1="99" x2="350" y2="99" stroke="#333" marker-end="url(#c)"/>
  <rect x="350" y="66" width="90" height="20" fill="#fff" stroke="#333"/><text x="395" y="79" text-anchor="middle" font-size="7.5">output A</text>
  <rect x="350" y="90" width="90" height="20" fill="#fff" stroke="#333"/><text x="395" y="103" text-anchor="middle" font-size="7.5">output B</text>
  <text x="395" y="126" text-anchor="middle" font-size="7.5" fill="#555">read_committed readers</text>
  <text x="395" y="136" text-anchor="middle" font-size="7.5" fill="#555">see both, or neither</text>
  <text x="20" y="80" font-size="7.5" fill="#555">commit or abort:</text>
  <text x="20" y="92" font-size="7.5" fill="#555">all three writes,</text>
  <text x="20" y="104" font-size="7.5" fill="#555">as one</text>
  <defs><marker id="c" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- The producer sets a `transactional.id` (default null: transactions off), and wraps each read-process-write in begin, the writes, `sendOffsetsToTransaction`, commit. The offset commit rides inside the transaction, which is what closes crash point 2 for Kafka-to-Kafka work
- **Zombie fencing**: each `transactional.id` carries an epoch. A restarted producer with the same id bumps the epoch, and the broker rejects writes from the old instance still running with the old one. The same id across restarts is what makes the fencing work
- Readers opt in. `isolation.level=read_committed` hides records of open and aborted transactions. The consumer default is `read_uncommitted`
- The price is latency: a commit per transaction, and a reader that waits for the commit marker. Confluent measured Kafka Streams at a 100 ms commit interval as 15 to 30% of throughput

### The failure

- Readers left at the default. The pipeline runs in transactions; a downstream team consumes with `read_uncommitted` and sees every aborted record, including the halves of transactions that were rolled back. Nothing errors. The transaction was atomic for everyone who asked
