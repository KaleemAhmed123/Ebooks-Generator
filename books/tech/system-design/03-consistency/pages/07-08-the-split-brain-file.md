## The split-brain file

- We established that the Multiplayer Server is the Single Source of Truth for a Figma file. But wait—Figma has thousands of Multiplayer Servers running in AWS to handle the load. How does Figma guarantee that only *one* server opens a specific file?
- If the routing layer accidentally sends User A to Server 1, and User B to Server 2, both servers will boot up a copy of the file in RAM. You now have a **Split-Brain File**

<svg viewBox="0 0 460 140" role="img" aria-label="Split-brain file. User A edits on Server 1. User B edits on Server 2. Both servers independently write checkpoints to Postgres, overwriting each other." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="30" width="60" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="50" y="44" text-anchor="middle">User A</text>
  
  <rect x="20" y="90" width="60" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="50" y="104" text-anchor="middle">User B</text>
  
  <rect x="130" y="20" width="80" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="170" y="35" text-anchor="middle" font-weight="bold">Server 1</text>
  <text x="170" y="50" text-anchor="middle" font-size="6">Holds File 42</text>
  
  <rect x="130" y="80" width="80" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="170" y="95" text-anchor="middle" font-weight="bold">Server 2</text>
  <text x="170" y="110" text-anchor="middle" font-size="6">Holds File 42</text>
  
  <path d="M80 40 L130 40" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M130 40 l-4 -2 v4 z" fill="#1d4e89"/>
  <path d="M80 100 L130 100" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M130 100 l-4 -2 v4 z" fill="#1d4e89"/>
  
  <rect x="340" y="50" width="80" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="380" y="65" text-anchor="middle" font-weight="bold">Postgres DB</text>
  <text x="380" y="80" text-anchor="middle" font-size="6">Row: File 42</text>
  
  <path d="M210 40 L340 60" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M340 60 l-6 -1 v5 z" fill="#b8541a" transform="rotate(-15 340 60)"/>
  <text x="270" y="45" font-size="6" fill="#b8541a">Writes checkpoint</text>
  
  <path d="M210 100 L340 80" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M340 80 l-6 -2 v6 z" fill="#b8541a" transform="rotate(15 340 80)"/>
  <text x="270" y="105" font-size="6" fill="#b8541a">Overwrites checkpoint!</text>
</svg>

- Server 1 and Server 2 cannot see each other. They both think they are the God of File 42. Server 1 flushes its checkpoint to Postgres. Two seconds later, Server 2 flushes its checkpoint to Postgres, completely overwriting User A's changes. Figma has fundamentally broken its consistency guarantee

### The failure

- Ignoring single-writer guarantees. If your architecture relies on a Single Source of Truth (like an in-memory game server or an event router), the hardest part of the design isn't the sync protocol. It's the routing layer. You must guarantee, mathematically, that the entire world routes to exactly one server
