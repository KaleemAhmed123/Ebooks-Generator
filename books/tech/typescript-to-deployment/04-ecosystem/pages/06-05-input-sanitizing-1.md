## Sanitizing input

- Validation asks whether input is acceptable. Sanitizing asks what is safe to store, query or render once it is
- The two are separate because input can be perfectly well-shaped and still be an attack
- A field that should hold a string can arrive as an object, and in MongoDB `{ "$gt": "" }` is not a string, it is a query operator
- Text that should be a product description can contain a `<script>` tag that runs in the next person's browser, which is **XSS**, cross-site scripting
- A query parameter that should appear once can appear twice, and arrives as an array where the code expects a string
- Each of those is a small library, and each closes one of them
- The general rule is to store the original text and escape it when rendering, because escaping on the way in leaves the data wrong for every other consumer

### express-mongo-sanitize

```js
app.use(mongoSanitize())
```

```json
{ "email": { "$gt": "" }, "password": { "$gt": "" } }
```

- Sent to a `findOne`, that body matches the first user in the collection and logs the attacker in
- The middleware strips keys starting with `$` or containing a dot
- Validating with Zod first also solves it, since `z.string()` rejects an object outright

### sanitize-html

```js
import sanitizeHtml from "sanitize-html"

const clean = sanitizeHtml(req.body.description, {
  allowedTags: ["b", "i", "em", "strong", "a", "ul", "ol", "li", "p"],
  allowedAttributes: { a: ["href", "target"] },
  allowedSchemes: ["http", "https", "mailto"],
})
```

- Use an allowlist. A blocklist of dangerous tags will always miss one
- `allowedSchemes` is what blocks `javascript:` in an `href`
