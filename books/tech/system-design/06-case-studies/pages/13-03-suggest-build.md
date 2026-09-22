## Building the trie offline

- The live trie is never written. A batch job builds a new one from the query log every hour, publishes it as a file, and each suggest server loads the file and swaps one pointer. Readers on the old trie finish on the old trie; the next request sees the new one

<svg viewBox="0 0 460 170" role="img" aria-label="Search autocomplete, whole design. Every search query is appended to a query log, a Kafka topic from booklet 04, about 1 200 a second. An hourly batch job aggregates the last window: counts per query, drops rare ones, keeps 20 million. A builder turns the counts into a trie with a top-5 list on every node, page 2, and writes one snapshot file per prefix shard, page 4, to an object store, booklet 05. Each suggest server, one per shard with replicas, downloads its shard's snapshot, loads it into memory beside the old one and swaps a pointer atomically. Clients send prefixes through a gateway that routes by the first characters to the right shard; 11 600 requests a second, 60 000 at peak, are answered from the in-memory trie. An orange cross marks updating the live trie per query: a write lock on a structure read 60 000 times a second." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="10" width="78" height="40" rx="3" fill="#e6f2ff" stroke="#333"/><text x="45" y="23" text-anchor="middle">query log</text><text x="45" y="34" text-anchor="middle" font-size="7">Kafka topic (booklet 04)</text><text x="45" y="44" text-anchor="middle" font-size="7">≈ 1 200 searches/s</text>
  <rect x="114" y="10" width="88" height="40" rx="3" fill="#fff" stroke="#1d4e89"/><text x="158" y="23" text-anchor="middle">hourly aggregator</text><text x="158" y="34" text-anchor="middle" font-size="7">count per query, drop rare,</text><text x="158" y="44" text-anchor="middle" font-size="7">keep 20 M (booklet 04)</text>
  <line x1="84" y1="30" x2="114" y2="30" stroke="#333" marker-end="url(#d)"/>
  <rect x="232" y="10" width="88" height="40" rx="3" fill="#fff" stroke="#1d4e89"/><text x="276" y="23" text-anchor="middle">trie builder</text><text x="276" y="34" text-anchor="middle" font-size="7">top-5 per node (page 2),</text><text x="276" y="44" text-anchor="middle" font-size="7">one file per shard (page 4)</text>
  <line x1="202" y1="30" x2="232" y2="30" stroke="#333" marker-end="url(#d)"/>
  <rect x="350" y="10" width="104" height="40" rx="3" fill="#e6f2ff" stroke="#333"/><text x="402" y="23" text-anchor="middle">object store</text><text x="402" y="34" text-anchor="middle" font-size="7">snapshot per shard per hour</text><text x="402" y="44" text-anchor="middle" font-size="7">(booklet 05)</text>
  <line x1="320" y1="30" x2="350" y2="30" stroke="#333" marker-end="url(#d)"/>
  <rect x="270" y="80" width="184" height="52" rx="3" fill="#fff" stroke="#1d4e89"/><text x="362" y="93" text-anchor="middle">suggest servers, one set per shard</text><text x="362" y="105" text-anchor="middle" font-size="7">load the new snapshot beside the old trie,</text><text x="362" y="115" text-anchor="middle" font-size="7">then swap one pointer: in-flight reads finish on</text><text x="362" y="125" text-anchor="middle" font-size="7">the old one, the next request sees the new one</text>
  <line x1="402" y1="50" x2="402" y2="80" stroke="#333" stroke-dasharray="3 3" marker-end="url(#d)"/><text x="406" y="68" font-size="7">download</text>
  <rect x="6" y="86" width="60" height="40" rx="3" fill="#fff" stroke="#333"/><text x="36" y="99" text-anchor="middle">clients</text><text x="36" y="110" text-anchor="middle" font-size="7">debounced</text><text x="36" y="120" text-anchor="middle" font-size="7">keystrokes</text>
  <rect x="112" y="86" width="104" height="40" rx="3" fill="#fff" stroke="#1d4e89"/><text x="164" y="99" text-anchor="middle">gateway</text><text x="164" y="110" text-anchor="middle" font-size="7">routes by first characters</text><text x="164" y="120" text-anchor="middle" font-size="7">to the shard (page 4)</text>
  <line x1="66" y1="106" x2="112" y2="106" stroke="#333" marker-end="url(#d)"/><text x="89" y="101" text-anchor="middle" font-size="7">"app"</text>
  <line x1="216" y1="106" x2="270" y2="106" stroke="#333" marker-end="url(#d)"/><text x="243" y="101" text-anchor="middle" font-size="7">11 600/s</text><text x="243" y="116" text-anchor="middle" font-size="7">60 000 peak</text>
  <line x1="36" y1="86" x2="36" y2="50" stroke="#333" stroke-dasharray="3 3" marker-end="url(#d)"/><text x="40" y="70" font-size="7">searches</text>
  <text x="6" y="148" font-size="7.5" fill="#bf4c28">✕ updating the live trie per query: a write lock on a structure read 60 000 times a second, and re-sorting a list on every ancestor</text>
  <text x="6" y="162" font-size="7">the trie never changes while serving; freshness is the build interval, and the swap is what makes every replica flip at once</text>
  <defs><marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- Elasticsearch's completion suggester is the same shape: the completions are built into an in-memory structure at index time and served from it, not searched for at query time. Whatever the engine, the answer is a lookup in something built earlier
- The build can be a batch over the hour's log or a streaming count kept per query (booklet 04 owns the choice); either way the output is a file, and the swap is what makes the design safe to redeploy, roll back and replicate

:::interview
"A term goes viral at 9:00. When does it show in suggestions?" — With an hourly build, up to an hour plus the build's own length, and then on every replica at once, because the swap is atomic per server and the snapshot is one file. If minutes are required, that is a second, small trending index built from a sliding window every minute and merged into the response (page 5), never a write into the main trie.
:::

### The failure

- Updating the live trie per query. Every search increments a count and re-sorts the top-5 list on every ancestor of the query, under a lock, on the structure every read walks. Reads and writes have different rates by five orders of magnitude here; the design separates them by time, not by locking
