## Event collaboration (Choreography)

- When multiple services need to work together to complete a business process, **Choreography** is the purely event-driven approach.
- There is no central orchestrator telling anyone what to do. Like dancers reacting to the music, each service listens for an event, does its job, and emits a new event.

<svg viewBox="0 0 460 140" role="img" aria-label="Choreography. A circle of services. Order emits OrderCreated. Payment listens, charges, emits PaymentSuccess. Shipping listens, packs, emits OrderShipped. Billing listens..." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="50" y="20" width="60" height="30" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="80" y="39" text-anchor="middle" font-weight="bold">Orders</text>
  
  <path d="M110 35 L190 35" stroke="#1d4e89" fill="none" stroke-width="1"/><path d="M190 35 l-6 -3 v6 z" fill="#1d4e89"/>
  <text x="150" y="30" text-anchor="middle" font-size="6">OrderCreated</text>
  
  <rect x="190" y="20" width="60" height="30" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="220" y="39" text-anchor="middle" font-weight="bold">Payment</text>
  
  <path d="M220 50 L220 90" stroke="#1d4e89" fill="none" stroke-width="1"/><path d="M220 90 l-3 -6 h6 z" fill="#1d4e89"/>
  <text x="250" y="70" text-anchor="middle" font-size="6">PaymentSuccess</text>
  
  <rect x="190" y="90" width="60" height="30" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="220" y="109" text-anchor="middle" font-weight="bold">Shipping</text>
  
  <path d="M190 105 L110 105" stroke="#1d4e89" fill="none" stroke-width="1"/><path d="M110 105 l6 -3 v6 z" fill="#1d4e89"/>
  <text x="150" y="100" text-anchor="middle" font-size="6">OrderShipped</text>
  
  <rect x="50" y="90" width="60" height="30" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="80" y="109" text-anchor="middle" font-weight="bold">Billing</text>
  
  <path d="M80 90 L80 50" stroke="#1d4e89" fill="none" stroke-width="1"/><path d="M80 50 l-3 6 h6 z" fill="#1d4e89"/>
  <text x="50" y="70" text-anchor="middle" font-size="6">InvoicePaid</text>
</svg>

- The Orders service doesn't know about Payment. Payment doesn't know about Shipping. This creates beautifully decoupled services that can be deployed and scaled completely independently.

### The failure

- Understanding the flow requires reading 5 different codebases. Six months later, a PM asks: "What exactly happens when a user clicks Checkout?" No single engineer knows the answer. You have to open the Orders repo to see what it emits. Then you search Github to see who listens to `OrderCreated`. You find Payment and Fraud. You open the Payment repo to see what it emits. You search Github again. The business logic of your most critical flow (Checkout) is no longer written down in code; it only exists ephemerally in the emergent behavior of the routing mesh. Troubleshooting a failure means tracing logs across 5 different services
