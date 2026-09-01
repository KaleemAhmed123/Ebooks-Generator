## Search and vectors

- Booklet 4 covers when a search engine beats `LIKE`, and Booklet 7 covers vector search. **This is what running one yourself looks like**

### Start with Postgres

- **Full text search and `pgvector` are both extensions on a database you already run.** No extra service, no extra backup, and the filter is ordinary SQL
- Reach past it only when typo tolerance or ranking quality becomes a product complaint

```yaml
  db:
    image: pgvector/pgvector:pg18       # Postgres 18 with pgvector built in
```

### Meilisearch, when you need real search

```yaml
  meilisearch:
    image: getmeili/meilisearch:v1.53
    restart: unless-stopped
    environment:
      MEILI_MASTER_KEY: ${MEILI_MASTER_KEY:?}
      MEILI_ENV: production
    volumes: ["./data/meili:/meili_data"]
    healthcheck:
      test: ["CMD", "curl", "-fsS", "http://localhost:7700/health"]
    deploy: { resources: { limits: { memory: 2G } } }
```

- **Typo tolerance, faceting and sub-50ms responses out of the box**, with almost no tuning
- **`MEILI_ENV: production` makes the master key mandatory.** In development it runs open, which is how an unprotected index ends up on the internet
