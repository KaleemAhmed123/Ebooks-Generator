# Data Stores

## How to read this booklet

Fifty-two terms, alphabetical. Each one gets what it means, where it bites, and
a picture when a picture is faster than a sentence.

The contents page lists every term with its page number. You half-remember a
phrase from a code review, you look it up, you have the real meaning in twenty
seconds.

### What this booklet is about

The layer underneath the client library. Prisma, Mongoose, ioredis and amqplib
are not the subject — the engines they talk to are.

That distinction is the point. A slow endpoint is almost never the ORM. It is a
missing index, a query returning ten thousand rows, or a transaction held open
across a network call. Money going wrong is almost never the queue library. It
is a consumer that is not idempotent, or a read-check-write race.

None of that is visible from the client library, and none of it is fixed by
changing which library you use.

### Four engines, one alphabet

Postgres, Redis, MongoDB and RabbitMQ are interleaved rather than sectioned,
because you look up a term by its name and not by which product it belongs to.

### What is deliberately not here

Syntax. This booklet does not teach you Prisma's query API or how to write an
aggregation. It tells you what someone means by *ESR rule* or *poison message*,
and what goes wrong when they get it wrong.
