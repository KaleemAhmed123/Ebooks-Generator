# Module 12 - Ticket booking

## Requirements and numbers

- A ticket-booking system sells a finite set of seats to more people than there are seats, in a burst that begins the second sales open. Two invariants and one shape: no seat is sold twice, no seat is stuck unsold, and all the load arrives at once
- Functional, in: browse events and a seat map; hold a seat for long enough to pay; buy it. Out: the seat-allocation algorithm for "best available", pricing, resale
- Non-functional: never a double sale; a hold that expires by itself if the buyer walks away; the site stays up at the on-sale minute, even if that means users wait in a line
- Inputs, as assumptions: 100 000 users at the on-sale minute for 10 000 seats; a seat map of 10 000 rows at 100 bytes; a hold of 10 minutes; the on-sale burst ends when the seats do

| Quantity | Arithmetic | Result |
| :--- | :--- | :--- |
| seat-map reads | 100 000 users, each refreshing every 5 s | 20 000 reads/s of one 1 MB map: served from a cache, never the table (page 6) |
| holds | 10 000 seats, contended by 10 users each | ≈ 100 000 hold attempts; 10 000 succeed, 90 000 are told "taken" in under a millisecond each (page 3) |
| durable writes | 10 000 holds + 10 000 bookings over 10 minutes | ≈ 33 writes/s: the write path is small |
| the daily average | 10 000 tickets ÷ 86 400 | 0.1/s, and sizing to it is the failure below |

- The numbers say something unusual: the writes are tiny and the reads are large, and the danger is not throughput but contention, 10 users on one row. The design is a row lock per seat (page 3) behind a cache for the map (page 6) behind a waiting room that turns 100 000 simultaneous users into a rate (page 4)
- The hold is the design's one piece of temporary state, and it has a TTL; the hold's TTL against the payment's timeout is the trade the interviewer will push on (page 6)

### The failure

- Sizing for the average. "10 000 tickets a day is 0.1 a second" provisions three servers for a system whose entire day's traffic arrives in one minute. Ticketing is a burst system; the average is a number that describes no minute of its life
