## Geo indexing choices

- To find nearby drivers, you cannot scan the whole planet. You must divide the map into cells
- **Geohash:** Divides the world into a grid. A string like `9q8yy` represents a box. Longer string = smaller box. Pros: Simple prefix matching. Cons: Edge effects (two adjacent points can have completely different prefixes if they cross the equator/meridian)
- **Quadtree:** A tree where each node has 4 children. It dynamically subdivides dense areas (cities) into smaller squares, while leaving empty areas (oceans) large. Cons: Harder to update for moving objects
- **H3 (Uber's choice):** A hexagonal grid system. Hexagons have a crucial advantage: the distance from the center to all neighbors is exactly the same. This makes radius queries vastly simpler

<svg viewBox="0 0 460 100" role="img" aria-label="Geohash vs H3 Grid" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="100" height="60" fill="none" stroke="#1d4e89" stroke-width="1.5"/>
  <line x1="70" y1="20" x2="70" y2="80" stroke="#1d4e89"/>
  <line x1="20" y1="50" x2="120" y2="50" stroke="#1d4e89"/>
  <text x="70" y="95" text-anchor="middle" font-weight="bold">Geohash (Squares)</text>
  
  <path d="M220 20 L240 30 L240 50 L220 60 L200 50 L200 30 Z" fill="none" stroke="#b8541a" stroke-width="1.5"/>
  <path d="M220 60 L240 70 L240 90 L220 100 L200 90 L200 70 Z" fill="none" stroke="#b8541a" stroke-width="1.5"/>
  <text x="220" y="115" text-anchor="middle" font-weight="bold">H3 (Hexagons)</text>
</svg>

### The failure

- Using a SQL query like `SELECT * FROM drivers WHERE lat BETWEEN X AND Y`. Without a spatial index, this is a full table scan.

:::interview
You query for drivers using `WHERE latitude BETWEEN 37.0 AND 38.0 AND longitude BETWEEN -122.0 AND -121.0`. The query takes 3 seconds. Why?

Without a spatial index (like PostGIS or a Geohash column), the database cannot do a 2D range query efficiently. It scans the whole table or intersects two massive 1D B-tree indexes.
:::
