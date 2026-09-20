## The document model

- **Locality over normalization**. A document database (MongoDB, Couchbase) stores related data together in a single JSON or BSON object. The order's lines and the shipping address are embedded inside the order document itself
- When the application asks for the order, the disk performs one read. There is no join

<svg viewBox="0 0 460 140" role="img" aria-label="A document model. A single JSON-like document containing embedded arrays for addresses and order lines. No joins required to read the whole entity." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="130" y="10" width="200" height="120" rx="3" fill="#fcfcfc" stroke="#b8541a"/>
  <text x="145" y="30" font-weight="bold" fill="#b8541a">{</text>
  <text x="160" y="45">"_id": "user_1",</text>
  <text x="160" y="60">"name": "Alice",</text>
  <text x="160" y="75">"addresses": [</text>
  <text x="180" y="90">{"city": "London", "type": "shipping"}</text>
  <text x="160" y="105">]</text>
  <text x="145" y="120" font-weight="bold" fill="#b8541a">}</text>
  
  <path d="M120 70 L90 70" stroke="#6b6b6b" stroke-dasharray="2 2" fill="none"/>
  <text x="85" y="73" text-anchor="end" font-size="8">One disk seek</text>
</svg>

- **Schema-on-read** means the structure is enforced by the code that reads the document, not by the database. Two documents in one collection may differ; the reader copes
- Fits: catalogs, content, profiles, anything read whole

### The failure

- Unbounded embedded arrays. A user's `orders` array grows with every purchase until the document hits the limit: MongoDB caps a BSON document at 16 MiB and 100 nesting levels
- Long before the cap, every append rewrites a large document. An array that grows without bound belongs in its own collection
