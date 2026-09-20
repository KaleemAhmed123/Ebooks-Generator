## Pick the deep dive

- The deep dive is where the interview is won or lost. It is your chance to show the interviewer how you navigate the hardest parts of the system
- To pick the deep dive, look at your non-functional requirements. The one that is the hardest to meet is your deep dive. State this out loud to the interviewer
- If you are building an autocomplete system, the hardest requirement is the 50ms latency limit on reads. The deep dive is the read path and the in-memory trie. If you are building a payment system, the hardest requirement is absolute consistency and no duplicate charges. The deep dive is the ledger and idempotency

| System | Hardest Constraint | The Deep Dive |
| :--- | :--- | :--- |
| URL Shortener | Read volume (100:1 read-to-write) | Caching and horizontal read scaling |
| Web Crawler | Breadth and duplicate avoidance | URL frontier and Bloom filter |
| Ride Matching (Uber) | Real-time moving objects | Geospatial indexing (H3) and the matching lock |
| Notifications | Delivery guarantees and fan-out | Retry queues, dead letter queues, and rate limits |

### The failure

- The failure mode is picking the deep dive based on what you know best, rather than what the system needs most
- If you are designing WhatsApp and you spend 15 minutes talking about how to shard the user profile table, you have failed the deep dive. The user profile table is trivial. The hard part of WhatsApp is the stateful WebSocket connection and the message ordering

:::interview
**The self-awareness test**
When a candidate correctly identifies the weakest link in their own architecture, it proves they have operational experience. They know what breaks in production.
:::
