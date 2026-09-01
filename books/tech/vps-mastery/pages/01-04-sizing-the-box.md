## Sizing the box

- RAM is the limit that gets hit first. CPU is second. Disk is third and creeps up quietly

| Workload | RAM | Notes |
|---|---|---|
| One Node API, no database | 1 GB | Tight. Add swap |
| Node API plus Postgres | 2 GB | The realistic floor |
| Next.js plus API plus Postgres | 4 GB | Next.js builds are memory-hungry |
| Fifteen containers, broker, cache, monitoring | 8 GB | The stack in Part Four |
| The same, with room for two copies during a deploy | 16 GB | Blue-green doubles the footprint |

### Building costs more than running

- A Next.js production build can peak above 2 GB on its own
- A box sized for running the app will fail while building it. Two ways out: build somewhere else (Module 13), or add swap (Module 2)

### Disk

- Start at 40 GB. Docker images, build cache, logs and database data all grow
- Build cache grows fastest. Module 5 sets a limit so it stops

### CPU

- Two cores is enough for a Node stack under moderate load. Node is single-threaded per process, so extra cores only help once there are multiple processes
- Shared or burstable CPU is fine for web traffic and bad for sustained builds
