## CDN and Anycast

- A **CDN** (Content Delivery Network) is a fleet of caches in **points of presence (PoPs)** spread across the globe, close to users. A user fetches from the nearest PoP instead of your distant origin, which cuts latency (fewer round trips over shorter distances) and offloads the origin (the PoP serves the cached copy, your servers never see the request). Originally for static files; modern CDNs also cache dynamic responses and run **edge compute**.
- The mechanism that sends a user to the *nearest* PoP is **Anycast**: the **same IP address is announced from many locations**, and internet routing naturally delivers each user's packets to the closest one. One address, dozens of physical endpoints. It's used for CDN edges, public DNS resolvers (e.g. `1.1.1.1`), and as a DDoS defence — an attack is spread across every PoP instead of concentrated on one box.
- What you control at the edge: **`Cache-Control`** headers (what's cacheable and for how long), cache **TTLs**, and **invalidation** (purging a path when content changes). Latency wins and origin savings are large, but only for what's actually cacheable — and a stale cache after a deploy is the CDN version of the DNS-TTL problem from Module 3.

:::note
This closes the latency story. TCP + TLS handshakes (Modules 2–3) cost round trips, and round-trip time is set by **distance** (speed of light is not negotiable). A CDN's whole job is to **shorten the distance** — terminate the user's connection at a nearby PoP, keep a warm pooled connection back to origin, and serve cached bytes with no origin round trip at all. It's why a global product feels fast everywhere despite one origin region.
:::
