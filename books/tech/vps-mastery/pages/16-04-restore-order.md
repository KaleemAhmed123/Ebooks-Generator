## The restore order

- Order matters. Restoring data before the schema exists, or starting services before secrets are present, wastes the minutes that count

```text
1. Provision the box, run bootstrap.sh
2. Clone the repository
3. Decrypt .env.enc  ->  .env               nothing works before this
4. Start the data project, empty
5. Restore the database into it
6. Restore uploaded files
7. Pull images, start one color
8. Health check, before any DNS change
9. Point DNS at the new address
10. Issue certificates
11. Start the edge project
12. Verify from outside
```

### Why the health check comes before DNS

- Sending users to a half-restored stack is worse than a few more minutes of downtime
- The stack can be verified entirely through the container network first:

```bash
docker compose -p app-edge exec -T nginx curl -fsS http://api-gateway-blue:8080/readyz
```

### Why certificates come after DNS

- HTTP-01 validation needs the domain resolving to the new box. Requesting earlier fails, and repeated failures hit the rate limit on page 09-03

### Reducing the DNS wait

- Lower the TTL to 300 **now**, while nothing is wrong. During recovery it is far too late
- A stack with a 3600 second TTL costs an extra hour that no script can recover

### The order that is wrong

- Restoring the database into a running application stack. Migrations run against a half-restored schema, and services write into the middle of a restore
- **Start the data layer alone. Restore. Verify. Only then start applications**
