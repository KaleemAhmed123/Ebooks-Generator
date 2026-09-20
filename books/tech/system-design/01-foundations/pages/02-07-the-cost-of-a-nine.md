## The cost of a nine

- Each nine is an order of magnitude closer to 100%. Each one costs a larger set of constraints than the last

| Going to | What it forces |
|---|---|
| **99.9%** | monitoring that pages; a rollback that works; no single machine anyone cares about |
| **99.99%** | 4 min/month: recovery must be automatic; every hard dependency must itself be four nines; deploys become gradual |
| **99.999%** | 26 s/month: no human in any recovery path; multi-region automatic failover; usable dependencies shrink to the handful that promise five nines |

- The dependency rule is the hidden cost. The product formula means a five-nines service needs five-nines parts. Most managed services promise four. DynamoDB commits to 99.999% only for global tables, 99.99% otherwise

### The nine nobody can see

- Google's SRE book: a user on a 99% reliable phone cannot tell the difference between 99.99% and 99.999%. The phone, the wifi, and the carrier fail first
- Past that point the next nine is invisible to the user and expensive to you. Pick the target from the user's vantage point

### The failure

- Promising five nines because the competitor's sales deck did, then discovering the auth provider, DNS host, and payment gateway are all four nines. No internal engineering raises a product above its smallest factor

:::interview
"What availability would you target?" wants a number *and* its consequences: minutes per month, what must be automated, which dependencies qualify. A bare "four nines" is half an answer.
:::
