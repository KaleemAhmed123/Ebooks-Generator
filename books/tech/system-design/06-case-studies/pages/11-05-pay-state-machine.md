## Payment state machine

- A payment is a row with a `status`, and the only writes to it are transitions: `UPDATE payments SET status = 'captured' WHERE id = $1 AND status = 'authorised'`. The `WHERE` on the current state is the whole defence. A duplicate event, a late event, a replayed webhook, all match zero rows and do nothing; the ledger rows (page 3) and the outbox event (booklet 04) are written in the same transaction as the one row that did change

<svg viewBox="0 0 460 134" role="img" aria-label="Payment states as boxes: created, authorised, captured, settled, left to right, with failed below the first two and refunded below the last two. Arrows: created to authorised on authorisation; authorised to captured on capture, with a ledger posting; captured to settled from the settlement file on page 6; created or authorised to failed on decline or expiry; captured or settled to refunded on refund, with a reverse posting. Every arrow is a conditional update on the current state. An orange cross marks a second capture event: the update with WHERE status equals authorised matches zero rows and is ignored, whereas a plain SET would capture twice and post the ledger twice." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <g fill="#fff" stroke="#333"><rect x="10" y="24" width="72" height="24" rx="3"/><rect x="130" y="24" width="72" height="24" rx="3"/><rect x="250" y="24" width="72" height="24" rx="3"/><rect x="370" y="24" width="72" height="24" rx="3"/></g>
  <g text-anchor="middle"><text x="46" y="39">created</text><text x="166" y="39">authorised</text><text x="286" y="39">captured</text><text x="406" y="39">settled</text></g>
  <line x1="82" y1="36" x2="130" y2="36" stroke="#333" marker-end="url(#d)"/><text x="106" y="31" text-anchor="middle" font-size="7">auth ok</text>
  <line x1="202" y1="36" x2="250" y2="36" stroke="#333" marker-end="url(#d)"/><text x="226" y="31" text-anchor="middle" font-size="7">capture</text><text x="226" y="55" text-anchor="middle" font-size="7">+ ledger posting</text>
  <line x1="322" y1="36" x2="370" y2="36" stroke="#333" marker-end="url(#d)"/><text x="346" y="31" text-anchor="middle" font-size="7">settlement</text><text x="346" y="55" text-anchor="middle" font-size="7">file (page 6)</text>
  <rect x="70" y="76" width="72" height="24" rx="3" fill="#fbe9e2" stroke="#bf4c28"/><text x="106" y="91" text-anchor="middle">failed</text>
  <line x1="60" y1="48" x2="94" y2="76" stroke="#333" marker-end="url(#d)"/><line x1="152" y1="48" x2="118" y2="76" stroke="#333" marker-end="url(#d)"/><text x="106" y="110" text-anchor="middle" font-size="7">declined, expired</text>
  <rect x="310" y="76" width="72" height="24" rx="3" fill="#e6f2ff" stroke="#333"/><text x="346" y="91" text-anchor="middle">refunded</text>
  <line x1="300" y1="48" x2="334" y2="76" stroke="#333" marker-end="url(#d)"/><line x1="392" y1="48" x2="358" y2="76" stroke="#333" marker-end="url(#d)"/><text x="346" y="110" text-anchor="middle" font-size="7">refund: reverse posting</text>
  <text x="6" y="128" font-size="7.5" fill="#bf4c28">✕ a second "capture" event: UPDATE … WHERE status = 'authorised' matches 0 rows and is ignored; a plain SET captures twice</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
  </defs>
</svg>

- Each transition is one transaction: the conditional update, the ledger rows it implies, the outbox row for "payment captured". If the update matched zero rows, the transaction writes nothing else either, and the webhook is acknowledged as already handled. Stripe's docs promise neither ordering nor single delivery (page 4), and this is the design that does not need either
- The transitions are the API of the row. Nothing else updates `payments`, no batch job "fixes" a status, and a support tool that needs to move a payment calls the same transition with an audit reason. Module 8, page 5 is the same machine for a trip

### The failure

- A retry that re-runs "capture" on a captured payment. The webhook arrives twice, the handler calls the PSP's capture again or posts the ledger again, and the customer is charged twice, or the merchant is credited twice. `WHERE status = 'authorised'` is the fix; the row's state is the lock
