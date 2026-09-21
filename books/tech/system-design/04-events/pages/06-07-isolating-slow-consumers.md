## Isolating slow consumers

- Billing must apply an order in a second. Analytics reads the same orders and takes an hour on a bad day. If they share a lane, they share the hour

<svg viewBox="0 0 460 140" role="img" aria-label="Isolating slow consumers. Left, shared fate: one queue feeds billing and analytics as competing consumers; analytics is slow and holds the deliveries, so billing waits. Right, isolated: one topic, two consumer groups, each with its own offset; analytics lags by four million records while billing is at zero lag." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="110" y="16" text-anchor="middle" font-weight="bold">shared queue, shared fate</text>
  <rect x="20" y="30" width="80" height="24" rx="3" fill="#fff" stroke="#333"/><text x="60" y="46" text-anchor="middle">orders queue</text>
  <line x1="100" y1="38" x2="140" y2="34" stroke="#333" marker-end="url(#f)"/>
  <line x1="100" y1="46" x2="140" y2="76" stroke="#333" marker-end="url(#f)"/>
  <rect x="140" y="24" width="70" height="22" rx="3" fill="#fff" stroke="#333"/><text x="175" y="39" text-anchor="middle">billing</text>
  <rect x="140" y="66" width="70" height="22" rx="3" fill="#fbe9e2" stroke="#bf4c28"/><text x="175" y="81" text-anchor="middle">analytics, slow</text>
  <text x="110" y="110" text-anchor="middle" font-size="7.5">analytics holds the prefetch window;</text>
  <text x="110" y="121" text-anchor="middle" font-size="7.5">billing's deliveries wait behind it</text>
  <line x1="230" y1="10" x2="230" y2="130" stroke="#999" stroke-dasharray="3 3"/>
  <text x="345" y="16" text-anchor="middle" font-weight="bold">one topic, two groups</text>
  <rect x="250" y="30" width="80" height="24" rx="3" fill="#fff" stroke="#333"/><text x="290" y="46" text-anchor="middle">orders topic</text>
  <line x1="330" y1="38" x2="370" y2="34" stroke="#333" marker-end="url(#f)"/>
  <line x1="330" y1="46" x2="370" y2="76" stroke="#333" marker-end="url(#f)"/>
  <rect x="370" y="24" width="70" height="22" rx="3" fill="#fff" stroke="#333"/><text x="405" y="39" text-anchor="middle">group billing</text>
  <text x="405" y="58" text-anchor="middle" font-size="7.5">lag 0</text>
  <rect x="370" y="66" width="70" height="22" rx="3" fill="#fff" stroke="#333"/><text x="405" y="81" text-anchor="middle">group analytics</text>
  <text x="405" y="100" text-anchor="middle" font-size="7.5" fill="#bf4c28">lag 4,000,000</text>
  <text x="345" y="121" text-anchor="middle" font-size="7.5">each group has its own offset; neither waits</text>
  <defs><marker id="f" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- On a log, isolation is free: one topic, one consumer group per purpose, one offset each. Analytics can be four million records behind while billing is at zero; neither knows the other exists. This is the log's many-independent-readers property (Module 2, page 3) doing its main job
- On a queue, isolation is a queue per consumer type, fed by the exchange or topic (Module 2, page 2). Two consumers competing on one queue are not two readers of the data; they are two workers on one job, and the slow one holds prefetch slots the fast one needed
- The same rule inside one team: a consumer that does two things at two speeds, applying the order and calling a slow reporting API, is two consumers wearing one name. Split them, and the slow half's lag stops being the fast half's outage

### The failure

- Shared queue, shared fate. Analytics is deployed as a second consumer on the billing queue "to get the same messages". It gets half of them, billing gets the other half, and when analytics slows down, half the invoices wait behind it. The fix that was one queue declaration cost an incident
