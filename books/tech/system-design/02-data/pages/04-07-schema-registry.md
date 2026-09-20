## The schema registry pattern

- A message cannot carry its whole schema; that would cost more than the JSON it replaced. It carries an ID instead
- A **schema registry** is a service that stores every schema version and hands out IDs. The producer registers its schema once, writes the ID into the first bytes of each message, and the consumer fetches the schema by ID (and caches it) before decoding

<svg viewBox="0 0 460 140" role="img" aria-label="Schema registry. The writer registers its schema and gets ID 42, prefixes each Kafka message with the ID, and the reader fetches schema 42 from the registry to decode the bytes." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="60" height="24" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="50" y="66" text-anchor="middle">Writer</text>
  
  <rect x="180" y="10" width="100" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="230" y="27" text-anchor="middle">Schema Registry</text>
  <text x="230" y="42" text-anchor="middle" font-size="7">Returns ID 42</text>
  
  <rect x="180" y="90" width="100" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="230" y="107" text-anchor="middle">Kafka Topic</text>
  <text x="230" y="122" text-anchor="middle" font-size="7">[ID 42] [values]</text>
  
  <rect x="380" y="50" width="60" height="24" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="410" y="66" text-anchor="middle">Reader</text>
  
  <path d="M80 62 L180 30" stroke="#1a1a1a" fill="none"/><path d="M180 30 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(-20 180 30)"/>
  <path d="M80 62 L180 110" stroke="#1a1a1a" fill="none"/><path d="M180 110 l-6 -3 v6 z" fill="#1a1a1a" transform="rotate(20 180 110)"/>
  
  <path d="M380 62 L280 30" stroke="#1a1a1a" fill="none"/><path d="M280 30 l6 -1 v6 z" fill="#1a1a1a" transform="rotate(20 280 30)"/>
  <path d="M280 110 L380 62" stroke="#1a1a1a" fill="none"/><path d="M380 62 l-6 3 v-6 z" fill="#1a1a1a" transform="rotate(20 380 62)"/>
</svg>

- The registry is also the gate. Registration is refused when the new version breaks the subject's compatibility mode (page 6), so an incompatible schema is rejected at publish time, before a single message is written with it
- Avro without a registry still works for files: the container file's header holds the writer's schema. The registry is for the case where there is no header: one message at a time

### The failure

- Compatibility set to `NONE` to make a stuck registration go through. Confluent's docs say what that costs: it "requires simultaneous producer/consumer upgrades or topic migration". The registry is now a lookup table; nothing is checked
- Checking only against the latest version. A field deleted in v2 and re-added in v3 with a different type passes a non-transitive check and breaks every consumer still reading v1 data
