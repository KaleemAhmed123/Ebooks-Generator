## Versioning between services

- When you absolutely must make a breaking change (like renaming a core field), you cannot simply deploy the new version. You must use the "Expand and Contract" pattern (also called parallel change)
- **Expand:** You add the new field alongside the old field. The service now supports both
- **Migrate:** You update all calling services to stop reading the old field and start reading the new one. You deploy them
- **Contract:** Once logs confirm no one is reading the old field, you delete it

<svg viewBox="0 0 460 140" role="img" aria-label="Expand, Migrate, Contract. Phase 1: Add v2 beside v1. Phase 2: Callers switch to v2. Phase 3: Remove v1." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="120" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="80" y="35" text-anchor="middle" font-weight="bold">1. Expand</text>
  <rect x="40" y="45" width="80" height="25" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="80" y="60" text-anchor="middle">Field v1 (Active)</text>
  <rect x="40" y="75" width="80" height="25" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="80" y="90" text-anchor="middle">Field v2 (New)</text>

  <rect x="170" y="20" width="120" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="230" y="35" text-anchor="middle" font-weight="bold">2. Migrate</text>
  <rect x="190" y="45" width="80" height="25" rx="3" fill="#fcfcfc" stroke="#cccccc"/>
  <text x="230" y="60" text-anchor="middle" fill="#cccccc">Field v1 (Dead)</text>
  <rect x="190" y="75" width="80" height="25" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="230" y="90" text-anchor="middle">Field v2 (Active)</text>

  <rect x="320" y="20" width="120" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="380" y="35" text-anchor="middle" font-weight="bold">3. Contract</text>
  <rect x="340" y="60" width="80" height="25" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="380" y="75" text-anchor="middle">Field v2 (Active)</text>
</svg>

- URL versioning (`/v1/users` to `/v2/users`) is the last resort. It forces you to run two complete copies of the application logic simultaneously, which often means maintaining two parallel sets of database migrations

### The failure

- The failure of URL versioning is that `v1` lives forever. Because migrating to `/v2` requires work from other teams, they never prioritize it
- You are stuck maintaining the old code path for years, often building complex routing logic to keep the database in sync between `v1` writes and `v2` writes. Expand and contract at the field level is much safer
