## Choreography and orchestration

<svg viewBox="0 0 460 120" role="img" aria-label="Choreography versus orchestration. Choreography is a ring of services each reacting to the last. Orchestration is one hub sending commands to every service." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="110" y="15" text-anchor="middle" font-weight="bold">choreography</text>
  <circle cx="60" cy="55" r="18" fill="none" stroke="#333"/>
  <circle cx="110" cy="30" r="18" fill="none" stroke="#333"/>
  <circle cx="160" cy="55" r="18" fill="none" stroke="#333"/>
  <circle cx="110" cy="85" r="18" fill="none" stroke="#333"/>
  <path d="M75 45 L98 37" stroke="#333" marker-end="url(#ch10)"/>
  <path d="M124 38 L148 47" stroke="#333" marker-end="url(#ch10)"/>
  <path d="M155 70 L122 80" stroke="#333" marker-end="url(#ch10)"/>
  <path d="M97 80 L70 68" stroke="#333" marker-end="url(#ch10)"/>
  <line x1="230" y1="10" x2="230" y2="110" stroke="#ccc" stroke-dasharray="2 2"/>
  <text x="345" y="15" text-anchor="middle" font-weight="bold">orchestration</text>
  <rect x="315" y="45" width="60" height="26" fill="none" stroke="#bf4c28"/>
  <text x="345" y="62" text-anchor="middle" font-size="7" fill="#bf4c28">orchestrator</text>
  <circle cx="270" cy="30" r="14" fill="none" stroke="#333"/>
  <circle cx="420" cy="30" r="14" fill="none" stroke="#333"/>
  <circle cx="270" cy="90" r="14" fill="none" stroke="#333"/>
  <circle cx="420" cy="90" r="14" fill="none" stroke="#333"/>
  <path d="M315 50 L282 38" stroke="#333"/>
  <path d="M375 50 L408 38" stroke="#333"/>
  <path d="M315 63 L282 82" stroke="#333"/>
  <path d="M375 63 L408 82" stroke="#333"/>
  <defs><marker id="ch10" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- **Choreography**: each service reacts to the last event and emits its own; there is no coordinator. microservices.io's own description: it "publishes domain events that trigger local transactions in other services." Nothing new to deploy — and nothing that draws the workflow either; it exists only as N independent subscriptions
- **Orchestration**: one orchestrator sends commands and consumes replies; the workflow is one state machine in one place. microservices.io: it "tells the participants what local transactions to execute." The orchestrator's own state must survive a crash mid-saga, which means its command-sending is itself subject to the dual-write problem (Module 8) and needs the same outbox treatment
- Choreography scales in step count without a new bottleneck service; orchestration scales in operability, because the whole flow is one thing to read, retry, and page someone about

### The failure

- Choreography past four or five steps with no single place that shows the flow. A new engineer asked "what happens after payment fails" has to search a dozen services for a subscription, because Fowler's own warning holds — "it's not explicit in any program text." Orchestration trades that away for one visible state machine
