## Sharding

Splitting data horizontally across independent databases by a key, so no single
node has to hold all of it.

Users sharded by `hash(user_id) % 16` put about six percent of the data on each
node. Single-user reads stay trivial. Everything that crosses users — "all
orders last month", any join, any global aggregate — becomes a scatter-gather
you have to build and then operate.

The expensive part is resharding. Going from sixteen shards to thirty-two with a
modulo key moves nearly everything, which is why the key is usually consistent
hashing or an explicit shard map, decided before the first row is written.

## Sidecar Pattern

Running a helper container beside your application, in the same pod, to handle
concerns that would otherwise be duplicated in every service.

Envoy sits next to a Node process. The application makes a plain HTTP call and
the sidecar adds mutual TLS, retries and tracing headers — none of which appear
anywhere in the application's code or its dependency list.

<svg viewBox="0 0 460 62" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An application container and a sidecar proxy share a pod; the sidecar adds mutual TLS, retries and tracing on the way out">
  <rect x="4" y="8" width="252" height="44" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="130" y="20" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#6b6b6b">pod</text>
  <rect x="18" y="24" width="100" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><text x="68" y="38" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">app</text>
  <path d="M120 34 H140" stroke="#1a1a1a" stroke-width="1.2"/><path d="M140 34 l-5 -3 v6 z" fill="#1a1a1a"/>
  <rect x="144" y="24" width="100" height="20" fill="#e2fcf3" stroke="#2b5fa8" stroke-width="1.3"/><text x="194" y="38" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#2b5fa8">sidecar</text>
  <path d="M258 34 H288" stroke="#1a1a1a" stroke-width="1.2"/><path d="M288 34 l-5 -3 v6 z" fill="#1a1a1a"/>
  <text x="296" y="30" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">mTLS, retries, tracing</text>
  <text x="296" y="44" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">outside your code</text>
</svg>

It is not free: the sidecar consumes memory in every pod, and it starts and
stops on its own schedule, which is why startup and shutdown ordering is a
recurring source of confusing failures.
