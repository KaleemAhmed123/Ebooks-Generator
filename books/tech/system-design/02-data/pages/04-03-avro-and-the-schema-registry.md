## Avro and the Schema Registry

- Apache Avro (heavily used in Kafka) takes binary encoding a step further: it does not even send field numbers on the wire. It just sends the raw values, back-to-back, in the exact order defined by the schema
- To read the bytes, the reader must have the exact schema the writer used. But how does the reader know which schema version to use when parsing a Kafka message? It uses a **Schema Registry**

<svg viewBox="0 0 460 140" role="img" aria-label="Avro Schema Registry architecture. The writer sends the schema to the registry, gets an ID, and prepends the ID to the Kafka message. The reader fetches the schema by ID to parse the bytes." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="60" height="24" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="50" y="66" text-anchor="middle">Writer</text>
  
  <rect x="180" y="10" width="100" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="230" y="27" text-anchor="middle">Schema Registry</text>
  <text x="230" y="42" text-anchor="middle" font-size="7">Returns ID 42</text>
  
  <rect x="180" y="90" width="100" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="230" y="107" text-anchor="middle">Kafka Topic</text>
  <text x="230" y="122" text-anchor="middle" font-size="7">[Magic Byte] [ID: 42] [Values]</text>
  
  <rect x="380" y="50" width="60" height="24" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="410" y="66" text-anchor="middle">Reader</text>
  
  <path d="M80 62 L180 30" stroke="#1a1a1a" fill="none"/><path d="M180 30 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(-20 180 30)"/>
  <path d="M80 62 L180 110" stroke="#1a1a1a" fill="none"/><path d="M180 110 l-6 -3 v6 z" fill="#1a1a1a" transform="rotate(20 180 110)"/>
  
  <path d="M380 62 L280 30" stroke="#1a1a1a" fill="none"/><path d="M280 30 l6 -1 v6 z" fill="#1a1a1a" transform="rotate(20 280 30)"/>
  <path d="M280 110 L380 62" stroke="#1a1a1a" fill="none"/><path d="M380 62 l-6 3 v-6 z" fill="#1a1a1a" transform="rotate(20 380 62)"/>
</svg>

- The writer registers its schema (or computes a 64-bit fingerprint of it) and prepends the ID to the message. The reader looks at the ID, fetches the schema from the registry, and resolves it against its own expected schema
- Avro schema resolution rules: If the writer sent a field the reader doesn't know, the reader ignores it. If the reader expects a field the writer didn't send, it uses the default value. If there is no default value, it signals an error

### The failure

- The Schema Registry becoming a single point of failure. If the registry goes down, writers cannot register new schemas, and readers cannot parse messages they haven't seen before. The entire event pipeline stalls
