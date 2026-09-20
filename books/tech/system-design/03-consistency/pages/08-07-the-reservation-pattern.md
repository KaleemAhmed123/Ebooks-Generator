## The reservation pattern

- When a user selects a ticket, they need time to type in their credit card. If you don't lock the ticket, someone else might buy it out from under them while they type. We need a state machine
- This is the **Reservation Pattern**. The ticket moves from `AVAILABLE` to `RESERVED` for a strictly enforced time window (e.g., 10 minutes)

<svg viewBox="0 0 460 140" role="img" aria-label="The reservation pattern. Ticket moves from AVAILABLE to RESERVED. If payment succeeds, it moves to SOLD. If 10 minutes pass, it moves back to AVAILABLE." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="50" y="50" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="90" y="69" text-anchor="middle" font-weight="bold">AVAILABLE</text>
  
  <rect x="190" y="50" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="230" y="69" text-anchor="middle" font-weight="bold">RESERVED</text>
  
  <rect x="330" y="20" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="370" y="39" text-anchor="middle" font-weight="bold">SOLD</text>
  
  <path d="M130 65 L190 65" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M190 65 l-6 -3 v6 z" fill="#1d4e89"/>
  <text x="160" y="60" text-anchor="middle" font-size="6">User clicks</text>
  
  <path d="M270 55 L330 35" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M330 35 l-6 1 v-5 z" fill="#1d4e89" transform="rotate(20 330 35)"/>
  <text x="300" y="40" font-size="6">Payment OK</text>
  
  <path d="M230 80 L230 110 L90 110 L90 80" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M90 80 l-3 6 h6 z" fill="#b8541a"/>
  <text x="160" y="105" text-anchor="middle" font-size="6" fill="#b8541a" font-weight="bold">10-Minute Timeout</text>
</svg>

- While the ticket is `RESERVED`, no other user can click it. It is physically removed from the pool of available tickets. The user is guaranteed that if they complete checkout within 10 minutes, the ticket is theirs

### The failure

- Asking for payment before reserving the seat. If you allow multiple users to put the same ticket in their cart, and only resolve the conflict when they hit "Pay", 99 users will have their credit cards charged and immediately refunded because the seat was already taken by the fastest typer. This causes massive customer anger and millions of dollars in Stripe refund fees. You must guarantee the seat *before* you charge the card
