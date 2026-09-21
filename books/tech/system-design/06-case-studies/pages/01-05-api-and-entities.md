## API and entities before boxes

- No box goes on the board until the shape of the data is known. First the nouns: for a feed, `User`, `Post`, `Follow`; for ride matching, `Rider`, `Driver`, `Trip`. Three to five entities, each with the two or three fields the requirements touch
- Then one endpoint per functional requirement. Method, path, body, response. Nothing that does not map to a requirement gets an endpoint yet
- Two decisions are made here, not later, because they change the storage design: which writes need an idempotency key (booklet 01) and how lists are paged

| Requirement | Endpoint | Decided here |
| :--- | :--- | :--- |
| post something | `POST /posts` | `Idempotency-Key` header; retries must not double-post |
| read the feed | `GET /feed?cursor=` | cursor, not offset: the list shifts under the reader |
| follow someone | `PUT /follows/{userId}` | `PUT` is idempotent by definition; no key needed |
| shorten a URL | `POST /urls` → `{ code }` | the response carries the key the read path is indexed on |

- **Cursor pagination** returns an opaque token that encodes the last item seen, so the next page starts after it even if items were inserted above. Offset pagination (`?page=3`) skips or repeats items whenever the list moves
- The endpoint list is also the checklist for the high-level design: every one of them gets a path traced through the boxes on the next page

### The failure

- Sharding the database before knowing the write shape. The interviewer asks "what is flowing through that arrow?" and the data model is invented backwards on the spot. A schema chosen before the API is a schema chosen for the wrong queries
