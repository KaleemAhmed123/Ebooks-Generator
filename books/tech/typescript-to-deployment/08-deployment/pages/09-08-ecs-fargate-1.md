## ECS on Fargate

- ECS runs containers. **Fargate** is the mode where AWS provides the machine, so there is no instance to patch, size or scale
- **It is the default recommendation in this booklet.** It removes the operating system from your responsibilities without adding Kubernetes

### The three nouns

| Noun | Is |
|---|---|
| **task definition** | the blueprint: image, CPU, memory, environment, logging. Versioned |
| **task** | one running instance of that blueprint |
| **service** | keeps N tasks running, registers them with a load balancer, and rolls out new versions |
