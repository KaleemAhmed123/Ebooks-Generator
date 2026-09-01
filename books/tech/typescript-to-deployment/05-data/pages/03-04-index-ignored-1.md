## Why an index is being ignored

- The index exists, the column looks right, and the plan still says `Seq Scan`
- There is a short list of reasons, and it is almost always one of these

### A function wrapping the column

```sql
WHERE lower(email) = 'rabiya@example.com'    -- the index on email is unusable
```

- The index stores `email`, not `lower(email)`, so the sorted order does not match what is being asked
- An **expression index** stores the computed value instead

```sql
CREATE INDEX idx_users_email_lower ON users (lower(email));
```

### A leading wildcard

```sql
WHERE name LIKE '%kaleem%'    -- cannot use a B-tree
WHERE name LIKE 'kaleem%'     -- can
```

- A B-tree is sorted from the left, so it cannot start matching in the middle of a value
- Leading wildcards need a trigram index or proper full text search

### A type mismatch

```sql
WHERE seller_id = 42          -- seller_id is TEXT, so every row gets cast
```

- Casting the column, rather than the value, defeats the index the same way a function does
