## Ingestion

- The user clicks an ad. The browser fires an HTTP request to your Gateway.
- The Gateway immediately appends the raw event (Ad ID, Click ID, Timestamp, User IP) to a distributed log (Kafka, →04)
- **Partitioning:** You partition the Kafka topic by `Ad ID`. This guarantees that all clicks for a specific ad go to the same partition, and are processed in order by the same consumer worker
- **The Golden Rule:** You *never* aggregate the data synchronously in the Gateway, and you *never* delete the raw Kafka log. The raw events are the source of truth for audits

<svg viewBox="0 0 460 110" role="img" aria-label="Gateway appends raw click events to a Kafka log partitioned by Ad ID" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="10" y="30" width="50" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="35" y="49" text-anchor="middle" font-weight="bold">Browser</text>
  
  <rect x="100" y="30" width="70" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="135" y="49" text-anchor="middle" font-weight="bold" fill="#1d4e89">API Gateway</text>
  
  <rect x="220" y="10" width="100" height="70" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="270" y="25" text-anchor="middle" font-weight="bold" fill="#b8541a">Kafka Log</text>
  
  <rect x="230" y="35" width="80" height="15" rx="2" fill="#fff" stroke="#b8541a"/>
  <text x="270" y="45" text-anchor="middle" font-size="6">Partition: Ad #1</text>
  
  <rect x="230" y="55" width="80" height="15" rx="2" fill="#fff" stroke="#b8541a"/>
  <text x="270" y="65" text-anchor="middle" font-size="6">Partition: Ad #2</text>
  
  <path d="M60 45 L100 45" stroke="#1a1a1a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M170 45 L220 45" stroke="#1d4e89" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
</svg>

### The failure

- Aggregating data immediately without keeping the raw events. If you discover a bug in your counting logic 3 days later, you have no way to replay the history and fix the numbers.

:::interview
Your API Gateway receives a click and immediately executes `UPDATE ads SET clicks = clicks + 1`. A bug in the Gateway double-counted clicks for an hour. How do you fix the numbers?

You can't. The raw data is gone. You must always append raw, immutable events to a log (Kafka) first, and run the aggregation asynchronously as a consumer.
:::\n