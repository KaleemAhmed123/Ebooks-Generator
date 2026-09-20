## The split-brain problem

- In a Single-Leader replication setup, what happens if the Leader dies? You must promote one of the Followers to become the new Leader. But what if the Leader didn't die? What if a network cable was cut, separating the Leader from the Followers?
- From the Followers' perspective, the Leader is dead. They promote a new Leader. But the original Leader is still alive on the other side of the network partition, and it thinks *it* is still the Leader. You now have two Leaders. This is the **Split-Brain Problem**

<svg viewBox="0 0 460 140" role="img" aria-label="Split-brain problem. A network partition separates Leader A from Follower B. Follower B promotes itself. Clients write to both. Data is corrupted." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="180" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="110" y="35" text-anchor="middle" font-weight="bold">Network Zone 1</text>
  
  <circle cx="110" cy="70" r="25" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="110" y="74" text-anchor="middle" font-weight="bold">Leader A</text>
  <text x="110" y="55" text-anchor="middle" font-size="6">"I am Leader!"</text>
  
  <rect x="260" y="20" width="180" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="350" y="35" text-anchor="middle" font-weight="bold">Network Zone 2</text>
  
  <circle cx="350" cy="70" r="25" fill="#fce4e2" stroke="#b8541a"/>
  <text x="350" y="74" text-anchor="middle" font-weight="bold">Leader B</text>
  <text x="350" y="55" text-anchor="middle" font-size="6">"I am Leader!"</text>
  
  <path d="M230 10 L230 130" stroke="#b8541a" fill="none" stroke-dasharray="4 4" stroke-width="2"/>
  <text x="230" y="15" text-anchor="middle" font-weight="bold" fill="#b8541a">Partition</text>
  
  <path d="M50 70 L80 70" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M80 70 l-6 -3 v6 z" fill="#1d4e89"/>
  <text x="65" y="65" text-anchor="middle" font-size="6">Writes</text>
  
  <path d="M410 70 L380 70" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M380 70 l6 -3 v6 z" fill="#b8541a"/>
  <text x="395" y="65" text-anchor="middle" font-size="6">Writes</text>
  
  <text x="230" y="110" text-anchor="middle" font-size="7" fill="#b8541a" font-weight="bold">Irreparable Data Corruption</text>
</svg>

- When the network partition heals, Leader A and Leader B will connect and realize they both accepted conflicting writes from users. Because they are Single-Leader databases (not multi-leader CRDTs), they have no idea how to merge the data. The data is hopelessly, permanently corrupted

### The failure

- Deploying a 2-node cluster. If you deploy exactly two database nodes, and the network connection between them drops, they both look at each other and say "You must be dead, I'm taking over." Two-node clusters guarantee a split-brain scenario the moment the network blinks
