### When it is clearly right

- **Development and staging**, always. Paying for managed staging databases is a waste
- **A single-box product** where the whole system fits in 8 GB and downtime is tolerable
- **Data that cannot leave your infrastructure**, for legal or contractual reasons
- **Anything where the managed price is a large multiple of the box price**, which is common at small scale

### When it is clearly wrong

- **You cannot afford to lose the data and have not tested a restore**
- **You need failover in under a minute**
- **Nobody on the team wants to own it.** An unowned database is an outage with a date on it

- **The order this module goes in is the order these break.** Postgres first, because it is the one where a mistake is unrecoverable
