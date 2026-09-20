# Web Crawler

### Requirements and numbers

- A web crawler (Googlebot) systematically browses the web to download pages for indexing
- **In scope:** URL frontier, fetching, HTML parsing, deduplication, politeness
- **Out of scope:** The actual search engine index (PageRank)

| Metric | Requirement |
|---|---|
| **Scale** | 1 Billion pages/month ≈ 400 pages/s |
| **Storage** | 1B × 2 MB (avg HTML) ≈ 2 PB/month |
| **Politeness** | Never DDoS a target server |

- **The core constraint:** A web crawler is essentially a distributed DDoS tool. If it is not heavily rate-limited and polite, you will take down target websites and your IPs will be permanently blacklisted

### The failure

- Designing a scraper instead of a crawler. A scraper targets one known site. A crawler must survive the chaos, infinite loops, and malformed HTML of the open web.

:::interview
An interviewer asks you to design a web crawler. You immediately start drawing a queue and a fleet of worker nodes. What critical requirement did you forget?

Politeness. A crawler must strictly limit its request rate per target domain to avoid overwhelming external servers. Without a politeness module, your crawler is just a botnet.
:::\n