## Expand, migrate, contract

- A column rename, a type change, a split into two tables: each is one breaking change. **Expand, migrate, contract** turns it into three changes, each compatible with the code on either side of it

<svg viewBox="0 0 460 140" role="img" aria-label="Expand, migrate, contract. 1. Add new column. 2. Write to both, backfill old. 3. Read from new, drop old." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="120" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="80" y="37" text-anchor="middle" font-weight="bold">1. Expand</text>
  <text x="80" y="60" text-anchor="middle" font-size="7">Add `new_id` (bigint)</text>
  <text x="80" y="75" text-anchor="middle" font-size="7">Write to `old_id` AND `new_id`</text>
  <text x="80" y="90" text-anchor="middle" font-size="7">Read from `old_id`</text>
  
  <rect x="170" y="20" width="120" height="100" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="230" y="37" text-anchor="middle" font-weight="bold" fill="#1d4e89">2. Migrate</text>
  <text x="230" y="60" text-anchor="middle" font-size="7">Backfill all old rows</text>
  <text x="230" y="75" text-anchor="middle" font-size="7">Switch reads to `new_id`</text>
  <text x="230" y="90" text-anchor="middle" font-size="7">(Deploy and verify)</text>
  
  <rect x="320" y="20" width="120" height="100" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="380" y="37" text-anchor="middle" font-weight="bold" fill="#b8541a">3. Contract</text>
  <text x="380" y="60" text-anchor="middle" font-size="7">Stop writing to `old_id`</text>
  <text x="380" y="75" text-anchor="middle" font-size="7">Drop `old_id` column</text>
  
  <path d="M140 70 L170 70" stroke="#1a1a1a" fill="none"/><path d="M170 70 l-6 -3 v6 z" fill="#1a1a1a"/>
  <path d="M290 70 L320 70" stroke="#1a1a1a" fill="none"/><path d="M320 70 l-6 -3 v6 z" fill="#1a1a1a"/>
</svg>

- **Expand**: add the new column, nullable or with a default. Deploy code that writes both columns and still reads the old one
- **Migrate**: backfill the new column for every existing row, in batches. Then deploy code that reads the new column
- **Contract**: deploy code that stops writing the old column. Only then drop it. Each deploy is a backward-compatible schema against the code of the deploy before it

### The failure

- Reading the new column before the backfill has finished. Old rows come back `null` and the code treats null as data
- The contract step run too early. A replica still applying the old code's writes, or the one pod the rollout has not reached, hits a column that no longer exists. The drop is the only step that cannot be undone; it goes last, after the previous deploy has been live long enough to trust
