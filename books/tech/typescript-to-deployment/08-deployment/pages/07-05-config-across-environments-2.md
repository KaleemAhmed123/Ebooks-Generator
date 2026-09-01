### The rules

- **Validate the whole set at boot**, with the Zod schema from Module 1. A missing production value must crash on start, not on first use
- **The same variable names in every environment.** A different name per environment means the code branches on the environment again
- **No environment name in application logic.** `if (isProduction)` is a code path that staging never runs
- **A rate limit that is effectively off locally** and real everywhere else. Otherwise nobody develops against it and it breaks on the day it matters

### Keeping the list honest

```bash
# CI: fail if .env.example and the schema disagree
diff <(grep -oP '^\w+' .env.example | sort) \
     <(grep -oP '^\s+\K\w+(?=:)' src/env.ts | sort)
```

- **A variable added to production and not to `.env.example` is a broken local setup for the next person**
