### The advantage that decides it

- **The filter and the search are one query.** Tenant, date range, document type and permissions are ordinary SQL, in the same transaction
- A dedicated vector database makes that a second query and a join in application code
- `halfvec` halves storage at almost no accuracy cost, which matters once a corpus passes a few million rows
