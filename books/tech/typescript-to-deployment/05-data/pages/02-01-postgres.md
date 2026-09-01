# Module 2 - PostgreSQL

## PostgreSQL

- A database has to do more than store rows. It has to stop two people spending the same money, survive being unplugged mid-write, and answer a question about a million rows quickly
- **PostgreSQL** is the open source relational database that most backends default to, and it does all three without extensions
- It began at Berkeley in 1986 and has been developed continuously since, which is why its feature list is unusually long
- Data lives in **tables**, rows have a fixed set of typed **columns**, and **constraints** declare what is impossible
- A constraint is the important part. `NOT NULL`, `UNIQUE`, `CHECK` and `FOREIGN KEY` are enforced by the database, so no application bug and no manual query can produce invalid data
- That guarantee holds across every service touching the database, which application-level validation cannot promise
- It also stores JSON, arrays, ranges, geometry and vectors, so reaching for a document store because of one flexible column is usually unnecessary
- The cost is that changing a shape is a **migration**, a deliberate step applied to every existing row
- Version 18 is current, and 18.6 is the latest patch release as of August 2026

### What version 18 changed

- A rewritten asynchronous I/O subsystem, up to three times faster on reads from storage
- `uuidv7()` built in, generating time-ordered ids that do not scatter across the index
- Virtual generated columns, computed on read, now the default for generated columns
- Temporal constraints, so a primary key or foreign key can cover a range of time
