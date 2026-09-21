## Thundering herd and leases

- A hot key is read thousands of times a second. Its TTL expires at one instant, and in the next few milliseconds every reader misses and asks the database for the same row. The database was sized for the 1 % of misses on page 1, not for one row's whole read rate at once

<svg viewBox="0 0 460 146" role="img" aria-label="Left panel, no lease: a hot key expires, 1 000 readers per second all miss, all query the database for the same row, marked with an orange cross on the database. Right panel, with lease: the first miss receives a lease token from the cache and reads the database; the other readers are told to wait a few milliseconds and retry; the leader sets the value with its token; the others then hit. One database read instead of a thousand." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="110" y="14" text-anchor="middle" font-weight="bold">TTL expires, no lease</text>
  <rect x="14" y="26" width="64" height="24" rx="3" fill="#fff" stroke="#333"/><text x="46" y="41" text-anchor="middle">1 000 readers/s</text>
  <rect x="14" y="66" width="64" height="24" rx="3" fill="#fff" stroke="#333"/><text x="46" y="81" text-anchor="middle">cache: miss</text>
  <rect x="14" y="110" width="64" height="24" rx="3" fill="#fbe9e2" stroke="#bf4c28"/><text x="46" y="125" text-anchor="middle" fill="#bf4c28">✕ database</text>
  <line x1="46" y1="50" x2="46" y2="66" stroke="#333" marker-end="url(#d)"/>
  <line x1="40" y1="90" x2="40" y2="110" stroke="#bf4c28" marker-end="url(#e)"/><line x1="46" y1="90" x2="46" y2="110" stroke="#bf4c28" marker-end="url(#e)"/><line x1="52" y1="90" x2="52" y2="110" stroke="#bf4c28" marker-end="url(#e)"/>
  <text x="90" y="80" font-size="7.5">every miss → one</text><text x="90" y="91" font-size="7.5">SELECT of the same row</text>
  <text x="90" y="118" font-size="7.5" fill="#bf4c28">1 000 identical reads/s</text>
  <text x="90" y="129" font-size="7.5" fill="#bf4c28">until the first set lands</text>
  <line x1="228" y1="8" x2="228" y2="142" stroke="#999" stroke-dasharray="3 3"/>
  <text x="344" y="14" text-anchor="middle" font-weight="bold">with a lease (Facebook memcache)</text>
  <rect x="244" y="26" width="64" height="24" rx="3" fill="#fff" stroke="#333"/><text x="276" y="41" text-anchor="middle">first reader</text>
  <rect x="380" y="26" width="64" height="24" rx="3" fill="#fff" stroke="#333"/><text x="412" y="41" text-anchor="middle">the other 999</text>
  <rect x="244" y="66" width="200" height="24" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="344" y="81" text-anchor="middle">cache: miss → lease token to one reader</text>
  <rect x="244" y="110" width="64" height="24" rx="3" fill="#fff" stroke="#333"/><text x="276" y="125" text-anchor="middle">database</text>
  <line x1="276" y1="50" x2="276" y2="66" stroke="#333" marker-end="url(#d)"/>
  <line x1="412" y1="50" x2="412" y2="66" stroke="#333" marker-end="url(#d)"/>
  <line x1="266" y1="90" x2="266" y2="110" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="286" y1="110" x2="286" y2="90" stroke="#1d4e89" marker-end="url(#b)"/>
  <text x="318" y="102" font-size="7.5" fill="#1d4e89">1 read, then set(value, token)</text>
  <text x="318" y="124" font-size="7.5">others: "wait", retry in ms, then hit</text>
  <text x="318" y="135" font-size="7.5">one token per key at a time</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker>
    <marker id="e" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#bf4c28"/></marker>
  </defs>
</svg>

- A **lease** is a token the cache hands to the first client that misses a key; only a set carrying it is accepted, and later missers are told to wait briefly and read again. Facebook's memcache paper introduced it for this: one database read per expiry, and, as page 5 shows, a fix for stale sets in the same mechanism
- **Request coalescing** is the same idea one hop later: a service in front of the store collapses identical in-flight requests into one, as Discord's data services do per channel. Cheaper partial fixes: jitter the TTL; refresh hot keys before they expire

:::interview
"A viral post's cache entry expires. What happens?" — Without protection, every concurrent reader misses and queries the database for the same row until the first re-cache lands: one row, thousands of reads. With a lease, the cache gives one reader a token and tells the rest to wait milliseconds; one read reaches the database. Then the cost: a wait path in every client, and a few milliseconds of stale reads while the leader refills.
:::

### The failure

- TTL only. The design is stable at every second except the one when the hot key expires, so it passes every load test that stops too soon. The herd is the same traffic with the cache removed for one key
