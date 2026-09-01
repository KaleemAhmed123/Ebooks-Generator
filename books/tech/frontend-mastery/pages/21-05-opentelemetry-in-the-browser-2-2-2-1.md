## Continued - continued

```ts
import { trace } from '@opentelemetry/api';
```

```ts
const tracer = trace.getTracer('storefront');

async function applyCoupon(code: string) {
  return tracer.startActiveSpan('applyCoupon', async (span) => {
    span.setAttribute('coupon.code_length', code.length);   // not the code itself
    try {
      return await api.applyCoupon(code);
    } catch (err) {
      span.recordException(err as Error);
      throw err;
    } finally {
      span.end();
    }
  });
}
```

### Four things that bite people

**Sample.** A trace per user action, from every session, is an enormous bill and
tells you nothing extra. Sample at 1 to 10 percent for normal traffic, and keep
100 percent of sessions that produced an error.

**Watch the bundle.** The full web SDK is not small. Load it after the app is
interactive rather than in the critical path, and measure the cost. Monitoring
that damages the metric it monitors is a bad trade.

**Set `propagateTraceHeaderCorsUrls` to your origins only.** The default sends
nothing, which is safe. Widening it to `.*` leaks internal identifiers to every
third party and breaks CORS preflights.

**Scrub attributes.** Span attributes are as sensitive as log lines. Never put a
full URL with a token, a form value, or an email address on a span. Record the
shape, not the contents: `code_length`, not `code`.
