## Keeping cache and database in step

- The cache holds copies; the database holds the truth. On a write, the copy is wrong from the moment the row commits until something removes it. The **look-aside** pattern of the memcache paper: on a read miss, fetch from the database and set the cache; on a write, update the database and then delete the key. The next reader misses and refills from the truth

<svg viewBox="0 0 460 150" role="img" aria-label="Two timelines. Top, write then delete: a writer commits v2 to the database then deletes the key; a reader who misses afterwards refills v2. Bottom, the stale-set race: reader A misses and reads v1 from the database; writer B commits v2 and deletes the key; reader A then sets v1 into the cache, marked with an orange cross, stale until the TTL. A lease token fixes it: the delete invalidates A's token and its set is refused." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="8" y="14" font-weight="bold">write path: database first, then delete the key</text>
  <line x1="8" y1="40" x2="452" y2="40" stroke="#333"/>
  <rect x="30" y="24" width="86" height="16" fill="#fff" stroke="#333"/><text x="73" y="35" text-anchor="middle" font-size="7.5">writer: UPDATE → v2</text>
  <rect x="140" y="24" width="70" height="16" fill="#fff" stroke="#333"/><text x="175" y="35" text-anchor="middle" font-size="7.5">writer: DEL key</text>
  <rect x="234" y="24" width="96" height="16" fill="#e6f2ff" stroke="#1d4e89"/><text x="282" y="35" text-anchor="middle" font-size="7.5" fill="#1d4e89">reader: miss → v2 → set</text>
  <text x="340" y="35" font-size="7.5">stale window ≈ 1 delete</text>
  <text x="8" y="66" font-weight="bold">the stale-set race, and why the delete is not enough</text>
  <line x1="8" y1="94" x2="452" y2="94" stroke="#333"/>
  <rect x="30" y="78" width="96" height="16" fill="#fff" stroke="#333"/><text x="78" y="89" text-anchor="middle" font-size="7.5">A: miss, reads v1 from DB</text>
  <rect x="150" y="78" width="80" height="16" fill="#fff" stroke="#333"/><text x="190" y="89" text-anchor="middle" font-size="7.5">B: UPDATE → v2</text>
  <rect x="250" y="78" width="60" height="16" fill="#fff" stroke="#333"/><text x="280" y="89" text-anchor="middle" font-size="7.5">B: DEL key</text>
  <rect x="330" y="78" width="80" height="16" fill="#fbe9e2" stroke="#bf4c28"/><text x="370" y="89" text-anchor="middle" font-size="7.5" fill="#bf4c28">✕ A: set(v1)</text>
  <text x="200" y="110" font-size="7.5" fill="#bf4c28">v1 is served until the TTL expires; A was slow, not wrong</text>
  <text x="8" y="130" font-size="7.5" fill="#1d4e89">with leases (page 4): A's miss carried a token; B's DEL invalidated every token for the key;</text>
  <text x="8" y="141" font-size="7.5" fill="#1d4e89">A's set(v1, token) is refused. The same mechanism that stops the herd stops the stale set</text>
</svg>

- Why delete and not set the new value: two writers' sets can land in the cache in the opposite order to their commits, and the cache then holds the older value with no TTL-independent way to notice. A delete cannot arrive in the wrong order with another delete
- Why the database goes first: a cache set before a failed commit leaves a value that never existed. The order write-then-delete leaves at worst a short stale window; the reverse order leaves a lie
- The TTL is the backstop for every lost delete: a network blip between the commit and the `DEL` leaves the stale copy for one TTL and no longer. Booklet 05 owns invalidation patterns beyond this; the interview wants this order, the race above, and the TTL named as the bound on how long the race can hurt

### The failure

- Delete first, then write. A reader between the two steps misses, refills the old value, and the write that follows commits under a cache that already holds the past. Write-then-delete has a stale window of one delete; delete-then-write has one of a full TTL, and the difference is the order of two lines
