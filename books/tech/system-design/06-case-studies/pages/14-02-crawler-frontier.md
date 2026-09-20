## URL frontier

- The URL Frontier is the queue of URLs waiting to be crawled
- A naive FIFO queue will fail. If the queue contains 10,000 links to Wikipedia, 10,000 workers will pop them simultaneously and DDoS Wikipedia
- **The Politeness queues:** 
  - The Frontier is split into two stages (The Mercator split)
  - **Front Queues:** Prioritize URLs based on importance (PageRank, freshness)
  - **Back Queues:** One queue *per target host*. Queue 1 only contains `wikipedia.org`. Queue 2 only contains `apple.com`
  - A worker thread binds to exactly one Back Queue, pulls a URL, sleeps for a polite delay, then pulls the next. This mathematically guarantees one concurrent connection per host

<svg viewBox="0 0 460 110" role="img" aria-label="URL Frontier with front queues for priority and back queues for per-host politeness" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="30" width="80" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="45" text-anchor="middle" font-weight="bold">Prioritizer</text>
  <text x="60" y="60" text-anchor="middle" font-size="6">(Front Queues)</text>
  
  <rect x="150" y="10" width="80" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="190" y="23" text-anchor="middle" font-size="6" fill="#1d4e89">apple.com Queue</text>
  
  <rect x="150" y="40" width="80" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="190" y="53" text-anchor="middle" font-size="6" fill="#1d4e89">wiki.org Queue</text>
  
  <rect x="150" y="70" width="80" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="190" y="83" text-anchor="middle" font-size="6" fill="#1d4e89">bbc.co.uk Queue</text>
  
  <rect x="280" y="30" width="80" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="320" y="45" text-anchor="middle" font-weight="bold" fill="#b8541a">Worker Fleet</text>
  <text x="320" y="60" text-anchor="middle" font-size="6" fill="#b8541a">1 worker per queue</text>
  
  <path d="M100 50 L150 20" stroke="#1d4e89" fill="none" stroke-width="1.5"/>
  <path d="M100 50 L150 50" stroke="#1d4e89" fill="none" stroke-width="1.5"/>
  <path d="M100 50 L150 80" stroke="#1d4e89" fill="none" stroke-width="1.5"/>
  
  <path d="M230 20 L280 50" stroke="#b8541a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M230 50 L280 50" stroke="#b8541a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M230 80 L280 50" stroke="#b8541a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
</svg>

### The failure

- Using a single global queue for all URLs. If you parse a Wikipedia page with 500 internal links, those 500 links go into the queue, 500 workers pick them up, and Wikipedia goes offline.

:::interview
Your crawler parsed a page with 1,000 links to a small blog. All 1,000 links were added to your queue, and your workers instantly crashed the blog. How do you prevent this?

Use per-host politeness queues. Every URL for a specific host is routed to exactly one dedicated queue, and only one worker is allowed to pull from that queue at a specific rate limit.
:::\n