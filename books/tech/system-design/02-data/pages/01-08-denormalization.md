## Denormalize on purpose

- **Denormalization** is duplicating data on purpose so one read is cheap: the user's name written on every order, so listing orders needs no join
- It is the only option where the store has no join (DynamoDB, Cassandra) and the right option where one read path matters more than write cost

<svg viewBox="0 0 460 140" role="img" aria-label="Denormalization. A User update triggers a background job to update the duplicated username on every related Order." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="80" y="20" width="100" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="130" y="39" text-anchor="middle">User: Alice</text>
  
  <path d="M130 50 L130 70" stroke="#1a1a1a" fill="none"/><path d="M130 70 l-3 -6 h6 z" fill="#1a1a1a"/>
  <rect x="80" y="70" width="100" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="130" y="86" text-anchor="middle">Background</text>
  <text x="130" y="100" text-anchor="middle">Update Job</text>
  
  <path d="M180 90 L270 50" stroke="#1a1a1a" fill="none"/><path d="M270 50 l-6 2 v6 z" fill="#1a1a1a" transform="rotate(-30 270 50)"/>
  <path d="M180 90 L270 90" stroke="#1a1a1a" fill="none"/><path d="M270 90 l-6 -3 v6 z" fill="#1a1a1a"/>
  <path d="M180 90 L270 130" stroke="#1a1a1a" fill="none"/><path d="M270 130 l-6 -6 v6 z" fill="#1a1a1a" transform="rotate(30 270 130)"/>
  
  <rect x="280" y="35" width="100" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="330" y="54" text-anchor="middle">Order: [Alice]</text>
  <rect x="280" y="75" width="100" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="330" y="94" text-anchor="middle">Order: [Alice]</text>
  <rect x="280" y="115" width="100" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="330" y="134" text-anchor="middle">Order: [Alice]</text>
</svg>

- DynamoDB's design guidance is exactly this: keep related data together and use the sort order, with as few tables as possible. The cost moves from every read to each write

### The failure

- Two copies, two writers, no owner. One service updates `users`, another is supposed to update the name on `orders`; one day it does not, and the copies drift for good
- Name one source of truth, and make the copy follow it through a retried, idempotent pipeline (booklet 04, the outbox pattern). A copy nobody owns is a bug with a delay
