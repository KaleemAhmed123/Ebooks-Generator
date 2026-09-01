## Email and messaging

### nodemailer 9.0.6

```ts
import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: 587,
  auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  pool: true,
  maxConnections: 5,
})

await transport.sendMail({
  from: '"Orders" <orders@example.com>',
  to: "rabiya@example.com",
  subject: "Your order shipped",
  html: renderTemplate("shipped", { awb }),
})
```

- Speaks SMTP, so it works with any provider
- `pool: true` reuses connections. Without it every message opens a new TLS handshake
- Sending inside a request adds seconds of latency. Queue it

### resend 6.25.0

```ts
await resend.emails.send({ from, to, subject, react: <ShippedEmail awb={awb} /> })
```

- HTTP API instead of SMTP, and templates written as components
- Simpler to run, and easier to trace when a message does not arrive
