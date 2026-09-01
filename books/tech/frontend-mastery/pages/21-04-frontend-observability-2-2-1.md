### Collecting the vitals

```ts
import { onCLS, onINP, onLCP, onTTFB, onFCP } from 'web-vitals';

function send(metric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,         // 'good' | 'needs-improvement' | 'poor'
    id: metric.id,
    navigationType: metric.navigationType,
    release: __BUILD_SHA__,
  });
  navigator.sendBeacon('/api/vitals', body);
}

onCLS(send);
onINP(send);
onLCP(send);
onTTFB(send);
onFCP(send);
```

`navigator.sendBeacon` is the right transport and not a detail. It hands the
request to the browser to send whenever it can, including after the page is
gone. A `fetch` in an unload handler gets canceled, which means you
systematically lose the measurements from the sessions that ended worst.

### Segment, or the numbers lie

An aggregate p75 LCP of 2.4 seconds looks fine and can hide a completely broken
experience. Always slice by:

- **Device class.** Low-end Android is a different product from a MacBook.
- **Country and network.** A CDN with no presence in a region shows up here and
  nowhere else.
- **Route.** The marketing page and the dashboard have nothing in common.
- **Release.** Without this you cannot answer "did we cause it".
- **Cold versus warm cache.** First-time visitors are the ones you are losing.
