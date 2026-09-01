### Rolling the summary

- When the conversation passes a token threshold, summarize the oldest turns with a small model and replace them with the summary
- **Summarize, then delete, in one transaction.** Doing it the other way loses the turns when the summary call fails
- Keep the original messages in the database. Only the **context** is trimmed, never the record

### Extracting semantic facts

- After a conversation ends, a background job asks a small model for durable facts worth keeping, with a schema
- **Never write facts on the request path.** It is slow, it is not needed for this answer, and it is the wrong place for a failure
- **Store where each fact came from**, and let the user see and delete them. A memory the user cannot inspect becomes a support problem and a privacy one
