## OpenTelemetry in the Browser - continued

```ts
registerInstrumentations({
  instrumentations: [
    getWebAutoInstrumentations({
      '@opentelemetry/instrumentation-fetch': {
        // Only send the trace header to your own origins. Sending it to a
        // third party leaks your internal trace ids and usually trips CORS.
        propagateTraceHeaderCorsUrls: [/^https:\/\/api\.example\.com/],
      },
    }),
  ],
});
```

The auto-instrumentations cover document load, `fetch`, `XMLHttpRequest`, and
user interaction without any code from you. Add your own spans only where the
automatic ones do not explain something.
