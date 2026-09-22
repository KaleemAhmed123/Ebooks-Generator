# Module 3 - Talking between services

## Sync vs async

- One rule decides it: **synchronous** when the caller cannot proceed without the answer, **asynchronous** when it can. Sync is a call that blocks for a reply, HTTP or gRPC; async is a message handed to a broker, and the caller moves on (booklet 04 owns the broker). Neither is "better"; each is wrong for the other's case

| The caller… | Choose | Example | Why |
| :--- | :--- | :--- | :--- |
| needs the answer to decide the next line | sync | is this password right; is this seat free; what is the price | there is no useful "later"; the user is waiting on this exact fact |
| can finish without it | async | send the welcome email; update the search index; notify the warehouse | the action is a consequence, not a precondition; a delay of seconds changes nothing |
| needs the answer, but not for ten minutes | async request/reply (page 10) | generate the report; run the export | a blocked thread for ten minutes is the failure on page 10 |
| is a user, and the answer is "accepted" | sync accept, async work | place the order: 202 with an id, then the saga (Module 2, page 7) | the user needs to know it was taken, not that it was finished |

- Async buys three things: the caller's latency excludes the callee's; the callee's outage becomes a delay, not an error; a burst is absorbed by the queue (Module 4, page 10). It costs one: the caller cannot know the outcome without a second mechanism, an event back, a status row, a poll (page 10). The interviewer's form of the rule: if the screen must show the result, sync; if it shows "done" and the result arrives later, async

### The failure

- "Async is better" as an answer. A login check over a queue is a user told "your sign-in is being processed"; the client then polls or opens a socket to learn whether it may proceed, which is a synchronous call rebuilt from parts with more latency and more state. Async for a precondition is the worst of both, and the rule exists so that "decoupled" is never the reason on its own
