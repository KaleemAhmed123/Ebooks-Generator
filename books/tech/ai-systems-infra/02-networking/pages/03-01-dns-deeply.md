# Names and Trust

## DNS, deeply

- DNS turns a name into an address by walking a **hierarchy of caches**. Your host asks a **recursive resolver**; if it hasn't cached the answer it asks a **root** server (who runs `.com`?), then the **TLD** server (who's authoritative for `example.com`?), then the **authoritative** server (what's the A record for `api.example.com`?). Each answer is cached along the way for its **TTL**.

<svg viewBox="0 0 360 96" role="img" aria-label="DNS resolution: stub resolver to recursive resolver to root to TLD to authoritative server, with caching by TTL at each step" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="6" y="38" width="58" height="22" rx="3" fill="#e4f1f1" stroke="#0f6e6e"/><text x="35" y="52" text-anchor="middle" font-size="6">host</text>
  <rect x="78" y="38" width="66" height="22" rx="3" fill="#dfeeee" stroke="#0f6e6e"/><text x="111" y="49" text-anchor="middle" font-size="5.8">recursive</text><text x="111" y="57" text-anchor="middle" font-size="5" fill="#777">caches</text>
  <rect x="160" y="14" width="56" height="18" rx="3" fill="#eef6f6" stroke="#0f6e6e"/><text x="188" y="26" text-anchor="middle" font-size="5.8">root</text>
  <rect x="160" y="40" width="56" height="18" rx="3" fill="#eef6f6" stroke="#0f6e6e"/><text x="188" y="52" text-anchor="middle" font-size="5.8">TLD .com</text>
  <rect x="160" y="66" width="56" height="18" rx="3" fill="#eef6f6" stroke="#0f6e6e"/><text x="188" y="78" text-anchor="middle" font-size="5.8">authoritative</text>
  <path d="M64 49 L78 49" stroke="#1a1a1a" marker-end="url(#d1)"/>
  <path d="M144 45 L160 23" stroke="#999" marker-end="url(#d1)"/>
  <path d="M144 49 L160 49" stroke="#999" marker-end="url(#d1)"/>
  <path d="M144 53 L160 75" stroke="#999" marker-end="url(#d1)"/>
  <text x="250" y="40" font-size="5.8" fill="#777">A / AAAA → address</text>
  <text x="250" y="52" font-size="5.8" fill="#777">CNAME → alias</text>
  <text x="250" y="64" font-size="5.8" fill="#777">NS → delegation</text>
  <defs><marker id="d1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- Records you'll touch: **A/AAAA** (name → IPv4/IPv6), **CNAME** (alias to another name), **NS** (delegation), plus **TXT/MX/SRV**. The **TTL** is the whole game for change management: a long TTL means fast, cheap lookups but slow failover; a short TTL means quick cutover but more query load. Teams drop TTL *before* a planned migration, then raise it after.
- **DNS is the number-one cause of "A can't reach B."** A stale cached record after a failover, a wrong `search` domain, a dead resolver, or an `NXDOMAIN` all present as "the network is down" when the packets never got an address to go to.

:::incident
A service starts failing to reach a database *minutes after* a failover that "already completed." DNS was updated, but the app's resolver (or the app's own process cache) still holds the old IP until the **TTL** expires — so half the fleet talks to a dead endpoint. In Kubernetes, add CoreDNS and the `ndots:5` default to your suspects: a name without a trailing dot gets the search domains appended first, turning one lookup into several and amplifying any DNS slowness. Check with `dig api.internal` (note the TTL) and `cat /etc/resolv.conf`.
:::
