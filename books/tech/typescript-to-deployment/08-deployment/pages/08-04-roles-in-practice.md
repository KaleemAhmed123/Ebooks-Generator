## Roles in practice

- Every compute service reads its credentials from the same place, so application code never touches a key

```ts
import { S3Client } from "@aws-sdk/client-s3"

const s3 = new S3Client({})     // the SDK finds the role by itself
```

- The SDK walks a **credential chain**: environment variables, then a shared config file, then the container credential endpoint, then the instance metadata service
- **On a properly configured instance or task, it finds the role and nothing else is needed**

| Runs on | Uses |
|---|---|
| EC2 | an **instance profile**, attached to the instance |
| ECS task | a **task role** for the application, and a **task execution role** for ECS itself |
| Lambda | an execution role |
| GitHub Actions | a role assumed through OIDC |
| a developer laptop | a short-lived session from identity federation |

### The two ECS roles, which confuse everyone once

- **Task execution role**: used by the ECS agent to pull the image from ECR, fetch secrets, and write logs. It belongs to the platform
- **Task role**: used by your code to call S3, SQS or Secrets Manager. It belongs to the application
- **Permissions your application needs go on the task role.** Putting them on the execution role is the reason a container starts and then gets access denied

### Instance metadata

```bash
TOKEN=$(curl -sX PUT http://169.254.169.254/latest/api/token \
  -H 'X-aws-ec2-metadata-token-ttl-seconds: 300')
curl -s -H "X-aws-ec2-metadata-token: $TOKEN" \
  http://169.254.169.254/latest/meta-data/iam/security-credentials/
```

- **Require IMDSv2**, the token-based version. IMDSv1 answered a plain `GET`, which made a server-side request forgery bug into stolen credentials
