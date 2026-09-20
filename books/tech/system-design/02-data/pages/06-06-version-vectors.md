## Detecting concurrent writes

- Before merging or discarding, a replica has to know whether two versions are concurrent or one descends from the other. A timestamp cannot say; a **version vector** can
- Each value carries a list of `(replica, counter)` pairs. A replica bumps its own counter on every write. Comparing two vectors gives one of three answers: A ≤ B everywhere (B descends from A: overwrite), B ≤ A (the reverse), or neither (concurrent: both are kept as **siblings** for the application to merge)

<svg viewBox="0 0 460 104" role="img" aria-label="Three vectors. [a:1] is an ancestor of [a:2], so [a:2] overwrites it. [a:2] and [a:1, b:1] are concurrent: neither dominates, so both are kept as siblings and the application merges them." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="36" width="80" height="26" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="60" y="53" text-anchor="middle" font-family="Consolas,monospace" font-size="8">[a:1]</text>
  <rect x="170" y="8" width="90" height="26" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="215" y="25" text-anchor="middle" font-family="Consolas,monospace" font-size="8">[a:2]</text>
  <rect x="170" y="64" width="90" height="26" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="215" y="81" text-anchor="middle" font-family="Consolas,monospace" font-size="8">[a:1, b:1]</text>
  <path d="M100 45 L170 24" stroke="#1d4e89" fill="none"/><path d="M170 24 l-6 0 v5 z" fill="#1d4e89" transform="rotate(-17 170 24)"/>
  <path d="M100 53 L170 74" stroke="#1d4e89" fill="none"/><path d="M170 74 l-6 -4 v6 z" fill="#1d4e89" transform="rotate(17 170 74)"/>
  <text x="104" y="30" font-size="7">a writes again</text><text x="20" y="100" font-size="7">b writes, having seen [a:1]</text>
  <rect x="310" y="36" width="130" height="26" rx="3" fill="#fce4e2" stroke="#b8541a"/><text x="375" y="53" text-anchor="middle" font-size="7.5">concurrent → siblings</text>
  <path d="M260 21 L310 45" stroke="#b8541a" fill="none"/><path d="M260 77 L310 53" stroke="#b8541a" fill="none"/>
</svg>

- This is Dynamo's shopping cart. Two concurrent adds produce siblings; the cart merges them as a union, so an item added is never lost. A deleted item can come back, which is the cheaper of the two mistakes for a cart
- Dynamo keeps the vector short by dropping the oldest pair past a threshold, "(say 10)" in the paper, trading a small chance of a false conflict for a bounded size

### The failure

- Siblings that nobody merges. Every concurrent write adds one; a hot key touched from many replicas accumulates dozens, each read returns all of them, and the value grows until reads time out. A version vector detects the conflict; something still has to resolve it, on every read if need be
