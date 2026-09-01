## Bulk and batch endpoints

- A client importing five hundred products with five hundred `POST` calls pays five hundred round trips, five hundred auth checks and five hundred rate limit slots
- A **bulk endpoint** accepts many records in one request, which is the difference between an import that takes a minute and one that takes an hour
- The hard part is not accepting the array. It is deciding what happens when record 312 fails

### All or nothing

```http
POST /api/v1/products/bulk
{ "atomic": true, "items": [ ... ] }
```

- One transaction. Any failure rolls everything back and returns a `422` naming the offending index
- Right when the records depend on each other, and unhelpful when one bad row blocks 499 good ones
