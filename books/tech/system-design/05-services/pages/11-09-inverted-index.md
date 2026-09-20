## Search: the inverted index

- If you have 10 million products, and a user searches for "wireless mouse", you cannot use `SELECT * FROM products WHERE name LIKE '%wireless%'`
- The `%` at the beginning of the `LIKE` clause prevents the database from using a B-tree index. It forces a Full Table Scan. The database will load all 10 million rows from disk and inspect them one by one. This is agonizingly slow
- Search engines (like Elasticsearch) fix this by turning the data inside out. They use an Inverted Index

<svg viewBox="0 0 460 140" role="img" aria-label="Inverted Index. Documents broken into terms. Terms point to Document IDs." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="120" height="40" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="80" y="35" text-anchor="middle" font-weight="bold">Doc 1</text>
  <text x="80" y="50" text-anchor="middle">"Red wireless mouse"</text>
  
  <rect x="20" y="80" width="120" height="40" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="80" y="95" text-anchor="middle" font-weight="bold">Doc 2</text>
  <text x="80" y="110" text-anchor="middle">"Red keyboard"</text>
  
  <path d="M150 70 L200 70" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <path d="M195 67 l5 3 l-5 3 z" fill="#1a1a1a"/>
  <text x="175" y="65" text-anchor="middle" font-size="7">Tokenize</text>
  
  <rect x="220" y="20" width="200" height="100" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="320" y="35" text-anchor="middle" font-weight="bold">Inverted Index</text>
  <text x="280" y="55" text-anchor="end">"red"</text>
  <text x="290" y="55" text-anchor="start">→ [Doc 1, Doc 2]</text>
  
  <text x="280" y="75" text-anchor="end">"wireless"</text>
  <text x="290" y="75" text-anchor="start">→ [Doc 1]</text>
  
  <text x="280" y="95" text-anchor="end">"mouse"</text>
  <text x="290" y="95" text-anchor="start">→ [Doc 1]</text>
  
  <text x="280" y="115" text-anchor="end">"keyboard"</text>
  <text x="290" y="115" text-anchor="start">→ [Doc 2]</text>
</svg>

- When text is inserted, the engine breaks it into individual lowercase words (tokens). It creates a dictionary of every word, pointing to a list of IDs (the Posting List)
- When the user searches for "wireless mouse", the engine looks up "wireless" (Doc 1) and "mouse" (Doc 1), finds the intersection, and instantly returns Doc 1 without scanning any tables

### The failure

- The failure is using an Inverted Index for exact matches or primary keys. Because the text is normalized and broken apart (e.g., "Apple" becomes "appl"), you lose the exact formatting. Use a standard B-tree database for exact lookups, and an Inverted Index strictly for fuzzy text search
