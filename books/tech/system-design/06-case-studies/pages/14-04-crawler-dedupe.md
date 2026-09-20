## Dedupe

- The web is full of identical content. You must deduplicate at two levels: URL and Content
- **URL Deduplication:** Have we crawled this exact URL before? 
  - You cannot store 10 billion URLs in memory. You use a **Bloom Filter** (→05). It is highly space-efficient. 
  - If the Bloom filter says "Yes", you drop the URL. If it says "No", you add it to the Frontier and update the Bloom filter
- **Content Deduplication:** Is this page identical to another page?
  - `example.com/page` and `example.com/page?utm_source=twitter` have different URLs but identical HTML
  - You hash the HTML (or a subset of text) and store it in a database. If the hash exists, drop the page

### The failure

- Using a standard HashMap in memory to store visited URLs. At 10 billion URLs, a HashMap will consume hundreds of gigabytes of RAM. A Bloom Filter uses a fraction of the space.

:::interview
Your URL Frontier is exploding with millions of duplicates. You realise a site is appending tracking parameters `?session=123` to every single link. How do you stop crawling these duplicates?

Implement Content Deduplication. You hash the HTML content of the page. Even if the URL is unique due to tracking parameters, the content hash will match an already crawled page, allowing you to drop it.
:::\n