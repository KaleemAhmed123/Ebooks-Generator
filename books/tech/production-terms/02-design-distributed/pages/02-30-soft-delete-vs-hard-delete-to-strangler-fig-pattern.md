## Soft Delete vs Hard Delete

Soft delete marks a row as deleted. Hard delete removes it. Soft delete is
recoverable and quietly leaks deleted data into every query that forgets the
filter.

One report missing `WHERE deleted_at IS NULL` exposes records someone asked to
have removed. The filter has to be right in every query, forever, including the
ones written by people who joined after the convention was established.

**A soft delete does not satisfy a legal deletion request.** The data is still
there. Erasure means a hard delete or crypto-shredding, and treating
`deleted_at` as compliance is a finding waiting to happen.

## Split Brain

A partition leaves two nodes each convinced it is the primary. Both accept
writes, and the histories diverge in a way that cannot be merged
programmatically.

A network blip between two database nodes. Each promotes itself. For forty
seconds both take writes. Reconciling afterwards is not a technical exercise —
it is deciding which customer's orders to discard, and telling them.

<svg viewBox="0 0 460 62" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A network partition leaves two nodes both believing they are primary and both accepting writes, producing divergent histories">
  <rect x="4" y="8" width="150" height="20" fill="none" stroke="#b32d2b" stroke-width="1.3"/><text x="79" y="22" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#b32d2b">node A: "I am primary"</text>
  <rect x="4" y="34" width="150" height="20" fill="none" stroke="#b32d2b" stroke-width="1.3"/><text x="79" y="48" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#b32d2b">node B: "I am primary"</text>
  <path d="M172 6 L182 56" stroke="#1a1a1a" stroke-width="1.6" stroke-dasharray="4 3"/>
  <text x="177" y="62" text-anchor="middle" font-family="Consolas,monospace" font-size="7.5" fill="#6b6b6b">partition</text>
  <text x="200" y="22" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">both accept writes, histories diverge</text>
  <text x="200" y="40" font-family="Georgia,serif" font-size="9.5" fill="#2b5fa8">prevention: quorum election plus fencing</text>
  <text x="200" y="54" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">there is no automatic repair afterwards</text>
</svg>

Prevention is the only strategy. A node that cannot reach a majority must stop
accepting writes, even though staying up looks like the helpful choice.

## Strangler Fig Pattern

Replacing a legacy system incrementally by routing individual endpoints to new
code, until nothing of the old one is still being called.

A proxy sends `/orders` to the new service and everything else to the monolith.
Over eight months routes move across one at a time. There is never a cutover
weekend, and every step is individually reversible.

The failure mode is stopping halfway. Two systems, both half-owning the domain,
with the proxy config as the only documentation of which is which — that is
worse than either system alone, and it is where most of these end up when the
project loses its sponsor.
