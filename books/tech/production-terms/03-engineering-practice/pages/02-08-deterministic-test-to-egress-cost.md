## Deterministic Test

A test whose result depends only on its inputs. Same code, same result, on every
machine, in any order.

Three things leak in: the clock, the random seed, the network. A `new Date()`
inside an assertion passes for eleven months and fails at a year boundary.

**The leak is usually in code you did not write.** A library seeding from the
system clock, a container on a different timezone, a pool handing out sockets in
arrival order: none of it appears in your test, and all of it changes the result.

## Egress Cost

Data leaving is billed; data arriving is not. That asymmetry decides where
services, caches and databases are allowed to sit.

Traffic between EC2 instances in different Availability Zones of one region
costs $0.01 per GB **in each direction** (AWS list price, 2026), so a chatty
service-and-database pair split across zones pays twice on every query. Replication is the exception: cross-AZ
transfer is what surviving a zone failure costs.

| Path | Charged |
|---|---|
| in from the internet; within one AZ over private IPs | free |
| cross-AZ, same region | per GB, both directions |
| cross-region | more per GB |
| out to the internet | most per GB, after 100 GB/month free |

**Nothing in the console shows the zone topology of a request.** Cross-AZ
chatter surfaces on the invoice months later, as a single undifferentiated
data-transfer line.
