## The ten things worth remembering

### 1. Status codes are the contract

- Never return `200` with an error inside. Every proxy, client and monitor reads the code first

### 2. Cursor pagination, not offset

- Offset makes the database count and discard, and rows shift while a client pages

### 3. Idempotency keys on anything that moves money

- Client generated, stored with the response, written in the same transaction as the work

### 4. Scope the query, do not compare after fetching

- Put the owner in the `where` clause. Broken object authorization is the most exploited API flaw there is

### 5. Never spread a request body into a write

- Parse it into a shape you defined. Otherwise the caller picks which columns to set

### 6. Verify webhooks over the raw body, with the timestamp inside the signature

- Re-serializing changes the bytes, and a signature without a timestamp replays forever

### 7. Every outbound call gets a timeout

- Based on the dependency's p99, not on your patience. Then retry with jitter, at one layer only

### 8. Split by domain, never by layer

- Services split by technical layer deploy together, which is a distributed monolith

### 9. A gateway holds cross-cutting concerns, never business logic
