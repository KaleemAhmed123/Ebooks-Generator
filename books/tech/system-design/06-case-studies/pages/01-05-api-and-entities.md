## API and entities before boxes

- Do not draw a single architecture box until you know the shape of the data. Start by listing the core entities (the nouns). For Twitter, the entities are `User`, `Tweet`, and `Follow`. For Uber, they are `Rider`, `Driver`, and `Trip`
- Next, define the API. Map exactly one endpoint to each of the functional requirements you agreed upon earlier. Write out the HTTP method, the path, and the JSON payload
- This is the moment to establish idempotency and pagination. If the endpoint is `POST /payments`, state out loud that you need an `Idempotency-Key` header so retries do not charge the user twice. If the endpoint is `GET /feed`, specify whether it uses offset pagination or cursor pagination

| Requirement | API Endpoint | Notes |
| :--- | :--- | :--- |
| User makes a post | `POST /v1/posts` | Body: `{ userId, content }`<br>Needs idempotency key |
| Get news feed | `GET /v1/feed?cursor=` | Cursor pagination for shifting feeds |
| Follow a user | `POST /v1/follows` | Body: `{ followerId, followeeId }` |

### The failure

- The failure mode is designing the database schema or the microservice boundaries before you know what the application actually writes or reads
- If you start drawing load balancers and databases before defining the API, the interviewer will ask, "What data is actually flowing through that load balancer?" You will have to pause, break your flow, and invent the data model retroactively

:::interview
**The contract test**
The API is the contract between the client and the backend. Great engineers design from the contract inwards, not from the database outwards.
:::
