## Approximate heavy hitters

- For massive scale (YouTube views), we use a **Count-Min Sketch**
- It is a probabilistic data structure (like a Bloom Filter, →05) that uses a fixed amount of memory (e.g., 2 MB), regardless of whether you have 1 million or 1 billion unique videos
- **How it works:** It uses multiple hash functions to map a Video ID to a 2D array of counters. When a view happens, it increments the counters.
- **The catch:** It suffers from hash collisions. It will *over-estimate* counts for rare videos, but it is highly accurate for "Heavy Hitters" (the viral videos you actually care about)
- Alongside the sketch, you maintain a small Min-Heap in memory containing exactly K items (the current Top 100). As the sketch updates, you update the Heap

<svg viewBox="0 0 460 110" role="img" aria-label="Count-Min Sketch uses multiple hash functions to increment a fixed-size 2D array of counters" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="40" width="50" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="45" y="55" text-anchor="middle" font-weight="bold">Event</text>
  <text x="45" y="65" text-anchor="middle" font-size="6">Video ID</text>
  
  <rect x="120" y="10" width="60" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="150" y="23" text-anchor="middle" font-weight="bold" fill="#1d4e89">Hash 1</text>
  
  <rect x="120" y="45" width="60" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="150" y="58" text-anchor="middle" font-weight="bold" fill="#1d4e89">Hash 2</text>
  
  <rect x="120" y="80" width="60" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="150" y="93" text-anchor="middle" font-weight="bold" fill="#1d4e89">Hash 3</text>
  
  <rect x="230" y="10" width="120" height="90" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="290" y="25" text-anchor="middle" font-weight="bold" fill="#b8541a">2D Counter Array</text>
  
  <rect x="240" y="35" width="20" height="15" fill="#fff" stroke="#b8541a"/>
  <rect x="260" y="35" width="20" height="15" fill="#ffd1dc" stroke="#b8541a"/>
  <rect x="280" y="35" width="20" height="15" fill="#fff" stroke="#b8541a"/>
  
  <rect x="240" y="55" width="20" height="15" fill="#fff" stroke="#b8541a"/>
  <rect x="260" y="55" width="20" height="15" fill="#fff" stroke="#b8541a"/>
  <rect x="280" y="55" width="20" height="15" fill="#ffd1dc" stroke="#b8541a"/>
  
  <path d="M70 55 L120 20" stroke="#1a1a1a" fill="none" stroke-width="1.5"/>
  <path d="M70 55 L120 55" stroke="#1a1a1a" fill="none" stroke-width="1.5"/>
  <path d="M70 55 L120 90" stroke="#1a1a1a" fill="none" stroke-width="1.5"/>
  
  <path d="M180 20 L270 35" stroke="#1d4e89" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M180 55 L290 55" stroke="#1d4e89" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
</svg>

### The failure

- Using a HashMap in memory to store the count of every video. At 1 billion videos, the HashMap will OOM (Out Of Memory) the server.

:::interview
You need to track view counts for 1 billion URLs to find the Top 10. Your server only has 10 MB of RAM available. What data structure do you use?

A Count-Min Sketch. It uses a fixed-size 2D array and multiple hash functions to estimate frequencies in constant memory, regardless of the number of unique URLs.
:::\n