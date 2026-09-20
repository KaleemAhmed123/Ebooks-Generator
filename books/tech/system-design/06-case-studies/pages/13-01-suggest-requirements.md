# Search Autocomplete

### Requirements and numbers

- Search autocomplete (Google Suggest) provides real-time query completions as the user types
- **In scope:** Fast prefix matching, updating suggestions based on global trends
- **Out of scope:** Full-text search of the actual results

| Metric | Requirement |
|---|---|
| **Latency** | < 100 ms. Must return instantly |
| **Ratio** | Queries absolutely dominate updates |
| **Freshness** | Suggestions update hourly, not instantly |

- **The core constraint:** Users type 5 characters a second. If you have 1 billion users, that is 5 billion requests a second. The backend must do zero calculation at read-time. Every answer must be precomputed

### The failure

- Running a SQL query like `SELECT query FROM searches WHERE query LIKE 'app%' ORDER BY count DESC LIMIT 5` on every keystroke. This requires a full index scan and a sort, which will collapse the database instantly.

:::interview
An interviewer asks you to build search autocomplete. You propose querying ElasticSearch on every keystroke. What is the problem?

ElasticSearch is too slow for 5 billion keystrokes a second. Autocomplete cannot perform any runtime calculation or sorting. The top 5 results for every possible prefix must be entirely precomputed and stored in memory.
:::\n