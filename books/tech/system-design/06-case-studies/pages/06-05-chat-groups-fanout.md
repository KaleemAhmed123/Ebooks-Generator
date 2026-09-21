## Group fan-out and presence

- A group message is one write and one delivery per member. The chat service reads the roster, looks every member up in the registry, and forwards to the gateways that hold them, once per gateway with the list of users, not once per user. Members with no registry entry are offline: nothing is pushed, and a notification goes out through Module 5

<svg viewBox="0 0 460 170" role="img" aria-label="A message to a group of 10 enters the chat service. Roster lookup gives 10 members; the registry says 6 are online across 3 gateways and 4 are offline. The service sends 3 internal calls, one per gateway with its users listed, and one batch to the notification service for the 4 offline members. Below, presence: each client heartbeats every 30 seconds to its gateway, which refreshes a Redis key with a 60 second TTL; only transitions online to offline are broadcast, and only to friends. An orange cross marks broadcasting every heartbeat: 10 million clients over 30 seconds times 100 friends is 33 million pushes a second." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="14" width="62" height="24" rx="3" fill="#fff" stroke="#333"/><text x="37" y="29" text-anchor="middle">msg → group</text>
  <rect x="98" y="8" width="90" height="36" rx="3" fill="#fff" stroke="#333"/><text x="143" y="22" text-anchor="middle">chat service</text><text x="143" y="34" text-anchor="middle" font-size="7.5">roster 10 · registry 10</text>
  <line x1="68" y1="26" x2="98" y2="26" stroke="#333" marker-end="url(#d)"/>
  <rect x="232" y="2" width="76" height="18" rx="3" fill="#fff" stroke="#1d4e89"/><text x="270" y="14" text-anchor="middle" font-size="7.5">gateway 1: 3 users</text>
  <rect x="232" y="24" width="76" height="18" rx="3" fill="#fff" stroke="#1d4e89"/><text x="270" y="36" text-anchor="middle" font-size="7.5">gateway 7: 2 users</text>
  <rect x="232" y="46" width="76" height="18" rx="3" fill="#fff" stroke="#1d4e89"/><text x="270" y="58" text-anchor="middle" font-size="7.5">gateway 12: 1 user</text>
  <line x1="188" y1="18" x2="232" y2="11" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="188" y1="26" x2="232" y2="33" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="188" y1="34" x2="232" y2="55" stroke="#1d4e89" marker-end="url(#b)"/>
  <text x="316" y="14" font-size="7">6 online: 3 calls, not 6</text>
  <text x="316" y="36" font-size="7">one frame per socket after that</text>
  <rect x="330" y="62" width="112" height="18" rx="3" fill="#fff" stroke="#b8541a"/><text x="386" y="74" text-anchor="middle" font-size="7.5">notifications: 4 offline</text>
  <line x1="143" y1="44" x2="143" y2="71" stroke="#b8541a"/><line x1="143" y1="71" x2="330" y2="71" stroke="#b8541a" marker-end="url(#o)"/>
  <text x="150" y="80" font-size="7">no registry entry → Module 5, one batch</text>
  <text x="6" y="90" font-size="7.5">20 000 messages/s × 10 members = 200 000 deliveries/s over ≈ 100 gateways: 2 000/s each</text>
  <line x1="6" y1="96" x2="452" y2="96" stroke="#999" stroke-dasharray="3 3"/>
  <text x="6" y="108" font-weight="bold">presence</text>
  <rect x="6" y="114" width="50" height="22" rx="3" fill="#fff" stroke="#333"/><text x="31" y="128" text-anchor="middle">client</text>
  <rect x="98" y="114" width="70" height="22" rx="3" fill="#fff" stroke="#333"/><text x="133" y="128" text-anchor="middle">gateway</text>
  <rect x="210" y="114" width="120" height="22" rx="3" fill="#e6f2ff" stroke="#333"/><text x="270" y="124" text-anchor="middle" font-size="7.5">Redis presence:{user}</text><text x="270" y="133" text-anchor="middle" font-size="7.5">SET … EX 60</text>
  <line x1="56" y1="125" x2="98" y2="125" stroke="#333" marker-end="url(#d)"/><text x="77" y="120" text-anchor="middle" font-size="7">ping / 30 s</text>
  <line x1="168" y1="125" x2="210" y2="125" stroke="#333" marker-end="url(#d)"/>
  <text x="340" y="122" font-size="7.5">key expires → offline;</text><text x="340" y="133" font-size="7.5">broadcast the transition only</text>
  <text x="6" y="152" font-size="7.5" fill="#bf4c28">✕ broadcast every heartbeat to every friend: 10 M ÷ 30 s × 100 friends ≈ 33 M pushes/s, for no new information</text>
  <text x="6" y="165" font-size="7.5">large groups: presence is pulled for the members on screen, never pushed to 100 000</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker>
    <marker id="o" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#b8541a"/></marker>
  </defs>
</svg>

- Fan-out happens at send time because the group is small and the recipients are known; Module 7 is the same choice at a scale where it stops being true. A 100 000-member channel is not fanned out per user at all: the gateways subscribe to the channel, and one publish reaches every gateway that has a subscriber
- **Presence** is a heartbeat with a TTL. A dropped TCP connection is not "offline", a phone in a lift keeps its state for a minute; a key that expires is. The gateway refreshes the key; the client never talks to Redis
- What is broadcast is the change, online to offline or back, and only to the people who can see it: a friends list, or the members currently on screen. The steady state generates no traffic at all

### The failure

- Presence traffic larger than message traffic. Each heartbeat is pushed to every friend, so 10 M clients pinging every 30 s with 100 friends each is 33 M pushes a second, more than a hundred times the message rate, to say "still here". The heartbeat refreshes a key; the key's expiry is the only event
