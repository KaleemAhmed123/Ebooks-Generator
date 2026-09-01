## The resource cost

- Two full stacks means double the application memory for the length of the deploy

| Component | Steady | During a deploy |
|---|---|---|
| 15 application containers at 512M | 7.5 G | **15 G** |
| Data layer | 2 G | 2 G |
| Nginx | 0.1 G | 0.1 G |
| Total | 9.6 G | **17.1 G** |

- On an 8 GB box this does not fit. The green stack starts, memory runs out, and the kernel kills something. Usually Postgres

### Five ways to make it fit

**1. Lower the limits during the deploy.** Both colors at 256M instead of 512M for the flip window

**2. Flip in waves.** Start green for the frontends, flip, stop blue frontends, then repeat for the backends. Slower, and no single rollback point

**3. Blue-green only what changed.** If only `orders` was rebuilt, run a second `orders` and flip that one upstream. Most deploys touch a handful of services

```nginx
upstream orders_up { server orders-green:8083; }
```

**4. Add swap.** It absorbs the peak, slowly. Page 02-11

**5. Buy the bigger box.** 16 GB costs roughly twice 8 GB, and the deploy becomes uninteresting
