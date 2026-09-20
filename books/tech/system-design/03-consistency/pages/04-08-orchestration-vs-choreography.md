## Orchestration vs choreography

- Something has to know that T2 follows T1 and that C1 follows a failed T2. Two shapes. **Orchestration**: one component holds the saga's state machine, calls each service, and decides. **Choreography**: each service reacts to the previous service's event and emits its own; the state is the event trail

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

- The transactional view: an orchestrator can answer "what state is order 42 in" from one row, and knows which compensations to run because it wrote the steps down. A choreography answers only by replaying events, and its compensations are more reactions, each service deciding alone
- The plumbing (brokers, the outbox pattern, ordering, redelivery) is booklet 04's. This page is only about where the decision lives

### The failure

- Choreography with no owner. Five services each did their part; the order is stuck; nobody can say at which step, because no component ever held the sequence. The first thing built after that outage is a table that records the steps, which is an orchestrator by another name
