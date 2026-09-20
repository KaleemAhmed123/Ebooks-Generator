## Snapshots

- If state is dynamically calculated by `reduce(events)`, what happens when a bank account has been open for 10 years and has 500,000 transactions? 
- Replaying 500,000 events every time the user opens their banking app will take several seconds. To solve this, Event Sourced systems use **Snapshots**

<svg viewBox="0 0 460 140" role="img" aria-label="Snapshots. An event log of 1500 events. At event 1000, a Snapshot is saved (balance: 400). To get the current state, you load the snapshot and only replay the last 500 events." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M20 70 L400 70" stroke="#1d4e89" fill="none" stroke-width="4"/>
  <text x="20" y="55" text-anchor="middle" font-weight="bold">Event Log</text>
  
  <circle cx="50" cy="70" r="4" fill="#1a1a1a"/>
  <text x="50" y="90" text-anchor="middle" font-size="6">Event 1</text>
  
  <circle cx="100" cy="70" r="4" fill="#1a1a1a"/>
  <text x="100" y="90" text-anchor="middle" font-size="6">Event 500</text>
  
  <circle cx="200" cy="70" r="8" fill="#b8541a"/>
  <text x="200" y="90" text-anchor="middle" font-size="6" font-weight="bold" fill="#b8541a">Event 1000</text>
  
  <rect x="170" y="20" width="60" height="30" fill="#fce4e2" stroke="#b8541a"/>
  <text x="200" y="32" text-anchor="middle" font-weight="bold" fill="#b8541a">Snapshot</text>
  <text x="200" y="44" text-anchor="middle" font-size="6" fill="#b8541a">Balance: 400</text>
  <path d="M200 50 L200 60" stroke="#b8541a" fill="none" stroke-width="1"/><path d="M200 60 l-2 -4 h4 z" fill="#b8541a"/>
  
  <circle cx="280" cy="70" r="4" fill="#1a1a1a"/>
  <text x="280" y="90" text-anchor="middle" font-size="6">Event 1250</text>
  
  <circle cx="360" cy="70" r="4" fill="#1a1a1a"/>
  <text x="360" y="90" text-anchor="middle" font-size="6">Event 1500</text>
  
  <path d="M200 110 L360 110" stroke="#1a1a1a" fill="none" stroke-width="1" stroke-dasharray="2 2"/>
  <text x="280" y="125" text-anchor="middle" font-weight="bold">Only replay these 500 events!</text>
</svg>

- A snapshot is a cached version of the state at a specific point in time (e.g., every 1,000 events, or every midnight). When you need the current state, you load the most recent snapshot, and then you only replay the events that occurred *after* the snapshot was taken.

### The failure

- A system without snapshots takes 3 hours to boot up. A team builds a successful Event Sourced application without snapshots. It runs fine for two years. Then, the Kubernetes pod crashes and restarts. The framework begins loading the event store to rebuild the in-memory read models. Because there are now 50 million events in the database, the rebuild takes 3 hours. The application is completely offline during this time. You must implement snapshotting before you hit production scale
