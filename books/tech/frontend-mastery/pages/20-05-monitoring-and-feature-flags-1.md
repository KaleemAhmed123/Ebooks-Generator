## Monitoring and Feature Flags

A backend that breaks writes a stack trace to a log file you own. A frontend that breaks throws an exception inside a stranger's browser, on a device you have never seen, and then that person leaves. Unless you send the failure somewhere, you never learn it happened.

### Error monitoring

An error monitoring service catches unhandled exceptions and rejected promises in the browser, groups identical ones, and shows you the context around each.

```bash
npm install @sentry/nextjs
```

```ts
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,             // 10% of transactions for performance data
  replaysOnErrorSampleRate: 1.0,     // record a replay whenever something breaks
  environment: process.env.NODE_ENV,
});
```

Three settings decide whether the data is usable.

**Source maps.** Minified code produces stack traces like `t.a is not a function at chunk-4f2a.js:1:88213`, which tells you nothing. Upload source maps at build time so the trace points at the real file and line. Upload them to the monitoring service, do not deploy them publicly, or you have shipped your source to anyone who looks.

**Release tagging.** Tag every deploy with the commit SHA. Without it you cannot answer the only question that matters during an incident: did this start with the release we shipped forty minutes ago?

**Scrubbing.** Frontend errors carry form values, URLs, and local storage. Strip anything personal before it leaves the browser. Sentry's `beforeSend` hook is where that belongs, and it is a legal requirement in most jurisdictions, not a nicety.
