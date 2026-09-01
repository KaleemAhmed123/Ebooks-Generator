# Module 6 - Processes, workers and scaling

## One thread, and what that actually means

- Your JavaScript runs on one thread
- A machine with 8 cores runs one Node process on one core, and 7 cores sit idle

### The three ways out

| | What it gives you | Memory | Talk to it by |
|---|---|---|---|
| `child_process` | another program entirely | separate | stdio, IPC |
| `worker_threads` | another JS thread, same process | shared possible | message passing |
| `cluster` | copies of your server, one per core | separate | the OS, load balanced |

### Picking between them

- **CPU work inside your app**, like parsing a huge file or resizing an image: `worker_threads`
- **Running another program**, like `ffmpeg` or `git`: `child_process`
- **Using all the cores for HTTP traffic**: `cluster`, or more likely just run more containers

### The one people skip

- Before reaching for any of these, ask whether the work belongs in the request at all
- A queue and a separate worker service solves most of it, and scales independently
