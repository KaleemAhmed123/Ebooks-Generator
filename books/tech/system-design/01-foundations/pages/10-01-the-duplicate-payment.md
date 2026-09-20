# Module 10 - Idempotency

## The duplicate payment

- The failure that gives this module its reason to exist:

<svg viewBox="0 0 460 120" role="img" aria-label="A POST /payment request is processed by the server, but the 200 OK reply is lost. The client sees a timeout, retries, and the server processes it again. The customer is charged twice." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">
  <rect x="20" y="20" width="60" height="80" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="50" y="64" text-anchor="middle">Client</text>
  <rect x="380" y="20" width="60" height="80" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="410" y="64" text-anchor="middle">Server</text>
  
  <path d="M80 30 L380 30" stroke="#1a1a1a"/><path d="M380 30 l-6 -3 v6 z" fill="#1a1a1a"/>
  <text x="230" y="26" text-anchor="middle" font-size="8">1. POST /charge $50</text>
  
  <text x="445" y="44" font-size="8" fill="#1d4e89">2. charged</text>
  
  <path d="M380 50 L200 50" stroke="#b8541a" stroke-dasharray="2 2"/>
  <text x="230" y="46" text-anchor="middle" font-size="8" fill="#b8541a">3. 200 OK (Lost)</text>
  
  <text x="15" y="74" text-anchor="end" font-size="8" fill="#b8541a">4. Timeout.</text>
  
  <path d="M80 90 L380 90" stroke="#1a1a1a"/><path d="M380 90 l-6 -3 v6 z" fill="#1a1a1a"/>
  <text x="230" y="86" text-anchor="middle" font-size="8">5. Retry: POST /charge $50</text>
  
  <text x="445" y="104" font-size="8" fill="#b8541a">6. charged again</text>
</svg>

- The client did what Module 8 and 9 said: it hit a timeout, it classified it as transient, it backed off, and it retried
- The problem is not the retry. The network lost the reply, so the client *had* to retry. The problem is that the server processed the second request as if it were a new one

### The failure

- Telling the client "do not retry payments". The network is unreliable. If you ban retries, the customer clicks "Pay", the app spins until it times out, and the customer has no idea if they bought the item or not
- The system must allow the client to retry safely. The server must recognise the retry and say "I already did this, here is the result"
