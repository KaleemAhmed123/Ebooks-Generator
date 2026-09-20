## Structured logs

- In a monolith, developers read logs by tailing a text file on the server. In a distributed system with 500 instances, logs are forwarded to a central database (like Elasticsearch or Datadog)
- If your log is a free-text string (`"User 123 failed to purchase item 456"`), the database cannot easily query it. To find all failures for item 456, you have to write a slow, fragile regex
- Structured logging means every log entry is a JSON object with fixed keys. You do not log sentences; you log data

````typescript
// Bad: free text
logger.error(`User ${user.id} failed to purchase item ${item.id}`);

// Good: structured log
logger.error("Purchase failed", {
  userId: user.id,
  itemId: item.id,
  cartTotal: 150.00
});
````

- The central database parses the JSON and indexes every field. You can instantly query `WHERE itemId = 456 AND cartTotal > 100`.

### The failure

- The failure is logging the entire object instead of the IDs: `logger.info("User profile", { user: userObject })`. If the user object contains a password hash, a credit card number, or an email address, you just leaked Personally Identifiable Information (PII) into the logs
- Logs are widely accessible to developers. PII in logs is a major security breach. Log the ID, never the object
