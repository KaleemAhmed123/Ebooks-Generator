## Table partitioning on one node

- When a Postgres table grows to hundreds of gigabytes, indexes become too large to fit in memory, and B-tree maintenance (like `VACUUM`) slows to a crawl
- You can split the table into smaller, physical tables (partitions) under the hood. To the application, it still looks like one logical table

<svg viewBox="0 0 460 140" role="img" aria-label="Table partitioning. The logical 'sales' table is split into physical partitions by year: sales_2024, sales_2025, sales_2026. A query for 2026 prunes the others." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="180" y="10" width="100" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89" stroke-dasharray="2 2"/>
  <text x="230" y="30" text-anchor="middle">Logical Table: sales</text>
  
  <rect x="50" y="80" width="100" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="100" y="97" text-anchor="middle">sales_2024</text>
  <text x="100" y="112" text-anchor="middle" font-size="7">year = 2024</text>
  
  <rect x="180" y="80" width="100" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="230" y="97" text-anchor="middle">sales_2025</text>
  <text x="230" y="112" text-anchor="middle" font-size="7">year = 2025</text>
  
  <rect x="310" y="80" width="100" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="360" y="97" text-anchor="middle">sales_2026</text>
  <text x="360" y="112" text-anchor="middle" font-size="7">year = 2026</text>
  
  <path d="M200 40 L100 80" stroke="#1a1a1a" fill="none"/><path d="M100 80 l6 -1 v6 z" fill="#1a1a1a" transform="rotate(20 100 80)"/>
  <path d="M230 40 L230 80" stroke="#1a1a1a" fill="none"/><path d="M230 80 l-3 -6 h6 z" fill="#1a1a1a"/>
  <path d="M260 40 L360 80" stroke="#1d4e89" fill="none"/><path d="M360 80 l-6 -3 v6 z" fill="#1d4e89" transform="rotate(20 360 80)"/>
  
  <rect x="330" y="30" width="100" height="24" rx="3" fill="#fff" stroke="#b8541a"/>
  <text x="380" y="46" text-anchor="middle" font-size="7">SELECT WHERE year=2026</text>
</svg>

- **Partition pruning**: When you query `WHERE year = 2026`, Postgres skips the 2024 and 2025 tables entirely
- **Instant drop**: Dropping old time-series data with a bulk `DELETE` creates millions of dead rows that stall `VACUUM`. With table partitioning, you run `DETACH PARTITION`, which instantly drops the physical table (an `O(1)` operation)

### The failure

- Calling it sharding. Table partitioning splits a table, but all the partitions still live on the exact same machine. They share the same CPU, RAM, and disk head
- When the server runs out of physical hardware capacity, table partitioning will not save you. You must shard the database across multiple machines (Module 8)
