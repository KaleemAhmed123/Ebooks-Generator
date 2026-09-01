# Module 5 - Background work

## BullMQ

- Some work outlives the request that started it. Sending an email, resizing an image, generating a report, calling a slow third party
- Doing it inline makes the user wait for your mail provider, and a failure means the whole request failed with it
- A **queue** is a list of jobs written down in one process and picked up by another
- The web process writes the job and answers immediately. A separate worker process does the work whenever it can
- That separation buys three things at once: request latency stops depending on slow work, retries become automatic, and a traffic spike queues instead of collapsing
- Because the list has to survive a crash, it lives somewhere durable. BullMQ uses Redis
- BullMQ adds what a bare list does not have: retries with backoff, delays, repeating jobs, priorities, rate limits and dead jobs you can inspect
- The cost is a second thing to run and monitor, and every job must be safe to run twice, since delivery is at least once
- Written by Manuel Astudillo as the successor to Bull
- Version 6.3.2

```bash
npm i bullmq ioredis
```

```ts
import { Queue, Worker } from "bullmq"

const connection = { host: "localhost", port: 6379 }

// producer
const emails = new Queue("emails", { connection })
await emails.add("welcome", { sellerId: "s1" })

// consumer, usually a separate process
new Worker("emails", async (job) => {
  await sendWelcome(job.data.sellerId)
}, { connection })
```

- The queue and the worker only share a name and a Redis instance
- Run the worker as its own process so a slow job never touches request latency
