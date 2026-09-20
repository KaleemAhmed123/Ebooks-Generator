## The rule

- Use a clock to **measure a duration** (monotonic) or to **label a moment for a human** (time-of-day). Never use it to decide **ordering** or **ownership**. Order comes from a log or a counter (Module 7; page 4). Ownership comes from a token that the resource checks (Module 8, page 4)

| Use of a clock | Safe? | Why |
|---|---|---|
| a timeout, a retry delay, a rate-limit window, measured with the monotonic clock | yes | durations on one machine; NTP cannot touch it |
| `created_at` on a record, for display and audit | yes | a label; nobody's correctness depends on its order |
| a lease, as an efficiency lock | yes | rare double-holding is the accepted price (Module 8, page 6) |
| a lease, as the only guard on a correctness write | **no** | the pause on page 6; needs a fencing token |
| ordering writes by timestamp (LWW) | **no** for data that must not lose writes | page 3 |
| deciding a node is dead because its heartbeat is late | **no**, as a decision by itself | below |

- A timeout proves nothing about the other side: dead, slow or partitioned look the same from where you stand (booklet 01 owns timeouts). That is why terms and epochs exist: the cluster does not decide the old leader is dead; it decides a new term has started, and the old leader, alive or not, is refused by the number
- Declaring a node dead and reassigning its work while it still runs is the shape of every failure here: split brain (Module 8, page 2), the paused holder (Module 8, page 3), the stale leader (Module 7, page 3). One rule covers all: the decision is a number in a log, checked where the write lands

### The failure

- Every clock-based lock, TTL-based ownership and timestamp-ordered merge in the system, audited by the question "what happens if this node's clock is 30 s wrong, or it pauses for 30 s". Where the answer is a duplicate cache refresh, leave it. Where it is a double payment, a lost write or two leaders, the clock is deciding something it cannot know
