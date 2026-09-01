### `useFormStatus`

`useActionState` gives the pending flag to the component that owns the form. A shared submit button, three files away in a design system, has no access to it. Passing it down as a prop through every layer is exactly the plumbing components exist to avoid.

`useFormStatus` reads the status of the nearest parent form directly, the way `useContext` reads a provider.

```jsx
import { useFormStatus } from 'react-dom';

function SubmitButton({ children }) {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending}>{children}</button>;
}
```

Note the import: it comes from `react-dom`, not `react`. It only works in a component rendered **inside** the `<form>`, not in the component that renders the form itself.
