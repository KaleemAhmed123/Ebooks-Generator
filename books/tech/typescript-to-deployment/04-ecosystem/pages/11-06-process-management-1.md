## Running it in production

- A Node process is one process. It dies on an unhandled error, uses one CPU core, and does not come back on its own
- Production needs it restarted when it crashes, started again after a reboot, and multiplied across the cores sitting idle
- A **process manager** supplies those three things
- Which one you need depends entirely on where the code runs, and this is where teams keep a tool they no longer need
- On a plain virtual machine nothing else is doing that job, so something has to
- In a container the orchestrator already restarts dead containers and already scales replicas, so a manager inside the container hides crashes from the thing whose job it is to notice them

### pm2 7.0.4

```bash
pm2 start dist/index.js -i max --name orders-api
pm2 logs orders-api
pm2 reload orders-api          # zero downtime restart
pm2 startup && pm2 save        # survive a reboot
```

```js
// ecosystem.config.cjs
module.exports = {
  apps: [{
    name: "orders-api",
    script: "dist/index.js",
    instances: "max",
    exec_mode: "cluster",
    max_memory_restart: "500M",
    env_production: { NODE_ENV: "production" },
  }],
}
```

- Clustering, restarts, log rotation and a monitoring dashboard on a plain VM
- `reload` restarts workers one at a time, so there is no dropped request
