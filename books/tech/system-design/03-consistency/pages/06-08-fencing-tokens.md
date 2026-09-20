## Fencing tokens

- ZooKeeper guarantees that only one node holds a lock *from ZooKeeper's perspective*. But what if the node itself freezes?

<svg viewBox="0 0 460 140" role="img" aria-label="GC pause causing a lock failure. Node 1 pauses, loses the lock, Node 2 takes it. Node 1 wakes up and writes to storage anyway, corrupting it. Fencing tokens fix this by rejecting the old token." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="80" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="60" y="34" text-anchor="middle" font-weight="bold">Node 1</text>
  <text x="60" y="44" text-anchor="middle" font-size="6">Held lock, then Paused</text>
  
  <rect x="20" y="80" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="60" y="94" text-anchor="middle" font-weight="bold">Node 2</text>
  <text x="60" y="104" text-anchor="middle" font-size="6">Took lock after timeout</text>
  
  <rect x="340" y="50" width="80" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="380" y="74" text-anchor="middle" font-weight="bold">S3 Storage</text>
  
  <path d="M100 95 L340 75" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M340 75 l-6 -1 v5 z" fill="#1d4e89" transform="rotate(-10 340 75)"/>
  <text x="140" y="95" font-size="6" fill="#1d4e89">1. Write (Token: 34)</text>
  
  <path d="M100 45 L340 65" stroke="#b8541a" fill="none" stroke-width="2" stroke-dasharray="2 2"/><path d="M340 65 l-6 -2 v5 z" fill="#b8541a" transform="rotate(10 340 65)"/>
  <text x="140" y="50" font-size="6" fill="#b8541a" font-weight="bold">2. Wakes up! Write (Token: 33)</text>
  
  <text x="240" y="70" font-weight="bold" fill="#b8541a">X REJECTED</text>
  <text x="240" y="80" font-size="6">Storage remembers 34, rejects 33</text>
</svg>

- If Node 1 experiences a 10-second Garbage Collection (GC) pause, it cannot send heartbeats. ZooKeeper deletes the lock. Node 2 takes the lock and writes to storage. Then Node 1 wakes up from its GC pause. It doesn't know it lost the lock, so it writes to storage too. Data corruption!
- **Fencing Tokens**: To fix this, ZooKeeper returns an incrementing number (a fencing token) every time a lock is acquired. Node 1 gets Token 33. Node 2 gets Token 34. When writing to the database or S3, you include the token. The storage layer keeps track of the highest token it has seen. When Node 1 wakes up and tries to write with Token 33, the storage rejects it

### The failure

- Ignoring the storage side of the lock. A distributed lock is completely useless for safety if the target system (the database, the file server, the external API) doesn't enforce fencing tokens. If the target system just accepts whatever you send it, GC pauses will inevitably lead to two nodes writing at the same time
