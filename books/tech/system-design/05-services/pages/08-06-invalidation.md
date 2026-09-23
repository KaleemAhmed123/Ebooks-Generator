## Invalidation

- Two rules carry most of it. **Delete, do not update** — a delete is idempotent and order-independent, so two racing deletes cannot corrupt anything, while two racing updates can leave the older value on top. And **invalidate from the commit log**, not from the request handler, when the delete must not be lost

<svg viewBox="0 0 460 126" role="img" aria-label="Two invalidation paths. From the application: the app commits to the database and then deletes the key from the cache, and a crash between those two steps leaves the key stale until its TTL expires. From the commit log: a tailing daemon reads the database commit log and issues the deletes, so the write is already durable and the delete cannot be lost. At Facebook only four per cent of the deletes this daemon issues invalidate anything; the rest name keys nothing had cached. An orange cross marks update-on-write: two writers race, the older value lands last, and the key is poisoned until it expires." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="4" y="18" font-size="6.5" fill="#1d4e89">from the app — simple, and not durable</text>
  <rect x="4" y="24" width="56" height="24" rx="3" fill="#fff" stroke="#1d4e89"/><text x="32" y="39" text-anchor="middle" font-size="7">app</text>
  <rect x="100" y="24" width="70" height="24" rx="3" fill="#fff" stroke="#1d4e89"/><text x="135" y="39" text-anchor="middle" font-size="7">database</text>
  <rect x="210" y="24" width="70" height="24" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="245" y="39" text-anchor="middle" font-size="7">cache</text>
  <line x1="60" y1="36" x2="98" y2="36" stroke="#1d4e89" marker-end="url(#b)"/><text x="79" y="32" text-anchor="middle" font-size="6">1 commit</text>
  <line x1="170" y1="36" x2="208" y2="36" stroke="#1d4e89" marker-end="url(#b)"/><text x="189" y="32" text-anchor="middle" font-size="6">2 delete</text>
  <text x="290" y="34" font-size="6.5" fill="#bf4c28">✕ a crash between 1 and 2:</text>
  <text x="290" y="44" font-size="6.5" fill="#bf4c28">stale until the TTL expires</text>
  <text x="4" y="62" font-size="6.5" fill="#1d4e89">from the commit log — the durable path</text>
  <rect x="4" y="68" width="56" height="24" rx="3" fill="#f3f3f3" stroke="#666"/><text x="32" y="83" text-anchor="middle" font-size="7">commit log</text>
  <rect x="100" y="68" width="70" height="24" rx="3" fill="#fff" stroke="#1d4e89"/><text x="135" y="79" text-anchor="middle" font-size="7">tailer</text><text x="135" y="89" text-anchor="middle" font-size="6">mcsqueal</text>
  <rect x="210" y="68" width="70" height="24" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="245" y="83" text-anchor="middle" font-size="7">cache</text>
  <line x1="60" y1="80" x2="98" y2="80" stroke="#1d4e89" marker-end="url(#b)"/><text x="79" y="76" text-anchor="middle" font-size="6">tails</text>
  <line x1="170" y1="80" x2="208" y2="80" stroke="#1d4e89" marker-end="url(#b)"/><text x="189" y="76" text-anchor="middle" font-size="6">delete</text>
  <text x="290" y="78" font-size="6.5">the write is already durable,</text>
  <text x="290" y="88" font-size="6.5">so the delete cannot be lost</text>
  <text x="4" y="108" font-size="7">at Facebook only 4 % of the deletes this daemon issues invalidate anything; the rest name keys nothing had cached</text>
  <text x="4" y="121" font-size="7.5" fill="#bf4c28">✕ update-on-write: two writers race, the older value lands last, and the key is poisoned until it expires</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

- The 4 % is the honest cost of the durable path: nearly all its work is wasted, and it is still right, because the alternative depends on a process surviving between two network calls. Facebook's own reason: "We choose to delete cached data instead of updating it because deletes are idempotent"

:::interview
"How do you invalidate a cache?" — Delete the key rather than writing the new value into it: deletes commute and updates do not, so two racing updates can leave the older value last, while a deleted key just refills. Where the delete must not be lost, issue it from the database's commit log rather than the request handler, so it survives a crash after the commit. Keep a TTL underneath as a floor, so a lost delete costs bounded staleness rather than permanent staleness. And for read-your-writes, invalidate before responding rather than relying on the asynchronous path.
:::

### The failure

- Computing the new value and writing it into the cache. Two writers interleave, the one that read first writes last, and the cache now holds a value the database never ended on. No later write repairs it — the key is simply wrong until it expires, which is the one outcome a TTL cannot bound in a useful way
