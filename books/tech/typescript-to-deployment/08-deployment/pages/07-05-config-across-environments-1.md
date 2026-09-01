## One artifact, many configurations

- The image is identical everywhere. **Everything that differs arrives as configuration at start-up**, and the shape of that configuration is worth designing once

```text
                     local        staging          production
DATABASE_URL         compose      staging RDS      production RDS
LOG_LEVEL            debug        debug            info
REPLICAS             1            1                4
STRIPE_KEY           test key     test key         live key
RATE_LIMIT_PER_MIN   10000        100              100
SENTRY_ENV           -            staging          production
```

### Where each value comes from

| Environment | Configuration | Secrets |
|---|---|---|
| local | `.env`, from `.env.example` | test keys only |
| preview | pipeline variables | a shared sandbox key |
| staging | Parameter Store, or `.env` on the box | Secrets Manager, or an encrypted file |
| production | Parameter Store | **Secrets Manager, rotated** |

- **Module 13 covers the AWS mechanisms. Module 4 covers the self-hosted ones.** The shape is the same either way
