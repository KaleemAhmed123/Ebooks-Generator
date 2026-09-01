### What makes it safe

- **`--max-concurrency 1`** rolls one instance at a time, so the others keep serving
- **`--max-errors 0`** stops the rollout on the first failure rather than breaking every instance
- **The final health check is the gate.** Without it, a container that starts and immediately crashes is reported as a successful deploy
- `environment: production` attaches the approval rules from the environments page

- **This is the simple shape.** An Auto Scaling Group with an ALB does the same thing properly, and Module 9 covers it
