## Fallbacks that are safe

- When implementing graceful degradation, the fallback data must be safe to serve. The most common fallbacks are a stale cache (serve yesterday's data instead of failing), a static default, or skipping the feature entirely
- A fallback is not always better than an error. You must categorize dependencies by the risk of the fallback

| Dependency | Safe Fallback | Unsafe Fallback (Do not do this) |
|---|---|---|
| **User Profile API** | Stale cache (old avatar) | Empty profile (deletes data on save) |
| **Pricing Service** | Hardcoded catalog price | $0.00 (giving products away for free) |
| **Fraud Detection** | Block the transaction | Approve the transaction (losing money) |
| **Authorization** | Deny access | Allow access (security breach) |

### The failure

- The catastrophic failure is using a "fail open" fallback on an authorization or billing service. A developer wraps the Auth service call in a circuit breaker, and when the Auth service goes down, the fallback function simply returns `true`
- During the outage, every request is authorized as an admin. The system stayed up, but the data was destroyed. When a fallback is worse than an error, you must return the error
