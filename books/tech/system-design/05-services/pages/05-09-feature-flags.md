## Feature flags

- Deployment is putting code on a server. Release is letting users see it. Feature flags decouple deployment from release
- You deploy the code dark, hidden behind an `if` statement. Once the code is in production, you turn the flag on for yourself, then for internal testers, then for 10% of users, and finally 100%

````typescript
// Feature flags are just dynamic configuration
if (flags.isEnabled('new-checkout-flow', user.id)) {
  return renderNewCheckout();
} else {
  return renderOldCheckout();
}
````

- If the new flow causes a spike in payment failures, you flip the flag to `false`. The change is instant, without waiting 15 minutes for a CI/CD rollback pipeline to execute

### The failure

- The first failure is evaluating flags over the network on the hot path. If your app calls the feature flag service for every request, and the flag service goes down, your app goes down. Flags must be evaluated locally, with rules pushed to the client in the background
- The second failure is flag rot. A team builds a feature, turns the flag to 100%, and forgets about it. Two years later, the codebase contains 400 active feature flags checking dead code paths. A flag is a temporary configuration with a lifetime; it must be deleted the week it reaches 100%
