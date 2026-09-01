### Internationalization

- A backend needs it for emails, notifications, PDFs and API error messages, all of which are sent without a browser present

```ts
import { createIntl } from "@formatjs/intl"

const intl = createIntl({ locale: user.locale, messages })
intl.formatMessage({ id: "order.shipped" }, { awb })
```

- **`Intl` is built into Node**, so number, currency, date and relative-time formatting need no library at all

```ts
new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(500)
```

- Store the user's locale and time zone on the user record. Guessing from an IP is wrong often enough to matter
- Never concatenate translated fragments. Word order differs by language, so the whole sentence is one message with placeholders
