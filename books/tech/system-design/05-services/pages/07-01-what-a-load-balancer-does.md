# Module 7 - Load balancing and proxies

## What a load balancer does

- One address in front of many instances, so callers hold a name rather than a list. Behind that address the balancer does three jobs at once, and the three are usually discussed as one

<svg viewBox="0 0 460 112" role="img" aria-label="A load balancer in front of a pool. Clients reach one address, held by a floating IP or anycast, which is served by an active balancer with a standby balancer beside it. The balancer fronts three instances; the third is dead and has been removed from the pool. The balancer's three jobs are health checking, distribution and failover. With only one balancer, fifty healthy instances sit behind a single box whose power supply is the whole system's availability, so the pair shares one address that can move in seconds." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="4" y="12" font-size="7.5">one address in front; three jobs behind it</text>
  <rect x="4" y="30" width="52" height="24" rx="3" fill="#fff" stroke="#1d4e89"/><text x="30" y="45" text-anchor="middle" font-size="7.5">clients</text>
  <rect x="76" y="30" width="76" height="24" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="114" y="41" text-anchor="middle" font-size="7.5">one address</text><text x="114" y="51" text-anchor="middle" font-size="6.5">floating IP / anycast</text>
  <rect x="176" y="18" width="70" height="20" rx="3" fill="#fff" stroke="#1d4e89"/><text x="211" y="31" text-anchor="middle" font-size="7.5">balancer A</text>
  <rect x="176" y="46" width="70" height="20" rx="3" fill="#f3f3f3" stroke="#999"/><text x="211" y="59" text-anchor="middle" font-size="7.5" fill="#666">balancer B · standby</text>
  <rect x="286" y="12" width="80" height="18" rx="3" fill="#fff" stroke="#1d4e89"/><text x="326" y="24" text-anchor="middle" font-size="7.5">instance 1</text>
  <rect x="286" y="34" width="80" height="18" rx="3" fill="#fff" stroke="#1d4e89"/><text x="326" y="46" text-anchor="middle" font-size="7.5">instance 2</text>
  <rect x="286" y="56" width="80" height="18" rx="3" fill="#fbe9e2" stroke="#bf4c28"/><text x="326" y="68" text-anchor="middle" font-size="7.5" fill="#bf4c28">instance 3 · dead</text>
  <line x1="56" y1="42" x2="74" y2="42" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="152" y1="38" x2="174" y2="30" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="152" y1="46" x2="174" y2="54" stroke="#999" stroke-dasharray="2 2"/>
  <line x1="246" y1="26" x2="284" y2="21" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="246" y1="36" x2="284" y2="43" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="246" y1="34" x2="284" y2="62" stroke="#bf4c28" stroke-dasharray="2 2"/>
  <text x="372" y="22" font-size="6.5" fill="#1d4e89">1 health-check</text>
  <text x="372" y="44" font-size="6.5" fill="#1d4e89">2 distribute</text>
  <text x="372" y="66" font-size="6.5" fill="#1d4e89">3 fail over</text>
  <text x="4" y="90" font-size="7">it removes instance 3 from the pool, spreads load over the survivors, and can retry elsewhere when one dies mid-request</text>
  <text x="4" y="105" font-size="7.5" fill="#bf4c28">✕ a single balancer: 50 healthy instances behind one box whose power supply is the whole system's availability</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

- Separating the three jobs matters because they fail separately. Distribution can be perfect while health checking is wrong, and the result is even traffic to a dead instance
- Failover is the weakest of the three and the most often assumed. A balancer can safely retry a request it knows was never delivered; once bytes have reached the instance it cannot know whether the work happened, so retrying needs idempotency from the application (booklet 01), not from the balancer

### The failure

- The balancer as the single point of failure. Fifty healthy instances are unreachable because one box lost a power supply, and the outage is total rather than partial — the thing added for availability became the thing that owns it
- The fix is that the address is not the box. A floating IP or an anycast announcement is held by whichever balancer is alive, so failure moves an address instead of requiring every client to learn a new one. Managed balancers do this invisibly, which is most of what is being paid for
