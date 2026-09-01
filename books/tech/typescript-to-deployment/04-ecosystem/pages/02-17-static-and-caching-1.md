## Static files and caching headers

```js
app.use(express.static("public", {
  maxAge: "1y",
  etag: true,
  immutable: true,
}))
```

- `express.static` serves a folder and sets `Content-Type`, `ETag` and `Last-Modified` for you
- `immutable` with a long `maxAge` is safe only for hashed filenames, where the name changes when the content does

### Compression

```js
import compression from "compression"

app.use(compression({ threshold: 1024 }))
```

- Gzips responses above a size, which usually cuts JSON payloads by seventy percent or more
- Below the threshold, compression costs more CPU than it saves bandwidth
- If Nginx or a CDN already compresses, doing it twice is wasted CPU
