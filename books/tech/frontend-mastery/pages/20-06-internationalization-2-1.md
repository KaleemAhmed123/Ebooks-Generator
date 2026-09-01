## Internationalization - continued

**Right to left flips the layout.** Arabic and Hebrew mirror the whole interface, including the direction arrows point. Use CSS logical properties everywhere and the browser does it for you.

```css
/* physical, breaks in RTL */
margin-left: 1rem;  padding-right: 2rem;  text-align: left;

/* logical, mirrors automatically */
margin-inline-start: 1rem;  padding-inline-end: 2rem;  text-align: start;
```

Set `dir="rtl"` on the `<html>` element and correct logical CSS needs no other change.

### `Intl` is built in

Numbers, currencies, dates, and relative times do not need a library. The browser ships the data.

```ts
new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(1234.5);
// "1.234,50 €"

new Intl.DateTimeFormat('ja-JP', { dateStyle: 'long' }).format(new Date());
// "2026年9月1日"

new Intl.RelativeTimeFormat('es', { numeric: 'auto' }).format(-1, 'day');
// "ayer"

new Intl.ListFormat('en', { type: 'conjunction' }).format(['a', 'b', 'c']);
// "a, b, and c"
```

Every hand-rolled "3 days ago" helper is a bug in nine languages. `Intl` covers all of them and costs no bundle size.
