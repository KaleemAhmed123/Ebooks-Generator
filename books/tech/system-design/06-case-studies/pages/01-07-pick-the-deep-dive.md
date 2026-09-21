## Pick the deep dive

- Minute 25. The high-level design serves every requirement at low load. The deep dive is the non-functional requirement from page 3 that the simple design fails first, and it is chosen out loud: "the hardest number here is sub-100 ms suggestions on every keystroke; that is where I want to go"
- The choice itself is graded. It shows the candidate can read their own design and find the part that breaks, which is the technical-excellence competency in one sentence

| Design | Hardest requirement | Deep dive | Module |
| :--- | :--- | :--- | :--- |
| URL shortener | 100 reads per write, p99 under 50 ms | the redirect path and its cache | 2 |
| Notifications | at-least-once to a provider that fails | retries, dead letters, dedupe | 5 |
| Chat | messages in order, connections that hold state | gateways and the message key | 6 |
| News feed | a post from a user with 10 M followers | fan-out on write vs on read | 7 |
| Ride matching | 1 M drivers moving, one driver per rider | the in-memory cell index and the offer lock | 8 |
| Payments | never lose or double a cent | idempotency keys and the ledger | 11 |
| Ticket booking | 100 000 people, 10 000 seats, one minute | the hold and the waiting room | 12 |
| Web crawler | 400 pages a second without hurting any host | the URL frontier | 14 |

- One deep dive done well beats three started. Fifteen minutes is enough for one mechanism, its failure mode, and its trade-off; it is not enough for two
- If the interviewer redirects, follow. Their choice of deep dive is information about what the role needs

### The failure

- Deep-diving the familiar part. Fifteen minutes on sharding the user table for a chat app, because the candidate has sharded user tables before. The user table is not the hard part of chat; the stateful connections and per-channel ordering are (Module 6). The interviewer learns what the candidate knows, not whether they can find the problem
