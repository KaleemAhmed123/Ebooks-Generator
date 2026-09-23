## Feature flags

- Deploy is putting the artefact on the server; release is letting a user reach it. A **feature flag** separates the two, so a rollout becomes a configuration change and a rollback stops being a pipeline run
- Pete Hodgson's 2017 catalogue sorts them by lifetime, which is what decides whether a flag is debt. **Release** flags gate "incomplete and un-tested codepaths … shipped to production as latent code" and live for days. **Ops** flags — a kill switch, a degraded mode — are permanent on purpose. **Experiment** and **permissioning** flags last as long as the test, or as the product

```typescript
// rules arrive in the background; the check is local and synchronous
type Rule = { on: boolean; rollout: number };        // rollout: percentage of users
let rules: Record<string, Rule> = {};                // swapped by the poller, never awaited here

export function isEnabled(flag: string, userId: string, fallback = false): boolean {
  const rule = rules[flag];
  if (!rule) return fallback;                        // unknown flag, or rules never arrived
  if (!rule.on) return false;                        // the kill switch outranks the rollout
  return bucket(flag + ":" + userId) < rule.rollout; // stable per user, so nobody flickers
}
const bucket = (k: string) => ([...k].reduce((h, c) =>  // FNV-1a → 0–99
  Math.imul(h ^ c.charCodeAt(0), 0x01000193), 0x811c9dc5) >>> 0) % 100;
```

- The check never awaits, so a dead flag service degrades to `fallback` rather than to an outage. Bucketing on the user id is stable, so nobody sees the feature flicker between requests, and seeding the hash with the flag name stops two flags at 10 % picking the same tenth of users

### The failure

- Flags that outlive their purpose. Hodgson: "Savvy teams view their Feature Toggles as inventory which comes with a carrying cost." Every release flag left at 100 % is a live branch tests do not cover and nobody dares delete
- The second is evaluating over the network on the request path, making the flag service a hard dependency of everything using it — so the tool bought to make releases safer takes the site down
