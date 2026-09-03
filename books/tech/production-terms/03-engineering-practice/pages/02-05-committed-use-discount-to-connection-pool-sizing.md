## Committed Use Discount

*CUD · Savings Plan · Reserved Instance*

A discount bought by promising a level of spend or resource for a fixed term.
AWS states up to 66% off on-demand for Compute Savings Plans and up to 72% for
EC2 Instance Savings Plans, on one- or three-year terms. Google Cloud's
committed use discounts follow the same shape.

The commitment is unconditional. Google's documentation says it plainly: you are
billed monthly for committed resources until the term ends "regardless of
whether or not you use those resources", and a commitment cannot be cancelled
after purchase.

**Commit to the floor, not to the forecast.** A three-year commitment sized
against projected growth becomes a three-year bill for capacity that a
re-architecture or a move to cheaper instance families made unnecessary in month
five.

## Connection Pool Sizing

Smaller pools go faster. The PostgreSQL sizing rule HikariCP documents is
`connections = ((core_count * 2) + effective_spindle_count)` — nine for a
four-core server with one disk, rounded to ten.

HikariCP puts that ten-connection pool at roughly 3,000 front-end users and
about 6,000 transactions per second. In the Oracle Real-World Performance
demonstration it cites, cutting a pool from 2,048 connections to 96 moved
response times from about 100ms to about 2ms.

**The pool is a queue and you want threads waiting in it.** Sizing it to the
user count does not remove the contention; it moves it into the database's
scheduler, where it is neither visible nor fair.
