## The Transactional Outbox

- So far, we've focused on consuming events safely. But producing them safely is just as difficult.
- The **Dual Write Problem** occurs when you need to do two things at once: save state to your database, and emit an event to the broker. 

<svg viewBox="0 0 460 140" role="img" aria-label="The Transactional Outbox problem. User clicks Buy. App saves to Postgres. App crashes before emitting to Kafka. The event is lost." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="60" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="50" y="74" text-anchor="middle" font-weight="bold">App</text>
  
  <path d="M80 60 L180 30" stroke="#1d4e89" fill="none" stroke-width="1"/><path d="M180 30 l-6 -1 v5 z" fill="#1d4e89" transform="rotate(-15 180 30)"/>
  <rect x="190" y="15" width="80" height="30" rx="3" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="230" y="34" text-anchor="middle" font-weight="bold">Postgres</text>
  <text x="130" y="35" text-anchor="middle" font-size="6">1. Save Order</text>
  
  <path d="M80 80 L180 110" stroke="#b8541a" fill="none" stroke-width="1" stroke-dasharray="2 2"/>
  <text x="180" y="110" text-anchor="middle" font-size="10" font-weight="bold" fill="#b8541a">X</text>
  
  <rect x="190" y="95" width="80" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="230" y="114" text-anchor="middle" font-weight="bold">Kafka</text>
  <text x="130" y="110" text-anchor="middle" font-size="6" fill="#b8541a">2. Emit Event</text>
  
  <circle cx="130" cy="95" r="4" fill="#b8541a"/>
  <text x="130" y="85" text-anchor="middle" font-size="6" font-weight="bold" fill="#b8541a">CRASH</text>
</svg>

- If you save to Postgres first, and crash before emitting to Kafka, the system is inconsistent (the order exists, but shipping was never notified). 
- If you emit to Kafka first, and the Postgres save fails, the system is inconsistent (shipping is notified for an order that doesn't exist). 
- You cannot wrap a database and a message broker in a single distributed transaction. 

### The failure

- Treating Kafka as a reliable synchronous API. Developers often write code that saves to the DB, immediately calls `producer.send()`, and assumes it worked. If the Kafka cluster happens to be doing a leader election and blocks writes for 5 seconds, the `send()` call times out. The database commit already succeeded. You now have ghost data in your database that the rest of your asynchronous microservices know nothing about
