## ECS on Fargate - continued

```json
{
  "family": "orders-api",
  "requiresCompatibilities": ["FARGATE"],
  "networkMode": "awsvpc",
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::123456789012:role/orders-api-task",
  "containerDefinitions": [{
    "name": "api",
    "image": "123456789012.dkr.ecr.ap-south-1.amazonaws.com/orders-api:abc123",
    "portMappings": [{ "containerPort": 3000 }],
    "environment": [{ "name": "NODE_ENV", "value": "production" }],
    "secrets": [{
      "name": "DATABASE_URL",
      "valueFrom": "arn:aws:secretsmanager:ap-south-1:123456789012:secret:prod/orders/db"
    }],
    "healthCheck": {
      "command": ["CMD-SHELL", "node -e \"fetch('http://127.0.0.1:3000/health').then(r=>process.exit(r.ok?0:1))\""],
      "interval": 30, "timeout": 5, "retries": 3, "startPeriod": 20
    },
    "stopTimeout": 45,
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "/ecs/orders-api",
        "awslogs-region": "ap-south-1",
        "awslogs-stream-prefix": "api"
      }
    }
  }]
}
```

- **`secrets` fetches from Secrets Manager at start and injects as an environment variable.** The value never appears in the definition or in git
- **`stopTimeout` is how long the task has after `SIGTERM`.** The default 30 seconds cuts off longer requests
