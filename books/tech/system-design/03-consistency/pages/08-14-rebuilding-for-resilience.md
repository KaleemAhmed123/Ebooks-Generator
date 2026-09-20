## Rebuilding for resilience

- How do you fix the Taylor Swift crash? You must remove the relational database from the critical path of the queue.

| Approach | Architecture | Result under 14M load |
|---|---|---|
| **Relational Queue** | CDN asks Postgres: "Is JWT valid?" | Postgres crashes. Sale halts. |
| **Edge Compute Queue** | CDN verifies RSA cryptographic signature of JWT purely in memory. No database query. | 0ms latency. Flawless routing. |

- **Stateless Edge Computing**: Instead of looking up the JWT in a database, Ticketmaster issues a JWT signed with an asymmetric RSA key. The CDN (Cloudflare Worker) holds the public key in memory. When 14 million users arrive, the CDN runs a fast CPU algorithm to verify the signature. It requires zero network calls and zero database queries
- By making the queue authentication completely stateless, the CDN can absorb virtually infinite traffic, successfully throttling the 14 million users down to the 5,000 per minute that the backend can handle

### The failure

- Putting the waiting room state in a relational database. The entire point of a CDN edge is to shield the backend. If your edge executes a database query to function, it is not a shield; it is a magnifying glass
