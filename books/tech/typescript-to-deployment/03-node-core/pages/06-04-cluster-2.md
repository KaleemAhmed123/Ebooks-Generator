### What breaks

- **In-memory state.** A cache, a session store or a rate limit counter now exists once per worker, and each has different values. Move it to Redis
- **WebSockets.** A socket lives on one worker. Broadcasting needs a Redis adapter
- **Scheduled jobs.** A `setInterval` runs in every worker, so a nightly job runs eight times

### Is it worth it

- In a container, usually not. One process per container and let the orchestrator scale containers
- Then the platform handles restarts, rollouts and health checks instead of your primary process
