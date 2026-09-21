## Every question is a recombination

- The seventeen designs in this booklet are not a list to memorise. They are the set of mechanisms that every other prompt is assembled from. An unfamiliar prompt is decomposed into two or three of them, and the deep dive is whichever mechanism the new prompt stresses hardest

| Prompt as asked | Mechanisms it is made of | Where the deep dive lives |
| :--- | :--- | :--- |
| flash sale | ticket booking (finite inventory, holds) + rate limiter (shed the surge) | Module 12, page 4: the waiting room |
| live video comments | chat (fan-out to connected viewers) + top-K (surface the hot ones) | Module 6, page 5 |
| online auction | ticket booking (one winner, locked) + leaderboard (current high bid) | Module 12, page 3; Module 17, page 2 |
| job scheduler | delayed queue (booklet 04) + leader election (booklet 03) so a job runs once | the "exactly once" claim, booklet 01 |
| food delivery | ride matching (courier proximity, offer lock) + payments (split ledger) | Module 8, page 5; Module 11, page 3 |
| Twitter search | search autocomplete (offline index build) + news feed (ranking stage) | Module 13, page 3; Module 7, page 5 |
| nearby friends | ride matching's moving-object index as pub/sub per cell | Module 8, page 4 |

- The decomposition is said out loud in the first minute: "an auction is a booking problem with a leaderboard on top; the hard part is that the winning bid is a contended row". That sentence is the problem-navigation grade
- One prompt that is not a recombination: a stock exchange. Its core is a single-node deterministic matching engine behind a sequencer, chosen for microsecond latency; its questions are about that core, not distribution, and it is outside this booklet by design

### The failure

- Inventing on the spot. A new prompt, a new architecture, a new consensus protocol sketched at minute 20. The interviewer is waiting for the candidate to map the business problem onto boring, known parts; a novel design is a design with no known failure modes, which is the opposite of what page 8 is for
