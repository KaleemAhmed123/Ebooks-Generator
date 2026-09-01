### Minute 5 to 10: act

| Cause | Action |
|---|---|
| a deploy | **roll back** |
| disk full | clear logs and images, then find what filled it |
| database at connection limit | reduce replicas, kill idle transactions |
| a dependency is down | enable the kill switch flag for that feature |
| one customer's traffic | rate limit them specifically |
| out of memory | restart, raise the limit, then find the leak |

### The rules

- **Mitigate before diagnosing.** Restore service, then find out why
- **One person changes things.** Two people fixing the same incident is how it gets worse
- **Write a timestamped line for every action taken.** The timeline is the whole input to the review
- **Declare early.** A short incident that turns out to be nothing costs almost nothing; a late one costs a lot
