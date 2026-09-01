## Versioning and deprecation

- The moment somebody else calls your API you can no longer change it freely, and the only question is how you manage that

| Change | Breaking |
|---|---|
| adding an optional field | no |
| adding an endpoint | no |
| adding an enum value | **yes**, if clients switch exhaustively |
| removing or renaming a field | yes |
| making an optional field required | yes |
| tightening validation | yes |
| changing a status code | yes |

### Where the version goes

- **In the path**, `/api/v1/orders`. Visible in logs, easy to route, easy to debug. The pragmatic default
- **In a header**, `Accept: application/vnd.example.v2+json`. Purer, and invisible to caches and to anyone reading a browser bar

### Retiring a version

```http
Deprecation: Sun, 01 Feb 2026 00:00:00 GMT
Sunset: Wed, 01 Jul 2026 00:00:00 GMT
Link: <https://docs.example.com/v2>; rel="deprecation"
```

- `Deprecation` says it is discouraged. `Sunset`, from RFC 8594, says the date it stops working
- Machine readable, so a client can alert on it rather than relying on someone reading an email
- **Measure usage per version before removing anything.** Log the version on every request, and the decision becomes a number rather than an argument
