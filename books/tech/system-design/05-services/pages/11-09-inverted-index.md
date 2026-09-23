## The inverted index

- A normal index maps a row to its values. An **inverted index** maps a value to its rows: every term points at the list of documents containing it. Searching then means reading a few short lists instead of examining every row

<svg viewBox="0 0 460 104" role="img" aria-label="An inverted index. Three documents — wireless mouse, wireless keyboard, and usb mouse — are turned inside out into a dictionary of terms. The term wireless points at documents one and two, mouse points at documents one and three, and usb points at document three. A query for wireless mouse intersects two short posting lists rather than scanning every row. An orange cross marks a LIKE query with a leading wildcard, which cannot use a B-tree and forces a full scan of all ten million rows." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="4" y="13" font-size="7.5">documents turned inside out: each term points at the documents containing it</text>
  <rect x="4" y="22" width="140" height="16" rx="2" fill="#fff" stroke="#1d4e89"/><text x="12" y="33" font-size="6.5">d1: wireless mouse</text>
  <rect x="4" y="42" width="140" height="16" rx="2" fill="#fff" stroke="#1d4e89"/><text x="12" y="53" font-size="6.5">d2: wireless keyboard</text>
  <rect x="4" y="62" width="140" height="16" rx="2" fill="#fff" stroke="#1d4e89"/><text x="12" y="73" font-size="6.5">d3: usb mouse</text>
  <line x1="148" y1="50" x2="190" y2="50" stroke="#1d4e89" marker-end="url(#b)"/>
  <rect x="196" y="22" width="200" height="16" rx="2" fill="#e6f2ff" stroke="#1d4e89"/><text x="204" y="33" font-size="6.5">wireless → d1, d2</text>
  <rect x="196" y="42" width="200" height="16" rx="2" fill="#e6f2ff" stroke="#1d4e89"/><text x="204" y="53" font-size="6.5">mouse → d1, d3</text>
  <rect x="196" y="62" width="200" height="16" rx="2" fill="#e6f2ff" stroke="#1d4e89"/><text x="204" y="73" font-size="6.5">usb → d3</text>
  <text x="4" y="90" font-size="7">"wireless mouse" intersects two short lists and returns d1 — no row is ever examined</text>
  <text x="4" y="100" font-size="7.5" fill="#bf4c28">✕ LIKE '%mouse%' cannot use a B-tree: the leading wildcard forces a scan of all 10 M rows</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

- Building the index is where the behaviour comes from. Text is tokenised into terms, then normalised — lowercased, stripped of punctuation, often reduced to a stem — so `Wireless`, `wireless` and `WIRELESS` collapse to one entry and match each other
- That normalisation is also the limitation. The index holds the processed form, not the original, so it can tell you a document contains something like `mouse` and cannot tell you it contains exactly `Mouse`. Scoring then ranks the surviving documents, which is a second problem entirely and the reason search returns an order rather than a set

### The failure

- `LIKE '%term%'` standing in for search. A B-tree is ordered by prefix, so a pattern that does not start with a literal gives it nothing to seek on and the only plan left is to read every row. It is instant on ten thousand rows in development and a table scan per keystroke at ten million in production
- The inverse mistake is using the search engine for exact lookups. Normalisation has already discarded the exact bytes, so the engine cannot reliably answer "this precise string" — that is what the database's own index is for, and the two are not substitutes in either direction
