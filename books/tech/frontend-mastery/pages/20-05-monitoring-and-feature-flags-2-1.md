### Real user monitoring

Lab tools such as Lighthouse measure one run on one machine. Real user monitoring measures the users you actually have, on the phones they actually own, on the networks they are actually using. The two disagree constantly, and the field data is the one that reflects revenue.

The `web-vitals` library reports the same metrics Google uses for search ranking.

```ts
import { onCLS, onINP, onLCP, onTTFB } from 'web-vitals';

function send(metric) {
  navigator.sendBeacon('/api/vitals', JSON.stringify(metric));
}

onCLS(send);
onINP(send);
onLCP(send);
onTTFB(send);
```

`navigator.sendBeacon` is the right transport. It survives the page being closed, which `fetch` does not, and the last measurement always arrives as the user leaves.

Watch the **75th percentile**, not the average. An average is dragged down by fast devices and hides the quarter of your users having a bad time.
