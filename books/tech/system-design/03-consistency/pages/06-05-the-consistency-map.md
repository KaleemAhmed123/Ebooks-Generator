## The map

- The models from Module 5 and the isolation levels from Module 2 are not one ladder. They are two axes: how many objects a guarantee covers (one, or a whole transaction) and how strict it is. Strict serializability sits at the top corner of both; everything else gives up one direction

<svg viewBox="0 0 460 150" role="img" aria-label="Two axes. Vertical: strength of ordering, from eventual up through session guarantees, causal, sequential, linearizable. Horizontal: scope, from single object to multi-object transactions. Linearizable is top-left. Serializable is on the right at mid-height because it has no real-time guarantee. Strict serializable is top-right. Snapshot isolation and read committed sit lower on the right. Causal and read-your-writes are marked sticky available." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <line x1="60" y1="134" x2="60" y2="10" stroke="#1a1a1a"/><path d="M60 10 l-3 6 h6 z" fill="#1a1a1a"/>
  <line x1="60" y1="134" x2="450" y2="134" stroke="#1a1a1a"/><path d="M450 134 l-6 -3 v6 z" fill="#1a1a1a"/>
  <text x="14" y="20" font-size="7">stricter</text>
  <text x="14" y="130" font-size="7">weaker</text>
  <text x="120" y="146" font-size="7">one object at a time</text>
  <text x="330" y="146" font-size="7">many objects, per transaction</text>
  <rect x="70" y="14" width="90" height="16" rx="2" fill="#e2fcf3" stroke="#1d4e89"/><text x="115" y="25" text-anchor="middle">linearizable</text>
  <rect x="70" y="38" width="90" height="16" rx="2" fill="#fcfcfc" stroke="#1a1a1a"/><text x="115" y="49" text-anchor="middle">sequential</text>
  <rect x="70" y="62" width="90" height="16" rx="2" fill="#fcfcfc" stroke="#1a1a1a"/><text x="115" y="73" text-anchor="middle">causal ●</text>
  <rect x="70" y="86" width="90" height="16" rx="2" fill="#fcfcfc" stroke="#1a1a1a"/><text x="115" y="97" text-anchor="middle">session guarantees ●</text>
  <rect x="70" y="110" width="90" height="16" rx="2" fill="#fcfcfc" stroke="#1a1a1a"/><text x="115" y="121" text-anchor="middle">eventual</text>
  <rect x="330" y="14" width="110" height="16" rx="2" fill="#e2fcf3" stroke="#1d4e89"/><text x="385" y="25" text-anchor="middle">strict serializable</text>
  <rect x="330" y="50" width="110" height="16" rx="2" fill="#fcfcfc" stroke="#1a1a1a"/><text x="385" y="61" text-anchor="middle">serializable</text>
  <rect x="330" y="80" width="110" height="16" rx="2" fill="#fcfcfc" stroke="#1a1a1a"/><text x="385" y="91" text-anchor="middle">snapshot isolation</text>
  <rect x="330" y="110" width="110" height="16" rx="2" fill="#fcfcfc" stroke="#1a1a1a"/><text x="385" y="121" text-anchor="middle">read committed</text>
  <text x="190" y="61" font-size="7">serializable is not above linearizable:</text>
  <text x="190" y="70" font-size="7">it has no real-time rule, so a fresh read</text>
  <text x="190" y="79" font-size="7">of one row is not promised</text>
  <text x="190" y="104" font-size="7">● sticky available: keeps working through</text>
  <text x="190" y="113" font-size="7">a partition if the client stays on one replica</text>
</svg>

- Cost runs upward on the left axis: linearizable and sequential need a majority or a leader and stop under partition; causal and the session guarantees need only stickiness and metadata; eventual needs nothing and promises nothing (Module 5)
- Cost runs upward on the right axis too, but the payment is aborts and locks rather than round-trips (Module 3). The two bills are separate, which is why a serializable database on one node can be cheap and a linearizable store across regions cannot

### The failure

- Reading the map as one strict total order, with "serializable" above "linearizable" because the word sounds bigger. They do not compare. A serializable transaction can read a stale row; a linearizable register cannot participate in a multi-row invariant. Say which axis the requirement is on before naming the level
