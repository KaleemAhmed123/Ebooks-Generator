# Module 2 - Availability math

## What a nine buys

- **Availability** is the fraction of time, or of requests, the system honours its promise. It is quoted in nines: 99.9% is "three nines"
- Each nine is the same-sized step: ten times closer to 100%. The downtime it permits shrinks by ten each time

| Target | Per year | Per month (30 d) | Per day |
|---|---|---|---|
| 99% | 3.65 days | 7.2 h | 14.4 min |
| 99.9% | 8.76 h | 43.2 min | 1.44 min |
| 99.99% | 52.6 min | 4.32 min | 8.6 s |
| 99.999% | 5.26 min | 26 s | 0.86 s |

- Read the monthly column. It is the one that matches how budgets are spent and how contracts are checked
- At four nines you have four minutes a month. A single failed deploy with a five-minute rollback has spent the month

### What the table does not say

- It says nothing about *when*. 43 minutes in one outage and 43 minutes spread over a month are the same number and very different experiences
- It says nothing about *partial*. A service returning errors to 30% of users is "up" by a clock and failing by any other measure. The next page is the fix
- The number is a target for the whole path. A four-nines promise that runs through a three-nines dependency is a three-nines promise. Page 4 of this module has the arithmetic

### The failure

- A team promises 99.99% while its own deploy pipeline takes the service down for 20 minutes a month. The promise was broken before the first incident
- Every design review should convert the promised nines into minutes per month and then ask what already consumes them
