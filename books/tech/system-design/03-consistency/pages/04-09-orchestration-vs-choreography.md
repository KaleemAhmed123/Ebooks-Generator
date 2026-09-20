## Orchestration vs Choreography

- To run a saga, something has to tell Service B to execute after Service A finishes. There are two ways to build this: **Orchestration** and **Choreography**

<svg viewBox="0 0 460 140" role="img" aria-label="Orchestration vs Choreography. Orchestration uses a central coordinator telling services what to do. Choreography uses services reacting to events on a message broker." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <!-- Orchestration -->
  <rect x="20" y="20" width="180" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="110" y="35" text-anchor="middle" font-weight="bold">Orchestration</text>
  
  <rect x="80" y="50" width="60" height="30" rx="15" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="110" y="69" text-anchor="middle" font-weight="bold">Orchestrator</text>
  
  <rect x="30" y="90" width="40" height="20" fill="#fff" stroke="#1a1a1a"/>
  <text x="50" y="104" text-anchor="middle">Svc A</text>
  <path d="M85 75 L65 90" stroke="#1d4e89" fill="none"/><path d="M65 90 l6 -1 v5 z" fill="#1d4e89" transform="rotate(35 65 90)"/>
  
  <rect x="90" y="90" width="40" height="20" fill="#fff" stroke="#1a1a1a"/>
  <text x="110" y="104" text-anchor="middle">Svc B</text>
  <path d="M110 80 L110 90" stroke="#1d4e89" fill="none"/><path d="M110 90 l-3 -5 h6 z" fill="#1d4e89"/>
  
  <rect x="150" y="90" width="40" height="20" fill="#fff" stroke="#1a1a1a"/>
  <text x="170" y="104" text-anchor="middle">Svc C</text>
  <path d="M135 75 L155 90" stroke="#1d4e89" fill="none"/><path d="M155 90 l-6 -1 v5 z" fill="#1d4e89" transform="rotate(-35 155 90)"/>
  
  <!-- Choreography -->
  <rect x="240" y="20" width="180" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="330" y="35" text-anchor="middle" font-weight="bold">Choreography</text>
  
  <rect x="250" y="70" width="160" height="20" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="330" y="84" text-anchor="middle" font-weight="bold">Event Broker (e.g., Kafka)</text>
  
  <rect x="260" y="45" width="40" height="20" fill="#fff" stroke="#1a1a1a"/>
  <text x="280" y="59" text-anchor="middle">Svc A</text>
  <path d="M280 65 L280 70" stroke="#1a1a1a" fill="none"/><path d="M280 70 l-3 -4 h6 z" fill="#1a1a1a"/>
  
  <rect x="310" y="95" width="40" height="20" fill="#fff" stroke="#1a1a1a"/>
  <text x="330" y="109" text-anchor="middle">Svc B</text>
  <path d="M330 90 L330 95" stroke="#1a1a1a" fill="none"/><path d="M330 95 l-3 -4 h6 z" fill="#1a1a1a"/>
  
  <rect x="360" y="45" width="40" height="20" fill="#fff" stroke="#1a1a1a"/>
  <text x="380" y="59" text-anchor="middle">Svc C</text>
  <path d="M380 65 L380 70" stroke="#1a1a1a" fill="none"/><path d="M380 70 l-3 -4 h6 z" fill="#1a1a1a"/>
</svg>

- **Orchestration**: A central service holds the state machine. It explicitly commands Service A to run, waits for the reply, and then commands Service B. If something fails, the Orchestrator knows exactly which compensations to trigger
- **Choreography**: There is no central controller. Service A does its work and publishes an `OrderCreated` event to a broker. Service B listens for that event, does its work, and publishes `CardCharged`. The saga's state is implicitly spread across the event trail
- Note: We will cover the mechanics of event brokers (like Kafka) and how to publish events reliably in **Booklet 04: Events**

### The failure

- Choreography with no owner. Because choreography has no central state machine, nobody can answer the question "What state is Order 42 in?" You have to grep through five different service logs to piece the workflow together
