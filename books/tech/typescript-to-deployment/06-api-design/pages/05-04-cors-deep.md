## CORS, properly

- A browser will happily send a request to any origin. What it will not do is let the calling page **read the response**
- That rule is the **same-origin policy**, and without it any site you visited could read your inbox using your cookies
- **CORS** is how a server opts out of that restriction for specific origins
- An origin is scheme, host and port together, so `https://app.example.com` and `https://api.example.com` are different origins

### Simple requests and preflights

- A **simple request** goes straight out. `GET`, `HEAD`, or `POST` with a basic content type and no custom headers
- Anything else triggers a **preflight**: the browser sends `OPTIONS` first and asks permission

```http
OPTIONS /api/v1/orders
Origin: https://app.example.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type, authorization
```

```http
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST, PATCH, DELETE
Access-Control-Allow-Headers: content-type, authorization
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 86400
```

### The four things that go wrong

- **`*` with credentials.** The browser refuses the combination outright. Echo the specific origin instead
- **A 405 on `OPTIONS`.** The preflight failed, so the real request never happens and the console blames CORS
- **Missing `Access-Control-Expose-Headers`.** Scripts cannot read a custom response header without it, even on an allowed origin
- **Treating CORS as security.** It restricts browsers only. `curl`, a server and a mobile app ignore it completely
