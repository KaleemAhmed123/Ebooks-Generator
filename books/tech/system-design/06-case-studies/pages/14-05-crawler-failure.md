## Traps and failure

- Three things go wrong in a long crawl: the web feeds the crawler infinite work, the crawler itself dies, and one of its workers dies mid-page. Each has a small mechanism with a cost the interviewer will ask about

| Failure | How it shows | Mechanism | Cost |
| :--- | :--- | :--- | :--- |
| a **spider trap**: a site that generates pages without end | a calendar with a next-month link forever; a filter page whose every combination is a URL | a depth limit from the seed, a URL-length limit, a per-host page budget; past any, the link is dropped | a deep legitimate site is cut at the limit; the budget is raised by hand for hosts that earn it |
| the crawler restarts | the in-memory frontier is gone | the front queues, back queues and heap (page 2) are checkpointed on a schedule; URLs in flight at the checkpoint are re-queued on restart | a re-fetch of what was in flight, harmless after the fingerprint (page 4); the interval is traded against the work lost |
| a worker dies mid-fetch | a URL popped and never finished; its host never reinserted | a **lease** on the host with a TTL, the queue lease of booklet 04: if the worker does not reinsert before the TTL, the frontier does, and the URL goes back to its queue | a host waits one TTL after a crash; a slow fetch must finish inside it or extend it |
| a host that blocks the crawler | 403s, 429s, a captcha page with status 200 | back off on 429 and 503, honour `Retry-After` (booklet 01), identify with a real user agent and contact URL, drop the host for a while after repeated refusals | pages from that host go stale; the alternative is a permanent block |

### The failure

- A calendar page that generates infinite next-month links. Every page is new, every page has a link the filter has not seen, every fetch is polite and correct, and the crawler follows it into the year 3000. Nothing in the fetch path can tell; only a limit on depth or on pages per host stops it
