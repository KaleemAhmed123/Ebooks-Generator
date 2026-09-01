## Search engines

- `WHERE name LIKE '%mug%'` cannot use a B-tree, so it reads every row, and it finds nothing for a shopper who typed `mugs` or `cofee mug`
- Real search needs stemming so `running` matches `run`, typo tolerance, relevance ranking, faceting and synonyms
- A **search engine** builds an **inverted index**, which maps each term to the documents containing it, the reverse of how a database index works
- That inversion is what makes searching a million documents for a word as cheap as looking up a key

| Engine | Fits | Cost |
|---|---|---|
| **PostgreSQL full text** | you already have Postgres and need decent search | no typo tolerance, weaker ranking |
| **Meilisearch** | product and content search, typo tolerance out of the box | single node until you pay |
| **Typesense** | same niche as Meilisearch, faceting focus | smaller ecosystem |
| **Elasticsearch / OpenSearch** | log analytics, complex aggregations, huge corpora | heavy to run and to tune |

```sql
ALTER TABLE products ADD COLUMN search tsvector
  GENERATED ALWAYS AS (to_tsvector('english', name || ' ' || description)) STORED;

CREATE INDEX idx_products_search ON products USING GIN (search);

SELECT * FROM products
WHERE search @@ websearch_to_tsquery('english', 'ceramic mug')
ORDER BY ts_rank(search, websearch_to_tsquery('english', 'ceramic mug')) DESC;
```

### The rule

- **Start with Postgres full text.** It is free, transactional, and good enough for most catalogs
- Move to a dedicated engine when typo tolerance or ranking quality becomes a product complaint
- A search index is a **derived copy**, so it will drift. Rebuild it from the database on a schedule, and treat the database as the source of truth
