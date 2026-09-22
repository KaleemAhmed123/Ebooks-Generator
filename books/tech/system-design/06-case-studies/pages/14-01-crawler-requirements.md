# Module 14 - Web crawler

## Requirements and numbers

- A crawler starts from seed URLs, fetches pages, extracts their links and fetches those, forever, without ever hitting one site hard enough to hurt it. The shape: a queue that feeds itself, a politeness constraint per host that is the real scheduler, and a dedupe problem at web scale
- Functional, in: fetch HTML, extract links, store the page, revisit pages that change. Out: indexing and ranking (the search engine), rendering JavaScript (page 6), non-HTML content
- Non-functional: never more than one request in flight per host, with a delay between them; obey `robots.txt`; survive a restart without starting over; never crawl the same URL twice or the same content under two URLs
- Inputs, as assumptions: 1 B pages a month; 100 KB of HTML stored per page; a politeness delay of one second per host; a page's fetch takes about a second of mostly waiting

| Quantity | Arithmetic | Result |
| :--- | :--- | :--- |
| fetch rate | 1 B ÷ (30 × 86 400 s) | ≈ 386, call it 400 pages/s |
| hosts in flight | 400 pages/s at one request per host per second | at least 400 distinct hosts busy at any moment: the frontier must hold thousands of hosts to always have 400 ready (page 2) |
| storage | 1 B × 100 KB | 100 TB a month of HTML, in blob storage (booklet 05), metadata in a table |
| workers | 400 fetches/s × ≈ 1 s each | ≈ 400 open connections and 40 MB/s: a handful of machines; they exist for the queues, not the fetching |

- The numbers say the crawler is a scheduling problem: the frontier decides what to fetch next under a per-host constraint (page 2), fetching is cheap (page 3), and the dedupe structures are where the memory goes (page 4)

### The failure

- Designing a scraper. A scraper targets one site whose shape is known; a crawler meets every shape the open web has: calendars with a next month forever (page 5), hosts that return 200 with an error page, and one site that files an abuse report at 50 requests a second. Politeness is a requirement, not an optimisation
