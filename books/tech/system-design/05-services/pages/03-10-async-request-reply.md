## Async request/reply

- Sometimes you need an answer from a dependency, but the computation takes 10 minutes (like generating a massive PDF report). A synchronous HTTP call will timeout
- You solve this with asynchronous request/reply. Service A drops a message in a queue, and immediately returns to the user. The message includes a `correlationId` and a "Reply-To" destination (a queue name or a webhook URL)

<svg viewBox="0 0 460 140" role="img" aria-label="Async Request/Reply. Service A sends a message with a correlation ID to a queue. Service B processes it and sends a reply to a callback queue with the same ID." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="80" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="60" y="74" text-anchor="middle">Service A</text>
  
  <rect x="150" y="20" width="160" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2"/>
  <text x="230" y="40" text-anchor="middle">Request Queue</text>
  
  <rect x="150" y="90" width="160" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2"/>
  <text x="230" y="110" text-anchor="middle">Reply Queue</text>
  
  <rect x="360" y="50" width="80" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="400" y="74" text-anchor="middle">Service B</text>
  
  <path d="M70 50 L150 35" stroke="#1d4e89" fill="none"/>
  <path d="M150 35 l-6 0 v5 z" fill="#1d4e89" transform="rotate(-15 150 35)"/>
  <text x="120" y="30" text-anchor="middle" font-size="7">id: 42</text>
  
  <path d="M310 35 L390 50" stroke="#1a1a1a" fill="none"/>
  <path d="M390 50 l-5 -3 v6 z" fill="#1a1a1a" transform="rotate(15 390 50)"/>
  
  <path d="M390 90 L310 105" stroke="#b8541a" fill="none"/>
  <path d="M310 105 l6 0 v-5 z" fill="#b8541a" transform="rotate(-15 310 105)"/>
  <text x="340" y="115" text-anchor="middle" font-size="7">id: 42</text>
  
  <path d="M150 105 L70 90" stroke="#1a1a1a" fill="none"/>
  <path d="M70 90 l5 3 v-6 z" fill="#1a1a1a" transform="rotate(15 70 90)"/>
</svg>

- When Service B finishes, it sends the response to the specified destination, attaching the same `correlationId`. Service A uses the ID to match the response back to the original request
- (The deep mechanics of queues and message brokers are covered in the Events booklet)

### The failure

- The failure mode is building a system where Service A blocks a thread waiting for the reply to arrive. If Service B is slow, Service A runs out of threads and crashes
- If you use this pattern, the initial request must complete immediately. Service A should save state to a database ("Report Status: Pending"), and the incoming reply message triggers a separate process to update the database
