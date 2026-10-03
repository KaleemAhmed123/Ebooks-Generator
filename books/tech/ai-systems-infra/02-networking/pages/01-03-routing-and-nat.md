## Subnets, routing, and NAT

- A host sends a packet by one rule: **is the destination in my own subnet?** If yes, it finds the destination's MAC with **ARP** and delivers it directly on the wire. If no, it hands the packet to its **default gateway** (a router), which repeats the question against its own routing table. Routers forward by **longest-prefix match** — the most specific CIDR that contains the destination wins.
- A **route table** is just that list of "destination CIDR → next hop". This is exactly what you edit in a cloud VPC (Booklet 5): "traffic for `10.0.0.0/16` stays local; everything else (`0.0.0.0/0`) goes to the internet gateway." Get a route wrong and packets leave but answers never come back.

<svg viewBox="0 0 360 104" role="img" aria-label="A host delivers to a same-subnet peer directly via ARP, but sends off-subnet traffic to the default gateway, which NATs private source addresses to one public IP toward the internet" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="10" y="40" width="70" height="24" rx="3" fill="#e4f1f1" stroke="#0f6e6e"/><text x="45" y="52" text-anchor="middle" font-size="6.3">host</text><text x="45" y="61" text-anchor="middle" font-size="5.3" fill="#777">10.0.4.12</text>
  <rect x="104" y="12" width="78" height="22" rx="3" fill="#eef6f6" stroke="#0f6e6e"/><text x="143" y="26" text-anchor="middle" font-size="6">peer 10.0.4.20</text>
  <rect x="104" y="70" width="78" height="24" rx="3" fill="#f7f8fb" stroke="#0f6e6e"/><text x="143" y="82" text-anchor="middle" font-size="6">gateway / router</text><text x="143" y="91" text-anchor="middle" font-size="5.3" fill="#777">+ NAT</text>
  <rect x="268" y="70" width="82" height="24" rx="3" fill="#dfeeee" stroke="#0f6e6e"/><text x="309" y="82" text-anchor="middle" font-size="6">internet</text><text x="309" y="91" text-anchor="middle" font-size="5.3" fill="#777">src = 1 public IP</text>
  <path d="M80 48 L104 28" stroke="#0f6e6e" marker-end="url(#r1)"/><text x="76" y="34" font-size="5.3" fill="#0f6e6e">same subnet → ARP, direct</text>
  <path d="M80 58 L104 80" stroke="#1a1a1a" marker-end="url(#r1)"/><text x="60" y="78" font-size="5.3" fill="#555">off-subnet → gateway</text>
  <path d="M182 82 L268 82" stroke="#1a1a1a" marker-end="url(#r1)"/>
  <defs><marker id="r1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- **NAT** (Network Address Translation) lets many private hosts share one public IP. The gateway rewrites the packet's **source address (and port)** to its own public IP on the way out, remembers the mapping, and rewrites the reply back on the way in. It exists because public IPv4 is scarce, and it's why your pod's outbound traffic appears to the world as the **NAT gateway's** IP, not the pod's.
- Two consequences you'll meet: outbound-only reachability (the internet can't open a connection *to* a NATed host unless the gateway forwards a port), and, on AWS, the **NAT gateway data-processing charge** — a line item that surprises teams whose pods chat heavily with the internet (Booklet 5 cost).
