## Rebalancing

- **Rebalancing** is moving data between nodes: after a node joins, after one dies, after the data skews. Vnodes, fixed slots and dynamic splits differ in what moves; all three have to move it while serving

<svg viewBox="0 0 460 140" role="img" aria-label="Rebalancing cascade failure. Node 3 is slow. The cluster assumes it's failing and triggers a massive rebalance to move its data. The rebalance traffic crushes Node 3 completely, bringing it down." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="50" y="50" width="80" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="90" y="73" text-anchor="middle">Node 1</text>
  
  <rect x="330" y="50" width="80" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="370" y="73" text-anchor="middle">Node 2</text>
  
  <rect x="190" y="80" width="80" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="230" y="103" text-anchor="middle">Node 3 (Slow)</text>
  
  <path d="M190 90 L110 70" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M110 70 l6 -1 v6 z" fill="#b8541a" transform="rotate(20 110 70)"/>
  <path d="M270 90 L350 70" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M350 70 l-6 -3 v6 z" fill="#b8541a" transform="rotate(10 350 70)"/>
  
  <text x="230" y="25" text-anchor="middle" font-weight="bold" fill="#b8541a">The Rebalancing Cascade</text>
  <text x="230" y="40" text-anchor="middle" font-size="7">Automatic rebalance kicks in, maxing out Node 3's CPU/Network</text>
</svg>

- The move is the follower-bootstrap from Module 5, page 6 applied to one partition: snapshot to the new owner, stream the writes made since, switch the routing table, delete the old copy. Three rules: move the minimum (only the partitions that must), throttle the transfer so the live traffic keeps its share of disk and network, and keep serving from the old owner until the new one is caught up
- Dynamo's first scheme did the bootstrap unthrottled and the paper admits a node join under load "has taken almost a day to complete"; the redesign moved whole fixed-size ranges instead

### The failure

- Automatic rebalancing triggered by a slow node. The node is overloaded, so it fails a health check; the cluster declares it dead and starts moving its data, which means streaming gigabytes off an overloaded machine. It gets slower, the others take its traffic plus the transfer, and the failure spreads. Most systems make the decision to rebalance a human one, or at least a rate-limited one, for this reason
