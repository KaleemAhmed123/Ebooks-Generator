# Module 8 - Ride matching and proximity

## Requirements and numbers

- A ride-matching system takes a rider's request and a stream of driver positions, and pairs them within seconds. Two very different workloads share the design: a location firehose, written constantly and read by cell, and a trip record, written rarely and never allowed to be wrong
- Functional, in: drivers report position while online; a rider requests a trip and is matched to a nearby driver; the trip moves through states to completion. Out: routing and maps, pricing beyond a surge multiplier (page 7), payment (Module 11)
- Non-functional: a match in under 10 seconds; a driver offered to one rider at a time, never two; a lost position update costs nothing, a lost trip is unacceptable
- Inputs, as assumptions: say 1 M drivers online at peak, each reporting every 4 s; 100 000 trip requests a minute at peak; a position update of 50 bytes. Uber's own scale for the trip side, from its 2021 fulfillment post: billions of trips a month across 10 000+ cities

| Quantity | Arithmetic | Result |
| :--- | :--- | :--- |
| position updates | 1 M ÷ 4 s | 250 000 writes/s, all overwrites of the same 1 M keys |
| position bytes | 250 000 × 50 B | 12.5 MB/s: small in bytes, enormous in write count |
| trip requests | 100 000 ÷ 60 | ≈ 1 700/s at peak, each a handful of durable writes |
| drivers per city | 1 M over 10 000 cities | ≈ 100 on average; a dense cell holds tens |

- A position is an overwrite: only the last value matters, and losing one costs nothing because the next arrives in 4 s. That property is what lets the location path skip the database entirely (page 4). The trip is money and a person in a car; it gets a transaction (page 5)

### The failure

- Treating position updates as writes to the trip database. 250 000 row updates a second to a relational store, each made durable, each rewriting a lat/lng index, for values that are stale in 4 s. The interviewer asks why a value nobody will read after 4 seconds is being written to disk at all
