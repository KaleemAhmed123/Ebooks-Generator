## Active-Active vs Active-Passive

Active-passive keeps a standby idle and promotes it on failure. Active-active
serves from both sites at once, which means both can write the same row.

The second one is not the first one with better uptime. It is a different
system, because you now own conflict resolution.

| | Active-passive | Active-active |
|---|---|---|
| Standby capacity | wasted | in use |
| Recovery time | failover duration | none |
| Conflicting writes | impossible | **your problem** |

Teams pick active-active for the capacity and discover the conflict question
in production, usually as two support tickets describing the same order with
different totals.

## Anti-Corruption Layer

A translation layer between your model and someone else's, so their concepts
stop at the boundary instead of spreading through your code.

A payment provider's twenty-field webhook becomes your four-field
`PaymentResult` at the edge. Swapping providers then touches one adapter
rather than forty files.

<svg viewBox="0 0 460 96" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="External model passes through an anti-corruption layer adapter before reaching your domain model">
  <rect x="4" y="26" width="112" height="40" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="60" y="43" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#1a1a1a">external</text>
  <text x="60" y="57" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#1a1a1a">model</text>
  <path d="M118 46 H166" stroke="#1a1a1a" stroke-width="1.4"/>
  <path d="M166 46 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="170" y="20" width="120" height="52" fill="#e2fcf3" stroke="#2b5fa8" stroke-width="1.8"/>
  <text x="230" y="41" text-anchor="middle" font-family="Consolas,monospace" font-size="10" fill="#2b5fa8">ACL adapter</text>
  <text x="230" y="58" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">quirks stop here</text>
  <path d="M292 46 H340" stroke="#1a1a1a" stroke-width="1.4"/>
  <path d="M340 46 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="344" y="26" width="112" height="40" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="400" y="43" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#1a1a1a">your</text>
  <text x="400" y="57" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#1a1a1a">model</text>
  <text x="230" y="88" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">without it, the vendor's schema becomes yours permanently</text>
</svg>
