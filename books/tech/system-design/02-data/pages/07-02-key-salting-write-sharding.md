## Key salting and write sharding

- If a single key is too hot (like a `Date` key for logging events), you must force the database to treat it as multiple distinct keys. You do this by appending a suffix to the key, a technique known as **key salting** or **write sharding**
- If you append a random number between 1 and 200 to the end of the date (`2026-09-20.1` through `2026-09-20.200`), the hash function will evaluate each suffix as a completely different key, spreading the writes evenly across the cluster

<svg viewBox="0 0 460 140" role="img" aria-label="Key salting. A hot date key is salted with random numbers 1, 2, 3. The writes are sharded to Nodes 1, 2, and 3 instead of hitting a single hot partition." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="100" height="24" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="70" y="66" text-anchor="middle">Write to "2026-09-20"</text>
  
  <text x="140" y="24" text-anchor="middle" font-size="7">Suffix .1</text>
  <text x="140" y="66" text-anchor="middle" font-size="7">Suffix .2</text>
  <text x="140" y="104" text-anchor="middle" font-size="7">Suffix .3</text>
  
  <rect x="180" y="10" width="90" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="225" y="29" text-anchor="middle">Node 1</text>
  
  <rect x="180" y="55" width="90" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="225" y="74" text-anchor="middle">Node 2</text>
  
  <rect x="180" y="100" width="90" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="225" y="119" text-anchor="middle">Node 3</text>
  
  <path d="M120 55 L180 25" stroke="#1a1a1a" fill="none"/><path d="M180 25 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(-30 180 25)"/>
  <path d="M120 62 L180 70" stroke="#1a1a1a" fill="none"/><path d="M180 70 l-6 -3 v6 z" fill="#1a1a1a" transform="rotate(10 180 70)"/>
  <path d="M120 70 L180 115" stroke="#1a1a1a" fill="none"/><path d="M180 115 l-6 -3 v6 z" fill="#1a1a1a" transform="rotate(20 180 115)"/>
  
  <text x="290" y="65" font-weight="bold">The read tax:</text>
  <text x="290" y="77" font-size="7">To read "2026-09-20", you must</text>
  <text x="290" y="87" font-size="7">query all 200 keys and merge.</text>
</svg>

- **The trade-off**: Write sharding solves the write bottleneck, but it heavily penalizes reads. To read the events for that date, you can no longer do a single lookup. You must issue 200 concurrent read requests (`.1` to `.200`) and manually merge the results in your application code

### The failure

- Using a truly random number for the salt. If the salt is random, you can never do a point-read for a specific record, because you don't know which random number it was assigned. You are forced to do the 200-key scatter-gather for *every* read
- To fix this, use a calculated suffix instead. If you append `hash(eventId) % 200`, the writes are still distributed evenly, but a point-read for that specific event only needs to check one specific suffix
