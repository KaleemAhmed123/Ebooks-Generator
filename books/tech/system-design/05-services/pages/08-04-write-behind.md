## Write-behind

- Write-Through is slow because it waits for the database. Write-Behind (or Write-Back) fixes this by writing *only* to the cache, returning success to the user immediately, and flushing the data to the database in the background

<svg viewBox="0 0 460 140" role="img" aria-label="Write-behind cache. App writes to Cache (fast return). Cache writes to DB later (async)." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="55" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="73" text-anchor="middle">Application</text>
  
  <rect x="180" y="55" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="220" y="73" text-anchor="middle">Cache Node</text>
  
  <rect x="340" y="55" width="80" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="380" y="73" text-anchor="middle">Database</text>
  
  <path d="M100 65 L180 65" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <path d="M175 62 l5 3 l-5 3 z" fill="#1a1a1a"/>
  <text x="140" y="60" text-anchor="middle" font-size="7">1. Fast Write</text>
  
  <path d="M100 75 L180 75" stroke="#1a1a1a" fill="none" stroke-dasharray="2"/>
  <text x="140" y="87" text-anchor="middle" font-size="7">2. Ack</text>
  
  <path d="M260 70 L340 70" stroke="#1a1a1a" fill="none" stroke-dasharray="4,2"/>
  <path d="M335 67 l5 3 l-5 3 z" fill="#1a1a1a"/>
  <text x="300" y="65" text-anchor="middle" font-size="7">3. Async Flush</text>
</svg>

- This makes writes incredibly fast. It also allows the cache to batch writes together (e.g., if a user updates their profile 10 times in one minute, the cache only writes to the database once)

### The failure

- The failure is the durability risk. The moment the cache acknowledges the write, the application tells the user "Saved."
- If the cache node loses power before the background flush finishes, the data is gone forever, even though you told the user it was safe. You must only use Write-Behind for data where data loss is acceptable (like page view counters or real-time gaming positions), never for financial transactions
