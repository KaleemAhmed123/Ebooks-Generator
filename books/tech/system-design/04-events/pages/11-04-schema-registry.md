## The registry

- A **schema registry** sits between producers and consumers: a producer registers its schema and gets back a schema id, every message on the wire carries that id instead of the schema itself, and a consumer fetches the schema by id the first time it sees it. Confluent Schema Registry checks **compatibility** at register time, before a new schema is accepted at all

<svg viewBox="0 0 460 100" role="img" aria-label="The schema registry. A producer registers a schema and gets id 7, a message carries id 7 plus data, and a consumer fetches schema 7 to decode it." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="15" y="15" width="80" height="26" fill="none" stroke="#333"/>
  <text x="55" y="32" text-anchor="middle" font-size="7">producer</text>
  <path d="M95 28 L170 28" stroke="#333" marker-end="url(#rg11)"/>
  <text x="130" y="21" text-anchor="middle" font-size="6">register</text>
  <rect x="170" y="15" width="100" height="26" fill="none" stroke="#bf4c28"/>
  <text x="220" y="32" text-anchor="middle" font-size="7" fill="#bf4c28">registry: id 7</text>
  <path d="M55 41 L55 75" stroke="#333" marker-end="url(#rg11)"/>
  <text x="60" y="60" font-size="6">msg: id 7 + data</text>
  <rect x="15" y="75" width="80" height="20" fill="none" stroke="#333"/>
  <text x="55" y="89" text-anchor="middle" font-size="7">broker</text>
  <path d="M95 85 L360 85" stroke="#333" marker-end="url(#rg11)"/>
  <rect x="360" y="72" width="85" height="26" fill="none" stroke="#333"/>
  <text x="402" y="89" text-anchor="middle" font-size="7">consumer</text>
  <path d="M402 72 L280 41" stroke="#333" stroke-dasharray="3 2" marker-end="url(#rg11)"/>
  <text x="360" y="60" text-anchor="middle" font-size="6">fetch schema 7</text>
  <defs><marker id="rg11" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- The check-at-register-time property is what makes the registry more than a lookup table: a producer trying to register a breaking change under `BACKWARD` compatibility (the default) is rejected before a single bad message ships, not after consumers start failing
- The registry becomes a single point of failure for schema evolution specifically: existing producers with an already-registered schema keep working if it goes down, but nothing new can register, so a rollout that needs a new schema version stalls

### The failure

- No registry, and every consumer decoding raw JSON with its own hand-written parser. A producer renames a field, half the consumers silently read `undefined` where a value used to be, and nothing rejected the change before it shipped
