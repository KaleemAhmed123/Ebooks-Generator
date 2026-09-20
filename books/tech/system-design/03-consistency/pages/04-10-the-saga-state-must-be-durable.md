## The saga's state must be durable

- If you use Orchestration, the orchestrator itself is a piece of software that can crash. To survive a crash, the orchestrator must durably write its state to a database ("I just finished Step 2"). But writing state creates a brand new distributed transaction problem

<svg viewBox="0 0 460 140" role="img" aria-label="Saga state durability problem. Orchestrator calls Stripe, Stripe charges the card. The Orchestrator crashes before it can write 'Step 2 Done' to its own database. On reboot, it runs Step 2 again." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="180" y="20" width="100" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="230" y="44" text-anchor="middle" font-weight="bold">Orchestrator</text>
  
  <rect x="20" y="80" width="100" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="70" y="104" text-anchor="middle" font-weight="bold">Stripe API</text>
  
  <rect x="340" y="80" width="100" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="390" y="104" text-anchor="middle" font-weight="bold">Saga State DB</text>
  
  <path d="M190 60 L100 80" stroke="#1d4e89" fill="none"/><path d="M100 80 l6 -1 v5 z" fill="#1d4e89" transform="rotate(20 100 80)"/>
  <text x="125" y="65" font-size="6">1. Charge Card</text>
  
  <path d="M120 80 L210 60" stroke="#1d4e89" fill="none" stroke-dasharray="2 2"/><path d="M210 60 l-6 1 v-5 z" fill="#1d4e89" transform="rotate(20 210 60)"/>
  <text x="165" y="85" font-size="6">2. "Success!"</text>
  
  <path d="M220 50 L240 70" stroke="#b8541a" fill="none" stroke-width="2" stroke-dasharray="2 2"/>
  <path d="M225 65 L235 55" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M235 65 L225 55" stroke="#b8541a" fill="none" stroke-width="2"/>
  <text x="245" y="65" font-size="6" fill="#b8541a" font-weight="bold">3. Crash!</text>
  
  <path d="M270 60 L360 80" stroke="#6b6b6b" fill="none" stroke-dasharray="2 2"/>
  <text x="315" y="65" font-size="6" fill="#6b6b6b">4. Write "Step 2 Done"</text>
</svg>

- In the scenario above, the Orchestrator successfully called Stripe, but its server lost power before it could write "Step 2 Done" to the Saga DB. When the Orchestrator reboots, it looks at the database, sees that Step 2 is not done, and charges the card a second time
- This is why **every step in a saga must be idempotent** (which we covered in Booklet 01). You cannot guarantee that the Orchestrator's internal state machine will perfectly sync with the real-world effects it triggers

### The failure

- Storing orchestrator state in memory. If your orchestrator is a Node.js process that holds the workflow state in a JavaScript variable, a deployment or a crash wipes out every single in-flight saga. The orchestrator must durably persist its state to a database before and after every single step
