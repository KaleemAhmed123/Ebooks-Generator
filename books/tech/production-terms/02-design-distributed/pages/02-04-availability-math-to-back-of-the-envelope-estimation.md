## Availability Math

Availability multiplies across dependencies in series. Every component you add
to a request path lowers the ceiling unless it is redundant.

Three services at 99.9% each in one path give 99.7% combined — twenty-six hours
a year, not nine. Nobody budgets for that, because the arithmetic is done per
service and never for the path.

| Target | Downtime per year | In a 3-deep path |
|---|---|---|
| 99.9% | 8.7 hours | 0.999³ = 99.7% → 26 hours |
| 99.99% | 52 minutes | 99.97% → 2.6 hours |
| 99.999% | 5 minutes | 99.997% → 16 minutes |

Redundancy is what pushes it back up: two independent components at 99.9% in
parallel give 99.9999%, because both must fail at once.

## Back-of-the-Envelope Estimation

Rough arithmetic done early to rule architectures in or out before anything is
built. Landing within an order of magnitude is the entire point.

Ten million daily users at twenty requests each is 200M a day, about 2,300 per
second average, roughly 7,000 at a 3× peak. That one number decides whether a
single database is even a candidate.

```
DAU × actions/day      = 200,000,000 / day
÷ 86,400               = ~2,300 req/sec average
× peak factor (2-5×)   = ~7,000 req/sec peak
```

One Postgres for reads at that rate — possibly. One Postgres for writes at that
rate — no. The estimate is worth an hour and saves a quarter.
