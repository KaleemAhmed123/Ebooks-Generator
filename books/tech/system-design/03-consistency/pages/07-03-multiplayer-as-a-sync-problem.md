## Multiplayer as a sync problem

- Because HTTP `PATCH` requests are too slow, Figma uses persistent **WebSockets**. But the WebSockets do not connect directly to a database. They connect to a dedicated **Multiplayer Server**
- The Multiplayer Server is a Node.js process that holds the *entire Figma file* in RAM. It acts as the single source of truth for all users currently editing that file

<svg viewBox="0 0 460 140" role="img" aria-label="Figma Multiplayer architecture. Browsers stream actions via WebSockets to a Multiplayer Server holding the file in RAM. The server broadcasts the actions to other browsers." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="34" text-anchor="middle" font-weight="bold">Browser A</text>
  <text x="60" y="44" text-anchor="middle" font-size="6">Predicts locally</text>
  
  <rect x="20" y="90" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="104" text-anchor="middle" font-weight="bold">Browser B</text>
  <text x="60" y="114" text-anchor="middle" font-size="6">Receives broadcast</text>
  
  <rect x="220" y="40" width="120" height="60" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="280" y="55" text-anchor="middle" font-weight="bold">Multiplayer Server</text>
  <text x="280" y="70" text-anchor="middle" font-size="7">Holds File in RAM</text>
  <text x="280" y="85" text-anchor="middle" font-size="7">Applies actions in order</text>
  
  <path d="M100 35 L220 55" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M220 55 l-6 -3 v6 z" fill="#1d4e89" transform="rotate(10 220 55)"/>
  <text x="160" y="40" text-anchor="middle" font-size="6" fill="#1d4e89" font-weight="bold">Action via WebSocket</text>
  
  <path d="M220 85 L100 105" stroke="#1a1a1a" fill="none" stroke-width="2" stroke-dasharray="2 2"/><path d="M100 105 l6 -3 v6 z" fill="#1a1a1a" transform="rotate(10 100 105)"/>
  <text x="160" y="105" text-anchor="middle" font-size="6">Broadcast via WebSocket</text>
</svg>

- When Browser A moves a shape, it sends an `Action` over the WebSocket. The Multiplayer Server receives the action, applies it to its in-memory tree, and then broadcasts that exact same action to Browser B. Browser B receives the action and applies it to its own local memory
- This reduces real-time collaboration to a simple sync problem: ensure every browser receives the same sequence of actions that the server processed

### The failure

- Writing every single mouse move to a database. The Multiplayer Server never talks to a database while users are actively dragging shapes. The database is far too slow. The server is purely an event router, holding state in memory and broadcasting it out
