## Correlation and trace IDs

- When a user clicks "Checkout", the request hits the API Gateway, which calls the Order Service, which calls the Inventory Service and the Payment Service
- If the payment fails, you have an error log in the Payment Service. But how do you find the exact Gateway log and Order log that triggered it?
- A Correlation ID (or Trace ID) solves this. The Gateway generates a unique ID for the incoming request. It passes this ID in the HTTP headers to the Order Service, which passes it to Inventory and Payment. Every service includes this ID in every log entry

<svg viewBox="0 0 460 140" role="img" aria-label="Correlation ID. The Gateway generates ID 8f3a and passes it to Order Service, which puts it in a Queue, which is read by Payment Service." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="68" text-anchor="middle">Gateway</text>
  <text x="60" y="95" text-anchor="middle" font-size="7">Generates: 8f3a</text>
  
  <rect x="150" y="50" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="190" y="68" text-anchor="middle">Order Service</text>
  <text x="190" y="95" text-anchor="middle" font-size="7">Logs: [8f3a] Saved</text>
  
  <rect x="280" y="50" width="60" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2"/>
  <text x="310" y="68" text-anchor="middle">Queue</text>
  
  <rect x="380" y="50" width="60" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="410" y="68" text-anchor="middle">Payment</text>
  <text x="410" y="95" text-anchor="middle" font-size="7">Logs: [8f3a] Error</text>
  
  <path d="M100 65 L150 65" stroke="#1a1a1a" fill="none"/>
  <path d="M150 65 l-5 -3 v6 z" fill="#1a1a1a"/>
  
  <path d="M230 65 L280 65" stroke="#1a1a1a" fill="none"/>
  <path d="M280 65 l-5 -3 v6 z" fill="#1a1a1a"/>
  
  <path d="M340 65 L380 65" stroke="#1a1a1a" fill="none"/>
  <path d="M380 65 l-5 -3 v6 z" fill="#1a1a1a"/>
</svg>

````typescript
// W3C Trace Context format is the industry standard
// traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01
fetch('http://order-service', {
  headers: { 'traceparent': currentTrace.toString() }
});
````

### The failure

- The failure is dropping the correlation ID during asynchronous work. The Order Service puts a message on an event queue, but forgets to include the `traceparent` header in the message metadata
- When the Payment worker picks up the message, it generates a brand new ID. The trace is broken, and you can no longer connect the payment failure to the user's checkout request
