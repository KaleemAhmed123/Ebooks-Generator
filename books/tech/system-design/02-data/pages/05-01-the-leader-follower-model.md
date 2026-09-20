# Module 5 - Replication

## The leader-follower model

- To survive a hardware failure, you must keep copies of the same data on multiple machines (replicas)
- If a client could write to any replica, two clients might write conflicting updates at the exact same time. The simplest way to prevent this is single-leader replication

<svg viewBox="0 0 460 140" role="img" aria-label="Leader-follower replication. Writes go exclusively to the Leader. The Leader streams the WAL to Follower A and Follower B. Reads can hit any node." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="180" y="10" width="100" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="230" y="27" text-anchor="middle" font-weight="bold" fill="#1d4e89">Leader</text>
  <text x="230" y="42" text-anchor="middle" font-size="7">Accepts writes</text>
  
  <rect x="50" y="90" width="100" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="100" y="107" text-anchor="middle">Follower A</text>
  <text x="100" y="122" text-anchor="middle" font-size="7">Read-only</text>
  
  <rect x="310" y="90" width="100" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="360" y="107" text-anchor="middle">Follower B</text>
  <text x="360" y="122" text-anchor="middle" font-size="7">Read-only</text>
  
  <rect x="200" y="-10" width="60" height="16" rx="3" fill="#fff" stroke="#1a1a1a"/>
  <text x="230" y="2" text-anchor="middle" font-size="7">Client Write</text>
  <path d="M230 6 L230 10" stroke="#1a1a1a" fill="none"/>
  
  <path d="M190 50 L110 90" stroke="#1d4e89" fill="none"/><path d="M110 90 l6 -1 v6 z" fill="#1d4e89" transform="rotate(20 110 90)"/>
  <text x="130" y="65" text-anchor="middle" font-size="7">WAL Stream</text>
  
  <path d="M270 50 L350 90" stroke="#1d4e89" fill="none"/><path d="M350 90 l-6 -3 v6 z" fill="#1d4e89" transform="rotate(20 350 90)"/>
  <text x="330" y="65" text-anchor="middle" font-size="7">WAL Stream</text>
</svg>

- **How it works**: One replica is designated the leader. All writes must go to the leader. The leader writes the new data to its own disk, then sends the exact same sequence of changes (usually the Write-Ahead Log) to the followers
- **Physical vs logical**: Postgres supports both physical replication (sending exact block addresses byte-by-byte) and logical replication (sending the row changes, allowing followers to run different major Postgres versions)

### The failure

- Treating replication as a scaling strategy for writes. Adding ten followers to a database gives you 10× the read capacity, because clients can query any follower. However, every single write must still go to the one leader. It does absolutely nothing for write capacity
