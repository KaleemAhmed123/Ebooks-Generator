## Resharding a live system

- If you are manually sharding a relational database (because you outgrew a single Postgres primary), cutting over to the new sharded architecture is a high-risk operation. You cannot afford downtime
- The migration follows the **expand-migrate-contract** pattern (similar to schema evolution), executed over several weeks

<svg viewBox="0 0 460 140" role="img" aria-label="Resharding a live system. The app dual-writes to the Old DB and the New Sharded DB. A background script backfills old rows. The app verifies reads, then switches." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="55" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="70" text-anchor="middle" font-weight="bold">Application</text>
  <text x="60" y="80" text-anchor="middle" font-size="7">Dual Write</text>
  
  <rect x="180" y="10" width="100" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="230" y="27" text-anchor="middle" font-weight="bold">Old Monolith</text>
  <text x="230" y="42" text-anchor="middle" font-size="7">Reads served here</text>
  
  <rect x="180" y="90" width="100" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="230" y="107" text-anchor="middle" font-weight="bold">New Shards</text>
  <text x="230" y="122" text-anchor="middle" font-size="7">Dark reads (verify)</text>
  
  <path d="M100 65 L180 35" stroke="#1a1a1a" fill="none"/><path d="M180 35 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(-15 180 35)"/>
  <path d="M100 75 L180 105" stroke="#1a1a1a" fill="none"/><path d="M180 105 l-6 -3 v6 z" fill="#1a1a1a" transform="rotate(20 180 105)"/>
  
  <rect x="330" y="55" width="80" height="30" rx="3" fill="#fff" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="370" y="70" text-anchor="middle" font-weight="bold">Backfill</text>
  <text x="370" y="80" text-anchor="middle" font-size="7">Copies old data</text>
  
  <path d="M370 45 L370 55" stroke="#1a1a1a" fill="none"/><path d="M370 55 l-3 -6 h6 z" fill="#1a1a1a"/>
  <path d="M370 85 L370 95" stroke="#1a1a1a" fill="none"/><path d="M370 95 l-3 -3 h6 z" fill="#1a1a1a"/>
</svg>

- **1. Dual write**: Modify the application code to write to both the old monolith and the new shards. Only the monolith write is allowed to fail the request
- **2. Backfill**: Run a script to copy all historical data from the monolith to the shards, ignoring records that the dual-writer has already updated
- **3. Verify**: The application performs "dark reads"—it reads from both databases and logs an error if the results differ. (Figma ensured the person writing the verifier was not the person who wrote the migration)
- **4. Switch**: Flip a feature flag. Reads now go to the sharded database. Stop the dual-write

### The failure

- Trusting a migration script's own verification logs. Dual-writes drift under network failures. If you cut over without application-level dark reads confirming the data matches exactly, you will corrupt your production dataset
