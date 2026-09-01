## Filtering, sorting and response shape

```
GET /api/v1/orders?status=paid&status=shipped&createdAfter=2026-08-01
                  &sort=-createdAt&fields=id,total,status&limit=20
```

- Repeat a parameter for OR, use different parameters for AND. Predictable and easy to parse
- A leading `-` on the sort key means descending, which avoids a second `order=desc` parameter
- **Allowlist every sortable and filterable field.** Passing user input into an `orderBy` is how an unindexed sort takes the database down
- `fields` is a **sparse fieldset**, letting a caller ask for less. Useful on wide resources, and optional

### One envelope, everywhere

```json
{ "data": [ ... ], "nextCursor": "o_811" }
{ "data": { "id": "o_842" } }
```

- A client then writes one parser and one error path rather than one per endpoint
- Returning a bare array from a list endpoint means there is nowhere to add a cursor later without breaking every caller

### Expanding relations

```
GET /api/v1/orders/o_842?expand=seller,items
```

- Lets a caller avoid three round trips without you inventing a second endpoint
- Cap the depth and the list of expandable relations, or you have accidentally built an unbounded query language
