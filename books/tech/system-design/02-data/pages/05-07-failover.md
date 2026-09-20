## Failover

- **Failover** is what happens when the leader dies: detect it, promote a follower, repoint clients and the other followers at the new leader
- Postgres provides the promote step (`pg_ctl promote`, `pg_promote()`) and nothing else. Its docs say it "does not provide the system software required to identify a failure"; that is an external tool's job, and so is the fencing

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

- Detection is a timeout, and a timeout cannot tell "dead" from "slow" or "unreachable" (booklet 01). So the promoter must assume the old leader may still be alive, and make sure it cannot take writes: **fencing**. The Postgres docs name the blunt form, **STONITH**, "shoot the other node in the head": cut its power or its network before promoting
- Choose the most caught-up follower. With async replication (page 4) even that one may lack the leader's last commits; those writes are gone, and the clients that got an acknowledgement for them do not know

### The failure

- **Split brain**: the old leader was slow, not dead. It wakes up with clients still connected and accepts writes while the new leader accepts others. Two histories, no way to merge them. Fencing before promotion is the only prevention; booklet 03 has the fencing-token version for the case where power cannot be cut
