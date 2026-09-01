## Scheduled work

- Some work is triggered by the clock rather than by a request. A nightly report, an hourly sync, a weekly payout release
- **cron** is the Unix convention for expressing that schedule as five fields: minute, hour, day of month, month, day of week
- Running it inside your Node process is the obvious move, and it is correct until you run more than one copy of that process
- Three replicas each hold their own timer, so a nightly payout runs three times and nobody notices until the money has moved
- Timezones are the second trap. A server on UTC firing at 2am is firing at 7:30am for a business in India
- Daylight saving makes it worse, since an hour can occur twice or not at all, and a naive scheduler runs the job twice or skips it
- So the real question is never which library. It is which process is allowed to run the job, and what happens when a run overlaps the previous one

### node-cron 4.6.0

```ts
import cron from "node-cron"

cron.schedule("0 2 * * *", async () => {
  await generateDailyReport()
}, { timezone: "Asia/Kolkata" })
```

- Runs inside your process. Simple, and fine for one instance

### The trap

- **Three replicas means the job runs three times**
- A nightly payout that runs three times is a real incident
- Fixes, in order of preference
  - a repeatable BullMQ job, since Redis is shared
  - a distributed lock taken before the work
  - the platform's own scheduler, such as an ECS scheduled task or a Kubernetes CronJob
