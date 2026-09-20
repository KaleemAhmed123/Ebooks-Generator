## State is a derivative

- In a traditional database, you store the *current state* of an entity. If a user changes their address, you `UPDATE` the row. The old address is gone forever.
- In **Event Sourcing**, the primary source of truth is not the state, but a log of *events* that led to that state. State is simply a derivative: `state = reduce(events)`

<svg viewBox="0 0 460 140" role="img" aria-label="State is a derivative. A sequence of events (Created, AddressChanged, AddressChanged) is reduced into a single Materialized View showing the current state." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="220" height="100" fill="#fcfcfc" stroke="#1d4e89" stroke-width="2"/>
  <text x="130" y="35" text-anchor="middle" font-weight="bold" fill="#1d4e89">The Event Log (Source of Truth)</text>
  
  <rect x="30" y="45" width="200" height="20" fill="#e6f2ff" stroke="#1a1a1a"/>
  <text x="130" y="58" text-anchor="middle" font-size="6">1. UserCreated (id: 99, address: 'NY')</text>
  
  <rect x="30" y="70" width="200" height="20" fill="#e6f2ff" stroke="#1a1a1a"/>
  <text x="130" y="83" text-anchor="middle" font-size="6">2. AddressChanged (id: 99, address: 'SF')</text>
  
  <rect x="30" y="95" width="200" height="20" fill="#e6f2ff" stroke="#1a1a1a"/>
  <text x="130" y="108" text-anchor="middle" font-size="6">3. AddressChanged (id: 99, address: 'LA')</text>
  
  <path d="M240 70 L280 70" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <path d="M280 70 l-6 -3 v6 z" fill="#1a1a1a"/>
  <text x="260" y="65" text-anchor="middle" font-size="6">reduce()</text>
  
  <rect x="290" y="40" width="150" height="60" fill="#e2fcf3" stroke="#1a1a1a"/>
  <text x="365" y="55" text-anchor="middle" font-weight="bold">Materialized View</text>
  <text x="365" y="75" text-anchor="middle" font-size="6">id: 99</text>
  <text x="365" y="85" text-anchor="middle" font-size="6">current_address: 'LA'</text>
  <text x="365" y="95" text-anchor="middle" font-size="6">moves: 2</text>
</svg>

- If you want to know the user's current address, you replay the events from the beginning. If you want to know what their address was last Tuesday, you replay the events up to last Tuesday.

### The failure

- Updating a column directly destroys the history. If you are building a banking application and you only store `balance = 500`, you cannot answer the customer when they ask "Where did my money go?" You have destroyed the journey. In event sourcing, the balance is dynamically calculated by summing the `Deposit` and `Withdrawal` events. You never `UPDATE` an event sourced system; you only `INSERT` new events
