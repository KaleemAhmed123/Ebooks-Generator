## Fan-out on write

- Alice posts. The API writes the post row, puts one message on a queue (booklet 04) and returns 201. A worker reads Alice's followers from `follows` and pushes the post id to the front of each follower's `feed:` list, trimming it to 800. A reader's request is then one list read and one hydration; nothing is computed at read time

<svg viewBox="0 0 460 152" role="img" aria-label="Fan-out on write. The post API writes the post row to the posts store and one message to the fan-out queue, then returns 201. Workers read the follower list from the follows store, 200 ids on average, and push the post id into each follower's feed list with LPUSH and LTRIM 800. A reader's GET /feed is one list read plus hydration. An orange cross marks the case of 10 million followers: 10 million list writes for one post, 100 seconds at 100 000 writes a second, with every other post queued behind it." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="40" width="58" height="32" rx="3" fill="#fff" stroke="#1d4e89"/><text x="35" y="53" text-anchor="middle">post API</text><text x="35" y="65" text-anchor="middle" font-size="7.5">row + msg → 201</text>
  <rect x="6" y="100" width="58" height="22" rx="3" fill="#e6f2ff" stroke="#333"/><text x="35" y="114" text-anchor="middle">posts</text>
  <line x1="35" y1="72" x2="35" y2="100" stroke="#333" marker-end="url(#d)"/>
  <rect x="94" y="45" width="64" height="22" rx="3" fill="#fff" stroke="#333" stroke-dasharray="3 3"/><text x="126" y="59" text-anchor="middle">fan-out queue</text>
  <line x1="64" y1="56" x2="94" y2="56" stroke="#333" marker-end="url(#d)"/>
  <text x="79" y="50" text-anchor="middle" font-size="7">500/s</text>
  <rect x="186" y="45" width="56" height="22" rx="3" fill="#fff" stroke="#333"/><text x="214" y="59" text-anchor="middle">workers</text>
  <line x1="158" y1="56" x2="186" y2="56" stroke="#333" marker-end="url(#d)"/>
  <rect x="180" y="100" width="68" height="22" rx="3" fill="#e6f2ff" stroke="#333"/><text x="214" y="109" text-anchor="middle" font-size="7.5">follows</text><text x="214" y="118" text-anchor="middle" font-size="7">(followee → followers)</text>
  <line x1="214" y1="100" x2="214" y2="67" stroke="#333" marker-end="url(#d)"/>
  <text x="228" y="86" font-size="7">≈ 200 ids</text>
  <rect x="284" y="12" width="66" height="20" rx="3" fill="#e6f2ff" stroke="#333"/><text x="317" y="25" text-anchor="middle" font-size="7.5">feed:bob</text>
  <rect x="284" y="46" width="66" height="20" rx="3" fill="#e6f2ff" stroke="#333"/><text x="317" y="59" text-anchor="middle" font-size="7.5">feed:carol</text>
  <rect x="284" y="80" width="66" height="20" rx="3" fill="#e6f2ff" stroke="#333"/><text x="317" y="93" text-anchor="middle" font-size="7.5">… × 200</text>
  <line x1="242" y1="52" x2="284" y2="24" stroke="#333" marker-end="url(#d)"/>
  <line x1="242" y1="56" x2="284" y2="56" stroke="#333" marker-end="url(#d)"/>
  <line x1="242" y1="60" x2="284" y2="88" stroke="#333" marker-end="url(#d)"/>
  <text x="317" y="8" text-anchor="middle" font-size="7">LPUSH id · LTRIM 0 799</text>
  <rect x="384" y="12" width="70" height="34" rx="3" fill="#fff" stroke="#1d4e89"/><text x="419" y="25" text-anchor="middle">GET /feed</text><text x="419" y="37" text-anchor="middle" font-size="7">1 read + hydrate</text>
  <line x1="384" y1="26" x2="350" y2="24" stroke="#1d4e89" marker-end="url(#b)"/>
  <text x="367" y="20" text-anchor="middle" font-size="7" fill="#1d4e89">20 ids</text>
  <text x="6" y="140" font-size="7.5" fill="#bf4c28">✕ 10 M followers = 10 M list writes for one post: 100 s at 100 000 writes/s,</text>
  <text x="6" y="150" font-size="7.5" fill="#bf4c28">and every ordinary post queued behind it is late by that much (page 4)</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker>
  </defs>
</svg>

- The 800-entry cap, from Twitter's 2012 QCon talk, bounds both the memory (page 1) and the cost of a trim. A user who scrolls past 800 falls through to the store, and is rare enough not to shape the design
- Inactive followers skip the fan-out: no list for anyone who has not opened the app in 30 days. Their first open rebuilds it from the pull path (page 4), then push resumes. The saving is not memory, it is the queue's throughput, which is the scarce resource on this page

### The failure

- One post, 10 million lists. At the cluster's 100 000 writes a second that is 100 seconds of the worker pool doing nothing else, and every ordinary post behind it is late by that much. The cost of a write is proportional to followers, so write cannot be the only path
