## The `use` API - continued

### Reading context conditionally

The other use of `use` is a context read that does not have to run on every render.

```jsx
import { use } from 'react';

function Heading({ children }) {
  if (children == null) return null;      // early return, before any context read
  const theme = use(ThemeContext);
  return <h1 style={{ color: theme.color }}>{children}</h1>;
}
```

`useContext` cannot appear after that early return. `use` can.
