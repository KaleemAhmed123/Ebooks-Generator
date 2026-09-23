## Active-active

- Every region accepts writes. That removes the failover entirely — there is nothing to promote — and buys it by making conflict a permanent condition rather than an exceptional one

<svg viewBox="0 0 460 124" role="img" aria-label="Active-active across two regions. Both region A and region B accept writes and replicate to each other, so both can accept the same username at the same moment. DynamoDB global tables offer two modes: multi-Region eventual consistency, the default, which resolves by last writer wins so one of the two signups silently loses; and multi-Region strong consistency, which is same-account only, and the mode is fixed when the table is created. An orange cross marks the underlying point: uniqueness cannot be enforced by two independent writers, so it needs one owner per key or a check that crosses regions." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="24" width="120" height="44" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="80" y="42" text-anchor="middle" font-size="7.5">region A</text><text x="80" y="56" text-anchor="middle" font-size="6.5">writes accepted</text>
  <rect x="320" y="24" width="120" height="44" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="380" y="42" text-anchor="middle" font-size="7.5">region B</text><text x="380" y="56" text-anchor="middle" font-size="6.5">writes accepted</text>
  <line x1="140" y1="36" x2="318" y2="36" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="318" y1="58" x2="142" y2="58" stroke="#1d4e89" marker-end="url(#b)"/>
  <text x="230" y="33" text-anchor="middle" font-size="6">replicate</text>
  <text x="230" y="50" text-anchor="middle" font-size="6.5" fill="#bf4c28">both accept @ada</text>
  <text x="230" y="70" text-anchor="middle" font-size="6.5" fill="#bf4c28">in the same second</text>
  <rect x="20" y="78" width="420" height="26" rx="3" fill="#f3f3f3" stroke="#666"/>
  <text x="28" y="89" font-size="6.5">MREC — multi-Region eventual consistency, the default: last writer wins, so one of the two signups silently loses</text>
  <text x="28" y="100" font-size="6.5">MRSC — multi-Region strong consistency: same account only, and the mode is fixed when the table is created</text>
  <text x="4" y="120" font-size="7.5" fill="#bf4c28">✕ uniqueness cannot be enforced by two independent writers — it needs one owner per key</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

- Last-writer-wins is not a resolution, it is a policy for discarding one of two real events — fine for a profile field, wrong for a balance, a counter or a booking
- The usual escape is to stop writing the same thing in two places: pin each record to a home region and route its writes there (page 4), so concurrent writers to one key cannot exist. Multi-leader replication is booklet 02

:::interview
"Two regions are active-active and two users claim the same username at the same moment. What happens?" — Both succeed. Each region checks locally, sees the name free and accepts, because a uniqueness constraint only holds against data that region can see. Replication then carries both rows, and with last-writer-wins one account silently loses its name — possibly after the user has been using it. Uniqueness is consensus, and two independent writers cannot produce it. The fixes: give the namespace one owner that all claims route to, make the claim a reservation that crosses regions before confirming, or stop requiring it.
:::

### The failure

- Assuming the database's unique index still means unique. It holds within one region and says nothing across them, so the constraint that has protected this invariant since day one quietly stops being an invariant the moment a second writer exists
