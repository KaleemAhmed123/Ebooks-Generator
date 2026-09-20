## Quadtrees and H3

- Geohash is a static grid. If you apply a 5km Geohash to the middle of the ocean, it tracks 0 users. If you apply it to Manhattan, it tracks 100,000 users. This makes searching Manhattan very slow
- A Quadtree fixes this by dynamically splitting the map. It starts as a single square. If the square gets too crowded (e.g., > 100 users), the Quadtree splits it into 4 smaller squares. It keeps splitting dense areas (Manhattan) into tiny, fast squares, while leaving empty areas (the ocean) as giant squares

| System | Shape | Splitting | Best For |
|---|---|---|---|
| **Geohash** | Rectangles | Static | Simple databases, Redis |
| **Quadtree** | Squares | Dynamic | Uneven density (cities vs oceans) |
| **H3 (Uber)** | Hexagons | Static | Ride-sharing routing |

- Uber invented the H3 system using Hexagons. Squares and rectangles are bad for calculating travel distance because the distance from the center to the corner is much longer than the distance from the center to the edge
- In a Hexagon, the distance from the center to any neighboring hexagon is exactly the same, making radius calculations flawless

### The failure

- The failure is using Geohash string matching to calculate exact distance. Geohash is an indexing tool to quickly filter down from 10 million rows to 1,000 rows. It is an approximation
- You cannot use Geohash lengths to bill a customer for a 5-mile ride. You must use Geohash (or a Quadtree) to find the candidate rows, and then always use exact mathematical distance (Haversine/routing algorithms) on those final rows for the actual business logic
