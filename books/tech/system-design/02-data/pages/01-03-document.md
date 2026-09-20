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

- **Strengths**: Read locality (fast single-record reads). Schema-on-read allows different documents in the same collection to have different structures, which handles rapid application iteration
- **Use for**: Catalogs, content management, user profiles, and workloads where you usually read the entire entity at once

### The failure

- Unbounded embedded arrays. A user's `orders` array grows every time they buy something. The document grows until it hits the database limit (MongoDB caps documents at 16 MiB and 100 nesting levels)
- Furthermore, updating a massive document to add one item to an array is write-heavy. If the array is unbounded, it must be normalized out into a separate collection
