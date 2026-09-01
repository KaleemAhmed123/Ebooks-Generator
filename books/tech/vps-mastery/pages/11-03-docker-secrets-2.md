### The application has to read a file

```ts
import { readFileSync } from "node:fs";

function secret(name: string): string {
  const path = process.env[`${name}_FILE`];
  if (path) return readFileSync(path, "utf8").trim();
  const direct = process.env[name];
  if (direct) return direct;
  throw new Error(`${name} is not configured`);
}

const jwtSecret = secret("JWT_SECRET");
```

- `.trim()` matters. A trailing newline in the file becomes part of the key, and every signature check fails

### Official images already support this

- Postgres, MySQL and MongoDB all accept a `_FILE` suffix on their password variables

```yaml
environment:
  POSTGRES_PASSWORD_FILE: /run/secrets/db_password
```

### The honest limitation

- On a single box the secret files still sit on that disk in plain text. This raises the bar against a leaked `docker inspect` output. It does not protect against someone with root
- The real gain is keeping secrets out of logs, crash reports and command output
