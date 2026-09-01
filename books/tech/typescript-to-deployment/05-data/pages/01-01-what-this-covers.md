# Module 1 - Choosing a data store

## What this booklet is about

- Booklet 4 covered the **libraries**: Prisma, Mongoose, ioredis, amqplib, BullMQ
- This one covers the **things underneath them**, which is where the problems actually are
- A slow endpoint is almost never the ORM. It is a missing index, a query returning ten thousand rows, or a transaction held open across a network call
- Money going wrong is almost never the queue library. It is a consumer that is not idempotent, or a read-check-write race
- None of that is visible from the client library, and none of it is fixed by changing which library you use

### What is here

- PostgreSQL and MongoDB, at equal depth, including how each one decides to run a query
- Indexes, and how to tell whether one is being used
- Transactions, isolation levels and locking, which is where correctness under concurrency lives
- Redis as more than a cache
- Messaging patterns, and what at-least-once delivery forces you to build
- The correctness patterns that sit on top: idempotency keys, the outbox, sagas, and the race that quietly loses money

### What is not here

- Client library syntax. That was Booklet 4
- Administering a database. Backups, replication and failover are Booklet 8
