## 2. Who owns the state?

- A piece of data can only have **one authoritative writer**. If two services believe they own the same table, they will inevitably write conflicting updates that cannot be merged

<svg viewBox="0 0 460 120" role="img" aria-label="Bad: Service A and Service B both writing to the same Users table. Good: Service A owns the Users table and exposes an API. Service B calls the API." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="120" y="20" text-anchor="middle" font-weight="bold" fill="#b8541a">Shared Database (Bad)</text>
  <rect x="50" y="30" width="50" height="24" rx="3" fill="#fce4e2" stroke="#b8541a"/><text x="75" y="46" text-anchor="middle">Auth</text>
  <rect x="140" y="30" width="50" height="24" rx="3" fill="#fce4e2" stroke="#b8541a"/><text x="165" y="46" text-anchor="middle">Billing</text>
  <path d="M75 54 L120 90" stroke="#b8541a" fill="none"/><path d="M120 90 l-2 -7 h6 z" fill="#b8541a"/>
  <path d="M165 54 L120 90" stroke="#b8541a" fill="none"/><path d="M120 90 l-4 -6 h6 z" fill="#b8541a"/>
  <rect x="95" y="90" width="50" height="24" rx="3" fill="none" stroke="#6b6b6b"/><text x="120" y="106" text-anchor="middle">Users</text>

  <text x="340" y="20" text-anchor="middle" font-weight="bold" fill="#1d4e89">API Ownership (Good)</text>
  <rect x="290" y="30" width="50" height="24" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="315" y="46" text-anchor="middle">Auth</text>
  <path d="M315 54 L315 90" stroke="#1d4e89" fill="none"/><path d="M315 90 l-3 -6 h6 z" fill="#1d4e89"/>
  <rect x="290" y="90" width="50" height="24" rx="3" fill="none" stroke="#6b6b6b"/><text x="315" y="106" text-anchor="middle">Users</text>
  <rect x="380" y="30" width="50" height="24" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="405" y="46" text-anchor="middle">Billing</text>
  <path d="M380 42 L340 42" stroke="#1d4e89" stroke-dasharray="2 2" fill="none"/><path d="M340 42 l6 -3 v6 z" fill="#1d4e89"/>
  <text x="360" y="38" text-anchor="middle" font-size="7">GET /user</text>
</svg>

- When multiple components need the same data, one component must own it. The others must either call an API to fetch it (Module 6), or subscribe to an event stream to build a read-only cache of it (booklets 04 and 05)
- Shared ownership means you cannot safely cache the data, because you never know when the other service will change it underneath you

### The failure

- Two services connecting to the same Postgres database and running `UPDATE users SET...`. When the schema changes, both services break. When a race condition corrupts the data, neither team knows whose code did it
