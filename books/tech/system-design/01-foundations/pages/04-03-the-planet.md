## The speed of light in fiber

- Light in a vacuum travels at 299,792,458 m/s. In fiber, the glass slows it to about **200,000 km/s** (refractive index ~1.5)
- That number is a wall. No protocol, no compression, no edge server can beat it

| Route | Distance | One-way fiber | RTT (measured) |
|---|---|---|---|
| NY – London | 5,585 km | ~28 ms | ~56 ms |
| NA Central – NA East | — | — | ~25 ms |
| NA East – NA West | — | — | ~60 ms |
| NA West – Singapore | — | — | ~180 ms |
| EU West – Singapore | — | — | ~160 ms |

- Measured cloud RTTs are higher than the fiber minimum because of routing, switches, encryption, and the fact that cables do not follow a straight line
- **Last mile** adds its own floor: fiber 10–20 ms, cable 15–40 ms, DSL 30–65 ms

### The failure

- A "global" product with one region on the US west coast. Half the users are in Asia. Their floor is 180 ms RTT before the server does any work. Every click, every scroll that loads data, starts with 180 ms of physics
- "Add a CDN", a **content delivery network** that caches copies near the user, helps for static files. For an API call that hits the database, the RTT to the origin is still the floor
