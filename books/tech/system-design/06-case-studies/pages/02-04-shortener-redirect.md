## The redirect and the cache

- The whole system on one board. Reads outnumber writes 100 to 1 and the working set is the few million codes clicked this week, so the read path touches a cache and returns; the store sees misses and writes only

<svg viewBox="0 0 460 150" role="img" aria-label="Browser to load balancer to API service, N stateless copies. The read path goes to a Redis cache, hit about 99 percent, and on a miss to the Postgres primary, then sets the cache and returns 302. The write path, 40 per second, goes to the primary and its replicas. Numbers on the arrows: 4 000 reads per second, 40 writes per second, 40 misses per second. An orange cross marks the 301 choice: browser caches the redirect and the next click never reaches the service." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="8" y="40" width="54" height="28" rx="3" fill="#fff" stroke="#333"/><text x="35" y="58" text-anchor="middle">browser</text>
  <rect x="98" y="40" width="54" height="28" rx="3" fill="#fff" stroke="#333"/><text x="125" y="54" text-anchor="middle">load</text><text x="125" y="64" text-anchor="middle">balancer</text>
  <rect x="188" y="40" width="70" height="28" rx="3" fill="#fff" stroke="#333"/><text x="223" y="54" text-anchor="middle">API × N</text><text x="223" y="64" text-anchor="middle" font-size="7.5">stateless</text>
  <rect x="318" y="14" width="80" height="28" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="358" y="28" text-anchor="middle">Redis</text><text x="358" y="38" text-anchor="middle" font-size="7.5">code → URL, TTL 1 d</text>
  <rect x="318" y="74" width="80" height="28" rx="3" fill="#e6f2ff" stroke="#333"/><text x="358" y="88" text-anchor="middle">Postgres primary</text><text x="358" y="98" text-anchor="middle" font-size="7.5">urls, 12 TB / 10 y</text>
  <rect x="318" y="108" width="80" height="16" rx="3" fill="#fff" stroke="#333" stroke-dasharray="3 3"/><text x="358" y="119" text-anchor="middle" font-size="7.5">read replicas</text>
  <line x1="62" y1="54" x2="98" y2="54" stroke="#333" marker-end="url(#d)"/>
  <line x1="152" y1="54" x2="188" y2="54" stroke="#333" marker-end="url(#d)"/>
  <line x1="258" y1="48" x2="318" y2="30" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="258" y1="60" x2="318" y2="84" stroke="#333" marker-end="url(#d)"/>
  <line x1="398" y1="88" x2="420" y2="88" stroke="#333"/><line x1="420" y1="88" x2="420" y2="28" stroke="#333"/><line x1="420" y1="28" x2="398" y2="28" stroke="#333" marker-end="url(#d)"/>
  <text x="80" y="36" text-anchor="middle" font-size="7.5">GET /{code}</text>
  <text x="80" y="76" text-anchor="middle" font-size="7.5">4 000 reads/s</text>
  <text x="80" y="86" text-anchor="middle" font-size="7.5">40 writes/s</text>
  <text x="286" y="30" text-anchor="middle" font-size="7.5" fill="#1d4e89">hit ≈ 99 %</text>
  <text x="272" y="82" text-anchor="middle" font-size="7.5">miss ≈ 40/s</text>
  <text x="272" y="92" text-anchor="middle" font-size="7.5">+ writes 40/s</text>
  <text x="440" y="60" text-anchor="middle" font-size="7.5">set on</text><text x="440" y="70" text-anchor="middle" font-size="7.5">miss</text>
  <text x="8" y="140" font-size="7.5">reply: 302 Found, Location: long URL. p99 = LB + one Redis round trip, well under 50 ms</text>
  <text x="8" y="118" font-size="7.5" fill="#bf4c28">✕ 301 instead: browser caches it, the next click never arrives</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker>
  </defs>
</svg>

- **Cache-aside**: read the cache; on a miss read the store, write the value into the cache with a TTL, reply. Booklet 05 owns the pattern and its invalidation. Here a code's URL never changes, so the TTL only bounds memory; the only reads that must skip the cache are for a code that expired or was disabled (page 5), which the service checks on the miss path and returns as 410

:::interview
"301 or 302?" — RFC 9110: 301 and 308 are permanent, and a cache may treat them as fresh by heuristic, so the browser stops asking. 302 and 307 are temporary and not cached by default, so every click reaches the service. Choose 302 when clicks must be counted or the target may change; 301 only when the requirement is the lowest possible load and the analytics were cut. 307/308 additionally keep the method and body, which a shortener never needs.
:::

### The failure

- 301 and a promise of click analytics in the same design. The two cannot both hold: a permanently cached redirect is served by the browser, and the service never sees the second click from that user
