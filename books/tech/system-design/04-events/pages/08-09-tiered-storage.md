## Tiered storage

- How do you store infinite data in Kafka without going bankrupt? You use **Tiered Storage**.
- Before tiered storage, Kafka had to keep all data on the local SSDs of the broker machines. SSDs are fast, but they are incredibly expensive.

<svg viewBox="0 0 460 140" role="img" aria-label="Tiered Storage. Kafka Broker has local SSDs for recent data (7 days). It automatically offloads older data to Amazon S3 (Infinite). Stream processors can read from both transparently." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="130" y="20" width="200" height="100" fill="#fcfcfc" stroke="#1d4e89" stroke-width="2"/>
  <text x="230" y="35" text-anchor="middle" font-weight="bold" fill="#1d4e89">Kafka Cluster (Tiered Storage)</text>
  
  <rect x="150" y="45" width="70" height="60" fill="#e2fcf3" stroke="#1a1a1a"/>
  <text x="185" y="60" text-anchor="middle" font-weight="bold">Local SSD</text>
  <text x="185" y="75" text-anchor="middle" font-size="6">Recent 7 Days</text>
  <text x="185" y="90" text-anchor="middle" font-size="6" fill="#b8541a">$$$ Expensive</text>
  
  <rect x="240" y="45" width="70" height="60" fill="#e6f2ff" stroke="#1a1a1a"/>
  <text x="275" y="60" text-anchor="middle" font-weight="bold">Amazon S3</text>
  <text x="275" y="75" text-anchor="middle" font-size="6">Infinite History</text>
  <text x="275" y="90" text-anchor="middle" font-size="6" fill="#1d4e89">$ Cheap</text>
  
  <path d="M220 75 L240 75" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M240 75 l-3 -3 v6 z" fill="#1a1a1a"/>
  <text x="230" y="70" text-anchor="middle" font-size="5">Offload</text>
  
  <rect x="20" y="55" width="80" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="79" text-anchor="middle" font-weight="bold">Stream App</text>
  
  <path d="M150 75 L100 75" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M100 75 l6 -3 v6 z" fill="#1d4e89"/>
  <text x="125" y="70" text-anchor="middle" font-size="6">Reads transparently</text>
</svg>

- Modern streaming platforms (Kafka 3.0+, Redpanda, Confluent) solve this by automatically moving older data segments from the local SSD into cheap object storage (like AWS S3). 
- To the consumer, this is completely invisible. If a stream processor asks for an event from 3 years ago, the broker silently fetches it from S3 and serves it.

### The failure

- Attempting Kappa by buying petabytes of expensive SSDs. A company decides to implement the Kappa architecture using an older, self-hosted Kafka cluster that doesn't support tiered storage. They set retention to infinite. Six months later, their AWS bill arrives. They are spending $40,000 a month on EBS (Elastic Block Store) SSD volumes just to hold cold data that is almost never read. They are forced to delete the historical data to save the company, destroying the Kappa architecture entirely. You cannot do Kappa without tiered storage
