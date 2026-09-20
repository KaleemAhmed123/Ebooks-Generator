## The time-series shape

- Time-series data has a unique physical shape. It is strictly append-only (sensors do not edit the past). The recent data is extremely hot (read constantly for dashboards). The old data is freezing cold (read only for historical aggregates)
- Because the data is immutable and expires predictably, you should physically group it by time period (one table or partition per day/week/month)

<svg viewBox="0 0 460 140" role="img" aria-label="Time-series structure. A series of tables by week. The current week is hot (gets all writes). The oldest week is dropped instantly without a delete query." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="50" y="20" width="80" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="90" y="44" text-anchor="middle" fill="#6b6b6b">Week 1 (Drop)</text>
  
  <rect x="150" y="20" width="80" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="190" y="44" text-anchor="middle">Week 2 (Cold)</text>
  
  <rect x="250" y="20" width="80" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="290" y="44" text-anchor="middle">Week 3 (Cold)</text>
  
  <rect x="350" y="20" width="80" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="390" y="44" text-anchor="middle">Week 4 (Hot)</text>
  
  <path d="M390 80 L390 65" stroke="#b8541a" fill="none"/><path d="M390 65 l-3 6 h6 z" fill="#b8541a"/>
  <text x="390" y="95" text-anchor="middle" font-size="7">All new writes</text>
  
  <path d="M90 80 L90 65" stroke="#1a1a1a" fill="none"/><path d="M90 65 l-3 6 h6 z" fill="#1a1a1a"/>
  <text x="90" y="95" text-anchor="middle" font-size="7">Instant reclaim</text>
</svg>

- When Week 1 expires, you do not run a massive `DELETE FROM metrics WHERE time < X`. That would create millions of tombstones and stall the database (Module 2). Instead, you simply delete the Week 1 table entirely (an `O(1)` filesystem operation)
- Cassandra formalizes this with TimeWindowCompactionStrategy (TWCS) for "TTL'ed, mostly immutable time-series data"

### The failure

- Using today's date as the partition key. All inserts for the entire system will hit a single partition on a single node (a hotspot). You must salt the key (e.g., `device_id + date`) to spread the write load across the cluster (Module 8)
