## Fat vs thin events

- Fowler's two patterns for what an event carries: **event notification** ("order 42 changed, go ask") — thin, a pointer back to the source — versus **event-carried state transfer** ("here is order 42's new total") — fat, the data itself travels

| | Thin (notification) | Fat (state transfer) |
|---|---|---|
| Payload | id, maybe a type | the changed fields, or the whole entity |
| Consumer that just needs to act | fine — fetch details only when acting | pays for data it never reads |
| Consumer that needs the data | forces a call back to the source | has what it needs, no call back |
| Coupling | to the source's uptime | to the payload's shape |

- Thin events under load turn every consumer into a caller: Fowler's own risk is "it can be hard to see such a flow," and operationally, a thin-event storm means N consumers all hitting the source service to ask "what changed" at once. Fat events avoid the call-back at the cost of copying data everywhere it might be needed — Fowler's own words for that side: "lots of data schlepped around and lots of copies"
- Choose per event type by who reads it: an event only ever consumed by something that must act now and fetch full context anyway can stay thin; an event fanned out to many passive readers is usually worth fattening

### The failure

- A thin `OrderChanged` event with fifty subscribers, each calling back to the orders service to see what changed. The orders service now serves fifty read requests for every one write, and the decoupling the broker was supposed to buy is gone
