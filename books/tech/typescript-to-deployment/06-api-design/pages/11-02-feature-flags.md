## Feature flags

- Shipping a feature and releasing it are the same event only if the code path is unconditional
- That forces long-lived branches, big-bang merges, and a rollback that means a redeploy under pressure
- A **feature flag** separates the two. The code ships turned off, and a configuration change turns it on
- Rolling back then takes seconds and touches no artifact, which is the entire value

```ts
if (await flags.enabled("new-payout-engine", { sellerId: req.user.sellerId })) {
  return newPayoutEngine(req.body)
}
return legacyPayoutEngine(req.body)
```

### The four kinds, and they have different lifetimes

| Kind | Purpose | Lives for |
|---|---|---|
| Release | ship dark, enable later | days, then delete |
| Experiment | A/B test a variant | the length of the test |
| Operational | a kill switch for a dependency | permanently |
| Permission | entitlement by plan or tenant | permanently |

### The rules

- **Release flags are temporary.** Put a removal date on them. A codebase with two hundred stale flags has an untestable number of paths
- **Evaluate once per request, at the edge**, and pass the result down. Evaluating in a loop makes behavior change mid-request
- **Default to off** when the flag service is unreachable, so an outage there is not an outage everywhere
- **Never flag a database migration.** The schema is not conditional, and only the code reading it can be
- LaunchDarkly, Unleash, Flagsmith and OpenFeature are the common options. A database table and a cache is enough to start
