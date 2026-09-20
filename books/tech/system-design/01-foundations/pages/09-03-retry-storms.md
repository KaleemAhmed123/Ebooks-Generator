## Retry storms

- When a popular dependency goes down, all its clients queue up their requests. When it comes back online, the clients do not send their normal traffic rate. They send their normal rate **plus** all the retries they queued up

<svg viewBox="0 0 460 140" role="img" aria-label="Graph of load over time. Load drops to zero during a 2-minute outage. When service restores, load spikes to 3x normal due to retries, crashing the service again." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M40 110 L440 110" stroke="#1a1a1a"/>
  <path d="M40 110 L40 20" stroke="#1a1a1a"/>
  <text x="30" y="25" text-anchor="end" fill="#6b6b6b">Load</text>
  <text x="440" y="125" text-anchor="end" fill="#6b6b6b">Time</text>
  
  <path d="M40 70 L120 70 L120 110 L200 110 L200 30 L220 30 L220 110 L280 110 L280 40 L300 40 L300 70 L440 70" fill="none" stroke="#1d4e89" stroke-width="2"/>
  
  <path d="M40 50 L440 50" stroke="#b8541a" stroke-dasharray="3 3"/>
  <text x="435" y="45" text-anchor="end" fill="#b8541a">Server Capacity</text>
  
  <text x="160" y="125" text-anchor="middle" font-size="8">Outage</text>
  <text x="210" y="20" text-anchor="middle" font-size="8" fill="#b8541a">Retry Storm (crash)</text>
  <text x="290" y="30" text-anchor="middle" font-size="8" fill="#b8541a">Second Storm (crash)</text>
  
  <rect x="120" y="110" width="80" height="4" fill="#6b6b6b" opacity="0.3"/>
</svg>

- This is a **retry storm**. The recovery is when it hurts. The dependency cannot heal because the moment it accepts traffic, it is crushed by the backlog of retries
- An outage that should have lasted two minutes (a rolling deployment) lasts two hours because the clients will not let the server stand up

### The failure

- A Redis cluster fails over. It takes 15 seconds. The 5,000 application servers all retry their missed requests the instant the new primary accepts connections. The new primary's CPU hits 100% and it drops connections. The cycle repeats until operators manually shut off the application servers
