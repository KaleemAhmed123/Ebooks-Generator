## Structured logs

- Tailing a text file works on one server. Across a fleet, logs are shipped to a central store and read by query, and a sentence is the worst possible thing to hand a query engine
- A **structured log** is one JSON object per event with stable keys. The message becomes an event name, and everything that varies becomes a field

```typescript
// one JSON object per event, fixed keys, ids rather than objects
const log = (level: string, event: string, fields: Record<string, unknown>) =>
  console.log(JSON.stringify({ ts: new Date().toISOString(), level, event, ...fields }));

// free text: readable by a regex, and only until someone rewords the sentence
log("error", `user ${user.id} could not buy item ${item.id}`, {});

// structured: every field is queryable, and the query survives a reworded message
log("error", "purchase_failed", {
  trace: ctx.traceId,        // joins this line to every other service on this request
  userId: user.id,           // the id, never the user object
  itemId: item.id,
  amountMinor: 15_000,
  reason: "card_declined",   // a closed set of values, so it groups and counts
});
```

- The event name is the part to keep stable. `purchase_failed` can be counted, alerted on and graphed for years; the sentence it replaced changes every time someone improves the wording, silently breaking every saved query built on it
- `reason` is deliberately an enumeration rather than the payment provider's message. Free-form strings from a third party become thousands of distinct values, which is unusable in a dashboard and expensive as a metric label (page 4)

### The failure

- Logging the object rather than the identifier. `log("info", "profile_loaded", { user })` writes whatever the user record happens to contain — email, phone, address, a token, a password hash — into a store that most of engineering can read and that is retained for months
- The leak arrives through a field nobody chose, added to the model long after the log line was written. Logging ids only is what makes that impossible by construction, rather than dependent on everyone remembering
