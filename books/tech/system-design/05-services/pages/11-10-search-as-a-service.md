## Search as a service

- Elasticsearch requires huge amounts of RAM to keep the Inverted Index fast. You should never run it on the same physical server as your primary relational database
- The database remains the Source of Truth. The search engine is treated like a read-only cache. To keep them synchronized, you use Change Data Capture (CDC)
- The CDC tool (like Debezium) listens to the Postgres transaction log. Every time a product is updated in Postgres, Debezium instantly streams a JSON update to Elasticsearch

<svg viewBox="0 0 460 140" role="img" aria-label="Search architecture. DB streams CDC events to Search Index." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="55" width="100" height="30" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="70" y="73" text-anchor="middle">Primary DB (Truth)</text>
  
  <rect x="170" y="55" width="100" height="30" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="220" y="73" text-anchor="middle">CDC (Event Bus)</text>
  
  <rect x="320" y="55" width="100" height="30" fill="#fce4e2" stroke="#b8541a"/>
  <text x="370" y="73" text-anchor="middle">Search Engine</text>
  
  <path d="M125 70 L165 70" stroke="#1a1a1a" fill="none"/>
  <path d="M160 67 l5 3 l-5 3 z" fill="#1a1a1a"/>
  
  <path d="M275 70 L315 70" stroke="#1a1a1a" fill="none"/>
  <path d="M310 67 l5 3 l-5 3 z" fill="#1a1a1a"/>
  
  <text x="145" y="65" text-anchor="middle" font-size="7">Write</text>
  <text x="295" y="65" text-anchor="middle" font-size="7">Sync</text>
</svg>

- Search engines are Near-Real-Time. When a document arrives, Elasticsearch writes it to a memory buffer. Every 1 second (by default), it flushes the buffer into an immutable "Segment" that can be searched. A user's write is completely invisible to search for up to 1 second

### The failure

- The failure is reading your own write from the search engine. If a user changes their profile name, and your application immediately issues a search query to verify it, the query will return the old name because the 1-second refresh hasn't happened yet
- When a user edits an item, always read it back from the Primary Database, not the Search Engine
- Another failure is rebuilding the index. If you need to change how tokens are generated (e.g., adding French support), you must rebuild the entire index. Never rebuild it in place. Build a completely new index in the background (v2), and when it finishes syncing, atomically swap the alias to point to v2
