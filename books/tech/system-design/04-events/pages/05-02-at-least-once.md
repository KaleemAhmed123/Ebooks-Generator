## At-least-once

- To guarantee data is never lost, we reverse the order of operations. We process the message *first*, and only commit the offset *after* processing is fully complete.
- This gives us **At-least-once** delivery. The message will be delivered one time, or possibly two times, or three times... but never zero times

<svg viewBox="0 0 460 140" role="img" aria-label="At-least-once timeline. Consumer reads message. Consumer finishes processing and saves to DB. Consumer crashes BEFORE sending Ack. Message is redelivered to a new Consumer." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M50 30 L400 30" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <text x="20" y="33" text-anchor="middle" font-weight="bold">Broker</text>
  
  <rect x="100" y="10" width="40" height="40" fill="#fcfcfc" stroke="#1d4e89"/>
  <text x="120" y="33" text-anchor="middle" font-size="6">Msg 1</text>
  
  <path d="M50 70 L250 70" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <text x="20" y="73" text-anchor="middle" font-weight="bold">Consumer A</text>
  
  <path d="M120 30 L120 70" stroke="#1d4e89" fill="none" stroke-width="1" stroke-dasharray="2 2"/>
  
  <rect x="130" y="70" width="70" height="15" fill="#e2fcf3"/>
  <text x="165" y="80" text-anchor="middle" font-size="6">Processing...</text>
  <text x="165" y="95" text-anchor="middle" font-size="6" fill="#1d4e89">DB Write Success!</text>
  
  <circle cx="210" cy="70" r="4" fill="#b8541a"/>
  <text x="210" y="60" text-anchor="middle" font-size="6" font-weight="bold" fill="#b8541a">CRASH</text>
  
  <path d="M210 70 L230 30" stroke="#b8541a" fill="none" stroke-width="1" stroke-dasharray="2 2"/>
  <text x="250" y="55" text-anchor="middle" font-size="6" fill="#b8541a">Ack never arrives</text>
  
  <path d="M50 120 L400 120" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <text x="20" y="123" text-anchor="middle" font-weight="bold">Consumer B</text>
  
  <path d="M280 30 L280 120" stroke="#1d4e89" fill="none" stroke-width="1" stroke-dasharray="2 2"/>
  <text x="320" y="80" text-anchor="middle" font-weight="bold" fill="#b8541a">Redelivery</text>
  
  <rect x="290" y="120" width="70" height="15" fill="#e2fcf3"/>
  <text x="325" y="130" text-anchor="middle" font-size="6">Processing again!</text>
</svg>

- This is the industry standard for asynchronous systems. It guarantees you will never lose a user's data.

### The failure

- Crashing after the database write, but before the commit. The network is fundamentally unreliable. Your consumer can perfectly process a message, successfully save the result to Postgres, and then try to send the Ack to the broker. If the network drops at that exact millisecond, the broker never receives the Ack. Eventually, the broker assumes the consumer died and redelivers the message to someone else. You have now executed the exact same database write twice
