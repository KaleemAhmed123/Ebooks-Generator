## Traps and failure

- **Spider traps:** The web is hostile. A site might generate a calendar with an infinite chain of "Next Month" links (`/2026/01`, `/2026/02`, `/2026/03`...). Your crawler will get stuck forever. You must enforce a **Maximum Depth limit** (e.g., 10 hops from the seed URL)
- **Crawler restart:** If the crawler crashes, you cannot start from scratch. The URL Frontier must periodically snapshot its state (checkpointing) to disk or a database
- **Worker death:** When a worker pulls a URL from a politeness queue, it takes a lease (→04) on it. If the worker dies before completing the parse, the lease expires and the URL becomes available again

### The failure

- Following symbolic links or dynamically generated infinite directories without a depth limit. Your crawler will consume infinite storage indexing fake pages.

:::interview
Your crawler has been running for 3 days, but you notice it is entirely focused on a single website that sells t-shirts. What happened?

It hit a spider trap. The website is likely dynamically generating infinite pages (e.g., combining filter parameters). You must enforce a strict maximum crawl depth and URL length limits.
:::\n