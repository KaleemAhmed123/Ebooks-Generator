### Where it fits badly

| Problem | Why |
|---|---|
| **cold starts** | the first request after idle pays initialization, tens to hundreds of milliseconds |
| **15 minute ceiling** | a long job cannot finish |
| **database connections** | many concurrent functions exhaust a Postgres connection limit, which is what RDS Proxy exists for |
| **cost at steady load** | a constantly busy Lambda is more expensive than a small always-on instance |
| **local development** | harder to reproduce than a container |

- **Provisioned concurrency removes cold starts and removes the reason you chose Lambda**, because it is billed whether used or not

### The honest summary

- **Lambda is excellent for event-driven work and awkward for a general HTTP API.** Running Express in Lambda through an adapter works, and it gives you the worst of both models
- The place it always wins: the job that runs once an hour, which on any other model needs a machine that idles for 59 minutes
