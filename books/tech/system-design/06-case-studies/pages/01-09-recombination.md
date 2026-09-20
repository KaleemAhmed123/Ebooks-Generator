## Every question is a recombination

- You cannot memorise every possible interview question. The permutations are endless. However, every question is a recombination of the core mechanisms taught in this book
- If you are asked to design an online auction system, you might panic because it is not on the standard study list. But an auction is just the inventory locking mechanism from **Ticket Booking** combined with the fast-moving leaderboard mechanism from **Top-K**
- When faced with an unfamiliar prompt, break it down into the core data access patterns you recognise. You already know how to fan out reads, how to lock a row, and how to stream events

| Unfamiliar Question | It is just a recombination of... |
| :--- | :--- |
| Flash Sale | **Ticket Booking** (holding inventory under massive concurrent load) + **Rate Limiter** (shedding excess traffic) |
| Live Video Comments | **Chat** (WebSocket fan-out to online presence) + **News Feed** (ranking and filtering spam) |
| Job Scheduler | **Distributed Queue** (delayed execution) + **Leader Election** (so two workers do not run the same job) |
| Food Delivery (DoorDash) | **Ride Matching** (driver proximity and locking) + **Payments** (split ledger between restaurant and driver) |

### The failure

- The failure mode is treating an unseen prompt as a completely new problem that requires inventing a completely new architecture on the spot
- If you try to invent a new distributed consensus protocol on a whiteboard, you will fail. The interviewer is waiting for you to map the business problem onto standard, proven infrastructure patterns

:::interview
**The pattern recognition test**
Senior engineers do not reinvent the wheel. They look at a business request and instantly map it to the boring, reliable database and messaging primitives they have used for years.
:::
