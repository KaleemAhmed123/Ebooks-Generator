## Group fan-out and presence

- When Bob sends a message to a 100-person group, we do **Fan-out on write**. The API server queries the group roster, checks the Connection Registry for who is online, and dispatches the message to their respective Gateways
- What about offline users? We do not push to Gateways. We send a payload to the Push Notification Service (→05). When they open the app, they HTTP GET `/messages?after=last_seen_id`
- **Presence (Online/Offline):** We cannot trust a TCP connection dropping as "offline" (tunnels, elevators). The client sends a heartbeat every 5 seconds: `SETEX user:123:presence 10 online`. If 10 seconds pass with no heartbeat, Redis expires the key, and they appear offline

<svg viewBox="0 0 460 120" role="img" aria-label="Fan-out on write to online users, push notifications to offline users" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="45" width="60" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="50" y="65" text-anchor="middle" font-weight="bold" fill="#1d4e89">API Server</text>
  
  <rect x="140" y="10" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="180" y="25" text-anchor="middle" font-weight="bold" fill="#1d4e89">Gateway A</text>
  <text x="180" y="35" text-anchor="middle" font-size="6" fill="#1d4e89">(Online: Alice)</text>
  
  <rect x="140" y="80" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="180" y="95" text-anchor="middle" font-weight="bold">Push Queue</text>
  <text x="180" y="105" text-anchor="middle" font-size="6">(Offline: Charlie)</text>
  
  <path d="M80 50 L140 30" stroke="#1d4e89" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M80 70 L140 90" stroke="#1a1a1a" fill="none" stroke-width="1.5" stroke-dasharray="2 2" marker-end="url(#arrow)"/>
</svg>

### The failure

- Sending presence updates to every friend every time a heartbeat fires. If a user has 500 friends, 1 heartbeat = 500 fan-out messages. Multiply by 10 million users every 5 seconds. The system dies. Only broadcast presence state *changes* (online -> offline).

:::interview
A user in a 100,000-member Discord server goes offline. Do you fan out their offline status to 99,999 people?

No. For massive groups, presence is lazy. The client only fetches the presence of the 50 users currently visible on their screen.
:::
