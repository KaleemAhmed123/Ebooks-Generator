### Secrets going in

```ts
const stripe = new Stripe("sk_test_51H8...")           // an example key, committed
const JWT_SECRET = "change-me-in-production"           // and nobody did
```

- Generated example code contains example credentials, and they **survive into the diff** because they look like configuration
- **A secret scanner in CI catches these**, and a scanner on the pre-commit hook catches them earlier

```bash
gitleaks protect --staged
```

### The response when one leaks

- **Rotate first, investigate second, clean the history third.** Booklet 8 covers the sequence, and it does not change here
- Assume anything sent to a provider is retained under their policy. Rotating is the only action that actually helps
