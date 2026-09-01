### 11. Batch the backfill, and make it resumable

- One `UPDATE` over 80 million rows holds a transaction nothing else can work around

### 12. Set `maxmemory-policy` on Redis

- The default is `noeviction`, so a cache with no policy stops accepting writes instead of making room

### Next booklet

- **API and Service Design.** REST, pagination, versioning, auth flows, webhooks, service boundaries and the failure patterns between them

<p class="verified">Verified against postgresql 18.6, mongodb 9.0, redis 8, rabbitmq 4, pg 8.23.0, mongodb driver 7.6.0, ioredis 6.0.0, amqplib 2.0.1, on 2026-08-30</p>
