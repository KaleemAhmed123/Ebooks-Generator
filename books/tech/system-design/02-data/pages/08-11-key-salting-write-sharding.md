## Key salting and write sharding

- A hot write key is split into many keys by appending a suffix: `2026-09-20.1` … `2026-09-20.200`. Each hashes somewhere else, so one key's writes spread over up to 200 partitions. DynamoDB documents this as **write sharding**; elsewhere it is **key salting**

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

- The reads pay for it. "Everything for 2026-09-20" is now 200 queries, one per suffix, run in parallel and merged in the application. The suffix count is the read fan-out; pick the smallest number that gets the writes under the per-partition cap

### The failure

- A random suffix. Nobody knows which suffix a given item got, so even a point read for one known item has to try all 200. Use a **calculated suffix**, DynamoDB's example is a hash of the order ID mod 200 plus 1: the writes still spread, and a read for one item computes its suffix and reads one key. Only the whole-day scan fans out
