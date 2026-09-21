## API and data model

- Two endpoints, one per requirement. `POST /urls` takes the long URL and an optional expiry and returns the code. `GET /{code}` returns a redirect, not JSON: the browser follows the `Location` header and the service never sees a body
- The create call carries an `Idempotency-Key` (booklet 01), because a client that retries a timed-out `POST` must get the same code back, not a second row
- One table. The primary key is the code, because every read is a lookup by exact code and nothing else. The long URL is a plain column; the only other index is on the owner, for their list page

```ts
// POST /urls  { longUrl, expiresAt? }  →  201 { code, shortUrl }
// GET  /{code}  →  302 Location: longUrl   |  404  |  410 if expired

CREATE TABLE urls (
  code        VARCHAR(7)   PRIMARY KEY,   -- base-62, page 3
  long_url    VARCHAR(2048) NOT NULL,
  owner_id    BIGINT,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
  expires_at  TIMESTAMPTZ                 -- NULL = never
);
CREATE INDEX urls_owner ON urls (owner_id, created_at DESC);
```

- The row is small and the read touches one index probe plus one row fetch, so a B-tree on the code is a few disk pages at most (booklet 02). The store is not the bottleneck at 4 000 reads a second; the round trip to it is, and page 4 removes it from the hot path
- Expiry is a column, not a job. The read checks `expires_at` and returns 410 Gone; a nightly sweep removes rows that have been gone for a month (page 5)
- Same long URL twice gives two codes. Deduplicating by URL would need a second unique index on a 2 KB column and would break per-owner analytics; the requirement did not ask for it

### The failure

- The long URL as the primary key, to "enforce uniqueness". Now the read path, which is 99 % of traffic, is a secondary-index lookup on a column nobody queries by, and the primary key is a 2 KB string copied into every secondary index. The primary key serves the hot path; the hot path is the code
