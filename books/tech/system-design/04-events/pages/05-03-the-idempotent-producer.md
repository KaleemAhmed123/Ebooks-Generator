## The idempotent producer

- Crash point 1: the broker wrote the record, the ack was lost, the producer retried. The **idempotent producer** (`enable.idempotence=true`, the default) lets the broker recognise the retry. Kafka's design notes: the broker assigns each producer an id and deduplicates using a sequence number the producer sends with every message

<svg viewBox="0 0 460 140" role="img" aria-label="Idempotent producer sequence numbers. Producer with id 7 sends batches with sequence numbers 0, 1, 2 to one partition. The ack for sequence 1 is lost and the producer resends it. The broker's last sequence for producer 7 on this partition is already 2, so the resend is recognised as a duplicate and dropped." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="100" height="30" rx="3" fill="#fff" stroke="#333"/>
  <text x="70" y="39" text-anchor="middle">producer id 7</text>
  <text x="20" y="72">sends</text>
  <rect x="60" y="60" width="44" height="18" fill="#fff" stroke="#333"/><text x="82" y="72" text-anchor="middle">seq 0</text>
  <rect x="108" y="60" width="44" height="18" fill="#fff" stroke="#333"/><text x="130" y="72" text-anchor="middle">seq 1</text>
  <rect x="156" y="60" width="44" height="18" fill="#fff" stroke="#333"/><text x="178" y="72" text-anchor="middle">seq 2</text>
  <rect x="204" y="60" width="52" height="18" fill="#fbe9e2" stroke="#bf4c28"/><text x="230" y="72" text-anchor="middle">seq 1 again</text>
  <text x="130" y="94" text-anchor="middle" fill="#bf4c28" font-size="7.5">ack lost → retry</text>
  <rect x="290" y="20" width="150" height="100" rx="3" fill="#fff" stroke="#333"/>
  <text x="365" y="36" text-anchor="middle">partition leader</text>
  <text x="300" y="54" font-size="7.5">last seq for producer 7:</text>
  <text x="300" y="68">0 → 1 → 2</text>
  <text x="300" y="88" font-size="7.5">seq 1 again ≤ 2:</text>
  <text x="300" y="102" fill="#bf4c28">duplicate, dropped</text>
  <text x="300" y="114" font-size="7.5" fill="#555">seq 4 with 3 missing: rejected</text>
  <line x1="256" y1="69" x2="288" y2="69" stroke="#333" marker-end="url(#b)"/>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
  <text x="20" y="128" font-size="7.5" fill="#555">Scope: one producer session, one partition. A new producer instance gets a new id and a fresh count.</text>
</svg>

- The sequence is per producer id and per partition. The broker keeps the last sequence it wrote for each pair; a batch at or below it is a duplicate and is dropped; a batch beyond the next is a gap and is rejected. This is also what keeps order under retries with up to five requests in flight (Module 4, page 5)
- It costs almost nothing. Confluent's measurement of the mechanism put the throughput loss at about 3%, which is why it became the default
- The scope is the whole point. A producer id belongs to one producer session. Restart the process and it gets a new id and a sequence starting at zero. The broker cannot tell that the new process is resending what the old one already wrote

### The failure

- Trusting it against application retries. The service publishes `OrderPlaced`, crashes before recording that it did, restarts, and publishes `OrderPlaced` again from a new producer. Two records, both accepted, no deduplication anywhere. The idempotent producer covers the client library's retries, not yours. Module 8 (the outbox) is where application-level resends are made safe
