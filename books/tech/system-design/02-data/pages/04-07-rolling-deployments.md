## Rolling deployments

- The reason expand-migrate-contract is strictly necessary is that modern infrastructure uses rolling deployments to achieve zero downtime
- A rolling deployment replaces servers one by one. It removes Server A from the load balancer, upgrades it, and puts it back, before moving to Server B. This means Version 1 and Version 2 of your code are processing requests simultaneously against the same database

<svg viewBox="0 0 460 140" role="img" aria-label="Rolling deployment. A load balancer routes traffic to a V1 node and a V2 node simultaneously. Both nodes talk to the exact same Postgres database." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="80" height="24" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="66" text-anchor="middle">Load Balancer</text>
  
  <rect x="160" y="10" width="100" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="210" y="27" text-anchor="middle">Node 1 (v1.0)</text>
  <text x="210" y="42" text-anchor="middle" font-size="7">Requires `name`</text>
  
  <rect x="160" y="70" width="100" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="210" y="87" text-anchor="middle">Node 2 (v2.0)</text>
  <text x="210" y="102" text-anchor="middle" font-size="7">Requires `full_name`</text>
  
  <rect x="340" y="40" width="80" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="380" y="64" text-anchor="middle">Database</text>
  
  <path d="M100 62 L160 30" stroke="#1a1a1a" fill="none"/><path d="M160 30 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(-20 160 30)"/>
  <path d="M100 62 L160 90" stroke="#1a1a1a" fill="none"/><path d="M160 90 l-6 -3 v6 z" fill="#1a1a1a"/>
  
  <path d="M260 30 L340 50" stroke="#1a1a1a" fill="none"/><path d="M340 50 l-6 -3 v6 z" fill="#1a1a1a" transform="rotate(20 340 50)"/>
  <path d="M260 90 L340 70" stroke="#1a1a1a" fill="none"/><path d="M340 70 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(-15 340 70)"/>
</svg>

- If V2 contains a database migration that renames `name` to `full_name`, the moment the migration runs, V1 (which is still handling 50% of your user traffic) will instantly crash because `name` no longer exists

### The failure

- The "blue/green deployment" trap. Engineers assume blue/green deployments avoid this problem because the traffic switches all at once. They do not
- Even if traffic switches instantly, the database migration must run either before the switch (breaking the blue nodes) or after the switch (breaking the green nodes if you need to rollback). You cannot escape backward compatibility
