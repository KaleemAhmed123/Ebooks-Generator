## Leader and followers

- One replica is the **leader**: every write goes to it. The others are **followers**: they receive the leader's change stream and apply it in the same order, so they converge on the same state
- Reads may go to any replica. Writes may not; that is the single rule that keeps the copies from diverging

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

- The names differ, the shape does not: Postgres primary and standbys, MySQL source and replicas, Redis master and replicas, MongoDB primary and secondaries
- What the stream carries is page 3. Whether the leader waits for it to arrive is page 4

### The failure

- Writing to a follower. Postgres standbys and MongoDB secondaries refuse. Redis lets you configure a writable replica, and its docs say the result: it "can result in inconsistency", because nothing ever sends those writes back to the master or the other replicas
- Reading from a follower and expecting the leader's state. A follower is the leader as of a moment ago; page 8 is about how long ago
