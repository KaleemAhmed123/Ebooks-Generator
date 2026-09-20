## Failover and STONITH

- If the leader of a single-leader database dies, the system cannot accept writes until a follower is promoted to become the new leader. This process is called **failover**
- Failover is fraught with peril. Postgres does not have built-in automated failure detection. You must run external tools to monitor the leader and trigger `pg_ctl promote` on a follower

<svg viewBox="0 0 460 120" role="img" aria-label="Split-brain failure. The network partitions. Follower B thinks Leader A is dead, so it promotes itself. The client can now write to both, corrupting data." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="50" y="50" width="100" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="100" y="67" text-anchor="middle">Leader A</text>
  <text x="100" y="82" text-anchor="middle" font-size="7">Accepts writes</text>
  
  <path d="M220 10 L220 110" stroke="#b8541a" stroke-width="2" stroke-dasharray="4 4"/>
  <text x="220" y="125" text-anchor="middle" font-weight="bold" fill="#b8541a">Network Partition</text>
  
  <rect x="290" y="50" width="100" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="340" y="67" text-anchor="middle">Leader B (Promoted)</text>
  <text x="340" y="82" text-anchor="middle" font-size="7">Accepts writes</text>
</svg>

- **Split-brain**: If the network between two nodes fails, the follower might assume the leader is dead and promote itself. But the old leader is still alive and talking to clients. You now have two leaders silently corrupting the dataset

### The failure

- Attempting automated failover without STONITH. STONITH stands for "Shoot The Other Node In The Head"
- If your automated tool promotes Follower B, it must be absolutely, physically certain that Leader A is dead. The tool must send a command to the intelligent power strip to physically cut the electricity to Leader A, or shut down its network port at the switch. If you cannot fence off the old leader, automated failover will eventually cause split-brain
