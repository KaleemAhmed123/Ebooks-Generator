## Distributed locks are not mutexes

- This brings us to a critical realization about distributed locks. A thread-level lock (like a Java `synchronized` block) is for **Correctness**. It prevents two threads from corrupting memory
- A distributed lock (without fencing tokens) is only for **Efficiency**. It prevents two workers from doing the same expensive work twice (e.g., generating a massive PDF report). If the lock fails due to a GC pause, and two nodes generate the PDF, it's fine. You just wasted some CPU

:::interview
**Only mention distributed locks for efficiency**
If an interviewer asks you how to prevent two users from booking the same seat on a plane, do *not* say "I will use a Redis distributed lock." Redis locks do not guarantee safety against network partitions or GC pauses. The correct answer is always: "I will use a unique constraint or an atomic compare-and-set operation inside the primary database."
:::

- If you strictly require distributed lock safety (e.g., you are moving money), you must use a CP system (ZooKeeper) with fencing tokens supported by the target API. You cannot use an AP cache like Redis

### The failure

- Using Redis Redlock for financial correctness. Redis is an AP system. It is designed for speed, not consistency. If you use the Redlock algorithm to prevent double-spending, a network partition can easily result in two clients acquiring the exact same lock from different halves of the Redis cluster. Redis locks are for rate limiting and deduplication, not correctness
