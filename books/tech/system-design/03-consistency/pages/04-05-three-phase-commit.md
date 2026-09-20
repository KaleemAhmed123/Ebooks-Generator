## 3PC and why it is rarely used

- Computer scientists realized early on that 2PC's "in doubt" state was a fatal flaw. If the Coordinator died, the entire system blocked. To fix this, they invented **Three-Phase Commit (3PC)**
- 3PC adds an extra phase: "Pre-Commit". The Coordinator tells everyone "I am *about* to commit." If the Coordinator dies, the participants can look around, see that everyone received a Pre-Commit, and safely proceed with the Commit themselves without waiting for the Coordinator to reboot

<svg viewBox="0 0 460 140" role="img" aria-label="3PC vs 2PC. 3PC adds a Pre-Commit phase to avoid blocking, but fails under network partitions." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="180" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="110" y="34" text-anchor="middle" font-weight="bold">Phase 1: Prepare</text>
  
  <rect x="20" y="60" width="180" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="110" y="74" text-anchor="middle" font-weight="bold">Phase 2: Pre-Commit (New!)</text>
  
  <rect x="20" y="100" width="180" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="110" y="114" text-anchor="middle" font-weight="bold">Phase 3: Commit</text>
  
  <text x="240" y="34" font-weight="bold" fill="#b8541a">The fatal flaw</text>
  <text x="240" y="50" font-size="7">3PC assumes that if a node</text>
  <text x="240" y="60" font-size="7">doesn't reply, it must be dead.</text>
  <text x="240" y="75" font-size="7">In a network partition, nodes</text>
  <text x="240" y="85" font-size="7">are alive but unreachable.</text>
  <text x="240" y="95" font-size="7">Half the nodes will abort,</text>
  <text x="240" y="105" font-size="7">half will commit. The state</text>
  <text x="240" y="115" font-size="7">permanently diverges.</text>
</svg>

- **Why it failed**: 3PC only works if the network guarantees *bounded delay* (a message will arrive within a guaranteed maximum time). The internet does not guarantee this. If a network partition occurs, a participant might just be slow, not dead. The participants will guess wrong, and the data will become irreparably corrupted
- Because 3PC cannot survive network partitions, the industry abandoned it. When we need non-blocking distributed agreement today, we use Consensus protocols (like Raft or Paxos) which we will cover later

### The failure

- Expecting 3PC to solve your microservice transaction problems. 3PC is a piece of academic history. Modern distributed systems rely on two patterns: Consensus (for low-level data replication) and Sagas (for high-level microservice workflows)
