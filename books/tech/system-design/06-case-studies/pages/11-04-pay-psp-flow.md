## The PSP flow

- You do not process credit cards directly. You integrate with a Payment Service Provider (PSP) like Stripe or Adyen
- **The Flow:**
  1. Your frontend calls your backend to create an `Intent`
  2. Your backend calls the PSP to get a client secret
  3. The frontend sends the credit card directly to the PSP (bypassing your servers completely for PCI compliance)
  4. The PSP processes the card
  5. The PSP fires an asynchronous **Webhook** to your backend: "Payment Succeeded"
- Your backend must acknowledge the webhook with a 200 OK. If it doesn't, the PSP will retry (at-least-once delivery)

<svg viewBox="0 0 460 110" role="img" aria-label="Frontend talks to PSP directly for PCI compliance; PSP sends webhook to backend" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="10" y="30" width="60" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="40" y="49" text-anchor="middle" font-weight="bold">Frontend</text>
  
  <rect x="200" y="70" width="70" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="235" y="89" text-anchor="middle" font-weight="bold" fill="#1d4e89">Your Backend</text>
  
  <rect x="200" y="10" width="70" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="235" y="29" text-anchor="middle" font-weight="bold" fill="#b8541a">PSP (Stripe)</text>
  
  <path d="M70 30 L200 15" stroke="#b8541a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="135" y="20" text-anchor="middle" font-size="6">Send Card Data</text>
  
  <path d="M235 40 L235 70" stroke="#1d4e89" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="260" y="55" text-anchor="middle" font-size="6">Webhook</text>
</svg>

### The failure

- Fulfilling the user's order because the frontend sent a message saying "Payment Success". The user can easily forge that HTTP request using Chrome DevTools. The backend must only trust the PSP webhook

:::interview
A hacker opens Chrome DevTools and changes the PSP response to say "Success". They get the product for free. What did you do wrong?

You trusted the client. Never fulfil an order based on client-side state. The backend must wait for the cryptographically signed Webhook directly from the PSP's servers.
:::\n