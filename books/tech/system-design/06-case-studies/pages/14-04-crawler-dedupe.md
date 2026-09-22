## Dedupe

- Two questions, two structures. "Have I seen this URL?" is asked for every extracted link, billions of times, and answered by a **Bloom filter**: a bit array with k hash functions, where a lookup says "definitely not" or "probably yes", never "definitely yes". "Have I seen this content?" is asked once per fetched page and answered by a hash of the page's text in a table

<svg viewBox="0 0 460 158" role="img" aria-label="Crawler dedupe path. An extracted link is normalised, then checked against the seen-URL Bloom filter: 10 billion URLs at a 1 percent false-positive rate is about 9.6 bits each, about 12 gigabytes, in memory on the frontier nodes. Probably seen: drop the link. Definitely new: set its bits and put it in the frontier. After the fetch, the page's text is hashed to a fingerprint and looked up in a fingerprint table keyed by hash. Seen content: store the URL as an alias and do not extract links. New content: store the page, record the fingerprint, extract links. Two URLs are shown entering: example.com/page and example.com/page?utm_source=x. Normalisation strips the known tracking parameter so both become one URL; a parameter normalisation does not know about, such as session=123, passes the URL check as new, and the fingerprint catches it after the fetch. An orange cross marks crawling the utm variants as new pages, each costing a fetch, a store and its links re-queued." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="6" y="14" font-size="7">example.com/page</text><text x="6" y="24" font-size="7">example.com/page?utm_source=x</text><text x="6" y="34" font-size="7">example.com/page?session=123</text>
  <rect x="6" y="44" width="74" height="30" rx="3" fill="#fff" stroke="#1d4e89"/><text x="43" y="57" text-anchor="middle">normalise</text><text x="43" y="68" text-anchor="middle" font-size="7">strip known params</text>
  <line x1="43" y1="36" x2="43" y2="44" stroke="#333" marker-end="url(#d)"/>
  <rect x="110" y="40" width="112" height="38" rx="3" fill="#e6f2ff" stroke="#333"/><text x="166" y="53" text-anchor="middle">seen-URL Bloom filter</text><text x="166" y="64" text-anchor="middle" font-size="7">10 B URLs, 1 % false positive:</text><text x="166" y="74" text-anchor="middle" font-size="7">≈ 9.6 bits each ≈ 12 GB, in memory</text>
  <line x1="80" y1="59" x2="110" y2="59" stroke="#333" marker-end="url(#d)"/>
  <text x="166" y="90" text-anchor="middle" font-size="7">"probably seen" → drop</text>
  <rect x="252" y="40" width="70" height="38" rx="3" fill="#e6f2ff" stroke="#333"/><text x="287" y="55" text-anchor="middle">frontier</text><text x="287" y="68" text-anchor="middle" font-size="7">page 2</text>
  <line x1="222" y1="59" x2="252" y2="59" stroke="#333" marker-end="url(#d)"/><text x="237" y="54" text-anchor="middle" font-size="7">new</text>
  <rect x="352" y="40" width="102" height="38" rx="3" fill="#fff" stroke="#1d4e89"/><text x="403" y="55" text-anchor="middle">fetch, hash the text</text><text x="403" y="68" text-anchor="middle" font-size="7">fingerprint = hash(body text)</text>
  <line x1="322" y1="59" x2="352" y2="59" stroke="#333" marker-end="url(#d)"/>
  <rect x="352" y="96" width="102" height="34" rx="3" fill="#e6f2ff" stroke="#333"/><text x="403" y="109" text-anchor="middle">fingerprint table</text><text x="403" y="121" text-anchor="middle" font-size="7">hash → the first URL seen</text>
  <line x1="403" y1="78" x2="403" y2="96" stroke="#333" marker-end="url(#d)"/>
  <text x="346" y="140" text-anchor="end" font-size="7">seen content → alias the URL, extract no links</text>
  <text x="346" y="150" text-anchor="end" font-size="7">new content → store page + fingerprint, extract links → normalise</text>
  <line x1="352" y1="113" x2="330" y2="113" stroke="#333" marker-end="url(#d)"/>
  <text x="6" y="106" font-size="7.5" fill="#bf4c28">✕ ?utm= variants crawled as new pages: each</text><text x="6" y="116" font-size="7.5" fill="#bf4c28">costs a fetch, a store and its links re-queued</text>
  <text x="6" y="132" font-size="7">the filter catches the URL it knows; the</text><text x="6" y="142" font-size="7">fingerprint catches the one it does not</text>
  <defs><marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- The filter's size is the standard formula, bits = −n·ln(p) ÷ (ln 2)²: 10 B URLs at a 1 % false-positive rate is ≈ 9.6 bits each, ≈ 12 GB, against ≈ 100 bytes per URL in a hash set, a terabyte. A false positive skips a genuinely new URL, which the crawl can afford; a false negative would recrawl, which it never gives. The filter cannot forget, so a recrawl policy (page 6) keeps its own schedule and does not consult it. Booklet 05 owns the structure
- The fingerprint is a hash of the extracted text, not the raw bytes, so a changed timestamp in the footer does not make a new page; near-duplicate detection, pages that differ in a few words, is a different hash family and a deep-dive on its own

### The failure

- `?utm=` variants crawled as new pages. One article with twenty tracking variants is twenty fetches against the host's politeness budget, twenty stored copies and twenty times its links back into the frontier. Normalisation catches the parameters it knows; the fingerprint catches everything else, after one wasted fetch instead of twenty
