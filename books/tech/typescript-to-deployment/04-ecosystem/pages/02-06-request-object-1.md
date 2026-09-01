## The request object

- `req` is Node's `IncomingMessage` with Express properties added, so everything from `node:http` is still there

| Property | Holds |
|---|---|
| `req.params` | path parameters, always strings |
| `req.query` | parsed query string |
| `req.body` | parsed body, only after a body parser ran |
| `req.headers` | all headers, keys lowercased |
| `req.cookies` | parsed cookies, only after `cookie-parser` |
| `req.method` | GET, POST and so on |
| `req.path` | path without the query string |
| `req.originalUrl` | the full URL as received |
| `req.baseUrl` | where the router was mounted |
| `req.ip` | client IP, honest only with `trust proxy` set |
| `req.protocol` | http or https |
| `req.get(name)` | one header, case insensitive |
