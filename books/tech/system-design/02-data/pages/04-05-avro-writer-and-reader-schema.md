## Avro: writer's schema meets reader's schema

- Avro sends values only: no names, no field numbers, just the bytes in schema order. So a reader can do nothing without the exact schema the writer used
- The writer's schema travels with the data: in the header of a container file, or as a fingerprint or registry ID on each message (page 7). The reader has its own schema, the one its code was compiled against. Decoding is **schema resolution**: match the two by field name

<svg viewBox="0 0 460 126" role="img" aria-label="Writer's schema with fields name, age, email is resolved against a reader's schema with fields name, email, phone. Matching names are copied, the writer-only field age is ignored, the reader-only field phone takes its default." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="90" y="16" text-anchor="middle" font-weight="bold">writer's schema</text>
  <text x="370" y="16" text-anchor="middle" font-weight="bold">reader's schema</text>
  <g fill="#fcfcfc" stroke="#1a1a1a"><rect x="30" y="26" width="120" height="22" rx="3"/><rect x="30" y="56" width="120" height="22" rx="3"/><rect x="30" y="86" width="120" height="22" rx="3"/></g>
  <text x="90" y="41" text-anchor="middle">name: string</text><text x="90" y="71" text-anchor="middle">age: int</text><text x="90" y="101" text-anchor="middle">email: string</text>
  <g fill="#e2fcf3" stroke="#1d4e89"><rect x="310" y="26" width="120" height="22" rx="3"/><rect x="310" y="56" width="120" height="22" rx="3"/><rect x="310" y="86" width="120" height="22" rx="3"/></g>
  <text x="370" y="41" text-anchor="middle">name: string</text><text x="370" y="71" text-anchor="middle">email: string</text><text x="370" y="101" text-anchor="middle">phone: string = ""</text>
  <path d="M150 37 L310 37" stroke="#1d4e89" fill="none"/><path d="M310 37 l-5 -3 v6 z" fill="#1d4e89"/>
  <path d="M150 97 L310 67" stroke="#1d4e89" fill="none"/><path d="M310 67 l-6 -1 v6 z" fill="#1d4e89" transform="rotate(-11 310 67)"/>
  <text x="230" y="48" text-anchor="middle" font-size="7.5">matched by name</text>
  <text x="230" y="63" text-anchor="middle" font-size="7.5" fill="#b8541a">age: writer only → ignored</text>
  <text x="230" y="118" text-anchor="middle" font-size="7.5" fill="#b8541a">phone: reader only → default, "or an error is signalled"</text>
</svg>

- The three rules, from the specification: a field in both schemas is read; a writer-only field is skipped; a reader-only field takes the reader's default, and if it has none, "an error is signalled"
- That last clause is the whole compatibility story. A default is what lets new code read old bytes

### The failure

- Adding a field with no default. Every reader compiled with the new schema now fails on every message and every row written before the change, and the failure shows up in the consumer, not in the producer that made it
