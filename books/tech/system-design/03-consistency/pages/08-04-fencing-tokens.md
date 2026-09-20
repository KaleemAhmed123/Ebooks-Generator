## Fencing tokens

- A **fencing token** is a number the lock service hands out with each grant, larger every time the lock is granted. The client sends the token with every write, and the **resource** rejects any write whose token is smaller than one it has already seen. The lock stops deciding; the storage does
- Kleppmann's 2016 framing: the lock cannot know its holder paused, so make the holder's staleness visible to the thing it writes to

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

- The old holder's write carries token 33; the storage has already accepted 34; 33 is refused. The pause still happened; the corrupting write did not
- Two requirements, and both are usually the hard part. The lock service must issue a monotonic number (page 5 lists which do). The resource must check it: a database row can (`UPDATE … WHERE token <= $1`, or a version column, Module 3, page 5); a message queue partition can with an epoch; a plain HTTP API or an S3 bucket cannot, unless you build the check on top

### The failure

- A resource that does not check tokens. The lock service is perfect, the token is monotonic, and the delayed client's request arrives at an endpoint that accepts anything with a valid session. The token was decoration. Fencing is a property of the write path, not of the lock
