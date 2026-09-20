## The wide-column model

- Wide-column stores (Cassandra, ScyllaDB) are **not** column-oriented analytical stores (page 7). Cassandra's own words: a "partitioned wide-column storage model". Rows are grouped by a key and sorted inside the group
- A table has a **partition key** (rows with the same key sit on the same replicas) and **clustering columns** (the sort order inside that partition)

<svg viewBox="0 0 460 140" role="img" aria-label="Wide-column structure. Partition key determines the node. Inside the node, rows are sorted by the clustering column. Allowed query: partition key + clustering range." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="80" y="20" width="300" height="100" rx="3" fill="#fcfcfc" stroke="#1d4e89"/>
  <rect x="80" y="20" width="100" height="100" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="130" y="35" text-anchor="middle" font-weight="bold" fill="#1d4e89">Partition Key</text>
  <text x="130" y="55" text-anchor="middle">sensor_id</text>
  <text x="130" y="80" text-anchor="middle" font-size="12">S-101</text>
  
  <text x="230" y="35" text-anchor="middle" font-weight="bold">Clustering Col</text>
  <text x="230" y="55" text-anchor="middle">timestamp (↓)</text>
  <text x="230" y="75" text-anchor="middle">10:05</text>
  <text x="230" y="90" text-anchor="middle">10:04</text>
  <text x="230" y="105" text-anchor="middle">10:03</text>
  
  <text x="330" y="35" text-anchor="middle" font-weight="bold">Data</text>
  <text x="330" y="55" text-anchor="middle">temp</text>
  <text x="330" y="75" text-anchor="middle">22.4</text>
  <text x="330" y="90" text-anchor="middle">22.1</text>
  <text x="330" y="105" text-anchor="middle">21.8</text>
</svg>

- The last 50 readings for a sensor: hash to the partition, read one sorted run. One table per query, designed from the query backwards
- Fits: time-series, device telemetry, message history, anything written far more than it is read back

### The failure

- A partition that grows without bound. Partition by `device_id` and the chattiest device becomes one giant partition on one set of replicas. Cassandra's rule for a partition: "not too big nor too small". Module 8, page 10 is the hot-partition page
