## The time-series shape

- Time-series data is append-only (nobody edits the past), recent-hot (dashboards read the last hour) and old-cold (history is read for the occasional aggregate)
- Immutable data that expires on a schedule should be grouped by period: one table or partition per day, week or month. DynamoDB's pattern is one table per period, with the old tables' write capacity cut to the minimum

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

- When week 1 expires, nobody runs `DELETE FROM metrics WHERE time < X`: that is millions of dead rows or tombstones (Module 2, page 9). Drop the week-1 table instead
- Cassandra's time-window compaction (TWCS) is this idea inside the storage engine, for "TTL'ed, mostly immutable time-series data"

### The failure

- Today's date as the partition key. Every insert in the system lands on one partition: today's. Put the device or tenant in the key (`device_id`, then time as the sort key) so the writes spread; Module 8, pages 10 and 11 cover the hot key and the salted fix
