## Replicated reference data

- Sometimes building a full read model is overkill, but making a network call is too slow. The compromise is to duplicate a subset of the data
- If the Order service needs to know the user's email address to send a receipt, it can store a copy of the email address in its own `orders` table

| The Trade-off | Consequence |
|---|---|
| **Speed** | The Order service can send the receipt immediately, even if the Identity service is currently offline |
| **Storage** | You are paying to store the email address twice. In modern systems, storage is cheap |
| **Consistency** | If the user changes their email, the Order service has the old one until it processes an `EmailUpdated` event |

- Copying data is cheaper than a network call. You must accept that the duplicated data is eventually consistent. You subscribe to domain events to keep your local copy fresh

### The failure

- The failure mode is treating the copy as the source of truth. The Order service must never allow a user to update their email address through the Order API
- The copy is read-only. If it gets out of sync, you throw it away and refetch it from the source of truth. Only the owning service (Identity) is allowed to mutate the data
