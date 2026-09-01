### Where it earns its place

- Event names, permission strings such as `orders:read`, environment variable prefixes, and typed route parameters
- Next.js uses it for `RouteContext<"/orders/[id]">`, which is how a route string checks itself

### Where it does not

- Parsing an arbitrary string at the type level is possible and produces unreadable errors. Validate at runtime instead
