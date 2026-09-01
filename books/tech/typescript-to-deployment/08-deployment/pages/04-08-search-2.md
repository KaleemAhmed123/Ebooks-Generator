## Search and vectors - continued

```bash
curl -X POST 'http://meilisearch:7700/dumps' -H "Authorization: Bearer $MEILI_MASTER_KEY"
```

### The rule for any search index

- **It is a derived copy and it will drift.** Rebuild it from the database on a schedule, and treat the database as the source of truth
- **Back up the database, not the index.** A lost index is a reindex job; a lost database is a company
- **Typesense** is the close alternative, and **OpenSearch** is the heavyweight for log analytics and complex aggregations. Both cost far more memory
