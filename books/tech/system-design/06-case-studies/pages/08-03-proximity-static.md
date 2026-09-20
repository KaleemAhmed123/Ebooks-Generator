## Proximity for static places (Yelp variant)

- If you are building Yelp, the restaurants don't move. This is a read-heavy spatial problem
- You calculate the Geohash (e.g., `9q8yy`) for every restaurant and save it in the database
- To find nearby places, calculate the user's Geohash, and query: `SELECT * FROM places WHERE geohash LIKE '9q8yy%'`
- **Edge cases:** The user might be standing on the exact border of a Geohash cell. The closest restaurant might be 10 meters away, but in a different Geohash. You must always query the user's cell **plus all 8 surrounding cells**

```typescript
// Yelp Proximity Query
const userHash = geohash(lat, lng, precision=5);
const neighbors = getNeighbors(userHash); // returns 8 adjacent hashes
const hashesToQuery = [userHash, ...neighbors];

const query = "SELECT * FROM restaurants WHERE geohash IN (...)";
```

### The failure

- Querying only the user's exact cell. The user is on 5th Avenue (the border of cell A and B). They are in cell A. The best pizza place is 10ft away in cell B. They don't see it.

:::interview
A Yelp user is standing on the border of a Geohash cell. They complain they cannot see a coffee shop across the street. What spatial querying mistake did you make?

You only queried the user's current Geohash cell. Because spatial grids have hard boundaries, you must always query the current cell and its immediate neighbors.
:::
