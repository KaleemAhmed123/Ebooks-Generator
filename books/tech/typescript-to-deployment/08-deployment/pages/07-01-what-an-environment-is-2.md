### What may differ, and what may not

| May differ | May not |
|---|---|
| the database it points at | the image |
| secrets and API keys | the Node version |
| the number of replicas | the Postgres major version |
| the log level | the migration state, beyond one deploy |
| feature flag defaults | the code path taken |

- **`if (env === "production")` in application code is the failure.** It means staging tests a different program, and the untested branch is the one that matters
- Put the difference in configuration. **The code should not know which environment it is in**, beyond reading a value

### The smallest set that works

- **Local and production**, for a solo project. Preview environments replace staging entirely
- **Local, staging, production** once more than one person deploys
