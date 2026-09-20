## Expand, migrate, contract

- If you cannot rename a column or change its type directly, how do you do it? You must use the **expand-migrate-contract** pattern. This breaks a single breaking change into three separate, safe deployments

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

- **Expand**: You create the new `bigint` column. You deploy code that writes to both the old and new columns, but continues reading from the old one
- **Migrate**: You run a background script to copy the data from the old column to the new column for all historical rows. Once complete, you deploy code that reads exclusively from the new column
- **Contract**: Once you verify the new column is working perfectly, you deploy code that stops writing to the old column. Finally, you run a database migration to drop the old column entirely

### The failure

- Attempting to do the expand and migrate steps in a single deployment. The moment the new code boots up, it attempts to read from the new column. But the background backfill hasn't run yet, so historical data returns `null`, breaking the application
