### Mocks and spies

`vi` replaces Jest's `jest` object.

```ts
import { vi, expect, it } from 'vitest';

it('calls the callback once per item', () => {
  const spy = vi.fn();
  [1, 2, 3].forEach(spy);
  expect(spy).toHaveBeenCalledTimes(3);
});

vi.mock('./analytics', () => ({
  track: vi.fn(),
}));
```

Two Vitest 4 details that trip people coming from Jest. A module factory must return an object with the named exports it is replacing, not just a default. And `vi.restoreAllMocks()` only restores spies you created with `vi.spyOn`, not every mock.

### Running it

```bash
npx vitest              # watch mode, reruns only what changed
npx vitest run          # once, for CI
npx vitest --coverage   # coverage report
npx vitest --ui         # a browser view of the suite
```

Watch mode is the point. Vitest reruns only the tests affected by the file you saved, so the loop stays under a second even in a large suite.
