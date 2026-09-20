## Server authority

- Pure CRDTs are entirely peer-to-peer. They assume there is no central server. But Figma *does* have a central Multiplayer Server. Figma leverages this server to fix conflicts that CRDTs mathematically cannot solve
- **The Cycle Problem**: Imagine Layer A is the parent of Layer B. User 1 drags Layer A inside Layer B. At the exact same time, User 2 drags Layer B inside Layer A. If you just apply both actions using CRDT rules, the tree becomes a cycle. The document is corrupted

<svg viewBox="0 0 460 140" role="img" aria-label="Server authority fixing a cycle. User 1 puts A in B. User 2 puts B in A. The server receives the actions, sees the cycle, and rewrites history, forcing B to be at the root." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="80" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="60" y="34" text-anchor="middle" font-weight="bold">User 1</text>
  <text x="60" y="44" text-anchor="middle" font-size="6">"Put A in B"</text>
  
  <rect x="20" y="90" width="80" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="60" y="104" text-anchor="middle" font-weight="bold">User 2</text>
  <text x="60" y="114" text-anchor="middle" font-size="6">"Put B in A"</text>
  
  <path d="M100 35 L160 55" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2"/>
  <path d="M100 105 L160 85" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2"/>
  
  <rect x="180" y="40" width="100" height="60" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="230" y="55" text-anchor="middle" font-weight="bold">Server</text>
  <text x="230" y="70" text-anchor="middle" font-size="7">Detects Cycle!</text>
  
  <path d="M280 70 L340 70" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M340 70 l-6 -3 v6 z" fill="#1d4e89"/>
  <text x="310" y="65" text-anchor="middle" font-size="6" font-weight="bold">Rewrites history</text>
  
  <rect x="360" y="20" width="80" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="400" y="45" text-anchor="middle" font-weight="bold">Final State</text>
  <text x="400" y="70" text-anchor="middle" font-size="7">Root</text>
  <text x="400" y="85" text-anchor="middle" font-size="7">├─ B</text>
  <text x="400" y="100" text-anchor="middle" font-size="7">│  └─ A</text>
</svg>

- **The Server is God**: When the Multiplayer Server receives an action that would create a cycle, it actively intervenes. It rejects the action, calculates a safe fallback state (e.g., dropping Layer B to the root), and broadcasts a corrective action to all browsers. The browsers realize they predicted wrong, and instantly snap their UIs to match the server's authoritative state

### The failure

- Trusting the client entirely. If you build a collaborative system without a central authority validating the CRDT logic, malicious users (or race conditions) can broadcast corrupted actions that permanently destroy the document for everyone. The server must hold the final say
