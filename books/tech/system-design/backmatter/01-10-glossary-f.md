## Glossary: F

| Term | Means | Where |
|---|---|---|
| **failover** | a standby taking over from a failed primary | 1 · 2-07 |
| **failure** | the system breaking its promise to the user | 1 · 1-01 |
| **failure domain** | the scope one crash takes down with it | 5 · 1-04 |
| **fan-out** | how many records one request touches | 1 · 1-04 |
| **fault** | one component misbehaving: a disk returning garbage, a process hanging, a request dropped | 1 · 1-01 |
| **feature flag** | a configuration switch separating deploy from release, so a rollback stops being a pipeline run | 5 · 5-09 |
| **fencing** | making a demoted leader unable to take writes, before promoting its replacement | 2 · 5-07 |
| **fencing token** | a number the lock service issues with each grant, larger every time, which the resource uses to reject a stale holder's writes | 3 · 8-04 |
| **fixed window** | one counter per key per interval. The cheapest limiter, and the one with the boundary burst | 6 · 3-02 |
| **follower** | a replica that answers reads and expects a heartbeat from the leader | 3 · 7-04 |
| **forward compatible** | a new caller still works against the old service | 5 · 5-02 |
| **frontier** | the set of URLs a crawler is waiting to fetch, ordered by importance and by politeness per host | 6 · 14-02 |
| **fsync** | the system call pushing buffered writes to the disk. Until it returns, "written" means "in memory" | 3 · 1-05 |
