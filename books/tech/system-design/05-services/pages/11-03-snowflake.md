## Snowflake IDs

- Twitter's 2010 design fits a coordination-free, time-ordered id into 64 bits, so it still sits in a `BIGINT` and costs half of a UUID in every index and foreign key. The price is that the worker number has to come from somewhere

<svg viewBox="0 0 460 88" role="img" aria-label="The Snowflake bit layout across 64 bits: one unused sign bit kept at zero so the value stays positive, then a 41-bit millisecond timestamp counted from a custom epoch, which Twitter noted gives 69 years, then a 10-bit machine id allowing 1024 workers, then a 12-bit sequence allowing 4096 ids per worker per millisecond. An orange cross marks the clock stepping backwards: the same millisecond is reused and a worker can emit an id it has already emitted, which is why the original refuses to generate while the clock is behind." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="10" y="14" font-size="7.5">Snowflake, 64 bits — fits a BIGINT, sorts by time, needs no coordinator at write time</text>
  <rect x="10" y="26" width="7" height="20" fill="#f3f3f3" stroke="#666"/>
  <rect x="17" y="26" width="282" height="20" fill="#e6f2ff" stroke="#1d4e89"/><text x="158" y="40" text-anchor="middle" font-size="6.5">41 bits · ms since a custom epoch</text>
  <rect x="299" y="26" width="69" height="20" fill="#fff" stroke="#1d4e89"/><text x="333" y="40" text-anchor="middle" font-size="6">10 bits</text>
  <rect x="368" y="26" width="82" height="20" fill="#fff" stroke="#1d4e89"/><text x="409" y="40" text-anchor="middle" font-size="6">12 bits</text>
  <line x1="13" y1="46" x2="13" y2="53" stroke="#999"/><text x="20" y="60" text-anchor="middle" font-size="5.5">sign · 0</text>
  <text x="158" y="60" text-anchor="middle" font-size="6">"gives us 69 years"</text>
  <text x="333" y="60" text-anchor="middle" font-size="6">1 024 workers</text>
  <text x="409" y="60" text-anchor="middle" font-size="6">4 096 per ms</text>
  <text x="4" y="84" font-size="7.5" fill="#bf4c28">✕ the clock steps back: the same millisecond is reused, and a worker can re-emit an id it already issued</text>
</svg>

- "Time-ordered" is a weaker claim than it sounds. Twitter described the ids as **k-sorted** — roughly ordered rather than strictly — "promising 1s, but shooting for 10's of ms". Two ids a few milliseconds apart from different workers can come back in either order, so a Snowflake id is a good sort key and a bad basis for "happened before"
- The worker number is the operational cost that gets underestimated. Ten bits must be unique across every process that generates ids, forever, including during a deploy when old and new pods overlap — so it needs a real allocator, not an environment variable someone sets by hand

### The failure

- The clock moving backwards. Time is the high bits, so a correction that steps back a few milliseconds puts the generator in a range it has already used, and the sequence counter — which only guards against collisions *within* a millisecond — cannot see it
- The original refuses to generate at all while the clock is behind the last id it issued, which is the right behaviour and an uncomfortable one: the service stops issuing ids until time catches up. The alternative is duplicate primary keys, discovered later, in data
