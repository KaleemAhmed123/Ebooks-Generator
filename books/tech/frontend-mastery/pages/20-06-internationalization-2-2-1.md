### Routing

Put the locale in the URL. `/en/products` and `/de/products` are separately crawlable, separately cacheable, and shareable in a way a cookie or a header is not.

```
app/
  [locale]/
    layout.tsx
    page.tsx
    products/page.tsx
```

Detect the preferred language from `Accept-Language` in `proxy.ts` on first visit, redirect once, then let the URL be the source of truth. Never keep redirecting: a user who chose English on a German machine must be able to stay there.

### Bundle size

The mistake that costs the most is shipping every translation to every user. Twelve languages of message files in one bundle means each visitor downloads eleven they cannot read.

Load only the active locale, and load it on the server where possible so no translation JavaScript reaches the client at all.

```tsx
// Server Component: messages resolve on the server, none of this ships
const messages = (await import(`@/messages/${locale}.json`)).default;
```

`next-intl` and `react-i18next` are the two common libraries. For an App Router project `next-intl` fits better, because it is built around Server Components and keeps the message catalog off the client.
