## Hot partitions

- Hashing spreads keys, not traffic. A celebrity's post, today's date, one large tenant: one key with most of the load, and the partition that owns it is a **hot partition**

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

- One key hashes to one partition, and no scheme on the previous pages can split a single key. So one key's traffic is capped at one partition's capacity, whatever the cluster's total
- Discord's messages table on Cassandra was partitioned by channel and time bucket. A few very large channels made their partitions hot, and because quorum reads wait for the slowest replica, the hot partitions slowed reads across the cluster. Part of their fix was request coalescing, one read per hot key with the callers sharing the result, before they moved to ScyllaDB

### The failure

- Reading the table's capacity as available capacity. A DynamoDB table provisioned for 10,000 write units shows 3,000 in use and still throttles, because any one partition is capped at 3,000 read units and 1,000 write units per second, whatever the table has. Writes keyed on today's date hit one partition and get 1,000, not 10,000. The next page is the fix

:::interview
"One key gets most of the traffic. What do you do?" — Say which side is hot. Reads: cache it, or coalesce concurrent reads into one. Writes: split the key with a calculated suffix and fan the reads back in. Then say what the fan-in costs.
:::
