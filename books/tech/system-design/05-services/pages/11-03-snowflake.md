## Snowflake IDs

- UUIDs are 128 bits. This is overkill for many systems, and doubles the size of every foreign key column compared to a traditional 64-bit integer
- Twitter invented the Snowflake ID: a 64-bit integer that is time-ordered (k-sorted) and globally unique without coordination. It fits perfectly into a standard database `BIGINT`

<svg viewBox="0 0 460 140" role="img" aria-label="Snowflake bit layout. 41 bits timestamp, 10 bits worker ID, 12 bits sequence." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="55" width="200" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="120" y="73" text-anchor="middle">Timestamp (41 bits)</text>
  <text x="120" y="95" text-anchor="middle" font-size="7">Milliseconds since custom epoch</text>
  
  <rect x="230" y="55" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="270" y="73" text-anchor="middle">Worker (10 bits)</text>
  <text x="270" y="95" text-anchor="middle" font-size="7">Machine ID</text>
  
  <rect x="320" y="55" width="100" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="370" y="73" text-anchor="middle">Sequence (12 bits)</text>
  <text x="370" y="95" text-anchor="middle" font-size="7">Rolls over at 4096</text>
</svg>

- **Timestamp (41 bits):** Gives 69 years of milliseconds. You must set a custom "Epoch" (e.g., the day you launched) to maximize this
- **Worker ID (10 bits):** Allows 1,024 different app instances to generate IDs concurrently without talking to each other
- **Sequence (12 bits):** Allows a single worker to generate 4,096 unique IDs in the exact same millisecond

### The failure

- The failure is the system clock moving backwards (NTP synchronization correction). Because Snowflake relies on the current millisecond, if the clock shifts backwards by 5 milliseconds, the worker might generate the exact same ID it generated 5 milliseconds ago
- A robust Snowflake generator must check if the current time is older than the last generated ID's time, and if so, completely refuse to generate new IDs until the clock catches up
