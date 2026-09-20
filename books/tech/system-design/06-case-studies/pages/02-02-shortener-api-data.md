## API and data model

- The API requires two endpoints. One to create the short URL, and one to read it. The creation endpoint should accept the long URL and an optional custom alias
- The read endpoint is a simple `GET /:code` that returns a 3xx redirect. The client does not expect a JSON response; it expects the browser to follow the `Location` header
- The data model is a single table. The primary key must be the `short_code`. Since 12 TB of data will not fit in memory, the database will rely heavily on a B-tree index (as covered in Booklet 02). If the index is on the `short_code`, the database can find the row in milliseconds

```typescript
// POST /api/v1/data/shorten
type ShortenRequest = { longUrl: string; customAlias?: string };

// Database schema
type UrlMapping = {
  shortCode: string; // Primary Key, VARCHAR(7)
  longUrl: string;   // VARCHAR(2048)
  userId?: string;   // Indexed
  createdAt: Date;
};
```

### The failure

- The failure mode is making the `long_url` the primary key. Candidates sometimes do this because they want to enforce uniqueness (so the same long URL always gets the same short code)
- The read path looks up by the `short_code`. If `short_code` is not the primary key, the database must perform a secondary index lookup or a full table scan. In a read-heavy system, the primary key must serve the read path

:::interview
**The primary key test**
When you define the schema, state what the primary key is and why. In a URL shortener, the primary key must be the short code, because 99% of queries are lookups by that exact code.
:::
