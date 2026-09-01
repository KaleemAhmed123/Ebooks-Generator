### Module Federation (Webpack / Rspack)

- The industry standard for microfrontends is **Module Federation**
- It allows a JavaScript application to dynamically load code from another application at runtime over the network

```js
// Team A's webpack.config.js (The Host)
new ModuleFederationPlugin({
  name: 'host',
  remotes: {
    checkout: 'checkout@https://checkout.example.com/remoteEntry.js',
  },
});

// Inside Team A's React code
import React, { Suspense } from 'react';
const CheckoutForm = React.lazy(() => import('checkout/CheckoutForm'));

function Page() {
  return (
    <Suspense fallback={<p>Loading checkout...</p>}>
      <CheckoutForm />
    </Suspense>
  );
}
```

### Shared Dependencies

- If the Host app and the Checkout app both use `react` and `react-dom`, downloading them twice would ruin performance
- Module Federation negotiates shared dependencies at runtime. The host says "I already loaded React 19". The remote app says "Great, I will use yours instead of downloading my own."
- This requires strict alignment on dependency versions across teams
