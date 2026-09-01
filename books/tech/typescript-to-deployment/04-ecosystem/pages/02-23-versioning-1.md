## Versioning and the shape of an API

- A version exists so you can change a response without breaking a client you do not control

```js
app.use("/api/v1", v1Routes)
app.use("/api/v2", v2Routes)
```

- URL versioning is the plainest option and the easiest to debug from a log line
- Header versioning keeps URLs stable but hides the version from caches and browsers

### What counts as breaking

| Change | Breaking |
|---|---|
| adding an optional field | no |
| adding a new endpoint | no |
| removing a field | yes |
| renaming a field | yes |
| tightening validation | yes |
| changing a status code | yes |

### Consistent shapes

```js
// list
{ "data": [ ... ], "nextCursor": "o_123" }

// single
{ "data": { ... } }

// error
{ "code": "validation_failed", "message": "...", "requestId": "r-42" }
```

- One envelope everywhere means a client writes one parser and one error path
