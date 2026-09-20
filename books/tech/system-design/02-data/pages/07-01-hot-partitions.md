# Module 7 - Partitioning (Part 2)

## Hot partitions

- Hash partitioning assumes keys are accessed with a uniform distribution. But in the real world, data is highly skewed. A celebrity posts a photo, and millions of users read the same key. A B2B product signs a massive enterprise client, and 80% of the traffic belongs to one tenant ID
- When one key (or one tenant) receives vastly more traffic than the others, the partition holding that key becomes a **hot partition**

<svg viewBox="0 0 460 140" role="img" aria-label="Hot partition. Nodes 1 and 3 have 10 QPS. Node 2 holds the celebrity key and is overwhelmed with 10,000 QPS, triggering rate limits." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="100" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="70" y="34" text-anchor="middle">Normal users</text>
  <text x="70" y="44" text-anchor="middle" font-size="6">10 reads/sec</text>
  
  <rect x="20" y="70" width="100" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="70" y="87" text-anchor="middle" font-weight="bold">Celebrity post</text>
  <text x="70" y="99" text-anchor="middle" font-size="6" font-weight="bold">10,000 reads/sec</text>
  
  <rect x="250" y="10" width="100" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="300" y="29" text-anchor="middle">Node 1</text>
  
  <rect x="250" y="55" width="100" height="40" rx="3" fill="#fce4e2" stroke="#b8541a" stroke-width="2"/>
  <text x="300" y="75" text-anchor="middle" font-weight="bold">Node 2 (Hot)</text>
  <text x="300" y="87" text-anchor="middle" font-size="6">CPU 100%</text>
  
  <rect x="250" y="110" width="100" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="300" y="129" text-anchor="middle">Node 3</text>
  
  <path d="M120 30 L250 25" stroke="#1a1a1a" fill="none"/><path d="M250 25 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(-15 250 25)"/>
  <path d="M120 90 L250 75" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M250 75 l-6 -1 v6 z" fill="#b8541a" transform="rotate(-15 250 75)"/>
</svg>

- **The limit**: A partition is ultimately bound by the physical limits of a single machine. The database cannot split a single key across multiple partitions (because a key hashes to exactly one value). If the traffic for one key exceeds the capacity of one machine, the node fails
- Discord famously crashed when their largest chat channels (millions of users) stalled quorum reads in their Cassandra cluster. The channel ID was the partition key

### The failure

- Treating total cluster capacity as available capacity. You might provision a DynamoDB table with 10,000 Write Capacity Units (WCU). The table metric dashboard shows you are only using 3,000 WCU, but you are still receiving `ProvisionedThroughputExceededException` errors
- This happens because DynamoDB caps *any single partition* at a hard maximum of 3,000 RCU or 1,000 WCU, regardless of the total table capacity. If all your writes hit today's date, you will be throttled at 1,000 WCU even if you paid for a million
