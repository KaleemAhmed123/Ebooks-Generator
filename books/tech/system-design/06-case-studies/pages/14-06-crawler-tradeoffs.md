## What the interviewer probes

| Probe | The answer that holds |
| :--- | :--- |
| freshness: which pages to revisit, and when | a per-page estimate of its change rate, learned from whether the fingerprint (page 4) changed on the last visits: a page that changed every visit is re-queued in hours, one that never changed in months. The estimate sets the front-queue priority (page 2); the Bloom filter is not consulted for revisits |
| JavaScript-rendered pages | a plain fetch sees no links on a page that builds itself in the browser. Rendering in a headless browser costs an order of magnitude more per page, so it is a second, smaller pipeline for hosts flagged as needing it, not the default |
| distributing the crawler | hosts are assigned to crawler nodes by a hash of the host name (booklet 02, consistent hashing), so a host's back queue, its politeness timer and its `robots.txt` cache live on one node; links found on any node are routed to the owner of their host |
| being blocked | identify honestly, obey `robots.txt`, keep to the delay, and back off on 429 and 503; a crawler that is blocked has usually earned it (page 5) |
| storing 100 TB a month | HTML in blob storage keyed by URL hash (booklet 05); the metadata, fetch time, status, fingerprint and change estimate, in a table the scheduler can query |
| priority | seed pages and pages with many inbound links first; a new host gets a small budget until it proves worth more, which is also the trap defence on page 5 |

- The metric: pages fetched per second against the 400 target, and the age distribution of the stored copies, which is the freshness promise as a histogram; a politeness violation count is the one that must stay at zero
- Cross-references the design leans on: blob storage, the Bloom filter and DNS caching (booklet 05); consistent hashing of hosts (booklet 02); queue leases and checkpoints (booklet 04); backoff and `Retry-After` (booklet 01)

### The failure

- Recrawling everything at one rate. A weekly pass over a billion pages spends most of its fetches confirming that pages which never change still have not, and reaches the news site once a week. The change estimate per page is what turns a fixed budget into fresh copies of the pages that move
