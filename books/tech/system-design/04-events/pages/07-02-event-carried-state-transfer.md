## Event-carried state transfer

- To solve the DDoS problem, we use **Event-Carried State Transfer (ECST)**. 
- Instead of just emitting an ID, the event contains a "fat payload"—a complete snapshot of the entity's state at that exact moment in time (`{ id, name, price, stock_level, user_id }`). Downstream consumers read the fat payload and save whatever fields they care about into their own local databases.

| Pattern | Network Traffic | Coupling | Data Duplication |
|---|---|---|---|
| **Notification** | High (1 event + 1 API call per consumer) | Low | None. Source of truth stays in one DB. |
| **ECST** | Low (1 fat event, 0 API calls) | Higher (Consumers rely on the event schema) | Massive. Every consumer has a local copy. |

- With ECST, the downstream service never has to call the upstream API. If the upstream service goes offline, the downstream service can continue functioning perfectly using its local cached copy of the data. 

### The failure

- Copying PII into 15 different databases violates privacy laws. A developer uses ECST for `UserUpdated` events. The payload contains the user's name, email, physical address, and phone number. 15 different microservices consume this event and save the data to their own Postgres, MongoDB, and Elasticsearch databases. Two months later, a European user issues a GDPR "Right to Be Forgotten" request. The developer now has to write a script to hunt down and delete that user's PII across 15 different databases managed by 6 different teams. If you miss even one, you are in violation. Never put sensitive PII in a fat event payload
