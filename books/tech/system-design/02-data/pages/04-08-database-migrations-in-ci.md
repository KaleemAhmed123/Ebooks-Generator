## Database migrations in CI

- Because schema evolution rules are strict, you should not rely on engineers remembering them. They must be enforced mechanically in your Continuous Integration (CI) pipeline
- A database migration tool (like Flyway, Liquibase, or Atlas) stores your schema changes as sequential SQL files (`001_create_users.sql`, `002_add_email.sql`). The tool tracks which files have been applied to the database

<svg viewBox="0 0 460 140" role="img" aria-label="Database migrations in CI. A pull request is pushed. CI runs a linter on the SQL migration. The linter catches a DROP COLUMN and fails the build." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="80" height="24" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="66" text-anchor="middle">Pull Request</text>
  
  <rect x="140" y="10" width="140" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="210" y="27" text-anchor="middle">SQL Linter (Atlas / squawk)</text>
  <text x="210" y="42" text-anchor="middle" font-size="7">Rules: No DROP, No RENAME</text>
  
  <rect x="340" y="10" width="100" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="390" y="27" text-anchor="middle">Build Fails</text>
  <text x="390" y="42" text-anchor="middle" font-size="7">"Unsafe operation"</text>
  
  <rect x="140" y="70" width="140" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="210" y="87" text-anchor="middle" fill="#6b6b6b">Production DB</text>
  <text x="210" y="102" text-anchor="middle" font-size="7" fill="#6b6b6b">Never reached</text>
  
  <path d="M100 62 L140 30" stroke="#1a1a1a" fill="none"/><path d="M140 30 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(-30 140 30)"/>
  <path d="M280 30 L340 30" stroke="#b8541a" fill="none"/><path d="M340 30 l-3 -3 v6 z" fill="#b8541a"/>
  
  <path d="M100 62 L140 90" stroke="#6b6b6b" fill="none" stroke-dasharray="2 2"/>
</svg>

- In CI, you can run a linter against these SQL files. If the linter detects a `DROP COLUMN`, an `ALTER TYPE`, or a `CREATE INDEX` without the `CONCURRENTLY` keyword (which would lock the table), it fails the build before the code can be merged

### The failure

- Running migrations automatically on application boot (`app.listen()`). In a cluster of 50 containers, all 50 will wake up and attempt to run the exact same `ALTER TABLE` simultaneously
- This causes massive lock contention, deadlocks, and can corrupt the migration table. Migrations should be run exactly once by a dedicated deployment step (like a Kubernetes Job or a GitHub Actions runner), never by the application fleet itself
