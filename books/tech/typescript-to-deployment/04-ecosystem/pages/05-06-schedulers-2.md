### Croner 10.0.1

```ts
import { Cron } from "croner"
new Cron("0 2 * * *", { timezone: "Asia/Kolkata" }, generateDailyReport)
```

- Handles overlapping runs, has no dependencies, and understands daylight saving properly
- The better default of the two now

### Bree 9.2.9

```ts
import Bree from "bree"
new Bree({ jobs: [{ name: "report", cron: "0 2 * * *" }] }).start()
```

- Runs each job in a **worker thread**, so a heavy job does not block the server
- Worth it when the scheduled work is CPU bound
