## What the interviewer probes

- **Freshness:** News sites update every minute. Old blogs update never. The crawler must dynamically adjust the re-crawl policy based on the historical change frequency of the host
- **JavaScript rendering:** Modern sites are Single Page Applications (React/Vue). A dumb HTTP GET returns a blank page. To extract links, you need a headless browser (Puppeteer/Playwright), which is massively slower and more expensive
- **Distribution:** How do workers share the load? Use Consistent Hashing (→02) to map hostnames (e.g., `apple.com`) to specific worker nodes, ensuring the politeness queues are properly isolated

### The failure

- Crawling every single URL in your database at the exact same daily frequency. You will waste 90% of your bandwidth checking dormant websites.

:::interview
Your crawler downloads CNN.com and an abandoned 2005 blog once a week. CNN complains that their breaking news is not indexed fast enough. How do you fix this?

Implement an adaptive re-crawl policy. The Prioritizer should track the update frequency of each host and assign higher queue priority and tighter fetch intervals to sites that change often.
:::\n