## Eventual consistency

- Because almost all replication is asynchronous, there is a delay between the moment the Leader commits a write and the moment a Follower applies it. This delay is called **Replication Lag**
- Replication lag means that if you read from the Leader, and I read from the Follower at the exact same millisecond, we will see different data. The database is in an inconsistent state

<svg viewBox="0 0 460 140" role="img" aria-label="Eventual consistency timeline. User A writes to Leader. 10ms later, User B reads from Follower and sees stale data. 50ms later, WAL applies. 60ms later, User C reads and sees fresh data." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M50 40 L410 40" stroke="#1d4e89" fill="none" stroke-width="2"/>
  <text x="30" y="44" font-weight="bold">Leader</text>
  
  <path d="M50 100 L410 100" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <text x="30" y="104" font-weight="bold">Follower</text>
  
  <circle cx="100" cy="40" r="4" fill="#b8541a"/>
  <text x="100" y="30" text-anchor="middle" font-weight="bold">T=0</text>
  <text x="100" y="20" text-anchor="middle" font-size="6">User A writes 'X'</text>
  
  <circle cx="150" cy="100" r="4" fill="#6b6b6b"/>
  <text x="150" y="115" text-anchor="middle" font-weight="bold">T=10ms</text>
  <text x="150" y="125" text-anchor="middle" font-size="6">User B reads</text>
  <text x="150" y="135" text-anchor="middle" font-size="6" fill="#b8541a">Sees old data!</text>
  
  <path d="M100 45 L220 95" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2"/><path d="M220 95 l-6 -1 v5 z" fill="#1a1a1a" transform="rotate(20 220 95)"/>
  <text x="160" y="65" font-size="6">Replication Lag (50ms)</text>
  
  <circle cx="230" cy="100" r="4" fill="#1d4e89"/>
  <text x="230" y="115" text-anchor="middle" font-weight="bold">T=50ms</text>
  <text x="230" y="125" text-anchor="middle" font-size="6">WAL applied</text>
  
  <circle cx="300" cy="100" r="4" fill="#1d4e89"/>
  <text x="300" y="115" text-anchor="middle" font-weight="bold">T=60ms</text>
  <text x="300" y="125" text-anchor="middle" font-size="6">User C reads</text>
  <text x="300" y="135" text-anchor="middle" font-size="6" fill="#1d4e89">Sees 'X'</text>
</svg>

- This model is called **Eventual Consistency**. It means that if you stop writing to the database, eventually all the Followers will catch up, and every node will return the same value
- In a healthy database, replication lag is just a few milliseconds. But if the Follower has a slow disk, or a network switch drops packets, replication lag can spike to seconds or even minutes

### The failure

- The "I submitted my comment but it disappeared" bug. The most famous replication bug happens when a user submits a form. The API writes the data to the Leader, redirects the user's browser, and loads the page by querying a Follower. Because of replication lag, the Follower hasn't received the data yet. The user's screen renders without their comment, making them think it was deleted, so they submit it again
