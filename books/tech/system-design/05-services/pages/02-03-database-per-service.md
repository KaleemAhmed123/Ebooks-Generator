## Database per service

- To decouple services, you must decouple their data. The rule is simple: a service is the absolute and only writer to its database
- Other services that need this data cannot query the database directly. They must go through the owning service's API (for synchronous reads) or subscribe to its event stream (for asynchronous updates)

<svg viewBox="0 0 460 140" role="img" aria-label="Two services, each with its own database. Service A calls Service B's API to read data, not its DB." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="40" y="20" width="100" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="90" y="44" text-anchor="middle" font-weight="bold">Service A</text>
  
  <rect x="40" y="90" width="100" height="30" rx="3" fill="#fcfcfc" stroke="#1d4e89" stroke-width="2"/>
  <text x="90" y="110" text-anchor="middle">DB A</text>
  <path d="M90 60 L90 90" stroke="#1d4e89" fill="none" stroke-width="2"/>
  
  <rect x="320" y="20" width="100" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="370" y="44" text-anchor="middle" font-weight="bold">Service B</text>
  
  <rect x="320" y="90" width="100" height="30" rx="3" fill="#fcfcfc" stroke="#b8541a" stroke-width="2"/>
  <text x="370" y="110" text-anchor="middle">DB B</text>
  <path d="M370 60 L370 90" stroke="#b8541a" fill="none" stroke-width="2"/>
  
  <path d="M140 30 L310 30" stroke="#1a1a1a" fill="none" stroke-width="2" stroke-dasharray="4"/>
  <path d="M310 30 l-6 -3 v6 z" fill="#1a1a1a"/>
  <text x="225" y="25" text-anchor="middle">API Request</text>

  <path d="M140 105 L310 105" stroke="#cc0000" fill="none" stroke-width="2" stroke-dasharray="4"/>
  <path d="M310 105 l-6 -3 v6 z" fill="#cc0000"/>
  <text x="225" y="100" text-anchor="middle" fill="#cc0000" font-weight="bold">BANNED</text>
</svg>

- This rule ensures that a team can refactor their schema, rename columns, or switch from Postgres to MongoDB without asking any other team for permission

### The failure

- The exception that ruins the rule is the reporting team. Because they need to join data across the entire company, someone grants them read-only credentials to every production database
- The reporting team's nightly jobs begin locking tables. When Service A tries to drop a column, the reporting queries break. The schema is coupled again. The correct fix is to stream data out to a dedicated data warehouse via Change Data Capture (CDC)
