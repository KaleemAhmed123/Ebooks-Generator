## rate() vs increase()

`rate()` is the per-second average across a window. `increase()` is the total
over it. Both are for counters only.

| Expression | What it gives |
|---|---|
| `rate(http_requests_total[5m])` | requests per second, resets handled |
| `increase(http_requests_total[1h])` | total requests that hour |
| `http_requests_total` | a line that climbs forever |

A pod restart takes the counter to zero. `rate()` reads that as a reset;
subtracting two raw samples reads it as a large negative number. Applied to a
gauge, both functions return a value that means nothing at all.

## RED Method

For every request-driven service: Rate, Errors, Duration.

| Metric | What it holds |
|---|---|
| Rate | requests per second |
| Errors | failed requests per second |
| Duration | latency distribution |

A service shipping with those three on day one can be triaged by someone who has
never read its code. The value is the sameness — identical three metrics on
every service make dashboards comparable, which is what makes an unfamiliar
service debuggable at 3am.
