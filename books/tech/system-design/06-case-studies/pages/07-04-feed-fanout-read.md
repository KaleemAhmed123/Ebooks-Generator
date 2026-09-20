## Fan-out on read (The Hybrid)

- Fan-out on write breaks when Justin Bieber (100M followers) posts. 100M Redis writes will lag the queue for hours. Regular users will see their friends' posts delayed
- **Pull model (Fan-out on read):** For celebrities, we do NOT push to followers. We store the post in a separate "Celebrity DB". 
- **The Hybrid (Twitter's approach):** When a user opens their app, the edge service reads their Redis list (push model). It then queries the Celebrity DB for any new posts from celebrities they follow (pull model). It merges and sorts the two lists in memory at read time

<svg viewBox="0 0 460 120" role="img" aria-label="Hybrid architecture merging precomputed feeds with celebrity pulls" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="45" width="50" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="45" y="64" text-anchor="middle" font-weight="bold">Bob</text>
  
  <rect x="90" y="35" width="80" height="50" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="130" y="55" text-anchor="middle" font-weight="bold" fill="#1d4e89">Feed</text>
  <text x="130" y="70" text-anchor="middle" font-weight="bold" fill="#1d4e89">Aggregator</text>
  
  <rect x="230" y="10" width="80" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="270" y="30" text-anchor="middle" font-weight="bold" fill="#b8541a">Redis (Friends)</text>
  
  <rect x="230" y="80" width="80" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="270" y="100" text-anchor="middle" font-weight="bold" fill="#b8541a">DB (Celebrities)</text>
  
  <path d="M70 60 L90 60" stroke="#1a1a1a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M170 50 L230 25" stroke="#1d4e89" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M170 70 L230 95" stroke="#1d4e89" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  
  <rect x="340" y="35" width="60" height="50" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="370" y="64" text-anchor="middle" font-weight="bold">Merge</text>
  <path d="M310 25 L340 50" stroke="#b8541a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M310 95 L340 70" stroke="#b8541a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
</svg>

### The failure

- Defining a "celebrity" as someone with a verified badge. The system should define it dynamically based on a follower threshold (e.g., > 100,000 followers) because the problem is purely mechanical volume, not social status

:::interview
Justin Bieber posts a photo. Using a pure push model, his post takes 4 hours to reach all 100 million followers. How do you fix this?

Move users with > 100k followers to a Pull model. Do not push their posts to Redis. Instead, followers pull from a celebrity cache at read time and merge the results.
:::
