## What a pipeline buys on one box

- The manual deploy from page 04-06 works. What it lacks is everything that stops a bad deploy

| Manual | With a pipeline |
|---|---|
| Deploys from whoever is at a laptop | Deploys from a known commit on `main` |
| Tests run if remembered | Tests gate the deploy |
| The build competes with production for RAM | The build happens elsewhere |
| "What is running" is a guess | A commit hash and an image digest |
| Rollback means rebuilding the old code | Rollback is starting an image that already exists |
| Two people deploying at once | Concurrency control refuses the second |

### The three models, in order

| Model | Build happens | Complexity | Page |
|---|---|---|---|
| **1. SSH in and run** | On the server | Lowest | 13-03 |
| **2. Self-hosted runner** | On the server | Low | 13-06 |
| **3. Build in CI, push to a registry** | On GitHub's runners | Medium | 13-08 |

### The recommendation

- **Model 3.** The server stops building, which removes the memory spike, the disk pressure from build cache, and most of the deploy duration
- It is also the only model where rollback is instant, because the previous image is still in the registry

### Start where it hurts least

- Model 1 is a real improvement over typing commands, and takes twenty minutes to set up
- Move to model 3 when the build starts affecting the running site, which on a 4 GB box is usually immediately
