## The wide-column model

- The term is confusing: wide-column stores (Cassandra, ScyllaDB) are **not** column-oriented analytical databases. They are distributed hash tables with sorting
- A table has a **partition key** (which node holds the data) and **clustering columns** (how the data is sorted on that node)

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

- **Strengths**: Extreme write throughput. Time-series data is perfectly sorted on disk. To get the last 50 readings for a sensor, you hash to the correct node and read sequentially
- **Use for**: High-velocity time-series, IoT, messaging histories. You must design the table specifically for the query you intend to run

### The failure

- A partition that grows without bound. If you partition by `device_id`, a device that sends 10,000 messages a second will create a massive partition. A single node becomes a hotspot. Cassandra's rule is that a partition must be "not too big nor too small"
