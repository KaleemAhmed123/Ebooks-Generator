### Feature flags

A feature flag separates **deploying** code from **releasing** it. The code ships to production dark, and a switch decides who sees it.

That separation buys four things:

- **Trunk-based development.** No long-lived branches, no three-week merge conflicts. Half-finished work lives behind a flag on `main`.
- **Instant rollback.** A broken feature is turned off in seconds. Reverting a deploy takes a build, a pipeline, and a cache purge.
- **Gradual rollout.** 1% of users, then 10%, then everyone, watching the error rate at each step.
- **Experiments.** The same mechanism gives you A/B tests without a second system.

```tsx
const flags = await getFlags(userId);

return flags.newCheckout
  ? <CheckoutV2 />
  : <CheckoutV1 />;
```

The critical detail on the frontend is **where the flag is evaluated**. Evaluate it in the browser after hydration and the user sees the old UI flash before it swaps, which is a layout shift and a bad first impression. Evaluate it on the server, in the layout or in `proxy.ts`, and the correct version is in the first byte of HTML.

```ts
// proxy.ts, bucketing before anything renders
export default function proxy(request: NextRequest) {
  const response = NextResponse.next();
  if (!request.cookies.get('bucket')) {
    response.cookies.set('bucket', Math.random() < 0.5 ? 'a' : 'b');
  }
  return response;
}
```
