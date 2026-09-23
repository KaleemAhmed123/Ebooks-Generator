# Preface

Most system design material teaches a vocabulary. Load balancer, cache, queue, shard. You learn where the boxes go, you draw them in the right order, and you can hold a conversation about an architecture you have never operated.

That vocabulary is worth having. It is just not the part that is hard.

The hard part is that every box on the whiteboard is a promise. A cache promises that stale data is acceptable for some number of seconds, and somebody has to decide that number. A queue promises the work will happen later, which means something has to notice when it does not. A replica promises a copy, and the copy is behind by an amount nobody measured until the failover lost it. Draw the box and you have made the promise, whether or not you knew you were making it.

I wrote this series because I kept meeting the promises the hard way. A retry that turned a slow dependency into an outage. A unique constraint that was doing more work than the code around it. A timeout inherited from a library default that nobody in the room could name. Each one was a thing I could have drawn on a whiteboard a year earlier and still not understood.

So the six booklets are organised around mechanisms rather than tools. Not "how to use Kafka", but what a partitioned log actually guarantees and what it refuses to. Not "add a cache", but which of the four invalidation strategies fails in which direction. Where a number appears — a default, a latency, a limit — it comes from the documentation, the RFC or the paper, and it was checked as this edition was built. Where a claim could not be verified against a primary source, it was cut rather than softened.

The booklets stand alone and they are ordered. Foundations first, because reliability, latency and idempotency are the ideas the other five lean on. Then data, then consistency, then events, then services, then eighteen designs worked end to end. One idea owns one place: clocks are explained once, quorums once, sagas once, and the other booklets point rather than repeat.

A note on what is not here. There is no low-level design, no language tour, no chapter per vendor. And there are subjects that are genuinely asked about and still absent — geospatial indexing is the one I most regret. It needs a module of its own, done properly, rather than three pages bolted onto the end of something else.

If a page states something you know to be wrong, I would rather hear it than have it quoted back to me.

**Kaleem Ahmed**
