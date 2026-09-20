## What the interviewer probes

- **Surge pricing by cell:** "How do you calculate surge?" — Every 10 seconds, aggregate the number of active riders and available drivers within an H3 hexagon. If riders > drivers, raise the multiplier. H3 is perfect for this because hexes have equal area
- **ETA (Estimated Time of Arrival):** "Do you calculate ETA dynamically for the top 10 drivers?" — No. Google Maps routing API is too slow and expensive to call 10 times per match. You use a fast approximation (e.g., straight-line distance, or a cached historical travel-time matrix) to pick the best driver, and *then* call the routing API once for the exact ETA
- **Hotspot cells:** "A concert ends. 50,000 people request rides from one H3 cell." — The Redis or Location shard holding that cell will melt (→02). You must subdivide hot cells dynamically or partition the cell data across multiple nodes (e.g., appending random suffixes)

### The failure

- Calculating precise traffic-aware road distances during the matching phase. It is a classic O(N) scaling trap. You must use cheap heuristics (spatial radius) to filter candidates before applying expensive operations

:::interview
To find the closest driver, your Matcher calls the Google Maps Directions API for every driver in a 5-mile radius. The interviewer notes your Matcher takes 15 seconds to return. Why?

Because calculating real road traffic for 50 drivers takes too long. You must filter by straight-line (Haversine) distance first to find the top 5, and only calculate road distances for those 5.
:::
