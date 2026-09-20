## Fan-out without knowing who listens

- The third reason to use a broker is architectural decoupling. When the Order Service finishes an order, who needs to know about it?
- The Billing team needs to generate a receipt. The Warehouse team needs to pick a box. The Analytics team needs to update a dashboard. If you use synchronous APIs, the Order Service team has to constantly update their code every time a new team wants to know about an order

<svg viewBox="0 0 460 140" role="img" aria-label="Fan-out. The Producer publishes one OrderPlaced event to the Broker. The Broker copies it to Billing, Warehouse, and Analytics without the Producer knowing they exist." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="80" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="60" y="65" text-anchor="middle" font-weight="bold">Order Service</text>
  <text x="60" y="80" text-anchor="middle" font-size="6">"I placed an order."</text>
  
  <rect x="180" y="20" width="80" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="220" y="40" text-anchor="middle" font-weight="bold">Broker</text>
  <text x="220" y="70" text-anchor="middle" font-weight="bold">Topic: Orders</text>
  
  <rect x="340" y="10" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="380" y="29" text-anchor="middle">Billing Consumer</text>
  
  <rect x="340" y="55" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="380" y="74" text-anchor="middle">Warehouse Consumer</text>
  
  <rect x="340" y="100" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="380" y="119" text-anchor="middle">Analytics Consumer</text>
  
  <path d="M100 70 L180 70" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M180 70 l-6 -3 v6 z" fill="#1d4e89"/>
  
  <path d="M260 70 L340 25" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M340 25 l-6 -1 v5 z" fill="#1a1a1a" transform="rotate(-30 340 25)"/>
  <path d="M260 70 L340 70" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M340 70 l-6 -3 v6 z" fill="#1a1a1a"/>
  <path d="M260 70 L340 115" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M340 115 l-6 -3 v5 z" fill="#1a1a1a" transform="rotate(30 340 115)"/>
</svg>

- **Fan-out** solves this. The Order Service publishes exactly one message: `OrderPlaced`. It does not know, and does not care, who is listening. The Analytics team can attach a new consumer to the topic without submitting a pull request to the Order Service repo

### The failure

- The payload becomes an implicit contract for consumers the producer cannot see. Because the producer doesn't know who is listening, they might delete the `customer.address.zipCode` field from the JSON payload because they don't use it anymore. Suddenly, the Warehouse team's label printer crashes in production. When you use Fan-out, your event payload is a public API. You can never break it
