### A unit test

Unit tests earn their keep on pure functions: same input, same output, no side effects. Formatters, parsers, price calculators, date helpers, reducers.

```ts
// money.ts
export function formatPrice(cents: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency,
  }).format(cents / 100);
}
```

```ts
// money.test.ts
import { describe, it, expect } from 'vitest';
import { formatPrice } from './money';

describe('formatPrice', () => {
  it('renders cents as dollars', () => {
    expect(formatPrice(1999)).toBe('$19.99');
  });

  it('handles zero', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });

  it('handles a currency that is not the default', () => {
    expect(formatPrice(1999, 'EUR')).toBe('€19.99');
  });
});
```

Three tests, three behaviors. The second and third are the ones that catch real bugs, because the happy path is the case the author already had in their head.
