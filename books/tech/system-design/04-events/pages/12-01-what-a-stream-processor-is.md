# Module 12 - Stream processing

## A stream processor

- A **stream processor** (Kafka Streams, Flink) reads a stream continuously, keeps state as it goes, and emits results as they become available — not once at the end, because there is no end. State is kept **locally** to the processing task and **checkpointed** so a restart resumes instead of recomputing from zero

<svg viewBox="0 0 460 90" role="img" aria-label="A stream processor. An input stream flows into a processor that keeps local state, and emits an output stream." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="15" y="30" width="90" height="30" fill="none" stroke="#333"/>
  <text x="60" y="49" text-anchor="middle" font-size="7">input stream</text>
  <path d="M105 45 L165 45" stroke="#333" marker-end="url(#sp12)"/>
  <rect x="165" y="20" width="110" height="50" fill="none" stroke="#bf4c28"/>
  <text x="220" y="42" text-anchor="middle" font-size="7" fill="#bf4c28">processor</text>
  <rect x="185" y="50" width="70" height="14" fill="none" stroke="#333"/>
  <text x="220" y="60" text-anchor="middle" font-size="6">state</text>
  <path d="M275 45 L340 45" stroke="#333" marker-end="url(#sp12)"/>
  <rect x="340" y="30" width="100" height="30" fill="none" stroke="#333"/>
  <text x="390" y="49" text-anchor="middle" font-size="7">output stream</text>
  <defs><marker id="sp12" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- A stateless worker can filter and transform a record on its own, but it cannot count, sum, or join, because those need to remember something about records already seen. The state is what turns "process one record" into "process a stream"
- Kafka Streams keeps that local state in embedded RocksDB, backed by a changelog topic so it can be rebuilt after a crash; Flink checkpoints state to durable storage on an interval. Both answer the same question — how does state survive a restart — with a different mechanism (page 7 covers the checkpoint side directly)

### The failure

- Trying to count "orders in the last hour" with a stateless function called once per record. Each call sees one record and nothing else; there is no running total to add to, because nothing kept one
