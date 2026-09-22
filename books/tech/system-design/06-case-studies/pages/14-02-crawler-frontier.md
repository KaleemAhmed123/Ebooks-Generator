## URL frontier

- The **frontier** is the set of URLs waiting to be fetched, and its job is to answer "what next" under two rules that pull against each other: important pages first, and one request per host at a time. Mercator's split does it with two layers of queues

<svg viewBox="0 0 460 186" role="img" aria-label="Web crawler, whole design. New URLs from the parser, after the dedupe on page 4, enter a prioritiser that puts each into one of several front queues by priority: freshness, page rank, seed depth. A back-queue router drains the front queues, high priority more often, into back queues, exactly one per host, so wikipedia.org has one queue and example.com another. A heap holds one entry per back queue keyed by the earliest time that host may be contacted again. Workers pop the heap's earliest host, take one URL from its back queue, fetch and parse it, page 3, and reinsert the host with next time equal to now plus the politeness delay; 400 fetches a second need at least 400 hosts ready. Fetched pages go to blob storage and their links back to the dedupe. Front queues, back queues and the heap are checkpointed, page 5. An orange cross marks a single breadth-first queue: a page with 500 links to one host puts 500 URLs in a row, and 500 workers hit that host at once." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="6" width="74" height="34" rx="3" fill="#fff" stroke="#1d4e89"/><text x="43" y="19" text-anchor="middle">prioritiser</text><text x="43" y="31" text-anchor="middle" font-size="7">rank, freshness, depth</text>
  <rect x="6" y="52" width="74" height="12" rx="2" fill="#e6f2ff" stroke="#333"/><text x="43" y="61" text-anchor="middle" font-size="7">front queue: high</text>
  <rect x="6" y="68" width="74" height="12" rx="2" fill="#e6f2ff" stroke="#333"/><text x="43" y="77" text-anchor="middle" font-size="7">front queue: mid</text>
  <rect x="6" y="84" width="74" height="12" rx="2" fill="#e6f2ff" stroke="#333"/><text x="43" y="93" text-anchor="middle" font-size="7">front queue: low</text>
  <line x1="43" y1="40" x2="43" y2="52" stroke="#333" marker-end="url(#d)"/>
  <rect x="106" y="52" width="70" height="44" rx="3" fill="#fff" stroke="#1d4e89"/><text x="141" y="66" text-anchor="middle">back-queue</text><text x="141" y="77" text-anchor="middle">router</text><text x="141" y="89" text-anchor="middle" font-size="7">high drained more often</text>
  <line x1="80" y1="74" x2="106" y2="74" stroke="#333" marker-end="url(#d)"/>
  <rect x="202" y="46" width="92" height="12" rx="2" fill="#e6f2ff" stroke="#333"/><text x="248" y="55" text-anchor="middle" font-size="7">back queue: wikipedia.org</text>
  <rect x="202" y="62" width="92" height="12" rx="2" fill="#e6f2ff" stroke="#333"/><text x="248" y="71" text-anchor="middle" font-size="7">back queue: example.com</text>
  <rect x="202" y="78" width="92" height="12" rx="2" fill="#e6f2ff" stroke="#333"/><text x="248" y="87" text-anchor="middle" font-size="7">back queue: … one per host</text>
  <line x1="176" y1="70" x2="202" y2="70" stroke="#333" marker-end="url(#d)"/>
  <rect x="320" y="46" width="134" height="54" rx="3" fill="#fff" stroke="#1d4e89"/><text x="387" y="59" text-anchor="middle">heap: one entry per host</text><text x="387" y="70" text-anchor="middle" font-size="7">key = earliest time the host may be</text><text x="387" y="80" text-anchor="middle" font-size="7">hit again = last fetch end + delay</text><text x="387" y="91" text-anchor="middle" font-size="7">400/s ⇒ ≥ 400 hosts ready at once</text>
  <line x1="294" y1="68" x2="320" y2="68" stroke="#333" marker-end="url(#d)"/>
  <rect x="320" y="116" width="134" height="44" rx="3" fill="#fff" stroke="#1d4e89"/><text x="387" y="129" text-anchor="middle">workers: pop the earliest host</text><text x="387" y="140" text-anchor="middle" font-size="7">fetch one URL, parse (page 3)</text><text x="387" y="151" text-anchor="middle" font-size="7">reinsert host: time = now + delay</text>
  <line x1="360" y1="100" x2="360" y2="116" stroke="#333" marker-end="url(#d)"/><text x="356" y="111" text-anchor="end" font-size="7">pop</text>
  <line x1="420" y1="116" x2="420" y2="100" stroke="#333" stroke-dasharray="3 3" marker-end="url(#d)"/><text x="424" y="111" font-size="7">reinsert</text>
  <rect x="202" y="116" width="88" height="34" rx="3" fill="#e6f2ff" stroke="#333"/><text x="246" y="129" text-anchor="middle">page store</text><text x="246" y="141" text-anchor="middle" font-size="7">blob store (booklet 05)</text>
  <line x1="320" y1="133" x2="290" y2="133" stroke="#333" marker-end="url(#d)"/>
  <rect x="106" y="116" width="70" height="34" rx="3" fill="#fff" stroke="#1d4e89"/><text x="141" y="129" text-anchor="middle">dedupe</text><text x="141" y="141" text-anchor="middle" font-size="7">page 4</text>
  <line x1="202" y1="144" x2="176" y2="144" stroke="#333" marker-end="url(#d)"/><text x="189" y="156" text-anchor="middle" font-size="7">links</text>
  <line x1="106" y1="126" x2="92" y2="126" stroke="#333"/><line x1="92" y1="126" x2="92" y2="30" stroke="#333"/><line x1="92" y1="30" x2="80" y2="30" stroke="#333" marker-end="url(#d)"/><text x="94" y="46" font-size="7">new URLs</text>
  <text x="6" y="172" font-size="7.5" fill="#bf4c28">✕ one breadth-first queue: a page with 500 links to one host puts 500 URLs in a row, and 500 workers hit that host at once</text>
  <text x="6" y="182" font-size="7">the three structures are checkpointed together (page 5); a worker holds a host from pop to reinsert, so parallelism is across hosts, never within one</text>
  <defs><marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- Front queues carry priority; back queues carry politeness; the heap turns "one at a time per host" into a schedule. A worker that pops a host owns it until the fetch ends and the host goes back on the heap with a later time, so no second worker can pick the same host meanwhile

:::interview
"A thousand workers, one popular host: how do you stop them all hitting it at once?" — One back queue per host, and a worker takes the whole host, not a URL: it pops the host with the earliest allowed time from the heap, fetches one URL from that host's queue, and puts the host back with time = now + delay. Between pop and reinsert the host is on no heap, so no other worker can reach it. The delay comes from `robots.txt` where given, a default otherwise.
:::

### The failure

- One queue in breadth-first order. It is the obvious design and it is a denial-of-service tool: links cluster by host, so a run of 500 URLs to one host is normal, and 500 idle workers take them in the same second. Priority without politeness hits the popular hosts hardest, because those are the ones ranked first
