## Monitoring and Observability

- Graceful degradation without instrumentation is just silent failure with better manners
- If your fallback UI renders correctly, the user never complains, but you still need to know the primary system failed
- Observability means being able to ask new questions about your system without shipping new code

### Web Vitals

- Google measures your site speed using Core Web Vitals. If you fail, your SEO rank drops
1. **LCP (Largest Contentful Paint)**: How long it takes to render the main image or text block. Fix by optimising images and using SSR
2. **FID (First Input Delay) / INP (Interaction to Next Paint)**: How long it takes for a button to respond. Fix by reducing main thread blocking tasks (large renders)
3. **CLS (Cumulative Layout Shift)**: How much the page jumps around as it loads. Fix by giving images explicit heights and matching skeleton sizes to real content

### Error tracking (Sentry)

- `console.error` in the browser only helps the developer looking at their own screen
- You need a service like Sentry to catch unhandled exceptions, promise rejections, and React error boundary fallbacks in the wild
- Source maps are critical: without them, Sentry tells you an error happened in `main.a34f9b.js` at line 1, column 24041
- Upload source maps during your CI build, but do not expose them to the public internet

### Structured logging

- When logging from your edge functions or Node backend, use structured JSON logs, not raw strings
- `logger.info('User 123 paid 400')` cannot be queried easily
- `logger.info('payment_success', { userId: 123, amount: 400 })` allows you to graph total revenue in Datadog or Loki
- Log the event, the context, and the trace ID so you can stitch frontend actions to backend logs
