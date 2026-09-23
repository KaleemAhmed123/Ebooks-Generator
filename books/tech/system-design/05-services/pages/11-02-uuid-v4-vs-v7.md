## UUIDv4 and UUIDv7

- Both are 128 bits and need no coordination. One property decides write throughput: **v7 puts a millisecond timestamp in the high bits**. RFC 9562 (May 2024) names what it fixes — non-time-ordered UUIDs "have poor database-index locality"

<svg viewBox="0 0 460 88" role="img" aria-label="The UUIDv7 bit layout across 128 bits: a 48-bit Unix millisecond timestamp first, then a 4-bit version field, then 12 bits of rand_a, then a 2-bit variant field, then 62 bits of rand_b. Because the timestamp comes first, ids sort by creation time and inserts land at the end of the index. An orange cross marks UUIDv4, whose 122 random bits scatter consecutive inserts across random index pages." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="10" y="14" font-size="7.5">UUIDv7, 128 bits — the timestamp leads, so new ids sort to the end</text>
  <rect x="10" y="26" width="165" height="20" fill="#e6f2ff" stroke="#1d4e89"/><text x="92" y="40" text-anchor="middle" font-size="6.5">unix_ts_ms · 48 bits</text>
  <rect x="175" y="26" width="14" height="20" fill="#f3f3f3" stroke="#666"/>
  <rect x="189" y="26" width="41" height="20" fill="#fff" stroke="#1d4e89"/><text x="209" y="40" text-anchor="middle" font-size="5.5">rand_a</text>
  <rect x="230" y="26" width="7" height="20" fill="#f3f3f3" stroke="#666"/>
  <rect x="237" y="26" width="213" height="20" fill="#fff" stroke="#1d4e89"/><text x="343" y="40" text-anchor="middle" font-size="6.5">rand_b · 62 bits</text>
  <line x1="182" y1="46" x2="182" y2="53" stroke="#999"/><text x="182" y="60" text-anchor="middle" font-size="5.5">ver · 4</text>
  <line x1="233" y1="46" x2="233" y2="63" stroke="#999"/><text x="238" y="70" text-anchor="middle" font-size="5.5">var · 2</text>
  <text x="4" y="84" font-size="7.5" fill="#bf4c28">✕ v4 instead: 122 random bits, so consecutive inserts land on unrelated index pages</text>
</svg>

```typescript
import { randomUUID, randomUUIDv7 } from "node:crypto"; // v7: Node 24.16 LTS / 26.1
const id = randomUUIDv7();      // ms prefix → inserts arrive at the end of the index
const legacy = randomUUID();    // v4: 122 random bits, scattered inserts (Postgres 18: uuidv7())
```

- Node's `randomUUIDv7` "uses a non-monotonic clock": two ids from the same millisecond have no guaranteed order. RFC 9562 describes optional counter methods if that matters

:::interview
"Would you use a UUID or an auto-increment id?" — A UUID, and specifically v7. The deciding factor is not uniqueness but who assigns the id and when. A sequence makes one database the authority: it cannot be sharded, cannot be generated before the insert, and publishes the row count. A caller-generated id exists before the write, making retries idempotent. v4 scatters inserts across the index; v7 keeps the timestamp high, giving a sequence's locality with no central authority, for 16 bytes rather than 8.
:::

### The failure

- v4 as a clustered primary key on a write-heavy table: every insert targets a random point, so the working set is the whole index rather than its tail
