# Module 3 - Deploying to a VPS

## One box, and when that is the right answer

- Part Four covers AWS, and AWS is the right answer for a service with real traffic, a team, and compliance requirements
- **It is the wrong first answer for a side project, an internal tool, a startup before product-market fit, or anything a single person maintains**
- A **VPS** is one Linux virtual machine with a public address, billed at a flat monthly rate, and you are responsible for everything on it

### The honest comparison

| | One VPS | Managed cloud |
|---|---|---|
| Cost for a small service | **5 to 20 dollars a month** | 80 to 300, before traffic |
| Time to first deploy | **an hour** | a day, the first time |
| You patch the OS | yes | not on Fargate or Lambda |
| Survives a machine failure | **no** | yes, if configured for it |
| Scales past one machine | no | yes |
| Predictable bill | **yes** | no |
| Egress charges | usually included | **billed, and surprising** |

### What a single box genuinely handles

- A Node API, Postgres, Redis and a worker, on 4 GB of memory, serving **thousands of requests a minute** comfortably
- Most internal tools, most side projects, and a large share of early startups
- **The limit is almost never CPU.** It is that one machine has one failure

### What this module builds

- A blank Ubuntu box, hardened, running your application behind TLS, deployed by a script, backed up off the machine, and monitored
- **Every command works on any provider.** The next page compares them, and nothing after it depends on which one you picked
- Module 4 then adds the self-hosted platform and ops tools that run beside it
