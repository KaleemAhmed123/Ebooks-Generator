## Rebalancing

- Whether you use vnodes, fixed partitions, or dynamic splits, data must occasionally move from one node to another. This is called **rebalancing**. It happens when you add nodes (to scale up) or remove nodes (due to hardware failure)
- Rebalancing must run online. The database must continue serving reads and writes while gigabytes of data stream across the network

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

- **How it works**: The destination node requests a snapshot of the partition. While the snapshot transfers, the source node tracks any incoming writes in a log. Once the snapshot finishes, the log is replayed to catch the destination up. Finally, the cluster routing table updates to point to the new node, and the source deletes its copy

### The failure

- Fully automatic rebalancing. A node in your cluster experiences a temporary CPU spike, causing it to respond slowly to health checks
- The cluster assumes the node is dying. It automatically triggers a rebalance, demanding the node immediately stream hundreds of gigabytes of data to its peers. The massive network and disk I/O of the rebalance crushes the already-struggling node, killing it completely. The load then shifts to the other nodes, crashing them too (a cascading failure)
- Because of this, many systems (like Couchbase) require a human operator to click an "Approve Rebalance" button
