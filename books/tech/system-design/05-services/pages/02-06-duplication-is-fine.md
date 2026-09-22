## Replicated reference data

- Copying the two fields a service needs is cheaper than calling for them: no hop on the critical path, no dependency at read time, and the copy is right by construction as of the event that filled it. The price is that the copy lags the source by the event delay and must never be edited where it lives

| Question | Copy | Call |
| :--- | :--- | :--- |
| the receipt needs the customer's email | stored on the order at write time; the receipt goes out even if identity is down | `GET /users/{id}` on every receipt: identity's p99 and availability are now the receipt's (Module 1, page 5) |
| the customer changes their email | orders applies `UserUpdated` and rewrites the copy; between the change and the event, the old email is used | always current; always a call |
| the catalog renames a product | the order keeps the title it was placed with, which is what the customer bought | the order page shows the new title against an old price |
| a copy is wrong | throw it away and refill from the owner's API or a replay of its events (booklet 04); the owner is always right | not applicable |
| who may write it | the owner, through its events, only | the owner |

- A version column makes the copy safe: the event carries the source's version, the copy stores it, and an older event arriving late (booklet 04) is ignored; without it, two out-of-order updates leave the copy on the older value
- The choice is per field, not per service: copy what is read on the hot path and changes rarely, an email, a name, a title; call for what must be current at the moment of use, a balance, a permission (Module 4, page 8)

### The failure

- The copy treated as the source of truth. A support tool lets someone edit the email on the order, the order's copy now disagrees with identity, the next `UserUpdated` event overwrites the edit, or does not and the two diverge forever. A copy is read-only where it lives; the write goes to the owner and comes back as an event, or the field is not a copy and should not be there
