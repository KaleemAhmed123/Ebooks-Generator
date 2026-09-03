## upstream & Load Balancing Method

`upstream` names the backend pool; the method decides how requests are spread
across it. The default spreads request count, not work.

One server stuck on slow queries keeps taking its full share under round-robin,
and the wait is charged to your p99. `least_conn` sends each request to
whichever backend has the fewest connections open. `max_fails` and
`fail_timeout` add passive health checking on top: a backend that fails often
enough is skipped until the timeout expires.

| Method | Behaviour |
|---|---|
| round-robin (default) | equal request count, ignores load |
| `least_conn` | fewest active connections |
| `ip_hash` | session affinity by client address |

## VPC / Subnet / Security Group

A VPC is your private network. A public subnet has a route to an internet
gateway; a private one does not. Security groups are stateful, allow-only
firewalls attached to instances, and a rule can name another security group
instead of an address.

A database belongs in a private subnet with 5432 open only to the app's
security group. A CIDR block works until the app's addresses change;
`0.0.0.0/0` works until someone scans the range, which takes minutes.

<svg viewBox="0 0 460 98" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Inside one VPC, a public subnet routes through an internet gateway while a private subnet reaches the internet only outbound through NAT and has no inbound path">
  <text x="4" y="12" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">VPC</text>
  <rect x="4" y="16" width="330" height="68" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <rect x="14" y="26" width="150" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="22" y="41" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">public subnet</text>
  <line x1="166" y1="37" x2="174" y2="37" stroke="#1a1a1a" stroke-width="1.2"/>
  <path d="M180 37 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="182" y="26" width="142" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="190" y="41" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">internet gateway</text>
  <line x1="334" y1="37" x2="344" y2="37" stroke="#1a1a1a" stroke-width="1.2"/>
  <path d="M350 37 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="354" y="41" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">internet</text>
  <rect x="14" y="54" width="150" height="22" fill="#e2fcf3" stroke="#3f7a33" stroke-width="1.4"/>
  <text x="22" y="69" font-family="Consolas,monospace" font-size="9" fill="#3f7a33">private — database</text>
  <line x1="166" y1="65" x2="174" y2="65" stroke="#3f7a33" stroke-width="1.2"/>
  <path d="M180 65 l-7 -4 v8 z" fill="#3f7a33"/>
  <rect x="182" y="54" width="142" height="22" fill="none" stroke="#3f7a33" stroke-width="1.2"/>
  <text x="190" y="69" font-family="Consolas,monospace" font-size="9" fill="#3f7a33">NAT</text>
  <text x="340" y="69" font-family="Georgia,serif" font-size="9" fill="#3f7a33">outbound only</text>
  <text x="4" y="94" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">security group: stateful, instance-level, allow-only. NACL: stateless, subnet-level, allow and deny.</text>
</svg>
