## Pagination

- Any collection that can grow must be paginated from day one. Adding it later is a breaking change
- An endpoint returning everything works in development and takes the service down the first time a seller has fifty thousand orders

### Offset pagination

```
GET /api/v1/orders?page=2&limit=20
```

- Simple, and it lets a client jump to page 40
- `OFFSET 10000` makes the database count and discard ten thousand rows on every request
- Rows inserted while paging shift the window, so an item can appear on two pages or be skipped entirely

### Cursor pagination

```
GET /api/v1/orders?limit=20&cursor=o_842
```

```json
{ "data": [ ... ], "nextCursor": "o_811" }
```

- The cursor is an opaque pointer to a position, usually the last id, encoded so clients cannot construct one
- The database seeks straight to it, so page one thousand costs the same as page one
- Inserts cannot shift the window, so nothing is duplicated or skipped
- The trade is that a client cannot jump to an arbitrary page, which almost no API consumer actually needs

### The rule

- Offset for a small admin table where jumping matters
- **Cursor for anything public, anything large, and anything a machine consumes**
