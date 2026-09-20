## Denormalize on purpose

- In a normalized database, resolving a relationship requires a query at read time. If the read must be extremely fast, or if the database does not support joins (like DynamoDB or Cassandra), you must **denormalize**
- Denormalization means deliberately duplicating data to make a specific read cheaper. You write the user's name on every order they place

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

- DynamoDB's best practices dictate this: "keep related data together" and "use sort order" rather than joining. You shift the CPU cost from every read to the occasional write

### The failure

- Two copies of the data without a single, authoritative owner of the duplication process. If one microservice updates the `users` table and a different microservice is supposed to update the `orders` table, they will eventually drift
- A denormalization pipeline must be reliable (Module 9). The source of truth must trigger an event, and the consumer must eventually update every duplicate, retrying until it succeeds
