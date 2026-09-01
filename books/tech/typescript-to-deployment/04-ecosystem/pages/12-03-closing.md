## What to actually install

- A backend service that does not need a reason for any of these

```bash
npm i express zod pino pino-http helmet cors express-rate-limit
npm i -D typescript tsx tsup vitest supertest @types/node @types/express
```

- Add a database client, a queue and a cache when the product needs them, not before

### The eight things worth remembering

**1. Express 5 catches async errors.** Delete `express-async-handler` and every `catch (err) { next(err) }`

**2. `req.query` is a getter in Express 5.** Attach the parsed value elsewhere

**3. Set `trust proxy` behind a load balancer.** Otherwise `req.ip` is the proxy and rate limiting protects nobody

**4. Set `keepAliveTimeout` above your balancer's idle timeout.** That is where random 502s with no log line come from

**5. Rate limiters and sessions need a shared store.** In-memory means the limit multiplies by your replica count

**6. Set `removeOnComplete` on BullMQ jobs.** Redis fills up otherwise

**7. Never label a metric with an id.** One time series per order will take the metrics backend down

**8. Check Node before installing.** `fetch`, `structuredClone`, `parseArgs`, `glob`, `randomUUID`, `node:test`, `--watch`, `--env-file`

### Next booklet

- **Data and Messaging.** MongoDB and PostgreSQL at equal depth, Redis patterns, RabbitMQ, and the idempotency, outbox and locking patterns that keep money correct

<p class="verified">Verified on 2026-08-30 against express 5.2.1, fastify 5.12.1, nestjs 12.0.1, hono 4.13.5, zod 4.5.4, prisma 7.10.0, mongoose 9.9.4, drizzle-orm 0.45.2, ioredis 6.0.0, bullmq 6.3.2, amqplib 2.0.1, socket.io 4.8.3, pino 10.3.1, prom-client 15.1.3, vitest 4.1.11, jose 6.2.10, argon2 0.45.1, multer 2.3.0, sharp 0.35.4, helmet 8.3.0, undici 8.10.0</p>
