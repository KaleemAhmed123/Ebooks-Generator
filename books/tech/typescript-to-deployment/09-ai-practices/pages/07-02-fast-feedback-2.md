### The layers worth having

| Layer | Runs in | When |
|---|---|---|
| type check | seconds | constantly |
| unit tests | under 30 seconds | on every change |
| integration tests | a few minutes | before a pull request |
| end to end | longer | in CI |

- **The agent lives in the first two layers.** Those are the ones worth optimizing

### The habit

- **Time your suite and treat a regression as a bug.** A suite that grew from 20 seconds to 3 minutes quietly removed the feedback loop everything else depends on
