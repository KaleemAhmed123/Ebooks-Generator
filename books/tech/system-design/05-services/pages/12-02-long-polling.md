## Long polling

- Long Polling is a hack to make HTTP feel real-time while saving battery. The client asks "Are there new messages?"
- If there are no messages, the server does *not* reply immediately. Instead, the server simply pauses the thread and holds the HTTP connection open. It waits. When a message finally arrives (maybe 40 seconds later), the server replies, and the connection closes. The client instantly opens a new long-poll request

<svg viewBox="0 0 460 140" role="img" aria-label="Long Polling. Client connects, Server waits, Data arrives, Server replies, Client reconnects." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="30" width="80" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="44" text-anchor="middle">Client</text>
  
  <rect x="180" y="30" width="80" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="220" y="44" text-anchor="middle">Server</text>
  
  <path d="M60 55 L60 120" stroke="#1a1a1a" fill="none" stroke-dasharray="2"/>
  <path d="M220 55 L220 120" stroke="#1a1a1a" fill="none" stroke-dasharray="2"/>
  
  <path d="M60 60 L220 70" stroke="#1a1a1a" fill="none"/>
  <path d="M215 67 l5 3 l-2 -5 z" fill="#1a1a1a"/>
  
  <rect x="215" y="75" width="10" height="30" fill="#fce4e2"/>
  <text x="230" y="90" text-anchor="start" font-size="7">Server holds connection open</text>
  
  <path d="M220 105 L60 115" stroke="#4a8f3c" fill="none" stroke-width="2"/>
  <path d="M65 112 l-5 3 l2 -5 z" fill="#4a8f3c"/>
  <text x="140" y="105" text-anchor="middle" fill="#4a8f3c" font-size="7">Message Arrives! Reply sent</text>
  
  <path d="M60 120 L220 130" stroke="#1a1a1a" fill="none"/>
  <text x="140" y="135" text-anchor="middle" font-size="7">Client instantly reconnects</text>
</svg>

- This solves the battery problem, because the phone antenna can go to sleep while waiting for the server to reply

### The failure

- The failure is the "Thundering Herd". If you have 100,000 users holding a long-poll connection open, and you broadcast a system-wide announcement, the server will reply to all 100,000 users at the exact same millisecond
- Because the protocol requires the client to immediately reconnect to wait for the *next* message, all 100,000 clients will send a brand new HTTP request at the exact same millisecond. This massive spike of inbound connections will crash your load balancer. You must implement a random jitter (e.g., 0-5 seconds) before the client reconnects
