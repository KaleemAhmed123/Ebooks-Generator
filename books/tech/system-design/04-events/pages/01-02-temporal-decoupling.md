## Temporal decoupling

- The fundamental purpose of a Message Broker (a queue or a log) is to decouple systems in time. It allows the Producer to finish its job before the Consumer even starts its job

<svg viewBox="0 0 460 140" role="img" aria-label="Temporal decoupling. The Producer writes to the Broker and returns 200 OK. The Consumer is greyed out (dead), but the Producer is unaffected. A backlog builds in the Broker buffer." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="40" width="80" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="60" y="55" text-anchor="middle" font-weight="bold">Producer</text>
  <text x="60" y="70" text-anchor="middle" font-size="6">Returns 200 OK</text>
  
  <rect x="180" y="20" width="100" height="80" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="230" y="35" text-anchor="middle" font-weight="bold">Broker</text>
  <text x="230" y="50" text-anchor="middle" font-size="6">Holds 50,000 messages</text>
  
  <rect x="190" y="60" width="15" height="30" fill="#1d4e89"/>
  <rect x="210" y="60" width="15" height="30" fill="#1d4e89"/>
  <rect x="230" y="60" width="15" height="30" fill="#1d4e89"/>
  <rect x="250" y="60" width="15" height="30" fill="#1d4e89"/>
  
  <rect x="340" y="40" width="80" height="40" rx="3" fill="#f0f0f0" stroke="#999999" stroke-dasharray="2 2"/>
  <text x="380" y="55" text-anchor="middle" font-weight="bold" fill="#999999">Consumer</text>
  <text x="380" y="70" text-anchor="middle" font-size="6" fill="#999999">Currently Crashed</text>
  
  <path d="M100 60 L180 60" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M180 60 l-6 -3 v6 z" fill="#1d4e89"/>
  
  <path d="M280 60 L340 60" stroke="#999999" fill="none" stroke-width="2" stroke-dasharray="2 2"/>
</svg>

- If the Email Service goes down for 4 hours, the Order Service is completely unaware. It continues accepting payments and writes `SendEmail` commands into the Broker. The Broker holds them safely on disk. When the Email Service boots back up, it drains the backlog. A dead consumer is no longer an outage; it is merely a backlog

### The failure

- "The queue is now the outage". If your consumer dies, your site stays up. But if your *broker* dies, your site goes down immediately. By introducing a message broker to solve decoupling, you have elevated the broker to a Tier 1 critical piece of infrastructure. If it runs out of disk space because a dead consumer allowed the backlog to grow silently for a week, you will have a catastrophic outage
