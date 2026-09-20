## Geospatial indexes

- If you are building a ride-sharing app, you need to "Find drivers within 5 miles of me". The naive approach is a SQL query using the Haversine formula to calculate the distance between your coordinate and every driver's coordinate
- This requires a Full Table Scan. A B-tree index cannot help you. A B-tree can sort all latitudes (1D), and it can sort all longitudes (1D), but it cannot sort 2D points in a way that keeps nearby points close together in the index
- To solve this, databases use Geospatial Indexes

<svg viewBox="0 0 460 140" role="img" aria-label="Geospatial bounding box. Eliminates 99% of drivers outside the box using simple math." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="100" height="100" fill="none" stroke="#1a1a1a" stroke-dasharray="2"/>
  
  <circle cx="70" cy="70" r="40" fill="#e2fcf3" stroke="#4a8f3c"/>
  <circle cx="70" cy="70" r="3" fill="#1a1a1a"/>
  <text x="70" y="65" text-anchor="middle" font-size="7">User (5mi radius)</text>
  
  <circle cx="50" cy="50" r="3" fill="#b8541a"/>
  <circle cx="90" cy="90" r="3" fill="#b8541a"/>
  <circle cx="10" cy="10" r="3" fill="#1d4e89"/>
  <circle cx="130" cy="130" r="3" fill="#1d4e89"/>
  
  <rect x="180" y="30" width="260" height="80" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="310" y="45" text-anchor="middle" font-weight="bold">Step 1: Bounding Box (Fast)</text>
  <text x="310" y="60" text-anchor="middle" font-size="7">WHERE lat BETWEEN (user_lat - 5mi) AND (user_lat + 5mi)</text>
  <text x="310" y="70" text-anchor="middle" font-size="7">AND lng BETWEEN (user_lng - 5mi) AND (user_lng + 5mi)</text>
  
  <text x="310" y="95" text-anchor="middle" font-weight="bold">Step 2: Haversine (Slow)</text>
  <text x="310" y="110" text-anchor="middle" font-size="7">Calculate exact distance only for drivers inside the box</text>
</svg>

### The failure

- The failure is running the Haversine formula on every row. Mathematics like `sin()`, `cos()`, and `sqrt()` are incredibly slow for a CPU. If you run them on 100,000 drivers every time a user opens the app, your database will melt
- By applying a simple square Bounding Box first (Step 1), you use simple arithmetic (`+` and `-`) to instantly eliminate 99% of the drivers. You only run the expensive Haversine formula on the few drivers who are actually inside the square
