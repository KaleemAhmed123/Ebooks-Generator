## Fan-out without knowing who listens

- When an order is placed, billing wants a receipt, the warehouse wants a pick list and analytics wants a row. With direct calls the order service calls all three, and every new team that wants to hear about orders needs a change inside the order service
- **Fan-out** is the broker copying one message to every consumer that asked for it. The order service publishes one `OrderPlaced` and never learns who reads it

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

- Adding a reader is a change on the reader's side only: subscribe, deploy. The producer's code, load and release schedule are untouched. This is what "decoupled" means when it is said about events
- The producer also stops deciding what a listener does with the event. Billing may act in a second; analytics may batch overnight. Each reads at its own rate, from its own copy or its own position (Module 2)

### The failure

- The payload is now a contract with parties the producer cannot see. Someone removes `address.postcode` from the event because the order service stopped using it; the warehouse label printer, which nobody in the order team knew existed, breaks in production. An event with unknown readers is a public API. Module 11 is how to change one without that
