## Last-write-wins loses writes

- **Last-write-wins (LWW)** resolves two versions of a value by keeping the one with the later timestamp. It is simple, it converges, and it decides "later" with clocks that page 2 showed cannot agree. Booklet 02 covered its use in Cassandra-style stores; this page is the clock's contribution

<svg viewBox="0 0 460 110" role="img" aria-label="Node A's clock is 40 ms fast. A client writes x=1 to node A at true time 100 ms, stamped 140. The same client then writes x=2 to node B at true time 110 ms, stamped 110. Last-write-wins keeps the version stamped 140, x=1, and the later write, x=2, is silently lost." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <line x1="120" y1="20" x2="440" y2="20" stroke="#1a1a1a"/>
  <text x="440" y="14" text-anchor="end" font-size="7">true time (ms) →</text>
  <text x="10" y="50">node A, clock +40</text>
  <text x="10" y="86">node B, clock exact</text>
  <line x1="120" y1="46" x2="440" y2="46" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <line x1="120" y1="82" x2="440" y2="82" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <circle cx="200" cy="46" r="5" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="200" y="32" text-anchor="middle" font-size="7">true 100: write x=1</text>
  <text x="200" y="62" text-anchor="middle" font-size="7" fill="#1d4e89">stamped 140</text>
  <circle cx="240" cy="82" r="5" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="240" y="98" text-anchor="middle" font-size="7">true 110: write x=2</text>
  <text x="300" y="86" font-size="7" fill="#1d4e89">stamped 110</text>
  <path d="M206 50 L234 78" stroke="#1a1a1a" fill="none"/><path d="M234 78 l-1.5 -5 l-3.5 3.5 z" fill="#1a1a1a"/>
  <text x="330" y="50" font-size="7" fill="#b8541a">merge: 140 &gt; 110, keep x=1</text>
  <text x="330" y="59" font-size="7" fill="#b8541a">the newer write is gone</text>
</svg>

- The client did the writes in order, 10 ms apart, and the store kept the older one. Nothing failed; no error was logged; the value is simply wrong, and stays wrong, because the merge is deterministic. A write acknowledged as durable was discarded by a later merge
- The skew needed is only as large as the gap between the writes. With typical NTP error and writes tens of milliseconds apart, it is a normal day, not a fault

### The failure

- Trusting node timestamps to resolve conflicts on data that must not lose writes. LWW is a merge policy for data where the loss is acceptable: a "last seen" field, a cache. For anything else, order comes from a counter that does not need a clock (page 4), or the conflict is kept and resolved by the application (booklet 02)
