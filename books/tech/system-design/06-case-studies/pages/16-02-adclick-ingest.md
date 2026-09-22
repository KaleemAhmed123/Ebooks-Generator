## Ingestion

- A click is an event with an id that was minted when the ad was served, so the id exists before the click and travels with it. The click endpoint validates the event, appends it to a log partitioned by ad id, and acknowledges; nothing counts anything in the request path, and the log is never deleted inside its retention

<svg viewBox="0 0 460 170" role="img" aria-label="Ad-click aggregation, whole design. A browser sends a click carrying the click id minted when the ad was served, the ad id and the client timestamp. A click endpoint validates and appends it to a Kafka topic, booklet 04, partitioned by ad id, about 12 000 events a second, 60 000 at peak; it acknowledges only after the append. A stream aggregator consumes the topic: tumbling one-minute windows on event time, page 3, dedupe by click id inside the window, page 4, and writes per-ad per-minute counts to an OLAP store, which the query API and dashboards read, marked provisional. The topic is also copied to object storage as the raw log, 9 terabytes for 90 days, and a nightly batch recomputes every count from it and writes the final table, page 5, which billing reads. Google's Photon joins query and click logs the same way: exactly-once eventually, average end-to-end latency under 10 seconds. An orange cross marks aggregating without keeping the raw events: a bug found on Thursday cannot be replayed from Monday." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="20" width="66" height="44" rx="3" fill="#fff" stroke="#333"/><text x="39" y="33" text-anchor="middle">browser</text><text x="39" y="44" text-anchor="middle" font-size="7">click id minted</text><text x="39" y="54" text-anchor="middle" font-size="7">with the ad served</text>
  <rect x="100" y="20" width="76" height="44" rx="3" fill="#fff" stroke="#1d4e89"/><text x="138" y="33" text-anchor="middle">click endpoint</text><text x="138" y="44" text-anchor="middle" font-size="7">validate, append,</text><text x="138" y="54" text-anchor="middle" font-size="7">ack; counts nothing</text>
  <line x1="72" y1="42" x2="100" y2="42" stroke="#333" marker-end="url(#d)"/>
  <rect x="204" y="14" width="96" height="56" rx="3" fill="#e6f2ff" stroke="#333"/><text x="252" y="27" text-anchor="middle">Kafka topic</text><text x="252" y="38" text-anchor="middle" font-size="7">by ad id (booklet 04)</text><text x="252" y="49" text-anchor="middle" font-size="7">≈ 12 000/s, 60 000 peak</text><text x="252" y="60" text-anchor="middle" font-size="7">retained; never the count's owner</text>
  <line x1="176" y1="42" x2="204" y2="42" stroke="#333" marker-end="url(#d)"/>
  <rect x="328" y="14" width="126" height="56" rx="3" fill="#fff" stroke="#1d4e89"/><text x="391" y="27" text-anchor="middle">stream aggregator</text><text x="391" y="38" text-anchor="middle" font-size="7">1-min event-time windows (page 3)</text><text x="391" y="49" text-anchor="middle" font-size="7">dedupe by click id (page 4)</text><text x="391" y="60" text-anchor="middle" font-size="7">state checkpointed with the offset</text>
  <line x1="300" y1="42" x2="328" y2="42" stroke="#333" marker-end="url(#d)"/>
  <rect x="328" y="86" width="126" height="34" rx="3" fill="#e6f2ff" stroke="#333"/><text x="391" y="99" text-anchor="middle">OLAP store: ad × minute</text><text x="391" y="111" text-anchor="middle" font-size="7">provisional; dashboards read it</text>
  <line x1="391" y1="70" x2="391" y2="86" stroke="#333" marker-end="url(#d)"/>
  <rect x="204" y="86" width="96" height="34" rx="3" fill="#e6f2ff" stroke="#333"/><text x="252" y="99" text-anchor="middle">raw log</text><text x="252" y="111" text-anchor="middle" font-size="7">object store, 90 d ≈ 9 TB</text>
  <line x1="252" y1="70" x2="252" y2="86" stroke="#333" stroke-dasharray="3 3" marker-end="url(#d)"/><text x="256" y="80" font-size="7">copy</text>
  <rect x="100" y="86" width="76" height="34" rx="3" fill="#fff" stroke="#1d4e89"/><text x="138" y="99" text-anchor="middle">nightly batch</text><text x="138" y="111" text-anchor="middle" font-size="7">recompute all (page 5)</text>
  <line x1="204" y1="103" x2="176" y2="103" stroke="#333" marker-end="url(#d)"/>
  <rect x="6" y="86" width="66" height="34" rx="3" fill="#e6f2ff" stroke="#333"/><text x="39" y="99" text-anchor="middle">final table</text><text x="39" y="111" text-anchor="middle" font-size="7">billing reads this</text>
  <line x1="100" y1="103" x2="72" y2="103" stroke="#333" marker-end="url(#d)"/>
  <text x="200" y="134" text-anchor="middle" font-size="7">page 5: batch overwrites the provisional count; the difference is logged</text>
  <text x="6" y="152" font-size="7">Google's Photon joins query and click logs this way: no duplicates, exactly-once eventually, end-to-end latency under 10 s on average</text>
  <text x="6" y="166" font-size="7.5" fill="#bf4c28">✕ aggregating without the raw events: a counting bug found on Thursday cannot be replayed from Monday</text>
  <defs><marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- Partitioning by ad id puts every click for one ad on one partition, so one consumer holds that ad's window and no count is split across machines; a very hot ad breaks that and is salted (page 6). The endpoint acknowledges after the append, so a lost ack makes the client retry and the id makes the retry harmless (page 4)
- The event carries the client's timestamp and the endpoint adds its own; the window uses the client's (page 3), and a client clock more than a few minutes off is a fraud signal, not a scheduling problem

### The failure

- Aggregating without keeping the raw events. `UPDATE ads SET clicks = clicks + 1` in the endpoint, or a stream job whose only output is the count: correct until the first bug, after which the numbers are wrong and there is nothing to recompute them from. The log is the truth; every count is a view of it that can be rebuilt
