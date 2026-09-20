## When NOT to use it

- Event Sourcing and CQRS are often pitched as the ultimate architecture. They are not. They introduce massive, inescapable complexity. 

| Feature | Event Sourcing + CQRS | CRUD |
|---|---|---|
| **Consistency** | Eventual. You write data, but it takes 100ms for the Read Model to update. | Strong. You write it, you can immediately read it. |
| **Data modeling** | Write models, Read models, Event schemas, Upcasters. | One table. |
| **Best used for...** | Accounting, Legal Audit Trails, E-commerce Shopping Carts. | User profiles, CMS content, simple settings. |

- Event sourcing makes hard problems (auditing, time travel) easy, but it makes easy problems (reading the data you just wrote) hard. 

### The failure

- Event sourcing the user's avatar URL. A team decides to go "all in" on Event Sourcing. They create a `ProfilePictureUpdated` event. The user uploads a new photo, the event is appended, and the UI instantly re-fetches the user profile. But because of CQRS, the Read Model hasn't processed the event yet. The UI receives the *old* photo URL and displays it. The user thinks the upload failed and clicks "Upload" five more times. The developers now have to implement complex UI polling logic just to change a picture. Use Event Sourcing only in the specific bounded contexts that demand it (like Billing). Use standard CRUD for everything else
