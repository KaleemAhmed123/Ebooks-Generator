## Staging

- Staging answers one question: **would this break production?** Anything that does not serve that question is waste
- It fails at that job in three specific ways, and all three are common

| Failure | Result |
|---|---|
| a smaller machine, a smaller database | performance problems appear only in production |
| empty or trivial data | queries that are fast on 100 rows and fatal on 10 million |
| **a different build** | it proved nothing at all |

### What staging must match

- **The image.** The same digest that will be promoted
- **The database major version and the extensions**
- **The shape of the data.** Row counts within an order of magnitude, and the same distribution of edge cases
- **The deployment mechanism.** If production deploys with the pipeline, staging must too, or the pipeline is untested
