## Bounded context

- Domain-Driven Design (DDD) introduces the concept of a bounded context: an explicit boundary within which a domain model and its vocabulary are strictly defined
- Inside the Billing context, a "Customer" is a payment profile, a tax ID, and a credit limit. Inside the Support context, a "Customer" is a ticket history, an email address, and an NPS score. These are two different concepts that happen to share a word

<svg viewBox="0 0 460 140" role="img" aria-label="Two bounded contexts side by side. Support context shows Customer with tickets and email. Billing context shows Customer with tax ID and card." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="50" y="20" width="160" height="100" rx="4" fill="#fcfcfc" stroke="#1d4e89" stroke-dasharray="4"/>
  <text x="130" y="35" text-anchor="middle" font-weight="bold" fill="#1d4e89">Support Context</text>
  <rect x="70" y="45" width="120" height="60" rx="2" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="130" y="60" text-anchor="middle" font-weight="bold">Customer</text>
  <text x="130" y="75" text-anchor="middle">- email</text>
  <text x="130" y="90" text-anchor="middle">- open tickets</text>

  <rect x="250" y="20" width="160" height="100" rx="4" fill="#fcfcfc" stroke="#b8541a" stroke-dasharray="4"/>
  <text x="330" y="35" text-anchor="middle" font-weight="bold" fill="#b8541a">Billing Context</text>
  <rect x="270" y="45" width="120" height="60" rx="2" fill="#fce4e2" stroke="#b8541a"/>
  <text x="330" y="60" text-anchor="middle" font-weight="bold">Customer</text>
  <text x="330" y="75" text-anchor="middle">- tax ID</text>
  <text x="330" y="90" text-anchor="middle">- credit card</text>
</svg>

- In a distributed system, a bounded context maps cleanly to a service boundary. The model does not leak. Billing does not need to know about support tickets to charge a card

### The failure

- The failure mode is attempting to define one canonical "Customer" object that every service imports. You build a massive, 200-field entity that is owned by no one
- When the Support team adds a field, they risk breaking the Billing team's deserializer. Every service becomes coupled to every other service through the shared definition of this god object
