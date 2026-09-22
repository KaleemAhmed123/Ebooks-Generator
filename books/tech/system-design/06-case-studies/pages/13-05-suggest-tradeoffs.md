## What the interviewer probes

| Probe | The answer that holds |
| :--- | :--- |
| the client sends a request per keystroke | debounce: wait a few tens of milliseconds after a keystroke before sending, so fast typing sends one request for "apple", not five. Cancel the in-flight request when the next one goes out, so a slow answer for "app" cannot overwrite the answer for "apple" |
| the user backspaces | the browser cache. The response carries `Cache-Control: max-age=3600` (booklet 05 owns the header set); "app" after "appl" is served from the client's own cache in zero round trips, and the hour matches the build interval on page 3 |
| personalisation | not in the trie: it is global by design. Either the client merges a small list of the user's own recent searches ahead of the global five, or a rerank stage reorders the global list with per-user signals. Never a trie per user |
| trending in minutes | a second, small index rebuilt every minute from a sliding window of the log, merged into the response; the main trie stays hourly (page 3) |
| filtering | at build time. Blocked terms never enter the snapshot, so nothing is filtered on the read path and nothing can leak through a cache |
| languages and scripts | one trie per language, chosen by the request's locale; the shard map (page 4) is per trie, and a language's letter distribution decides its cuts |

- The metric: p99 latency of the suggest call as seen by the client, and the age of the snapshot each shard is serving, which is the freshness promise as one number per shard
- Cross-references the design leans on: the query log and the batch versus streaming choice (booklet 04); object storage for snapshots and the cache headers (booklet 05); the gateway (Module 3); hot partitions (booklet 02)

### The failure

- No debounce. A user typing at a normal speed sends a request per keystroke, ten per word, and every one of them is discarded by the next; the server does ten lookups to be useful once, at five times the planned load. The client is part of the design, and the cheapest request is the one it never sends
