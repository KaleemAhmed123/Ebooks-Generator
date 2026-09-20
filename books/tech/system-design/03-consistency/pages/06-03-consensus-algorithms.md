## Consensus algorithms (Raft/Paxos)

- The process of safely electing a leader and agreeing on a sequence of writes is called **Consensus**. In modern distributed systems, Consensus is handled by battle-tested algorithms, usually **Raft** or **Paxos**
- These algorithms don't just use quorum for leader election; they use it for every single write. A write is not considered "committed" until a majority of the nodes have written it to their logs

<svg viewBox="0 0 460 140" role="img" aria-label="Raft consensus. The leader receives a write, forwards it to followers, waits for a majority to ack, and only then commits." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="80" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="74" text-anchor="middle" font-weight="bold">Client</text>
  
  <rect x="150" y="50" width="60" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="180" y="74" text-anchor="middle" font-weight="bold">Leader</text>
  
  <rect x="280" y="20" width="60" height="30" rx="3" fill="#fff" stroke="#1d4e89"/>
  <text x="310" y="35" text-anchor="middle">Follower A</text>
  <rect x="280" y="55" width="60" height="30" rx="3" fill="#fff" stroke="#1d4e89"/>
  <text x="310" y="70" text-anchor="middle">Follower B</text>
  <rect x="280" y="90" width="60" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="310" y="105" text-anchor="middle">Follower C (Down)</text>
  
  <path d="M100 60 L150 60" stroke="#1a1a1a" fill="none"/><path d="M150 60 l-4 -2 v4 z" fill="#1a1a1a"/>
  <text x="125" y="55" text-anchor="middle" font-size="6">1. Write</text>
  
  <path d="M210 60 L280 35" stroke="#1d4e89" fill="none"/><path d="M280 35 l-6 -1 v5 z" fill="#1d4e89" transform="rotate(-20 280 35)"/>
  <path d="M210 70 L280 70" stroke="#1d4e89" fill="none"/><path d="M280 70 l-6 -2 v4 z" fill="#1d4e89"/>
  
  <text x="245" y="45" font-size="6" fill="#1d4e89">2. AppendLog</text>
  
  <path d="M280 40 L210 65" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2"/><path d="M210 65 l6 1 v-4 z" fill="#1a1a1a" transform="rotate(20 210 65)"/>
  <text x="245" y="78" font-size="6">3. Ack</text>
  <path d="M280 75 L210 75" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2"/><path d="M210 75 l5 2 v-4 z" fill="#1a1a1a"/>
  
  <path d="M150 70 L100 70" stroke="#1d4e89" fill="none"/><path d="M100 70 l4 2 v-4 z" fill="#1d4e89"/>
  <text x="125" y="80" text-anchor="middle" font-size="6" fill="#1d4e89" font-weight="bold">4. Commit!</text>
  
  <text x="370" y="40" font-weight="bold">Total Order Broadcast</text>
  <text x="370" y="55" font-size="7">The cluster guarantees</text>
  <text x="370" y="65" font-size="7">that every single write</text>
  <text x="370" y="75" font-size="7">is committed in the exact</text>
  <text x="370" y="85" font-size="7">same sequence on every node.</text>
</svg>

- If the Leader dies in a Raft cluster, the Followers instantly notice the lack of heartbeat pings, trigger an election, and a new Leader is chosen within milliseconds. Because every write required a majority vote, the new Leader is mathematically guaranteed to possess all committed data

### The failure

- Expecting Raft to be as fast as async replication. Because every single write requires a network round-trip to a majority of nodes before it can be committed, Raft is significantly slower than standard async database replication. You do not use Raft to store 10,000 analytics events per second; you use it to store highly critical configuration state
