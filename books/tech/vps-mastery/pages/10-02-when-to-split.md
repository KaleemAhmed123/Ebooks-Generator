## When to split a service

- Splitting is a cost paid up front for flexibility later. On one box, most of the promised benefits do not arrive

### What splitting actually gives on a single VPS

| Claimed benefit | On one box |
|---|---|
| Independent scaling | Real, but limited by the same CPU and RAM |
| Independent deployment | Real. One service ships without rebuilding the rest |
| Fault isolation | Partly. A crash is contained, a full disk is not |
| Team autonomy | Real, once more than one person is shipping |
| Independent databases | Real, and the main reason to bother |

### What it costs

- Every call that was a function call becomes a network call, with its own timeout, retry and failure mode
- Local development needs the whole stack running
- One logical change now touches several repositories and several deploys
- Debugging crosses process boundaries, so tracing stops being optional

### The reasonable triggers

- **A different runtime.** A Python model server does not belong in a Node process
- **A different scaling shape.** A video transcoder needs CPU in bursts. An API needs steady memory
- **A different failure tolerance.** Notifications may fail quietly. Payments may not
- **A different release cadence.** A service deployed hourly next to one deployed monthly

### The bad trigger

- Splitting by technical layer rather than by domain. A "controller service" calling a "repository service" is one program with network calls inserted into the middle of it
