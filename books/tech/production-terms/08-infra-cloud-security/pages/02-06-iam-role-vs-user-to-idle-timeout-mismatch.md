## IAM Role vs User

A user carries a long-lived access key. A role is assumed, and returns
credentials that expire and rotate on their own.

A key committed to a repository grants access until a human notices. That is the
leading cause of cloud account compromise, and it is not a close race.

Attach roles to compute — EC2, ECS, Lambda — and put humans behind SSO that
assumes one. Nothing in production should hold a static key.

|  | User | Role |
|---|---|---|
| credential | static access key | STS, short-lived |
| rotation | manual, therefore never | automatic |
| once leaked | valid until revoked | valid for minutes |

## Idle Timeout Mismatch

When the load balancer holds a connection open longer than the backend does, the
backend closes first and the balancer keeps handing work to a socket that is
already gone.

An ALB at 60 seconds in front of Node with `keepAliveTimeout` at 5 produces 502s
on roughly 0.1% of requests. Neither side logs anything useful, so it reads as a
random fault nobody can reproduce.

<svg viewBox="0 0 460 84" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The load balancer keeps a connection for sixty seconds while the backend closes it after five, so a later request reuses a dead socket and returns a 502">
  <text x="4" y="24" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">LB</text>
  <text x="4" y="56" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">Node</text>
  <path d="M40 20 H392" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="216" y="14" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">idle timeout 60s — the pool still holds it</text>
  <path d="M40 52 H150" stroke="#1a1a1a" stroke-width="1.2"/>
  <path d="M146 46 l8 12 M154 46 l-8 12" stroke="#6b6b6b" stroke-width="1.4"/>
  <text x="162" y="56" font-family="Georgia,serif" font-size="9.5" fill="#6b6b6b">keepAliveTimeout 5s — closed</text>
  <path d="M300 22 V42" stroke="#3f7a33" stroke-width="1.4"/><path d="M300 45 l-4 -7 h8 z" fill="#3f7a33"/>
  <text x="140" y="78" font-family="Georgia,serif" font-size="9.5" fill="#3f7a33">the next request reuses the dead socket — 502</text>
</svg>

The backend's idle timeout must be longer than the balancer's. The side that
opened the connection should never be the side surprised by its closure.
