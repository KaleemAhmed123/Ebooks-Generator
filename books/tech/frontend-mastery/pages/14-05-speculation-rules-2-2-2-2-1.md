### Make your page prerender-safe

A prerendered page is running with no user looking at it. Anything it does
early, it does for a visit that may never happen.

```js
if (document.prerendering) {
  // do not fire analytics, do not start a video, do not show a dialog
} else {
  startAnalytics();
}

document.addEventListener('prerenderingchange', () => {
  // the user actually arrived, now it is a real page view
  startAnalytics();
}, { once: true });
```

The audit list:

- **Analytics.** Otherwise your page views inflate and your conversion rate
  collapses. Most analytics vendors now handle this, but verify.
- **Anything with a side effect.** POST requests, marking notifications read,
  incrementing a counter, consuming a one-time token.
- **Autoplaying media.** It is paused by the browser, but start it on
  activation, not on load.
- **Dialogs and permission prompts.** Deferred by the browser, but do not rely
  on that.

### Where to put it

The best return is on the highest-intent link on the page. A product page
prerendering `/cart`. A search results page prerendering the first result. A
documentation site prerendering the next page in the sequence.

The worst return is prerendering everything, which spends real money on your
origin for navigations that never happen.
