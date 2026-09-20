## Row vs column storage

- An **OLTP** (Online Transaction Processing) workload reads or updates a single row at a time. The database stores the data on disk row-by-row. If you read the row, you pull the whole row from the disk into memory
- An **OLAP** (Online Analytical Processing) workload calculates aggregates across millions of rows, but only looks at a few columns (e.g., "what is the average `price`?"). Pulling millions of whole rows into memory just to read one column wastes disk I/O and RAM

<svg viewBox="0 0 460 140" role="img" aria-label="Row store vs Column store. Row store interleaves columns on disk. Column store groups columns together, so scanning the Price column reads only price data." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="120" y="20" text-anchor="middle" font-weight="bold" fill="#1d4e89">Row Store (OLTP)</text>
  <rect x="50" y="30" width="40" height="20" fill="#e2fcf3" stroke="#1d4e89"/><text x="70" y="44" text-anchor="middle">ID: 1</text>
  <rect x="90" y="30" width="60" height="20" fill="#e2fcf3" stroke="#1d4e89"/><text x="120" y="44" text-anchor="middle">Date: 01</text>
  <rect x="150" y="30" width="40" height="20" fill="#fce4e2" stroke="#b8541a"/><text x="170" y="44" text-anchor="middle">Price: 5</text>
  
  <rect x="50" y="55" width="40" height="20" fill="#e2fcf3" stroke="#1d4e89"/><text x="70" y="69" text-anchor="middle">ID: 2</text>
  <rect x="90" y="55" width="60" height="20" fill="#e2fcf3" stroke="#1d4e89"/><text x="120" y="69" text-anchor="middle">Date: 02</text>
  <rect x="150" y="55" width="40" height="20" fill="#fce4e2" stroke="#b8541a"/><text x="170" y="69" text-anchor="middle">Price: 9</text>
  <text x="120" y="95" text-anchor="middle" font-size="7" fill="#6b6b6b">Reads the whole row</text>

  <text x="340" y="20" text-anchor="middle" font-weight="bold" fill="#1d4e89">Column Store (OLAP)</text>
  <rect x="250" y="30" width="40" height="20" fill="#e2fcf3" stroke="#1d4e89"/><text x="270" y="44" text-anchor="middle">ID: 1</text>
  <rect x="290" y="30" width="40" height="20" fill="#e2fcf3" stroke="#1d4e89"/><text x="310" y="44" text-anchor="middle">ID: 2</text>
  
  <rect x="250" y="55" width="60" height="20" fill="#e2fcf3" stroke="#1d4e89"/><text x="280" y="69" text-anchor="middle">Date: 01</text>
  <rect x="310" y="55" width="60" height="20" fill="#e2fcf3" stroke="#1d4e89"/><text x="340" y="69" text-anchor="middle">Date: 02</text>
  
  <rect x="250" y="80" width="40" height="20" fill="#fce4e2" stroke="#b8541a"/><text x="270" y="94" text-anchor="middle">Price: 5</text>
  <rect x="290" y="80" width="40" height="20" fill="#fce4e2" stroke="#b8541a"/><text x="310" y="94" text-anchor="middle">Price: 9</text>
  <text x="340" y="115" text-anchor="middle" font-size="7" fill="#6b6b6b">Reads only the required column</text>
</svg>

- **Parquet** is a hybrid. It stores "row groups", but inside the group, the data is stored column-by-column. A query engine (like Presto or BigQuery) can skip entire columns it does not need

### The failure

- Running analytical scans on the OLTP primary or its read replica. A heavy `SUM()` across an unindexed column will lock pages, evict useful rows from the cache, and stall live user traffic. OLTP and OLAP are fundamentally opposed; you must separate them
