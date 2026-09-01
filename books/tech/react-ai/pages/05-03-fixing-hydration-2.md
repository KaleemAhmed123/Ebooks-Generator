### Common causes of mismatch

1. **Dates and times**: The server is in UTC, the browser is in IST. They render different strings
2. **Random numbers**: `Math.random()` generates a different number on the server than the client
3. **Local storage**: Reading `localStorage` during the initial render means the client sees data the server did not have
4. **Invalid HTML nesting**: A `<p>` inside another `<p>`, or a `<div>` inside a `<p>`. The browser autocorrects the HTML, which makes it differ from what the server sent

- Fix invalid HTML by fixing your tags. Fix dates, randoms, and storage by using the `useHydrated` two-pass pattern
