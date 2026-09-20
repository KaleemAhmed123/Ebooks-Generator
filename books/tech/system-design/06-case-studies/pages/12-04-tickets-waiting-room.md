## Virtual waiting room

- If 100,000 users hit the seat map simultaneously, your database will melt, no matter how many read replicas you have
- **The Waiting Room:** You place a gateway in front of the application. It acts as a strict rate limiter (→03 Rate Limiting)
- When a user arrives, they are assigned a position in a queue (a simple Redis counter)
- The gateway only admits N users per minute into the actual booking flow
- The queue position is just a number. The user's browser polls every 10 seconds: "Am I allowed in yet?" It is not an open WebSocket connection, which would exhaust gateway memory

<svg viewBox="0 0 460 110" role="img" aria-label="100,000 users hit a waiting room which only lets 1,000 users per minute into the database" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="10" y="30" width="80" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="50" y="45" text-anchor="middle" font-weight="bold" fill="#b8541a">100,000 Users</text>
  <text x="50" y="55" text-anchor="middle" font-size="6" fill="#b8541a">(Spike)</text>
  
  <rect x="160" y="20" width="80" height="50" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="200" y="45" text-anchor="middle" font-weight="bold" fill="#1d4e89">Waiting Room</text>
  <text x="200" y="55" text-anchor="middle" font-size="6" fill="#1d4e89">(Redis Tokens)</text>
  
  <rect x="330" y="30" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="370" y="49" text-anchor="middle" font-weight="bold">Ticket DB</text>
  
  <path d="M90 45 L160 45" stroke="#b8541a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  
  <path d="M240 45 L330 45" stroke="#1d4e89" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="285" y="40" text-anchor="middle" font-size="6">Admits 1,000 / min</text>
</svg>

### The failure

- Letting all 100,000 users hit the active seat map. They will all see the same 10,000 seats, all click the same seats, and generate 100,000 lock contention errors on the database.

:::interview
A popular artist announces a tour. 500,000 fans open your app at 9:00 AM. How do you prevent a total database outage?

Use a Virtual Waiting Room at the edge. It acts as an asynchronous queue, absorbing the traffic spike and only allowing a controlled trickle of users (e.g., 5,000 per minute) into the active booking flow.
:::\n