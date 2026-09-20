## The Taylor Swift crash

- In November 2022, Ticketmaster's systems famously collapsed during the Taylor Swift Eras Tour Verified Fan presale. Despite years of engineering, the system still broke
- **What happened?**
  1. The Verified Fan system sent out 1.5 million codes. Ticketmaster assumed only those 1.5 million people would show up.
  2. Instead, 14 million people (plus bots) showed up. The CDN waiting room infrastructure, which was supposed to shield the backend, was overwhelmed by the sheer volume of connections.
  3. The database tracking *who was allowed in the queue* melted down.

<svg viewBox="0 0 460 140" role="img" aria-label="The Taylor Swift crash. 14 million users hit the queue, melting the database that verifies who is allowed in the queue, bypassing the CDN." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="40" width="80" height="60" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="60" text-anchor="middle" font-weight="bold">14 Million</text>
  <text x="60" y="70" text-anchor="middle" font-weight="bold">Unverified Users</text>
  
  <rect x="150" y="20" width="100" height="100" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="200" y="35" text-anchor="middle" font-weight="bold">CDN Edge</text>
  <text x="200" y="55" text-anchor="middle" font-size="7">Validates Token</text>
  
  <path d="M100 70 L150 70" stroke="#1a1a1a" fill="none" stroke-width="4"/><path d="M150 70 l-6 -3 v6 z" fill="#1a1a1a"/>
  
  <rect x="300" y="40" width="120" height="60" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="360" y="55" text-anchor="middle" font-weight="bold">Auth Database</text>
  <text x="360" y="70" text-anchor="middle" font-size="7">Checks JWT tokens</text>
  <text x="360" y="85" text-anchor="middle" font-size="7" fill="#b8541a" font-weight="bold">CRASHED (100% CPU)</text>
  
  <path d="M250 70 L300 70" stroke="#b8541a" fill="none" stroke-width="4"/><path d="M300 70 l-6 -3 v6 z" fill="#b8541a"/>
  <text x="275" y="65" text-anchor="middle" font-size="6" fill="#b8541a">14M queries/sec</text>
</svg>

- The backend ticket database never crashed. It never even saw the load. The system failed at the **Queue Authentication Layer**. Ticketmaster's CDN had to ask a central database "Is this JWT token valid for the queue?" 14 million times per second. That database fell over, taking the entire sale down with it

### The failure

- Assuming the queue itself is infinitely scalable. A virtual waiting room is only as strong as its weakest dependency. If the waiting room requires a synchronous network call to a relational database to verify a user's eligibility, you have simply moved the bottleneck from the checkout flow to the queue flow
