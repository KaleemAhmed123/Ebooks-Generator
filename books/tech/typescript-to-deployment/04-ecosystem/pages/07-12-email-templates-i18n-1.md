## Email templates and internationalization

### Building an email

- Email clients render a subset of HTML from roughly two decades ago. Flexbox is unreliable, and Outlook still wants tables
- Writing that by hand means testing across a dozen clients, which is why templating libraries exist for this specifically

```bash
npm i react-email @react-email/components
```

```tsx
import { Html, Button, Text } from "@react-email/components"

export function ShippedEmail({ awb }: { awb: string }) {
  return (
    <Html>
      <Text>Your order is on its way.</Text>
      <Button href={`https://example.com/track/${awb}`}>Track it</Button>
    </Html>
  )
}
```

- Components compile to the table-based HTML those clients need
- `mjml` does the same job without React, and `handlebars` remains fine for simple text
- **Always send a plain text alternative.** Some clients show it, and spam filters expect it
