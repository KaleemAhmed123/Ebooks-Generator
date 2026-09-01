# Module 9 - Running a database in production

## Schema migrations

- The schema changes constantly. A column is added, a type widens, an index appears, a table is split in two
- Doing that by hand means the staging database and production drift apart, and nobody can say what shape either one is in
- A **migration** is a versioned, ordered script describing one change, checked into the repository next to the code that needs it
- The tool keeps a table recording which migrations have run, so applying them is repeatable and knows where to resume
- The schema then becomes reviewable in a pull request, the same as any other change

```bash
npx prisma migrate dev --name add_order_status_index   # create and apply locally
npx prisma migrate deploy                              # apply pending, in CI or release
```

### The rules that keep it safe

- **Never edit a migration that has run anywhere.** Write a new one. Editing means two databases disagree about what version 12 was
- **One logical change per migration.** A failure then reverts one thing, not six
- **Migrations run before the new code starts**, which is why the old code must still work against the new schema
- **`migrate deploy` in production, never `migrate dev`.** The development command can reset the database
- **Test the migration against a copy of production data.** A migration that takes 200ms on an empty table can take 40 minutes on 80 million rows

### The ones that lock a table

- Adding a column with a volatile default, changing a column type, and adding a constraint all rewrite the table
- On a large table that is an outage. The next page is how to avoid it
