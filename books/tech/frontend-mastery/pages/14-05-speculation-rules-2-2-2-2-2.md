### The other free instant navigation: bfcache

The back/forward cache keeps a whole page, JavaScript heap and all, in memory
when the user navigates away. Pressing Back restores it in a single frame. No
request, no parse, no re-render.

It costs nothing and you get it by default, so the only work is not
disqualifying yourself from it. The usual disqualifiers:

- An `unload` event listener. Use `pagehide` instead. This one alone excludes a
  large share of the sites that miss out.
- `Cache-Control: no-store` on the document.
- An open IndexedDB transaction at navigation time.

Chrome removed one long-standing disqualifier in 2026: **a page with an open
WebSocket connection is now eligible**, which matters for any chat, dashboard or
collaborative editor.

Verify rather than assume. Chrome DevTools has an **Application, Back/forward
cache** panel that navigates away and back and tells you exactly which rule
blocked you.

```js
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    // restored from bfcache: refresh anything time-sensitive
    refreshCartCount();
  }
});
```

That handler is the one thing you do owe. A restored page shows state from
minutes ago, so re-fetch whatever must be current and leave the rest.
