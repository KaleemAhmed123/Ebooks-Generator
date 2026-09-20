## Liveness vs readiness

- Infrastructure orchestrators like Kubernetes constantly probe your service to see if it is healthy. You must expose two distinct health checks: liveness and readiness
- **Liveness** asks: "Are you deadlocked?" If this check fails, the orchestrator kills the process and restarts it
- **Readiness** asks: "Can you handle traffic right now?" If this check fails, the orchestrator stops sending HTTP requests to the instance, but leaves the process running

````typescript
import express from 'express';
const app = express();

// Liveness: Is the event loop running? (Shallow)
app.get('/health/live', (req, res) => {
  res.status(200).send('OK');
});

// Readiness: Are my dependencies available? (Deep)
app.get('/health/ready', async (req, res) => {
  if (await db.isConnected() && await cache.isReady()) {
    res.status(200).send('OK');
  } else {
    // 503 removes this instance from the load balancer
    res.status(503).send('Not Ready'); 
  }
});
````

### The failure

- The failure is writing a "deep" liveness check that pings the database. If the database blips and times out, every single instance of your application fails its liveness check simultaneously
- Kubernetes reacts by aggressively killing and restarting your entire fleet. The database recovers a second later, but now it has to handle thousands of simultaneous reconnects from booting apps, which crashes the database again. Liveness checks must be shallow; readiness checks may be deep
