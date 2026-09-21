## State, checkpoints, and exactly-once in a pipeline

- Local state must survive a crash, or a restart recomputes from the start of retention. Kafka Streams keeps state in embedded RocksDB backed by a changelog topic; Flink periodically checkpoints state to durable storage. Either way, restoring state after a restart is the outage — the time to restore is the time the job is down

<svg viewBox="0 0 460 80" role="img" aria-label="A crash restores from the changelog or checkpoint, then resumes. Restore time equals outage time." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M30 40 L150 40" stroke="#333"/>
  <text x="90" y="33" text-anchor="middle" font-size="7">running</text>
  <text x="160" y="43" font-size="10" fill="#bf4c28">✕ crash</text>
  <path d="M230 40 L320 40" stroke="#bf4c28" stroke-dasharray="3 2"/>
  <text x="275" y="33" text-anchor="middle" font-size="7" fill="#bf4c28">restore from changelog</text>
  <path d="M320 40 L430 40" stroke="#333"/>
  <text x="375" y="33" text-anchor="middle" font-size="7">resumed</text>
  <text x="275" y="60" text-anchor="middle" font-size="6.5" fill="#555">restore time = outage time</text>
</svg>

- **Exactly-once inside a pipeline** means checkpointing input position and output state together, atomically, so a restart lands both back at a consistent point — never input moved on with state not yet caught up, or the reverse. Kafka Streams' `exactly_once_v2` needs brokers at version 2.5 or newer; Flink pairs its checkpoint with a transactional sink
- The sink is still the boundary, exactly as it is anywhere else in this booklet (Module 5, page 5): exactly-once inside the pipeline says nothing about a call the pipeline makes to a system outside it. An HTTP call inside a stream-processing step is exactly as uncovered as an HTTP call inside a Kafka transaction

### The failure

- Treating `exactly_once_v2` as covering a REST call made from inside a stream processor. The Kafka side is transactional; the REST call is not, and a restart after a partial failure can replay the same input and make the same call twice, unnoticed, because nothing about EOS extends past the broker boundary
