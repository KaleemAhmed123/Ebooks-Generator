## Getting configuration into the process

- Three mechanisms, and the right one depends on where the code runs

### ECS: the platform does it

```json
"secrets": [
  { "name": "DATABASE_URL", "valueFrom": "arn:aws:secretsmanager:...:secret:prod/orders/db" },
  { "name": "LOG_LEVEL",    "valueFrom": "arn:aws:ssm:...:parameter/prod/orders/LOG_LEVEL" }
]
```

- ECS fetches these with the **task execution role** and injects them as environment variables before the container starts
- **The value never appears in the task definition, in git, or in `docker inspect`**
- `valueFrom` can name a JSON key directly: `...:secret:prod/orders/db:password::`

### EC2: fetch at boot

```bash
aws ssm get-parameters-by-path --path /prod/orders/ --with-decryption \
  --query 'Parameters[].[Name,Value]' --output text \
  | awk -F'\t' '{ n=$1; sub(/.*\//,"",n); print n "=" $2 }' > /etc/app.env
chmod 600 /etc/app.env
```

### In the application: fetch and validate

```ts
const secrets = await loadSecrets()
export const env = Env.parse({ ...process.env, ...secrets })
```

- **Validate after merging**, with the schema from Module 1, so a missing secret fails at boot
