## Orchestration

- The alternative to Choreography is **Orchestration**. 
- A central controller (the Orchestrator) knows the exact steps of the business process. It tells other services what to do via Commands, and waits for them to reply via Events.

<svg viewBox="0 0 460 140" role="img" aria-label="Orchestration. A star topology. The Checkout Orchestrator sits in the center. It sends a Charge Command to Payment, receives Success. It sends a Pack Command to Shipping, receives Success. It holds the state machine." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="180" y="40" width="100" height="60" rx="3" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="230" y="65" text-anchor="middle" font-weight="bold">Checkout</text>
  <text x="230" y="75" text-anchor="middle" font-weight="bold">Orchestrator</text>
  <text x="230" y="90" text-anchor="middle" font-size="6">(State Machine)</text>
  
  <rect x="20" y="55" width="60" height="30" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="50" y="74" text-anchor="middle" font-weight="bold">Payment</text>
  
  <path d="M180 60 L80 60" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M80 60 l6 -3 v6 z" fill="#1a1a1a"/>
  <text x="130" y="55" text-anchor="middle" font-size="6">Cmd: Charge</text>
  
  <path d="M80 80 L180 80" stroke="#1d4e89" fill="none" stroke-width="1" stroke-dasharray="2 2"/><path d="M180 80 l-6 -3 v6 z" fill="#1d4e89"/>
  <text x="130" y="90" text-anchor="middle" font-size="6" fill="#1d4e89">Evt: Success</text>
  
  <rect x="380" y="55" width="60" height="30" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="410" y="74" text-anchor="middle" font-weight="bold">Shipping</text>
  
  <path d="M280 60 L380 60" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M380 60 l-6 -3 v6 z" fill="#1a1a1a"/>
  <text x="330" y="55" text-anchor="middle" font-size="6">Cmd: Pack</text>
  
  <path d="M380 80 L280 80" stroke="#1d4e89" fill="none" stroke-width="1" stroke-dasharray="2 2"/><path d="M280 80 l6 -3 v6 z" fill="#1d4e89"/>
  <text x="330" y="90" text-anchor="middle" font-size="6" fill="#1d4e89">Evt: Success</text>
</svg>

- If a PM asks "What happens during Checkout?", you open the Orchestrator codebase. The entire flow is defined in one place, usually as a formal State Machine.

### The failure

- The god-service and the dumb CRUD wrappers. Because it is so easy to add logic to the Orchestrator, developers get lazy. Instead of putting fraud rules in the Fraud service, they put them in the Orchestrator. Over time, the Orchestrator absorbs all the business logic of the entire company. It becomes a massive, tightly coupled monolith (a "god service"). The other microservices devolve into "dumb" wrappers around databases that just execute simple INSERT and UPDATE commands when the Orchestrator tells them to. You have lost the benefits of microservices entirely
