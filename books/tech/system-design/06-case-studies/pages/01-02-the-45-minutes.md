## The 45-minute budget

- A standard system design round lasts 45 to 60 minutes. Because time is strictly bounded, your pacing is as important as your technical knowledge. You must actively drive the conversation forward
- A proven time budget divides the round into five phases. Spend 5 minutes on **requirements** and numbers, locking down the scope. Spend 5 minutes on the **API and data model**, defining the shape of the data
- Spend 10 to 15 minutes on the **high-level design**, getting a simple, working architecture onto the board. Spend 10 to 15 minutes on **deep dives**, tackling the hardest scaling or availability bottlenecks. Leave 3 to 5 minutes to wrap up
- You must watch the clock. If you spend 20 minutes calculating exact storage requirements, you will not have time to finish the architecture. The interviewer will not get the signals they need to pass you

<svg viewBox="0 0 600 120" role="img" aria-label="A timeline of a 45 minute interview. Requirements 5m, API 5m, High-level 15m, Deep dive 15m, Wrap 5m." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="11">
  <rect x="10" y="40" width="580" height="40" fill="#f4f4f5" stroke="#d4d4d8" rx="4"/>
  
  <rect x="10" y="40" width="64" height="40" fill="#e2fcf3" stroke="#10b981" rx="4"/>
  <rect x="74" y="40" width="64" height="40" fill="#e0e7ff" stroke="#6366f1" rx="4"/>
  <rect x="138" y="40" width="193" height="40" fill="#fef3c7" stroke="#f59e0b" rx="4"/>
  <rect x="331" y="40" width="193" height="40" fill="#ffe4e6" stroke="#f43f5e" rx="4"/>
  
  <text x="42" y="64" text-anchor="middle" font-weight="bold" fill="#065f46">Scope</text>
  <text x="106" y="64" text-anchor="middle" font-weight="bold" fill="#3730a3">API</text>
  <text x="234" y="64" text-anchor="middle" font-weight="bold" fill="#92400e">High-level design</text>
  <text x="427" y="64" text-anchor="middle" font-weight="bold" fill="#9f1239">Deep dives</text>
  <text x="557" y="64" text-anchor="middle" font-weight="bold" fill="#52525b">Wrap</text>
  
  <text x="10" y="95" text-anchor="middle" fill="#52525b">0m</text>
  <text x="74" y="95" text-anchor="middle" fill="#52525b">5m</text>
  <text x="138" y="95" text-anchor="middle" fill="#52525b">10m</text>
  <text x="331" y="95" text-anchor="middle" fill="#52525b">25m</text>
  <text x="524" y="95" text-anchor="middle" fill="#52525b">40m</text>
  <text x="590" y="95" text-anchor="middle" fill="#52525b">45m</text>
</svg>

### The failure

- The failure mode is losing control of the pacing. A candidate asks question after question about minor product details, and suddenly it is minute 15 and they have not drawn a single box
- The interviewer is forced to interrupt and push the candidate forward. This costs points. You must be the one who says, "I think we have enough requirements, I'm going to move on to the API design now"

:::interview
**The pacing test**
Senior engineers know when a design is "good enough for now" and when to move on. Getting bogged down in trivial details signals an inability to prioritise the critical path.
:::
