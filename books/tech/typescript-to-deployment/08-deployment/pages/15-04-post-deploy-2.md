### The dashboard, for fifteen minutes

| Watch | Bad looks like |
|---|---|
| error rate | any rise above the pre-deploy baseline |
| p95 latency | a step change, not a spike |
| memory per container | a climb that does not level off. A leak |
| restart count | anything above zero. A crash loop |
| queue depth | rising. Workers are not keeping up or are failing |
| database connections | a step up. A pool leak in the new code |

- **A memory line that climbs steadily and never flattens is the classic new-deploy leak.** It will hit the limit in hours, not minutes, so it is easy to miss and expensive to ignore

### Close it out

```bash
amtool silence expire <id>              # remove the silence you added
```

- **Expire the silence explicitly.** A forgotten silence is why the next real incident goes unnoticed
- **Write the deployed SHA where the team can see it**, so the next person does not have to derive it
